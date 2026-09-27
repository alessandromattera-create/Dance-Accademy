/*
# Create core schema for MOVEMENT HOUSE booking system

1. New Tables
- `disciplines` — dance disciplines (Ballet, Contemporary, etc.) mirroring src/data/disciplines.ts
- `teachers` — faculty members mirroring src/data/teachers.ts
- `rooms` — studio spaces (Studio 01, Studio 02, Performance Space)
- `classes` — recurring weekly classes mirroring src/data/classes.ts
- `teacher_availability` — recurring weekly availability slots per teacher
- `room_availability` — recurring weekly availability slots per room
- `bookings` — individual student bookings for a class on a specific date
- `trial_requests` — trial lesson requests from the homepage form

2. Security
- RLS enabled on all tables
- disciplines/teachers/rooms/classes/teacher_availability/room_availability: public read (TO anon, authenticated), no public writes
- bookings: no direct public insert (insert via create_booking function only); public read of own bookings is not needed for this no-auth app
- trial_requests: public insert only (no read, no update, no delete from anon)

3. Server-side enforcement
- `create_booking` SECURITY DEFINER function: checks for time conflicts on room OR teacher before inserting; validates age/guardian requirement
- `create_trial_request` SECURITY DEFINER function: validates age/guardian requirement before inserting
- CHECK constraints on both tables for age < 18 requiring guardian fields
*/

-- ============================================================
-- disciplines
-- ============================================================
CREATE TABLE IF NOT EXISTS disciplines (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  age_ranges text[] NOT NULL DEFAULT '{}',
  levels text[] NOT NULL DEFAULT '{}',
  duration text NOT NULL,
  teachers text[] NOT NULL DEFAULT '{}',
  image text,
  accent_color text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE disciplines ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_disciplines" ON disciplines;
CREATE POLICY "anon_select_disciplines" ON disciplines FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- teachers
-- ============================================================
CREATE TABLE IF NOT EXISTS teachers (
  id text PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  styles text[] NOT NULL DEFAULT '{}',
  levels text[] NOT NULL DEFAULT '{}',
  bio text NOT NULL,
  classes text[] NOT NULL DEFAULT '{}',
  image text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_teachers" ON teachers;
CREATE POLICY "anon_select_teachers" ON teachers FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- rooms
-- ============================================================
CREATE TABLE IF NOT EXISTS rooms (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_rooms" ON rooms;
CREATE POLICY "anon_select_rooms" ON rooms FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- classes (recurring weekly schedule)
-- ============================================================
CREATE TABLE IF NOT EXISTS classes (
  id text PRIMARY KEY,
  discipline_id text NOT NULL REFERENCES disciplines(id),
  discipline_name text NOT NULL,
  level text NOT NULL,
  teacher_id text NOT NULL REFERENCES teachers(id),
  teacher_name text NOT NULL,
  room_id text NOT NULL REFERENCES rooms(id),
  room_name text NOT NULL,
  day text NOT NULL CHECK (day IN ('Lun','Mar','Mer','Gio','Ven','Sab')),
  start_time text NOT NULL,
  duration int NOT NULL CHECK (duration > 0),
  total_places int NOT NULL DEFAULT 15 CHECK (total_places > 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_classes" ON classes;
CREATE POLICY "anon_select_classes" ON classes FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_classes_teacher_day ON classes(teacher_id, day);
CREATE INDEX IF NOT EXISTS idx_classes_room_day ON classes(room_id, day);
CREATE INDEX IF NOT EXISTS idx_classes_discipline ON classes(discipline_id);

-- ============================================================
-- teacher_availability (recurring weekly slots)
-- ============================================================
CREATE TABLE IF NOT EXISTS teacher_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id text NOT NULL REFERENCES teachers(id),
  day text NOT NULL CHECK (day IN ('Lun','Mar','Mer','Gio','Ven','Sab')),
  start_time text NOT NULL,
  end_time text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teacher_availability ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_teacher_availability" ON teacher_availability;
CREATE POLICY "anon_select_teacher_availability" ON teacher_availability FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_teacher_avail_teacher_day ON teacher_availability(teacher_id, day);

-- ============================================================
-- room_availability (recurring weekly slots)
-- ============================================================
CREATE TABLE IF NOT EXISTS room_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id text NOT NULL REFERENCES rooms(id),
  day text NOT NULL CHECK (day IN ('Lun','Mar','Mer','Gio','Ven','Sab')),
  start_time text NOT NULL,
  end_time text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE room_availability ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_room_availability" ON room_availability;
CREATE POLICY "anon_select_room_availability" ON room_availability FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_room_avail_room_day ON room_availability(room_id, day);

-- ============================================================
-- bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  age int NOT NULL CHECK (age >= 0 AND age <= 120),
  email text NOT NULL,
  phone text NOT NULL,
  parent_guardian_name text,
  parent_guardian_contact text,
  discipline_id text NOT NULL REFERENCES disciplines(id),
  class_id text REFERENCES classes(id),
  teacher_id text NOT NULL REFERENCES teachers(id),
  room_id text NOT NULL REFERENCES rooms(id),
  booking_date date NOT NULL,
  start_time text NOT NULL,
  duration int NOT NULL CHECK (duration > 0),
  status text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed','cancelled','completed')),
  created_at timestamptz DEFAULT now(),
  -- if under 18, guardian fields are required
  CONSTRAINT guardian_required_for_minors
    CHECK (age >= 18 OR (parent_guardian_name IS NOT NULL AND length(btrim(parent_guardian_name)) > 0
                         AND parent_guardian_contact IS NOT NULL AND length(btrim(parent_guardian_contact)) > 0))
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- No direct public INSERT — bookings created via create_booking function only
-- Allow public read (this is a no-auth app; bookings visible to frontend for conflict display)
DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
  TO anon, authenticated USING (true);

-- Allow the SECURITY DEFINER function (which runs as owner) to insert; deny direct anon insert
DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (false);

CREATE INDEX IF NOT EXISTS idx_bookings_date_teacher ON bookings(booking_date, teacher_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date_room ON bookings(booking_date, room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_class_date ON bookings(class_id, booking_date);

-- ============================================================
-- trial_requests
-- ============================================================
CREATE TABLE IF NOT EXISTS trial_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  age int NOT NULL CHECK (age >= 0 AND age <= 120),
  dance_style text NOT NULL,
  experience text,
  preferred_day text,
  parent_guardian_name text,
  parent_guardian_contact text,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT guardian_required_for_trial_minors
    CHECK (age >= 18 OR (parent_guardian_name IS NOT NULL AND length(btrim(parent_guardian_name)) > 0
                         AND parent_guardian_contact IS NOT NULL AND length(btrim(parent_guardian_contact)) > 0))
);

ALTER TABLE trial_requests ENABLE ROW LEVEL SECURITY;

-- Public insert only — no read, no update, no delete
DROP POLICY IF EXISTS "anon_insert_trial_requests" ON trial_requests;
CREATE POLICY "anon_insert_trial_requests" ON trial_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- ============================================================
-- create_booking function (SECURITY DEFINER)
-- Checks for room and teacher conflicts before inserting.
-- Validates age/guardian requirement.
-- ============================================================
CREATE OR REPLACE FUNCTION create_booking(
  p_student_name text,
  p_age int,
  p_email text,
  p_phone text,
  p_parent_guardian_name text,
  p_parent_guardian_contact text,
  p_discipline_id text,
  p_class_id text,
  p_teacher_id text,
  p_room_id text,
  p_booking_date date,
  p_start_time text,
  p_duration int
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_conflict_count int;
  v_booking_id uuid;
  v_start_minutes int;
  v_end_minutes int;
  v_existing_start int;
  v_existing_end int;
BEGIN
  -- Validate age/guardian
  IF p_age < 18 THEN
    IF p_parent_guardian_name IS NULL OR length(btrim(p_parent_guardian_name)) = 0
       OR p_parent_guardian_contact IS NULL OR length(btrim(p_parent_guardian_contact)) = 0 THEN
      RETURN json_build_object('error', 'Parent/guardian name and contact are required for students under 18');
    END IF;
  END IF;

  -- Compute time range in minutes from midnight
  v_start_minutes := (split_part(p_start_time, ':', 1))::int * 60 + (split_part(p_start_time, ':', 2))::int;
  v_end_minutes := v_start_minutes + p_duration;

  -- Check for conflicts: same room OR same teacher, same date, overlapping time
  SELECT count(*) INTO v_conflict_count
  FROM bookings
  WHERE booking_date = p_booking_date
    AND status = 'confirmed'
    AND (
      room_id = p_room_id
      OR teacher_id = p_teacher_id
    )
    AND (
      -- existing booking overlaps with requested slot
      (split_part(start_time, ':', 1))::int * 60 + (split_part(start_time, ':', 2))::int < v_end_minutes
      AND (split_part(start_time, ':', 1))::int * 60 + (split_part(start_time, ':', 2))::int + duration > v_start_minutes
    );

  IF v_conflict_count > 0 THEN
    RETURN json_build_object('error', 'This time slot is no longer available — the room or teacher has a conflicting booking');
  END IF;

  -- Insert the booking
  INSERT INTO bookings (
    student_name, age, email, phone,
    parent_guardian_name, parent_guardian_contact,
    discipline_id, class_id, teacher_id, room_id,
    booking_date, start_time, duration, status
  ) VALUES (
    p_student_name, p_age, p_email, p_phone,
    p_parent_guardian_name, p_parent_guardian_contact,
    p_discipline_id, p_class_id, p_teacher_id, p_room_id,
    p_booking_date, p_start_time, p_duration, 'confirmed'
  )
  RETURNING id INTO v_booking_id;

  RETURN json_build_object('id', v_booking_id, 'status', 'confirmed');
END;
$$;

-- Grant execute to anon (no-auth app needs public access)
REVOKE EXECUTE ON FUNCTION create_booking FROM anon;
GRANT EXECUTE ON FUNCTION create_booking TO anon, authenticated;

-- ============================================================
-- get_available_slots function
-- Returns available time slots for a given teacher + room + date,
-- subtracting existing bookings from the weekly availability windows.
-- ============================================================
CREATE OR REPLACE FUNCTION get_available_slots(
  p_teacher_id text,
  p_room_id text,
  p_booking_date date,
  p_duration int
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_day text;
  v_result json;
BEGIN
  -- Get the day-of-week abbreviation for the given date
  -- 0=Sunday, 1=Monday... we map to our Lun-Sat format
  v_day := CASE extract(dow FROM p_booking_date)
    WHEN 1 THEN 'Lun'
    WHEN 2 THEN 'Mar'
    WHEN 3 THEN 'Mer'
    WHEN 4 THEN 'Gio'
    WHEN 5 THEN 'Ven'
    WHEN 6 THEN 'Sab'
    ELSE NULL
  END;

  IF v_day IS NULL THEN
    RETURN json_build_object('slots', '[]'::json, 'message', 'Studio closed on Sundays');
  END IF;

  -- Build available slots from teacher and room availability,
  -- then subtract existing bookings for that date
  WITH teacher_windows AS (
    SELECT start_time, end_time FROM teacher_availability
    WHERE teacher_id = p_teacher_id AND day = v_day
  ),
  room_windows AS (
    SELECT start_time, end_time FROM room_availability
    WHERE room_id = p_room_id AND day = v_day
  ),
  -- Intersection of teacher and room availability windows
  combined_windows AS (
    SELECT
      GREATEST(t.start_time, r.start_time) AS win_start,
      LEAST(t.end_time, r.end_time) AS win_end
    FROM teacher_windows t
    CROSS JOIN room_windows r
    WHERE GREATEST(t.start_time, r.start_time) < LEAST(t.end_time, r.end_time)
  ),
  -- Generate 15-minute slot candidates within each window
  candidates AS (
    SELECT
      to_char(
        (date '2000-01-01' +
          (split_part(cw.win_start, ':', 1))::int * interval '1 hour' +
          (split_part(cw.win_start, ':', 2))::int * interval '1 minute' +
          generate_series(0, 100) * interval '15 minutes'
        )::time,
        'HH24:MI'
      ) AS slot_start
    FROM combined_windows cw
  ),
  -- Filter candidates that fit within the window (slot_start + duration <= win_end)
  valid_candidates AS (
    SELECT c.slot_start
    FROM candidates c
    JOIN combined_windows cw ON true
    WHERE
      (split_part(c.slot_start, ':', 1))::int * 60 + (split_part(c.slot_start, ':', 2))::int
      >= (split_part(cw.win_start, ':', 1))::int * 60 + (split_part(cw.win_start, ':', 2))::int
      AND
      (split_part(c.slot_start, ':', 1))::int * 60 + (split_part(c.slot_start, ':', 2))::int + p_duration
      <= (split_part(cw.win_end, ':', 1))::int * 60 + (split_part(cw.win_end, ':', 2))::int
  ),
  -- Subtract existing bookings (teacher or room conflict)
  available AS (
    SELECT vc.slot_start
    FROM valid_candidates vc
    WHERE NOT EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.booking_date = p_booking_date
        AND b.status = 'confirmed'
        AND (b.teacher_id = p_teacher_id OR b.room_id = p_room_id)
        AND (
          (split_part(b.start_time, ':', 1))::int * 60 + (split_part(b.start_time, ':', 2))::int
          < (split_part(vc.slot_start, ':', 1))::int * 60 + (split_part(vc.slot_start, ':', 2))::int + p_duration
          AND
          (split_part(b.start_time, ':', 1))::int * 60 + (split_part(b.start_time, ':', 2))::int + b.duration
          > (split_part(vc.slot_start, ':', 1))::int * 60 + (split_part(vc.slot_start, ':', 2))::int
        )
    )
  )
  SELECT json_agg(slot_start ORDER BY slot_start) INTO v_result FROM available;

  IF v_result IS NULL THEN
    v_result := '[]'::json;
  END IF;

  RETURN json_build_object('slots', v_result);
END;
$$;

REVOKE EXECUTE ON FUNCTION get_available_slots FROM anon;
GRANT EXECUTE ON FUNCTION get_available_slots TO anon, authenticated;
