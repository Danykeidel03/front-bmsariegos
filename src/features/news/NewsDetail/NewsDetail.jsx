import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './NewsDetail.css';
import apiNotice from '../../../api/apiNotice';
import SEO from '../../../components/ui/SEO/SEO';
import { sanitizeWithLineBreaks, stripHTML } from '../../../utils/sanitize';

const NewsDetail = () => {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setNoticia(null);

    const fetchNoticia = async () => {
      try {
        const { data } = await apiNotice.getNoticeBySlug(slug);
        setNoticia(data.data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticia();
  }, [slug]);

  if (loading) {
    return (
      <div className="news-detail-page">
        <div className="news-detail-status">
          <p>Cargando noticia...</p>
        </div>
      </div>
    );
  }

  if (notFound || !noticia) {
    return (
      <div className="news-detail-page">
        <SEO
          title="Noticia no encontrada - Balonmano Sariegos"
          description="La noticia que buscas no existe o ha sido eliminada."
        />
        <div className="news-detail-status">
          <p>Esta noticia no existe o ha sido eliminada.</p>
          <Link to="/noticias" className="back-to-news">
            ← Volver a noticias
          </Link>
        </div>
      </div>
    );
  }

  const plainDescripcion = stripHTML(noticia.descripcion);
  const metaDescription =
    plainDescripcion.length > 160 ? `${plainDescripcion.slice(0, 157)}...` : plainDescripcion;

  return (
    <>
      <SEO
        title={`${noticia.title} - Balonmano Sariegos`}
        description={metaDescription}
        keywords={`noticias, balonmano sariegos, ${noticia.title}`}
        image={noticia.photoName}
        type="article"
      />
      <article className="news-detail-page">
        <div className="news-detail-container">
          <Link to="/noticias" className="back-to-news">
            ← Volver a noticias
          </Link>
          <img className="news-detail-image" src={noticia.photoName} alt={noticia.title} />
          <h1>{noticia.title}</h1>
          <div
            className="news-detail-body"
            dangerouslySetInnerHTML={{
              __html: sanitizeWithLineBreaks(noticia.descripcion),
            }}
          />
        </div>
      </article>
    </>
  );
};

export default NewsDetail;
