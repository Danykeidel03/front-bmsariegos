import React, { useState, useEffect } from "react";
import './SlideNoticias.css';
import apiNotice from "../../services/apiNotice";
import { useNavigate } from 'react-router-dom';

export default function SlideNoticias() {
    const [modal, setModal] = useState(null);
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleNoticiaClick = (noticia) => {
        navigate(`/noticias?id=${noticia._id}`);
    };

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const data = await apiNotice.getNotices();
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
        <div className="slideNotices">
            <div className="noticesContainer">
                {loading ? (
                    <p>Cargando noticias...</p>
                ) : (
                    noticias.map((noticia, idx) => (
                    <div className="noticeCard" key={idx} onClick={() => handleNoticiaClick(noticia)}>
                        <img src={noticia.photoName} alt={noticia.title} />
                        <h3>{noticia.title}</h3>
                    </div>
                    ))
                )}
            </div>
            {modal && (
                <div onClick={() => setModal(null)} className="modalNotice">
                    <div className="overlayModal" />
                    <div onClick={(e) => e.stopPropagation()} className="infoNotice">
                        <div className="infoNotice-content">
                            <button onClick={() => setModal(null)} aria-label="Cerrar">X</button>
                            <img src={modal.photoName} alt={modal.title} />
                            <div className="content">
                                <h2>{modal.title}</h2>
                                <p dangerouslySetInnerHTML={{ __html: modal.descripcion.replace(/\n/g, '<br>') }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
