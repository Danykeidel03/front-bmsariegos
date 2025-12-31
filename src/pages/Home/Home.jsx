import './Home.css'
import MySlider from '../../components/Slider/Slider'
import BrandSlider from '../../components/BrandSlider/BrandSlider';
import SliderBirthday from '../../components/SliderBirthday/SliderBirthday';
import SlideNoticias from '../../components/SlideNoticias/SlideNoticias';
import MatchesBar from '../../components/MatchesBar/MatchesBar';
import SocialLinks from '../../components/SocialLinks/SocialLinks';
import SEO from '../../components/SEO/SEO';

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
                <SlideNoticias/>
                <SliderBirthday/>
                <BrandSlider/>
                <SocialLinks/>
            </div>
        </>
    );
}

export default Home