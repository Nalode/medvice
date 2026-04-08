import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TestimonialsPage from './pages/TestimonialsPage';
import Admin from './pages/Admin';
import HospitalDetails from './pages/HospitalDetails';
import NavBar from './components/NavBar';

import BackToTop from './components/BackToTop';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/hospital/:hospitalId" element={<HospitalDetails />} />
            <Route path="/specialty/:specialtyName" element={<TestimonialsPage />} />
            <Route path="/hospital/:hospitalId/service/:serviceName" element={<TestimonialsPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
