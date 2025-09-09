import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Slider.css';
import apiImagenCabecera from 'src/services/apiImagenCabecera';

const MySlider = () => {
    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImagenes = async () => {
            try {
                const response = await apiImagenCabecera.getImagenesCabecera();
                console.log('getImagenesCabecera response:', response);
                console.log('response.data:', response.data);
                console.log('response.data.data:', response.data.data);
                console.log('Array length:', response.data.data?.length);
                const imagenesData = response.data.data || response.data || [];
                console.log('imagenesData:', imagenesData);
                setImagenes(imagenesData);
            } catch (error) {
                console.error('Error al cargar imágenes del slider:', error);
                console.error('Error details:', error.response?.data);
            } finally {
                setLoading(false);
            }
        };
        fetchImagenes();
    }, []);

    if (loading) {
        return <div className="slider-loading">Cargando...</div>;
    }

    console.log('Final imagenes state:', imagenes);
    console.log('imagenes.length:', imagenes.length);

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
                                src={imagen.imgCabecera} 
                                alt={`Slide ${index + 1}`} 
                                className='imgSlider'
                            />
                        </a>
                    ) : (
                        <img 
                            src={imagen.imgCabecera} 
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