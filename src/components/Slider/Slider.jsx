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
    >
        <SwiperSlide>
            <img src="slider1.webp" alt="Slide" className='imgSlider' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="slider2.webp" alt="Slide" className='imgSlider' />
        </SwiperSlide>
        <SwiperSlide>
            <img src="slider3.webp" alt="Slide" className='imgSlider' />
        </SwiperSlide>
         <SwiperSlide>
            <img src="slider4.webp" alt="Slide" className='imgSlider' />
        </SwiperSlide>
    </Swiper>
);

export default MySlider;