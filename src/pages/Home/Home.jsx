import './Home.css'
import MySlider from '../../components/Slider/Slider'
import BrandSlider from '../../components/BrandSlider/BrandSlider';
import SliderBirthday from '../../components/SliderBirthday/SliderBirthday';
import SlideNoticias from '../../components/SlideNoticias/SlideNoticias';

const Home = () => {
    return (
        <div className='page-main'>
            <MySlider></MySlider>
            <BrandSlider/>
            <SliderBirthday/>
            <SlideNoticias/>
        </div>
    );
}

export default Home