import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './News.css';
import apiNotice from '../../services/apiNotice';
import SEO from '../../components/SEO/SEO';

const News = () => {
    const [modal, setModal] = useState(null);
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleNoticiaClick = (noticia) => {
        setModal(noticia);
        setTimeout(() => {
            window.scrollTo({
                top: window.innerHeight / 4,
                behavior: 'smooth'
            });
        }, 50);
    };

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const data = await apiNotice.getAllNotices();
                setNoticias(data.data.data);
            } catch (error) {
                console.error('Error al cargar noticias:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNoticias();
    }, []);

    return (
        <>
            <SEO 
                title="Noticias - Balonmano Sariegos"
                description="Todas las noticias del Club de Balonmano Sariegos. Mantente al día con las últimas novedades, partidos y eventos del club."
                keywords="noticias, balonmano sariegos, actualidad, partidos, eventos, club"
            />
            <div className="news-page">
                <div className="news-header">
                    <h1>Noticias</h1>
                    <p>Mantente al día con las últimas novedades del club</p>
                </div>
                
                <div className="news-container">
                    {loading ? (
                        <div className="loading">
                            <p>Cargando noticias...</p>
                        </div>
                    ) : noticias.length === 0 ? (
                        <div className="no-news">
                            <p>No hay noticias disponibles en este momento.</p>
                        </div>
                    ) : (
                        <div className="news-grid">
                            {noticias.map((noticia, idx) => (
                                <div className="news-card" key={idx} onClick={() => handleNoticiaClick(noticia)}>
                                    <img src={noticia.photoName} alt={noticia.title} />
                                    <div className="news-content">
                                        <h3>{noticia.title}</h3>
                                        <p>{noticia.descripcion.substring(0, 150)}...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {modal && createPortal(
                    <div onClick={() => setModal(null)} className="modal-notice">
                        <div className="overlay-modal" />
                        <div onClick={(e) => e.stopPropagation()} className="info-notice">
                            <div className="info-notice-content">
                                <button onClick={() => setModal(null)} aria-label="Cerrar">×</button>
                                <img src={modal.photoName} alt={modal.title} />
                                <div className="content">
                                    <h2>{modal.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: modal.descripcion.replace(/\n/g, '<br>') }}></p>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </>
    );
};

export default News;