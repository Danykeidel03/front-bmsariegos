import React, { useState, useEffect } from 'react';

import '../../../styles/modals-responsive.css';
import './HeaderImageModal.css';
import { loadSweetAlert } from '../../../utils/lazyLoadLibraries';
import apiImagenCabecera from '../../../api/apiImagenCabecera';

const HeaderImageModal = ({ isOpen, onClose }) => {
  const [imagenes, setImagenes] = useState([]);
  const [formData, setFormData] = useState({
    photoDesktop: null,
    photoMobile: null,
    urlImagen: '',
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
    } catch {
      // Error silenciado
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.photoDesktop || !formData.photoMobile) {
      const Swal = await loadSweetAlert();
      Swal.fire('Error', 'Selecciona la imagen de escritorio y la de móvil', 'error');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('photoDesktop', formData.photoDesktop);
    data.append('photoMobile', formData.photoMobile);
    data.append('urlImagen', formData.urlImagen);

    try {
      await apiImagenCabecera.createImagenCabecera(data);
      const Swal = await loadSweetAlert();
      Swal.fire('Éxito', 'Imagen añadida correctamente', 'success');
      setFormData({ photoDesktop: null, photoMobile: null, urlImagen: '' });
      fetchImagenes();
    } catch {
      const Swal = await loadSweetAlert();
      Swal.fire('Error', 'No se pudo añadir la imagen', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const Swal = await loadSweetAlert();
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await apiImagenCabecera.deleteImagenCabecera(id);
        Swal.fire('Eliminado', 'Imagen eliminada correctamente', 'success');
        fetchImagenes();
      } catch {
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
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="header-image-form">
          <div className="form-group">
            <label>Imagen para escritorio (recomendado 2000×700px):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, photoDesktop: e.target.files[0] })}
              required
            />
          </div>
          <div className="form-group">
            <label>Imagen para móvil (recomendado 1200×1200px, cuadrada):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, photoMobile: e.target.files[0] })}
              required
            />
          </div>
          <div className="form-group">
            <label>URL de enlace (opcional):</label>
            <input
              type="url"
              value={formData.urlImagen}
              onChange={(e) => setFormData({ ...formData, urlImagen: e.target.value })}
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
                  <div className="image-item-photos">
                    <div>
                      <img src={imagen.imgCabecera} alt="Slider (escritorio)" />
                      <span className="image-item-label">Escritorio</span>
                    </div>
                    <div>
                      <img
                        src={imagen.imgCabeceraMobile || imagen.imgCabecera}
                        alt="Slider (móvil)"
                      />
                      <span className="image-item-label">Móvil</span>
                    </div>
                  </div>
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
