import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
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

    if (loading) {
        return <div className="slider-loading">Cargando...</div>;
    }

    if (imagenes.length === 0) {
        return (
            <div className="slider-fallback">
                <img src="/slider1.webp" alt="Slider" className='imgSlider' />
            </div>
        );
    }

    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={false}
            loop={false}
        >
            {imagenes.map((imagen, index) => (
                <SwiperSlide key={imagen.id}>
                    {imagen.urlImagen ? (
                        <a href={imagen.urlImagen} target="_blank" rel="noopener noreferrer">
                            <img 
                                src={imagen.photoName} 
                                alt={`Slide ${index + 1}`} 
                                className='imgSlider'
                            />
                        </a>
                    ) : (
                        <img 
                            src={imagen.photoName} 
                            alt={`Slide ${index + 1}`} 
                            className='imgSlider'
                        />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MySlider;