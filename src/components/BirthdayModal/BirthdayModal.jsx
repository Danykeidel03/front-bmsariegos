import React, { useState } from 'react';
import './BirthdayModal.css';

const BirthdayModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        dni: '',
        birthDay: '',
        category: '',
        photo: null
    });

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
        setFormData({
            name: '',
            dni: '',
            birthDay: '',
            category: '',
            photo: null
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Añadir Cumpleaños</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="birthday-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
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
                        <label htmlFor="dni">DNI:</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthDay">Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            id="birthDay"
                            name="birthDay"
                            value={formData.birthDay}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Categoría:</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            <option value="Senior masc A">Senior masc A</option>
                            <option value="Senior masc B">Senior masc B</option>
                            <option value="Senior masc C">Senior masc C</option>
                            <option value="Senior fem">Senior fem</option>
                            <option value="Juv Fem">Juv Fem</option>
                            <option value="Juv masc">Juv masc</option>
                            <option value="Cadete masc A">Cadete masc A</option>
                            <option value="Cadete masc B">Cadete masc B</option>
                            <option value="Cadete fem">Cadete fem</option>
                            <option value="Infantil masc A">Infantil masc A</option>
                            <option value="Infantil masc B">Infantil masc B</option>
                            <option value="Infantil Fem">Infantil Fem</option>
                            <option value="Veteranos">Veteranos</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="photo">Foto:</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
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

export default BirthdayModal;