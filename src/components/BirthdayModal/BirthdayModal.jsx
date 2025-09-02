import React, { useState, useEffect } from 'react';
import './BirthdayModal.css';
import apiTeam from '../../services/apiTeam';
import apiBirthday from '../../services/apiBirthday';
import Swal from 'sweetalert2';

const BirthdayModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        dni: '',
        birthDay: '',
        category: '',
        photo: null
    });
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamsResponse, playersResponse] = await Promise.all([
                    apiTeam.getTeams(),
                    apiBirthday.getAllPlayers()
                ]);
                setTeams(Array.isArray(teamsResponse.data.data) ? teamsResponse.data.data : []);
                setPlayers(Array.isArray(playersResponse.data.data) ? playersResponse.data.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setTeams([]);
                setPlayers([]);
            }
        };
        
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const handleEdit = (player) => {
        setEditingPlayer(player);
        setFormData({
            name: player.name,
            dni: player.dni,
            birthDay: player.birthDay.split('T')[0],
            category: player.category,
            photo: null
        });
        setShowForm(true);
    };

    const fetchPlayers = async () => {
        try {
            const response = await apiBirthday.getAllPlayers();
            setPlayers(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingPlayer) {
                const data = new FormData();
                data.append('name', formData.name);
                data.append('dni', formData.dni);
                data.append('birthDay', formData.birthDay);
                data.append('category', formData.category);
                if (formData.photo) {
                    data.append('photo', formData.photo);
                }
                
                await apiBirthday.updateBirthday(editingPlayer._id, data);
                Swal.fire('Éxito', 'Jugador actualizado correctamente', 'success');
            } else {
                await onSubmit(formData);
            }
            
            setFormData({
                name: '',
                dni: '',
                birthDay: '',
                category: '',
                photo: null
            });
            setEditingPlayer(null);
            setShowForm(false);
            await fetchPlayers();
        } catch (error) {
            Swal.fire('Error', 'No se pudo guardar el jugador', 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Gestión de Jugadores</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                {!showForm ? (
                    <div className="players-list">
                        <div className="list-header">
                            <h3>Jugadores Existentes</h3>
                            <button className="add-btn" onClick={() => setShowForm(true)}>Añadir Nuevo</button>
                        </div>
                        <div className="players-grid">
                            {players.map((player) => (
                                <div key={player._id} className="player-item">
                                    <h4>{player.name}</h4>
                                    <p>DNI: {player.dni}</p>
                                    <p>Categoría: {player.category}</p>
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => handleEdit(player)}
                                    >
                                        Editar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
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
                            {teams.map((team, index) => (
                                <option key={index} value={team.name}>
                                    {team.name}
                                </option>
                            ))}
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
                            <button type="button" onClick={() => {
                                setShowForm(false);
                                setEditingPlayer(null);
                                setFormData({
                                    name: '',
                                    dni: '',
                                    birthDay: '',
                                    category: '',
                                    photo: null
                                });
                            }} className="cancel-btn">
                                Cancelar
                            </button>
                            <button type="submit" className="submit-btn">
                                {editingPlayer ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BirthdayModal;