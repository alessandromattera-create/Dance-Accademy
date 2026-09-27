/*
# Seed initial data for disciplines, teachers, rooms, classes, and availability

Mirrors the static TypeScript data files so the live database matches the UI.
All inserts use ON CONFLICT DO NOTHING for idempotency.
*/

-- ============================================================
-- Disciplines
-- ============================================================
INSERT INTO disciplines (id, name, category, tagline, description, age_ranges, levels, duration, teachers, image, accent_color) VALUES
('ballet', 'Ballet', 'Classical', 'The discipline of line.', 'Classical ballet technique rooted in tradition — barre work, centre practice, allegro, and pointe. Students build poise, alignment, strength, and the precision that underpins all dance forms.', ARRAY['4–7','8–12','13–17','18+'], ARRAY['Beginner','Intermediate','Advanced','Pre-professional'], '60–90 min', ARRAY['Elena Bianchi','Marco Ferrari'], 'https://images.pexels.com/photos/3901644/pexels-photo-3901644.jpeg?auto=compress&cs=tinysrgb&w=1600', '#5E1A26'),
('contemporary', 'Contemporary', 'Contemporary', 'Floor work, release, improvisation.', 'Contemporary dance blends release technique, floor work, and improvisation. Dancers explore weight, momentum, and breath — developing a personal movement vocabulary that is both expressive and athletic.', ARRAY['8–12','13–17','18+'], ARRAY['Beginner','Intermediate','Advanced'], '75–90 min', ARRAY['Sofia Romano','Luca Moretti'], 'https://images.pexels.com/photos/6926606/pexels-photo-6926606.jpeg?auto=compress&cs=tinysrgb&w=1600', '#1C1C1E'),
('modern', 'Modern', 'Contemporary', 'Graham, Cunningham, Horton.', 'Modern dance technique drawing from Graham, Cunningham, and Horton traditions. Focus on contraction, spiral, fall and recovery — the foundational principles that shaped 20th-century dance.', ARRAY['13–17','18+'], ARRAY['Beginner','Intermediate','Advanced'], '75 min', ARRAY['Sofia Romano'], 'https://images.pexels.com/photos/6926436/pexels-photo-6926436.jpeg?auto=compress&cs=tinysrgb&w=1600', '#3F1019'),
('jazz', 'Jazz', 'Classical', 'Rhythm, style, theatricality.', 'Jazz dance combines rhythm, isolations, and theatrical flair. From classic Broadway jazz to contemporary fusion — sharp, dynamic movement that celebrates musicality and individual style.', ARRAY['8–12','13–17','18+'], ARRAY['Beginner','Intermediate','Advanced'], '60–75 min', ARRAY['Giulia Conti'], 'https://images.pexels.com/photos/4250534/pexels-photo-4250534.jpeg?auto=compress&cs=tinysrgb&w=1600', '#7A2A38'),
('hiphop', 'Hip Hop', 'Urban', 'Grooves, foundations, freestyle.', 'Authentic hip-hop dance covering grooves, bounces, and foundational styles. Dancers learn the cultural roots of hip-hop while developing their own freestyle voice and musicality.', ARRAY['8–12','13–17','18+'], ARRAY['Beginner','Intermediate','Advanced'], '60 min', ARRAY['Davide Russo'], 'https://images.pexels.com/photos/8973460/pexels-photo-8973460.jpeg?auto=compress&cs=tinysrgb&w=1600', '#0A0A0A'),
('urban', 'Urban', 'Urban', 'Street styles, choreography.', 'Urban dance spans house, waacking, locking, and street choreography. A high-energy class focused on groove, character, and the storytelling power of street dance culture.', ARRAY['13–17','18+'], ARRAY['Beginner','Intermediate','Advanced'], '60 min', ARRAY['Davide Russo','Giulia Conti'], 'https://images.pexels.com/photos/690597/pexels-photo-690597.jpeg?auto=compress&cs=tinysrgb&w=1600', '#1C1C1E'),
('commercial', 'Commercial', 'Urban', 'Stage, screen, industry.', 'Commercial dance prepares dancers for the stage and screen — music-video choreography, pop-style routines, and the versatile performance skills needed in the entertainment industry.', ARRAY['13–17','18+'], ARRAY['Intermediate','Advanced'], '60 min', ARRAY['Giulia Conti'], 'https://images.pexels.com/photos/6926734/pexels-photo-6926734.jpeg?auto=compress&cs=tinysrgb&w=1600', '#5E1A26'),
('rhythmic', 'Rhythmic', 'Specialized', 'Apparatus, grace, flow.', 'Rhythmic dance combines elements of ballet, gymnastics, and apparatus work — ribbon, ball, hoop, and clubs. Students develop grace, coordination, and expressive performance with props.', ARRAY['4–7','8–12','13–17'], ARRAY['Beginner','Intermediate','Advanced'], '60–75 min', ARRAY['Elena Bianchi'], 'https://images.pexels.com/photos/7186303/pexels-photo-7186303.jpeg?auto=compress&cs=tinysrgb&w=1600', '#7A2A38'),
('acro', 'Acro', 'Specialized', 'Strength, flexibility, tricks.', 'Acro dance blends acrobatics with choreography — tumbling, balances, and contortion elements woven into dance sequences. Builds extraordinary strength, flexibility, and control.', ARRAY['8–12','13–17','18+'], ARRAY['Beginner','Intermediate','Advanced'], '75 min', ARRAY['Luca Moretti'], 'https://images.pexels.com/photos/6926403/pexels-photo-6926403.jpeg?auto=compress&cs=tinysrgb&w=1600', '#3F1019'),
('musical-theatre', 'Musical Theatre', 'Specialized', 'Act, sing, dance.', 'Musical theatre dance integrates jazz, tap, and character work with acting and vocal performance. Dancers train in the triple-threat tradition — preparing for stage musicals and performance art.', ARRAY['8–12','13–17','18+'], ARRAY['Beginner','Intermediate','Advanced'], '90 min', ARRAY['Giulia Conti','Sofia Romano'], 'https://images.pexels.com/photos/16126271/pexels-photo-16126271.jpeg?auto=compress&cs=tinysrgb&w=1600', '#5E1A26'),
('kids', 'Kids', 'Programs', 'Play, explore, discover.', 'Creative movement and introductory dance for young children. Play-based classes that build coordination, rhythm, social skills, and a love of movement — the perfect first step into dance.', ARRAY['3–4','5–7'], ARRAY['Beginner'], '45 min', ARRAY['Elena Bianchi'], 'https://images.pexels.com/photos/6713390/pexels-photo-6713390.jpeg?auto=compress&cs=tinysrgb&w=1600', '#7A2A38'),
('adults', 'Adults', 'Programs', 'It is never too late.', 'Open-level classes designed for adult dancers of all backgrounds — from complete beginners returning to movement to experienced dancers maintaining technique. A welcoming, no-pressure environment.', ARRAY['18+','30+','50+'], ARRAY['Beginner','Intermediate'], '60 min', ARRAY['Sofia Romano','Marco Ferrari'], 'https://images.pexels.com/photos/39205157/pexels-photo-39205157.jpeg?auto=compress&cs=tinysrgb&w=1600', '#1C1C1E')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Teachers
-- ============================================================
INSERT INTO teachers (id, name, role, styles, levels, bio, classes, image) VALUES
('elena-bianchi', 'Elena Bianchi', 'Ballet & Rhythmic', ARRAY['Ballet','Pointe','Rhythmic','Kids'], ARRAY['Beginner','Intermediate','Advanced','Pre-professional'], 'Classically trained at the Accademia Teatro alla Scala, Elena brings over fifteen years of teaching experience to Movement House. Her approach blends rigorous Vaganova technique with a warm, encouraging pedagogy that meets each dancer where they are.', ARRAY['Ballet Beginner','Ballet Intermediate','Pointe','Rhythmic Junior','Kids Creative Movement'], 'https://images.pexels.com/photos/3902514/pexels-photo-3902514.jpeg?auto=compress&cs=tinysrgb&w=800'),
('marco-ferrari', 'Marco Ferrari', 'Ballet & Adults', ARRAY['Ballet','Adults','Stretch'], ARRAY['Beginner','Intermediate','Advanced'], 'A former soloist with the Balletto di Roma, Marco transitioned to teaching after a distinguished performing career. He specializes in adult dancers — from complete beginners to returning professionals — creating a welcoming, pressure-free environment that respects every body''s journey.', ARRAY['Ballet Advanced','Adults Open Ballet','Adults Beginner','Ballet Intermediate'], 'https://images.pexels.com/photos/31528817/pexels-photo-31528817.jpeg?auto=compress&cs=tinysrgb&w=800'),
('sofia-romano', 'Sofia Romano', 'Contemporary & Modern', ARRAY['Contemporary','Modern','Improvisation','Adults'], ARRAY['Beginner','Intermediate','Advanced'], 'Sofia trained in Cunningham and release technique across Europe, studying at the London Contemporary Dance School and with the Forsythe Company. Her classes explore weight, momentum, and breath — guiding dancers toward an authentic, personal movement language rooted in solid technique.', ARRAY['Contemporary Beginner','Contemporary Intermediate','Modern Technique','Improvisation Lab','Adults Contemporary'], 'https://images.pexels.com/photos/6719010/pexels-photo-6719010.jpeg?auto=compress&cs=tinysrgb&w=800'),
('luca-moretti', 'Luca Moretti', 'Contemporary & Acro', ARRAY['Contemporary','Acro','Partnering'], ARRAY['Intermediate','Advanced'], 'Luca is a choreographer and acrobatic dance specialist who has worked with companies across Italy and Germany. His teaching bridges contemporary floor work with acrobatic elements — building the strength, trust, and spatial awareness needed for partnering and aerial movement.', ARRAY['Contemporary Advanced','Acro Intermediate','Acro Advanced','Partnering Workshop'], 'https://images.pexels.com/photos/30658927/pexels-photo-30658927.jpeg?auto=compress&cs=tinysrgb&w=800'),
('giulia-conti', 'Giulia Conti', 'Jazz, Commercial & Musical Theatre', ARRAY['Jazz','Commercial','Musical Theatre','Urban'], ARRAY['Beginner','Intermediate','Advanced'], 'Giulia has performed in musical theatre productions across Italy and worked as a commercial choreographer for television and music videos. She brings industry experience into the studio — teaching the versatility, stage presence, and performance skills that professional dance demands.', ARRAY['Jazz Beginner','Commercial Intermediate','Musical Theatre','Jazz Advanced','Urban Choreography'], 'https://images.pexels.com/photos/30102824/pexels-photo-30102824.jpeg?auto=compress&cs=tinysrgb&w=800'),
('davide-russo', 'Davide Russo', 'Hip Hop & Urban', ARRAY['Hip Hop','Urban','House','Breaking'], ARRAY['Beginner','Intermediate','Advanced'], 'Davide is a street dancer and battle competitor who has been part of the Italian hip-hop scene for over a decade. He teaches the cultural foundations of hip-hop, house, and breaking — not just the moves, but the history, the grooves, and the freestyle spirit that define street dance.', ARRAY['Hip Hop Beginner','Hip Hop Intermediate','Urban Choreography','House Fundamentals'], 'https://images.pexels.com/photos/30718155/pexels-photo-30718155.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Rooms
-- ============================================================
INSERT INTO rooms (id, name, description) VALUES
('studio-01', 'Studio 01', 'Principal ballet studio with sprung harlequin flooring, full-wall mirrors, and natural light.'),
('studio-02', 'Studio 02', 'Versatile contemporary and urban studio with modular flooring and integrated sound system.'),
('performance-space', 'Performance Space', 'Black-box theatre space with professional rigging and raked seating for up to 80.')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Classes (recurring weekly schedule)
-- ============================================================
INSERT INTO classes (id, discipline_id, discipline_name, level, teacher_id, teacher_name, room_id, room_name, day, start_time, duration, total_places) VALUES
('c1', 'ballet', 'Ballet', 'Beginner', 'elena-bianchi', 'Elena Bianchi', 'studio-01', 'Studio 01', 'Lun', '16:00', 60, 15),
('c2', 'kids', 'Kids', 'Beginner', 'elena-bianchi', 'Elena Bianchi', 'studio-02', 'Studio 02', 'Lun', '17:00', 45, 12),
('c3', 'jazz', 'Jazz', 'Beginner', 'giulia-conti', 'Giulia Conti', 'studio-01', 'Studio 01', 'Lun', '18:00', 60, 15),
('c4', 'contemporary', 'Contemporary', 'Beginner', 'sofia-romano', 'Sofia Romano', 'studio-02', 'Studio 02', 'Lun', '18:00', 75, 18),
('c5', 'contemporary', 'Contemporary', 'Advanced', 'sofia-romano', 'Sofia Romano', 'studio-02', 'Studio 02', 'Lun', '19:30', 90, 16),
('c6', 'ballet', 'Ballet', 'Intermediate', 'elena-bianchi', 'Elena Bianchi', 'studio-01', 'Studio 01', 'Lun', '19:00', 75, 15),
('c7', 'ballet', 'Ballet', 'Advanced', 'marco-ferrari', 'Marco Ferrari', 'studio-01', 'Studio 01', 'Mar', '18:00', 90, 14),
('c8', 'contemporary', 'Contemporary', 'Intermediate', 'luca-moretti', 'Luca Moretti', 'studio-02', 'Studio 02', 'Mar', '16:00', 75, 18),
('c9', 'jazz', 'Jazz', 'Intermediate', 'giulia-conti', 'Giulia Conti', 'studio-01', 'Studio 01', 'Mar', '16:30', 75, 15),
('c10', 'adults', 'Adults', 'Beginner', 'marco-ferrari', 'Marco Ferrari', 'studio-01', 'Studio 01', 'Mar', '20:00', 60, 20),
('c11', 'acro', 'Acro', 'Intermediate', 'luca-moretti', 'Luca Moretti', 'performance-space', 'Performance Space', 'Mar', '19:30', 75, 12),
('c12', 'ballet', 'Ballet', 'Intermediate', 'elena-bianchi', 'Elena Bianchi', 'studio-01', 'Studio 01', 'Mer', '16:00', 75, 15),
('c13', 'hiphop', 'Hip Hop', 'Beginner', 'davide-russo', 'Davide Russo', 'studio-02', 'Studio 02', 'Mer', '16:00', 60, 18),
('c14', 'rhythmic', 'Rhythmic', 'Beginner', 'elena-bianchi', 'Elena Bianchi', 'studio-01', 'Studio 01', 'Mer', '17:30', 60, 12),
('c15', 'contemporary', 'Contemporary', 'Beginner', 'sofia-romano', 'Sofia Romano', 'studio-02', 'Studio 02', 'Mer', '18:00', 75, 18),
('c16', 'hiphop', 'Hip Hop', 'Intermediate', 'davide-russo', 'Davide Russo', 'studio-02', 'Studio 02', 'Mer', '19:00', 60, 16),
('c17', 'contemporary', 'Contemporary', 'Intermediate', 'sofia-romano', 'Sofia Romano', 'studio-02', 'Studio 02', 'Mer', '20:00', 90, 18),
('c18', 'acro', 'Acro', 'Beginner', 'luca-moretti', 'Luca Moretti', 'performance-space', 'Performance Space', 'Gio', '16:00', 75, 12),
('c19', 'contemporary', 'Contemporary', 'Intermediate', 'luca-moretti', 'Luca Moretti', 'studio-02', 'Studio 02', 'Gio', '16:00', 75, 18),
('c20', 'ballet', 'Ballet', 'Intermediate', 'marco-ferrari', 'Marco Ferrari', 'studio-01', 'Studio 01', 'Gio', '18:00', 75, 15),
('c21', 'commercial', 'Commercial', 'Intermediate', 'giulia-conti', 'Giulia Conti', 'studio-01', 'Studio 01', 'Gio', '19:30', 60, 16),
('c22', 'hiphop', 'Hip Hop', 'Advanced', 'davide-russo', 'Davide Russo', 'studio-02', 'Studio 02', 'Gio', '20:00', 60, 16),
('c23', 'ballet', 'Ballet', 'Pre-professional', 'elena-bianchi', 'Elena Bianchi', 'studio-01', 'Studio 01', 'Ven', '16:00', 90, 12),
('c24', 'hiphop', 'Hip Hop', 'Beginner', 'davide-russo', 'Davide Russo', 'studio-02', 'Studio 02', 'Ven', '16:00', 60, 18),
('c25', 'contemporary', 'Contemporary', 'Advanced', 'luca-moretti', 'Luca Moretti', 'performance-space', 'Performance Space', 'Ven', '18:00', 90, 16),
('c26', 'jazz', 'Jazz', 'Advanced', 'giulia-conti', 'Giulia Conti', 'studio-01', 'Studio 01', 'Ven', '19:00', 75, 14),
('c27', 'musical-theatre', 'Musical Theatre', 'Intermediate', 'giulia-conti', 'Giulia Conti', 'performance-space', 'Performance Space', 'Ven', '20:30', 90, 20),
('c28', 'kids', 'Kids', 'Beginner', 'elena-bianchi', 'Elena Bianchi', 'studio-02', 'Studio 02', 'Sab', '10:00', 45, 12),
('c29', 'ballet', 'Ballet', 'Beginner', 'elena-bianchi', 'Elena Bianchi', 'studio-01', 'Studio 01', 'Sab', '11:00', 60, 15),
('c30', 'adults', 'Adults', 'Intermediate', 'marco-ferrari', 'Marco Ferrari', 'studio-01', 'Studio 01', 'Sab', '14:00', 60, 20),
('c31', 'urban', 'Urban', 'Intermediate', 'davide-russo', 'Davide Russo', 'studio-02', 'Studio 02', 'Sab', '15:00', 60, 16)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Teacher Availability (recurring weekly)
-- Derived from src/data/teachers.ts availability arrays
-- ============================================================
INSERT INTO teacher_availability (teacher_id, day, start_time, end_time) VALUES
('elena-bianchi', 'Lun', '16:00', '20:00'),
('elena-bianchi', 'Mer', '16:00', '20:00'),
('elena-bianchi', 'Ven', '16:00', '21:00'),
('elena-bianchi', 'Sab', '10:00', '14:00'),
('marco-ferrari', 'Mar', '18:00', '22:00'),
('marco-ferrari', 'Gio', '18:00', '22:00'),
('marco-ferrari', 'Sab', '14:00', '18:00'),
('sofia-romano', 'Lun', '18:00', '22:00'),
('sofia-romano', 'Mer', '18:00', '22:00'),
('sofia-romano', 'Gio', '16:00', '20:00'),
('luca-moretti', 'Mar', '16:00', '20:00'),
('luca-moretti', 'Gio', '16:00', '20:00'),
('luca-moretti', 'Ven', '16:00', '20:00'),
('giulia-conti', 'Lun', '16:00', '20:00'),
('giulia-conti', 'Mar', '16:00', '20:00'),
('giulia-conti', 'Ven', '18:00', '23:00'),
('davide-russo', 'Mer', '16:00', '20:00'),
('davide-russo', 'Gio', '18:00', '22:00'),
('davide-russo', 'Ven', '16:00', '20:00')
ON CONFLICT DO NOTHING;

-- ============================================================
-- Room Availability (recurring weekly)
-- Studios are generally available Mon–Sat 10:00–22:00
-- Saturday: 10:00–18:00
-- ============================================================
INSERT INTO room_availability (room_id, day, start_time, end_time) VALUES
('studio-01', 'Lun', '10:00', '22:00'),
('studio-01', 'Mar', '10:00', '22:00'),
('studio-01', 'Mer', '10:00', '22:00'),
('studio-01', 'Gio', '10:00', '22:00'),
('studio-01', 'Ven', '10:00', '22:00'),
('studio-01', 'Sab', '10:00', '18:00'),
('studio-02', 'Lun', '10:00', '22:00'),
('studio-02', 'Mar', '10:00', '22:00'),
('studio-02', 'Mer', '10:00', '22:00'),
('studio-02', 'Gio', '10:00', '22:00'),
('studio-02', 'Ven', '10:00', '22:00'),
('studio-02', 'Sab', '10:00', '18:00'),
('performance-space', 'Lun', '10:00', '22:00'),
('performance-space', 'Mar', '10:00', '22:00'),
('performance-space', 'Mer', '10:00', '22:00'),
('performance-space', 'Gio', '10:00', '22:00'),
('performance-space', 'Ven', '10:00', '22:00'),
('performance-space', 'Sab', '10:00', '18:00')
ON CONFLICT DO NOTHING;
