import './styles/critical.css';
import { Suspense, useEffect, lazy } from 'react';
import { loadCSSAsync } from './utils/lazyLoadCSS';
import { warmupCache, preloadCriticalResources } from './utils/prefetch';
import { Routes, Route, useLocation } from 'react-router-dom';

// Componentes críticos - carga inmediata
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import CookieBanner from './components/layout/CookieBanner/CookieBanner';

// Lazy loading de páginas y features - se cargan solo cuando se navega a ellas
const Home = lazy(() => import('./pages/Home/Home'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const About = lazy(() => import('./pages/About/About'));
const Privacy = lazy(() => import('./pages/Privacy/Privacy'));
const Terms = lazy(() => import('./pages/Terms/Terms'));
const Equipaciones = lazy(() => import('./pages/Equipaciones/Equipaciones'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Features
const Admin = lazy(() => import('./features/admin/Admin/Admin'));
const News = lazy(() => import('./features/news/News/News'));
const Teams = lazy(() => import('./features/teams/Teams/Teams'));
const Matches = lazy(() => import('./features/matches/Matches/Matches'));

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#119bc6',
            fontSize: '18px',
          }}
        >
          Cargando...
        </div>
      }
    >
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
      <Header />
      <div className="main-content">
        <AppRoutes />
      </div>
      <Footer />
      <CookieBanner />
    </>
  );
}

function App() {
  useEffect(() => {
    // Cargar CSS no crítico de forma asíncrona después del renderizado inicial
    loadCSSAsync('/styles/non-critical.css');

    // Precargar recursos críticos
    preloadCriticalResources();

    // Iniciar precarga inteligente de rutas comunes
    warmupCache();
  }, []);

  return <AppContent />;
}

export default App;
