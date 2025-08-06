import React, { useState } from 'react';
import './AdminPanel.css';
import NewsModal from '../NewsModal/NewsModal';
import BirthdayModal from '../BirthdayModal/BirthdayModal';
import apiNotice from '../../services/apiNotice';
import apiBirthday from '../../services/apiBirthday';
import Swal from 'sweetalert2';

const AdminPanel = ({ onLogout }) => {
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [isBirthdayModalOpen, setIsBirthdayModalOpen] = useState(false);

    const handleNewsSubmit = async (formData) => {
        const data = new FormData();
        data.append('title', formData.titulo);
        data.append('descripcion', formData.descripcion);
        data.append('photo', formData.photo);

        try {
            await apiNotice.createNotice(data);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Noticia creada correctamente'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear la noticia'
            });
        }
    };

    const handleBirthdaySubmit = async (formData) => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('dni', formData.dni);
        data.append('birthDay', formData.birthDay);
        data.append('category', formData.category);
        data.append('photo', formData.photo);

        try {
            await apiBirthday.createBirthday(data);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Cumpleaños añadido correctamente'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo añadir el cumpleaños'
            });
        }
    };
    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1 className="admin-title">Panel de Administración</h1>
                <button className="logout-btn" onClick={onLogout}>
                    Cerrar Sesión
                </button>
            </div>
            
            <div className="admin-content">
                <div className="admin-grid">
                    <div className="admin-card">
                        <h3>Gestión de Noticias</h3>
                        <p>Crear, editar y eliminar noticias del sitio web</p>
                        <button className="card-btn" onClick={() => setIsNewsModalOpen(true)}>Gestionar</button>
                    </div>
                    
                    <div className="admin-card">
                        <h3>Gestión de Cumpleaños</h3>
                        <p>Administrar fechas de cumpleaños de los miembros</p>
                        <button className="card-btn" onClick={() => setIsBirthdayModalOpen(true)}>Gestionar</button>
                    </div>
                    
                    <div className="admin-card">
                        <h3>Gestión de Patrocinadores</h3>
                        <p>Añadir o modificar logos de patrocinadores</p>
                        <button className="card-btn">Gestionar</button>
                    </div>
                    
                    <div className="admin-card">
                        <h3>Configuración del Sitio</h3>
                        <p>Ajustes generales y configuración</p>
                        <button className="card-btn">Configurar</button>
                    </div>
                </div>
            </div>
            
            <NewsModal 
                isOpen={isNewsModalOpen}
                onClose={() => setIsNewsModalOpen(false)}
                onSubmit={handleNewsSubmit}
            />
            
            <BirthdayModal 
                isOpen={isBirthdayModalOpen}
                onClose={() => setIsBirthdayModalOpen(false)}
                onSubmit={handleBirthdaySubmit}
            />
        </div>
    );
};

export default AdminPanel;