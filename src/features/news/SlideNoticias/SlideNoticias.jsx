import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloudinaryImage from '../../../components/ui/CloudinaryImage/CloudinaryImage';
import './SlideNoticias.css';
import apiNotice from '../../../api/apiNotice';
import { sanitizeWithLineBreaks } from '../../../utils/sanitize';

export default function SlideNoticias() {
  const [modal, setModal] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNoticiaClick = (noticia) => {
    console.log('Modal completo:', noticia);
    setModal(noticia);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModal(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const data = await apiNotice.getNotices();
        setNoticias(data.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticias();
  }, []);
  return (
    <div className="slideNotices">
      <div className="slideNotices-header">
        <h1>ACTUALIDAD</h1>
        <a href="/noticias" className="view-all-news">
          Ver todas las noticias →
        </a>
      </div>
      <div className="noticesContainer">
        {loading ? (
          // Skeleton con altura correcta para evitar shift
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(356px, 1fr))',
              gap: '20px',
              width: '100%',
              justifyItems: 'center',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: '356px',
                  height: '300px',
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite',
                  borderRadius: '8px',
                }}
              ></div>
            ))}
          </div>
        ) : (
          noticias.map((noticia, idx) => (
            <button
              className="noticeCard"
              key={idx}
              onClick={() => handleNoticiaClick(noticia)}
              type="button"
            >
              <CloudinaryImage
                src={noticia.photoName}
                alt={noticia.title}
                width={356}
                height={200}
                sizes="(max-width: 768px) 100vw, 356px"
                quality="70"
                crop="fill"
              />
              <h3>{noticia.title}</h3>
            </button>
          ))
        )}
      </div>
      {modal &&
        createPortal(
          <div onClick={closeModal} className="modalNotice">
            <div className="overlayModal" />
            <div onClick={(e) => e.stopPropagation()} className="infoNotice">
              <div className="infoNotice-content">
                <button onClick={closeModal} aria-label="Cerrar">
                  X
                </button>
                <CloudinaryImage
                  src={modal.photoName}
                  alt={modal.title}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 90vw, 800px"
                  priority={true}
                  quality="80"
                />
                <div className="content">
                  <h2>{modal.title}</h2>
                  <p
                    dangerouslySetInnerHTML={{ __html: sanitizeWithLineBreaks(modal.descripcion) }}
                  ></p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
