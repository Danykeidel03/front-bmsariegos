import './App.css';
import { Suspense } from 'react';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import News from './pages/News/News';
import Teams from './pages/Teams/Teams';
import About from './pages/About/About';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Matches from './pages/Matches/Matches';
import Equipaciones from './pages/Equipaciones/Equipaciones';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CookieBanner from './components/CookieBanner/CookieBanner';
import { Routes, Route, useLocation } from 'react-router-dom';

function AppRoutes() {
  return (
    <Suspense fallback={<div style={{height:'200px'}}></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/equipos" element={<Teams />} />
        <Route path="/partidos" element={<Matches />} />
        <Route path="/tienda" element={<Equipaciones />} />
        <Route path="/quienes-somos" element={<About />} />
        <Route path="/politica-privacidad" element={<Privacy />} />
        <Route path="/terminos-condiciones" element={<Terms />} />
        <Route path="/adminBalonmano" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.toLowerCase() === '/adminbalonmano';

  if (isAdminPage) {
    return (
      <>
        <AppRoutes />
        <CookieBanner />
      </>
    );
  }

  return (
    <>
      <Header/>
      <div className="main-content">
        <AppRoutes />
      </div>
      <Footer/>
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
