import React, { useState, useEffect } from 'react';
import '../../styles/modals-responsive.css';
import './SponsorModal.css';

const SponsorModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        logo: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', logo: null });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Gestión de Patrocinadores</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <form className="sponsor-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre del Patrocinador</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Logo</label>
                        <input
                            type="file"
                            name="logo"
                            onChange={handleChange}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="submit-btn">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SponsorModal;