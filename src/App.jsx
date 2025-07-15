import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contact />} />
    </Routes>
  );
}

function AppContent() {
  return (
    <>
    <Header/>
    <div className="main-content">
      <AppRoutes />
    </div>
    <Footer/>
    </>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
