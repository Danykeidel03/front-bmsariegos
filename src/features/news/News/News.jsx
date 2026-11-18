import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './News.css';
import apiNotice from '../../../api/apiNotice';
import Seo from '../../../components/ui/SEO/SEO';

const News = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const data = await apiNotice.getAllNotices();
        setNoticias(data.data.data);
      } catch {
        // Error silenciado
      } finally {
        setLoading(false);
      }
    };
    void fetchNoticias();
  }, []);

  const noticiasGenerales = noticias
    .filter((n) => n.category !== 'deportiva')
    .slice()
    .reverse();
  const noticiasDeportivas = noticias
    .filter((n) => n.category === 'deportiva')
    .slice()
    .reverse();

  const renderGrid = (lista) => (
    <div className="news-grid">
      {lista.map((noticia) => (
        <Link className="news-card" key={noticia.slug} to={`/noticias/${noticia.slug}`}>
          <div className="news-card-media">
            <img src={noticia.photoName} alt={noticia.title} loading="lazy" />
          </div>
          <div className="news-content">
            <h3>{noticia.title}</h3>
            <p>{noticia.descripcion.substring(0, 150)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading">
          <p>Cargando noticias...</p>
        </div>
      );
    }
    if (noticias.length === 0) {
      return (
        <div className="no-news">
          <p>No hay noticias disponibles en este momento.</p>
        </div>
      );
    }
    return (
      <>
        <section className="news-section">
          <h2>Noticias</h2>
          {noticiasGenerales.length === 0 ? (
            <p className="no-news">No hay noticias en esta categoría.</p>
          ) : (
            renderGrid(noticiasGenerales)
          )}
        </section>

        <section className="news-section">
          <h2>Noticias Deportivas</h2>
          {noticiasDeportivas.length === 0 ? (
            <p className="no-news">No hay noticias en esta categoría.</p>
          ) : (
            renderGrid(noticiasDeportivas)
          )}
        </section>
      </>
    );
  };

  return (
    <>
      <Seo
        title="Noticias - Balonmano Sariegos"
        description="Todas las noticias del Club de Balonmano Sariegos. Mantente al día con las últimas novedades, partidos y eventos del club."
        keywords="noticias, balonmano sariegos, actualidad, partidos, eventos, club"
      />
      <div className="news-page">
        <div className="news-header">
          <h1>Noticias</h1>
          <p>Mantente al día con las últimas novedades del club</p>
        </div>

        <div className="news-container">{renderContent()}</div>
      </div>
    </>
  );
};

export default News;
