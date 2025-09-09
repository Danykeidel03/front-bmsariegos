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
                console.log('Fetching imagenes cabecera...');
                const response = await apiImagenCabecera.getImagenesCabecera();
                console.log('Full response:', response);
                console.log('response.data:', response.data);
                console.log('response.data.data:', response.data.data);
                const imagenesData = response.data.data || response.data || [];
                console.log('imagenesData:', imagenesData);
                console.log('imagenesData length:', imagenesData.length);
                if (imagenesData.length > 0) {
                    console.log('First image:', imagenesData[0]);
                    console.log('Image properties:', Object.keys(imagenesData[0]));
                }
                setImagenes(imagenesData);
            } catch (error) {
                console.error('Error al cargar imágenes del slider:', error);
                console.error('Error response:', error.response);
            } finally {
                setLoading(false);
            }
        };
        fetchImagenes();
    }, []);

    if (loading) {
        return <div className="slider-loading">Cargando...</div>;
    }

    console.log('Rendering with imagenes:', imagenes);
    console.log('imagenes.length:', imagenes.length);

    if (imagenes.length === 0) {
        console.log('No images found, showing fallback');
        return (
            <div className="slider-fallback">
                <img src="/slider1.webp" alt="Slider" className='imgSlider' />
            </div>
        );
    }

    console.log('Rendering swiper with images');

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