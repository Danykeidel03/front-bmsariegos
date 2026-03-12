import './Home.css';
import { lazy, Suspense } from 'react';
import SEO from '../../components/ui/SEO/SEO';

// Componentes críticos - carga inmediata
import MatchesBar from '../../features/matches/MatchesBar/MatchesBar';
import MySlider from '../../components/ui/Slider/Slider';

// Componentes below-the-fold - carga diferida
const SlideNoticias = lazy(() => import('../../features/news/SlideNoticias/SlideNoticias'));
const SliderBirthday = lazy(() => import('../../features/news/SliderBirthday/SliderBirthday'));
const BrandSlider = lazy(() => import('../../components/ui/BrandSlider/BrandSlider'));
const SocialLinks = lazy(() => import('../../components/ui/SocialLinks/SocialLinks'));

const Home = () => {
  return (
    <>
      <SEO
        title="Balonmano Sariegos - Club de Balonmano en León"
        description="Club de Balonmano Sariegos en León. Noticias, partidos, equipos y toda la información del club. Únete a nuestra comunidad deportiva."
        keywords="balonmano, sariegos, león, club deportivo, handball, deporte, equipos, partidos, noticias"
      />
      <div className="page-main">
        <MatchesBar />
        <MySlider></MySlider>
        <Suspense fallback={<div style={{ minHeight: '800px' }}></div>}>
          <SlideNoticias />
          <SliderBirthday />
          <BrandSlider />
          <SocialLinks />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
