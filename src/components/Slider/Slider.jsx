import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Slider.css';

const MySlider = () => {
    console.log('Slider rendering...');
    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={false}
            loop={false}
            onSlideChange={(swiper) => console.log('Slide changed to:', swiper.activeIndex)}
        >
            <SwiperSlide>
                <img 
                    src="/slider1.webp" 
                    alt="Slide 1" 
                    className='imgSlider'
                    onLoad={() => console.log('Image 1 loaded')}
                    onError={() => console.log('Image 1 failed to load')}
                />
            </SwiperSlide>
            <SwiperSlide>
                <img 
                    src="/slider2.webp" 
                    alt="Slide 2" 
                    className='imgSlider'
                    onLoad={() => console.log('Image 2 loaded')}
                    onError={() => console.log('Image 2 failed to load')}
                />
            </SwiperSlide>
            <SwiperSlide>
                <img 
                    src="/slider3.webp" 
                    alt="Slide 3" 
                    className='imgSlider'
                    onLoad={() => console.log('Image 3 loaded')}
                    onError={() => console.log('Image 3 failed to load')}
                />
            </SwiperSlide>
            <SwiperSlide>
                <img 
                    src="/slider4.webp" 
                    alt="Slide 4" 
                    className='imgSlider'
                    onLoad={() => console.log('Image 4 loaded')}
                    onError={() => console.log('Image 4 failed to load')}
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default MySlider;