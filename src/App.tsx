import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { DisciplinePage } from '@/pages/DisciplinePage';
import { InsegnantiPage } from '@/pages/InsegnantiPage';
import { OrariPage } from '@/pages/OrariPage';
import { EventiPage } from '@/pages/EventiPage';
import { PrenotaPage } from '@/pages/PrenotaPage';
import { ContattiPage } from '@/pages/ContattiPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/discipline" element={<DisciplinePage />} />
          <Route path="/insegnanti" element={<InsegnantiPage />} />
          <Route path="/orari" element={<OrariPage />} />
          <Route path="/eventi" element={<EventiPage />} />
          <Route path="/prenota" element={<PrenotaPage />} />
          <Route path="/contatti" element={<ContattiPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
