import { useState, useEffect, startTransition } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import LocalOptimizedImage from '../LocalOptimizedImage/LocalOptimizedImage';
import 'swiper/css';
import 'swiper/css/pagination';
import './Slider.css';
import apiImagenCabecera from '../../../api/apiImagenCabecera';

const MOBILE_BREAKPOINT = 767;

const getCloudinarySrc = (originalSrc, w, quality) => {
  if (!originalSrc) return '';
  if (!originalSrc.includes('res.cloudinary.com')) return originalSrc;

  const parts = originalSrc.split('/upload/');
  if (parts.length !== 2) return originalSrc;

  const transformations = ['f_auto', `q_${quality}`, `w_${w}`, 'c_limit', 'dpr_auto'].join(',');
  return `${parts[0]}/upload/${transformations}/${parts[1]}`;
};

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
          timeoutPromise,
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
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite',
          }}
        ></div>
      </div>
    );
  }

  if (imagenes.length === 0) {
    return (
      <div className="slider-fallback">
        <LocalOptimizedImage
          src="/slider1.webp"
          alt="Slider"
          className="imgSlider"
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
      {imagenes.map((imagen, index) => {
        const quality = index === 0 ? 50 : 25;
        const mobileSrc = imagen.imgCabeceraMobile || imagen.imgCabecera;

        const picture = (
          <picture>
            <source
              media={`(max-width: ${MOBILE_BREAKPOINT}px)`}
              srcSet={getCloudinarySrc(mobileSrc, 1080, quality)}
            />
            <source
              media={`(min-width: ${MOBILE_BREAKPOINT + 1}px)`}
              srcSet={getCloudinarySrc(imagen.imgCabecera, 2000, quality)}
            />
            <img
              src={getCloudinarySrc(imagen.imgCabecera, 2000, quality)}
              alt={`Slide ${index + 1}`}
              className="imgSlider"
              width={2000}
              height={700}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </picture>
        );

        return (
          <SwiperSlide key={imagen._id}>
            {imagen.urlImagen ? (
              <a href={imagen.urlImagen} target="_blank" rel="noopener noreferrer">
                {picture}
              </a>
            ) : (
              picture
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MySlider;
