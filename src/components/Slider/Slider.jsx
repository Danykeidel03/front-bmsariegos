import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import LocalOptimizedImage from '../LocalOptimizedImage/LocalOptimizedImage';
import 'swiper/css';
import 'swiper/css/pagination';
import './Slider.css';
import apiImagenCabecera from '../../services/apiImagenCabecera';

const MySlider = () => {
    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImagenes = async () => {
            try {
                const response = await apiImagenCabecera.getImagenesCabecera();
                setImagenes(response.data.data || []);
            } catch (error) {
                // Error silenciado
            } finally {
                setLoading(false);
            }
        };
        fetchImagenes();
    }, []);

    useEffect(() => {
        // Ocultar imagen HTML cuando React carga
        const htmlImg = document.querySelector('#root > img');
        if (htmlImg && !loading) {
            htmlImg.style.display = 'none';
        }
    }, [loading]);

    if (loading) {
        return null;
    }

    if (imagenes.length === 0) {
        return (
            <div className="slider-fallback">
                <LocalOptimizedImage 
                    src="/slider1.webp" 
                    alt="Slider" 
                    className='imgSlider'
                    width={2000}
                    height={700}
                    priority={true}
                    sizes="100vw"
                />
            </div>
        );
    }

    return (
        <Swiper
            className="hero-swiper"
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            lazy={true}
            preloadImages={false}
            updateOnWindowResize={true}
        >
            {imagenes.map((imagen, index) => (
                <SwiperSlide key={imagen._id}>
                    {imagen.urlImagen ? (
                        <a href={imagen.urlImagen} target="_blank" rel="noopener noreferrer">
                            <OptimizedImage 
                                src={imagen.imgCabecera} 
                                alt={`Slide ${index + 1}`} 
                                className='imgSlider'
                                width={2000}
                                height={700}
                                priority={index === 0}
                                quality={index === 0 ? 50 : 25}
                                sizes="100vw"
                            />
                        </a>
                    ) : (
                        <OptimizedImage 
                            src={imagen.imgCabecera} 
                            alt={`Slide ${index + 1}`} 
                            className='imgSlider'
                            width={2000}
                            height={700}
                            priority={index === 0}
                            quality={index === 0 ? 50 : 25}
                            sizes="100vw"
                        />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MySlider;