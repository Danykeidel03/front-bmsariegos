import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/adminBalonmano" element={<Admin />} />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

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
