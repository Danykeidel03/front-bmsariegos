import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CloudinaryImage from '../../../components/ui/CloudinaryImage/CloudinaryImage';
import './SlideNoticias.css';
import apiNotice from '../../../api/apiNotice';

export default function SlideNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <h1 className="section-title">Actualidad</h1>
        <a href="/noticias" className="view-all-news link-arrow">
          Ver todas las noticias →
        </a>
      </div>
      <div className="noticesContainer">
        {loading ? (
          // Skeleton con altura correcta para evitar shift
          <div className="noticesSkeleton">
            {[1, 2, 3].map((i) => (
              <div key={i} className="noticesSkeleton__item"></div>
            ))}
          </div>
        ) : (
          noticias.map((noticia) => (
            <Link className="noticeCard" key={noticia.slug} to={`/noticias/${noticia.slug}`}>
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
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
