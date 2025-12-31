import React, { useState, useEffect } from 'react';
import { loadCSS } from '../../utils/lazyLoadCSS';

const RivalModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        photo: null
    });
    const [cssLoaded, setCssLoaded] = useState(false);

    useEffect(() => {
        if (isOpen && !cssLoaded) {
            Promise.all([
                loadCSS('/src/styles/modals-responsive.css', 'modals-responsive'),
                loadCSS('/src/components/RivalModal/RivalModal.css', 'rival-modal')
            ]).then(() => setCssLoaded(true));
        }
    }, [isOpen, cssLoaded]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            photo: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', photo: null });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Crear Equipo Rival</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Equipo:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="photo">Logo del Equipo:</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancelar
                        </button>
                        <button type="submit" className="submit-btn">
                            Crear Rival
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RivalModal;