import React, { useState, useEffect } from 'react';
import './TeamModal.css';
import Swal from 'sweetalert2';
import apiTeam from '../../services/apiTeam';

const TeamModal = ({ isOpen, onClose }) => {
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        division: ''
    });

    useEffect(() => {
        if (isOpen) {
            fetchTeams();
        }
    }, [isOpen]);

    const fetchTeams = async () => {
        try {
            const response = await apiTeam.getTeams();
            const teamsData = Array.isArray(response.data.data) ? response.data.data : [];
            setTeams(teamsData);
        } catch (error) {
            console.log(error);
            setTeams([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await apiTeam.createTeam(formData);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Equipo creado correctamente'
            });
            setFormData({ name: '', category: '', division: '' });
            fetchTeams();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear el equipo'
            });
        }
    };

    const handleDelete = async (teamId) => {
        try {
            await apiTeam.deleteTeam(teamId);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Equipo eliminado correctamente'
            });
            fetchTeams();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el equipo'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content team-modal">
                <div className="modal-header">
                    <h2>Gestión de Equipos</h2>
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
                        <label htmlFor="category">Categoría:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="division">División:</label>
                        <input
                            type="text"
                            id="division"
                            name="division"
                            value={formData.division}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">
                        Crear Equipo
                    </button>
                </form>

                <div className="teams-list">
                    <h3>Equipos Existentes</h3>
                    {!Array.isArray(teams) || teams.length === 0 ? (
                        <p>No hay equipos creados</p>
                    ) : (
                        teams.map(team => (
                            <div key={team._id} className="team-item">
                                <div className="team-info">
                                    <strong>{team.name}</strong>
                                    <span>{team.category} - {team.division}</span>
                                </div>
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDelete(team._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamModal;