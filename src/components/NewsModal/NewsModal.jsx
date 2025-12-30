import React, { useState, useEffect } from 'react';
import '../../styles/modals-responsive.css';
import './NewsModal.css';
import apiNotice from '../../services/apiNotice';
import Swal from 'sweetalert2';

const NewsModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        photo: null
    });
    const [notices, setNotices] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchNotices();
        }
    }, [isOpen]);

    const fetchNotices = async () => {
        try {
            const response = await apiNotice.getAllNotices();
            setNotices(response.data.data || []);
        } catch (error) {
            // Error silenciado
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await apiNotice.deleteNotice(id);
                await fetchNotices();
                Swal.fire('Eliminado', 'La noticia ha sido eliminada', 'success');
            } catch {
                Swal.fire('Error', 'No se pudo eliminar la noticia', 'error');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData);
        setFormData({ titulo: '', descripcion: '', photo: null });
        setShowForm(false);
        await fetchNotices();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Gestión de Noticias</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                {!showForm ? (
                    <div className="news-list">
                        <div className="list-header">
                            <h3>Noticias Existentes</h3>
                            <button className="add-btn" onClick={() => setShowForm(true)}>Añadir Nueva</button>
                        </div>
                        <div className="notices-grid">
                            {notices.map((notice) => (
                                <div key={notice._id} className="notice-item">
                                    <h4>{notice.title}</h4>
                                    <p>{notice.descripcion.substring(0, 100)}...</p>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(notice._id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <form className="news-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Foto</label>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            accept="image/*"
                            required
                        />
                    </div>
                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                                Cancelar
                            </button>
                            <button type="submit" className="submit-btn">
                                Guardar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default NewsModal;