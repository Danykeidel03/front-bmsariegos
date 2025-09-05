import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import News from './pages/News/News';
import Teams from './pages/Teams/Teams';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/noticias" element={<News />} />
      <Route path="/equipos" element={<Teams />} />
      <Route path="/adminBalonmano" element={<Admin />} />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/adminBalonmano';

  return (
    <>
    {!isAdminPage && <Header/>}
    <div className="main-content">
      <AppRoutes />
    </div>
    {!isAdminPage && <Footer/>}
    </>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
