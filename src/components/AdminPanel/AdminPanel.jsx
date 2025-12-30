import React, { useState } from 'react';
import './AdminPanel.css';
import NewsModal from '../NewsModal/NewsModal';
import BirthdayModal from '../BirthdayModal/BirthdayModal';
import SponsorModal from '../SponsorModal/SponsorModal';
import RivalModal from '../RivalModal/RivalModal';
import TeamModal from '../TeamModal/TeamModal';
import MatchModal from '../MatchModal/MatchModal';
import HeaderImageModal from '../HeaderImageModal/HeaderImageModal';
import apiNotice from '../../services/apiNotice';
import apiBirthday from '../../services/apiBirthday';
import apiSponsor from '../../services/apiSponsor';
import apiRival from '../../services/apiRival';
import Swal from 'sweetalert2';

const AdminPanel = ({ onLogout }) => {
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [isBirthdayModalOpen, setIsBirthdayModalOpen] = useState(false);
    const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
    const [isRivalModalOpen, setIsRivalModalOpen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
    const [isHeaderImageModalOpen, setIsHeaderImageModalOpen] = useState(false);

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
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo añadir el cumpleaños'
            });
        }
    };

    const handleSponsorSubmit = async (formData) => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('photo', formData.logo);

        console.log(data);

        try {
            await apiSponsor.createSponsor(data);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Patrocinador añadido correctamente'
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo añadir el patrocinador'
            });
        }
    };

    const handleRivalSubmit = async (formData) => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('photo', formData.photo);

        try {
            await apiRival.createRival(data);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Equipo rival creado correctamente'
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear el equipo rival'
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
                        <h3>Gestión de Jugadores</h3>
                        <p>Administrar jugadores</p>
                        <button className="card-btn" onClick={() => setIsBirthdayModalOpen(true)}>Gestionar</button>
                    </div>
                    
                    <div className="admin-card">
                        <h3>Gestión de Patrocinadores</h3>
                        <p>Añadir o modificar logos de patrocinadores</p>
                        <button className="card-btn" onClick={() => setIsSponsorModalOpen(true)}>Gestionar</button>
                    </div>
                    
                    <div className="admin-card">
                        <h3>Gestión de Rivales</h3>
                        <p>Crear y administrar equipos rivales</p>
                        <button className="card-btn" onClick={() => setIsRivalModalOpen(true)}>Gestionar</button>
                    </div>
                    
                    <div className="admin-card">
                        <h3>Gestión de Equipos</h3>
                        <p>Crear y administrar mis equipos</p>
                        <button className="card-btn" onClick={() => setIsTeamModalOpen(true)}>Gestionar</button>
                    </div>
                    
                    <div className="admin-card">
                        <h3>Gestión de Partidos</h3>
                        <p>Crear partidos y finalizar con resultados</p>
                        <button className="card-btn" onClick={() => setIsMatchModalOpen(true)}>Gestionar</button>
                    </div>
                    
                    <div className="admin-card">
                        <h3>Imágenes del Slider</h3>
                        <p>Gestionar imágenes de la cabecera principal</p>
                        <button className="card-btn" onClick={() => setIsHeaderImageModalOpen(true)}>Gestionar</button>
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
            
            <SponsorModal 
                isOpen={isSponsorModalOpen}
                onClose={() => setIsSponsorModalOpen(false)}
                onSubmit={handleSponsorSubmit}
            />
            
            <RivalModal 
                isOpen={isRivalModalOpen}
                onClose={() => setIsRivalModalOpen(false)}
                onSubmit={handleRivalSubmit}
            />
            
            <TeamModal 
                isOpen={isTeamModalOpen}
                onClose={() => setIsTeamModalOpen(false)}
            />
            
            <MatchModal 
                isOpen={isMatchModalOpen}
                onClose={() => setIsMatchModalOpen(false)}
            />
            
            <HeaderImageModal 
                isOpen={isHeaderImageModalOpen}
                onClose={() => setIsHeaderImageModalOpen(false)}
            />
        </div>
    );
};

export default AdminPanel;