import './Home.css'
import { lazy, Suspense } from 'react';
import SEO from '../../components/SEO/SEO';

// Componentes críticos - carga inmediata
import MatchesBar from '../../components/MatchesBar/MatchesBar';
import MySlider from '../../components/Slider/Slider';

// Componentes below-the-fold - carga diferida
const SlideNoticias = lazy(() => import('../../components/SlideNoticias/SlideNoticias'));
const SliderBirthday = lazy(() => import('../../components/SliderBirthday/SliderBirthday'));
const BrandSlider = lazy(() => import('../../components/BrandSlider/BrandSlider'));
const SocialLinks = lazy(() => import('../../components/SocialLinks/SocialLinks'));

const Home = () => {
    return (
        <>
            <SEO 
                title="Balonmano Sariegos - Club de Balonmano en León"
                description="Club de Balonmano Sariegos en León. Noticias, partidos, equipos y toda la información del club. Únete a nuestra comunidad deportiva."
                keywords="balonmano, sariegos, león, club deportivo, handball, deporte, equipos, partidos, noticias"
            />
            <div className='page-main'>
                <MatchesBar/>
                <MySlider></MySlider>
                <Suspense fallback={<div style={{minHeight: '200px'}}></div>}>
                    <SlideNoticias/>
                    <SliderBirthday/>
                    <BrandSlider/>
                    <SocialLinks/>
                </Suspense>
            </div>
        </>
    );
}

export default Home