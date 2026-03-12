import { useState, useEffect, startTransition } from 'react';
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
                // Set a timeout: if API doesn't respond in 3 seconds, show fallback
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), 3000)
                );
                
                const response = await Promise.race([
                    apiImagenCabecera.getImagenesCabecera(),
                    timeoutPromise
                ]);
                
                // Use startTransition to avoid blocking render
                startTransition(() => {
                    setImagenes(response.data.data || []);
                });
            } catch {
                // Error silenciado - mostrar fallback
                startTransition(() => {
                    setImagenes([]);
                });
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

    // Mientras carga, mostrar skeleton con altura reservada
    if (loading) {
        return (
            <div className="slider-loading">
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'loading 1.5s infinite'
                }}></div>
            </div>
        );
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