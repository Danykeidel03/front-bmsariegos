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
                console.error('Error al cargar imágenes del slider:', error);
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
                    width={721}
                    height={721}
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 721px"
                />
            </div>
        );
    }

    return (
        <Swiper
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
                                width={721}
                                height={721}
                                priority={index === 0}
                                quality={index === 0 ? 50 : 25}
                                sizes="(max-width: 768px) 100vw, 721px"
                            />
                        </a>
                    ) : (
                        <OptimizedImage 
                            src={imagen.imgCabecera} 
                            alt={`Slide ${index + 1}`} 
                            className='imgSlider'
                            width={721}
                            height={721}
                            priority={index === 0}
                            quality={index === 0 ? 50 : 25}
                            sizes="(max-width: 768px) 100vw, 721px"
                        />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MySlider;