import React, { useState, useEffect } from 'react';
import '../../styles/modals-responsive.css';
import './HeaderImageModal.css';
import apiImagenCabecera from '../../services/apiImagenCabecera';
import Swal from 'sweetalert2';

const HeaderImageModal = ({ isOpen, onClose }) => {
    const [imagenes, setImagenes] = useState([]);
    const [formData, setFormData] = useState({
        photo: null,
        urlImagen: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchImagenes();
        }
    }, [isOpen]);

    const fetchImagenes = async () => {
        try {
            const response = await apiImagenCabecera.getImagenesCabecera();
            setImagenes(response.data.data || []);
        } catch (error) {
            console.error('Error al cargar imágenes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.photo) {
            Swal.fire('Error', 'Selecciona una imagen', 'error');
            return;
        }

        setLoading(true);
        const data = new FormData();
        data.append('photo', formData.photo);
        data.append('urlImagen', formData.urlImagen);

        try {
            await apiImagenCabecera.createImagenCabecera(data);
            Swal.fire('Éxito', 'Imagen añadida correctamente', 'success');
            setFormData({ photo: null, urlImagen: '' });
            fetchImagenes();
        } catch (error) {
            Swal.fire('Error', 'No se pudo añadir la imagen', 'error');
        } finally {
            setLoading(false);
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
                await apiImagenCabecera.deleteImagenCabecera(id);
                Swal.fire('Eliminado', 'Imagen eliminada correctamente', 'success');
                fetchImagenes();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar la imagen', 'error');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content header-image-modal">
                <div className="modal-header">
                    <h2>Gestión de Imágenes del Slider</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="header-image-form">
                    <div className="form-group">
                        <label>Imagen:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({...formData, photo: e.target.files[0]})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>URL de enlace (opcional):</label>
                        <input
                            type="url"
                            value={formData.urlImagen}
                            onChange={(e) => setFormData({...formData, urlImagen: e.target.value})}
                            placeholder="https://ejemplo.com"
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Añadiendo...' : 'Añadir Imagen'}
                    </button>
                </form>

                <div className="images-list">
                    <h3>Imágenes actuales:</h3>
                    {imagenes.length === 0 ? (
                        <p>No hay imágenes</p>
                    ) : (
                        <div className="images-grid">
                            {imagenes.map((imagen) => (
                                <div key={imagen._id} className="image-item">
                                    <img 
                                        src={imagen.imgCabecera} 
                                        alt="Slider" 
                                    />
                                    <div className="image-actions">
                                        {imagen.urlImagen && (
                                            <a href={imagen.urlImagen} target="_blank" rel="noopener noreferrer">
                                                Ver enlace
                                            </a>
                                        )}
                                        <button onClick={() => handleDelete(imagen._id)}>Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderImageModal;