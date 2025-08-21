import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css';

const MySlider = () => (
    <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        lazy={true}
        preloadImages={false}
    >
        <SwiperSlide>
            <img src="slider1.webp" alt="Slide" className='imgSlider swiper-lazy' loading="eager" fetchpriority="high" />
            <div className="swiper-lazy-preloader"></div>
        </SwiperSlide>
        <SwiperSlide>
            <img data-src="slider2.webp" alt="Slide" className='imgSlider swiper-lazy' loading="lazy" />
            <div className="swiper-lazy-preloader"></div>
        </SwiperSlide>
        <SwiperSlide>
            <img data-src="slider3.webp" alt="Slide" className='imgSlider swiper-lazy' loading="lazy" />
            <div className="swiper-lazy-preloader"></div>
        </SwiperSlide>
         <SwiperSlide>
            <img data-src="slider4.webp" alt="Slide" className='imgSlider swiper-lazy' loading="lazy" />
            <div className="swiper-lazy-preloader"></div>
        </SwiperSlide>
    </Swiper>
);

export default MySlider;