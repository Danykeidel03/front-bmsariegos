import React, { useState, useEffect } from 'react';
import '../../styles/modals-responsive.css';
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
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
                const playersData = Array.isArray(playersResponse.data.data) ? playersResponse.data.data : [];
                setPlayers(playersData);
                setFilteredPlayers(playersData);
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
            const playersData = Array.isArray(response.data.data) ? response.data.data : [];
            setPlayers(playersData);
            setFilteredPlayers(playersData);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = players.filter(player => 
            player.name.toLowerCase().includes(term)
        );
        setFilteredPlayers(filtered);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 10485760) { // 10MB en bytes
            Swal.fire({
                icon: 'error',
                title: 'Archivo muy grande',
                text: 'La imagen no puede superar los 10MB'
            });
            e.target.value = '';
            return;
        }
        setFormData(prev => ({
            ...prev,
            photo: file
        }));
    };



    const handleDelete = async (playerId) => {
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
                await apiBirthday.deleteBirthday(playerId);
                Swal.fire('Eliminado', 'Jugador eliminado correctamente', 'success');
                await fetchPlayers();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el jugador', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingPlayer) {
                const data = {
                    name: formData.name,
                    dni: formData.dni,
                    birthDay: formData.birthDay,
                    category: formData.category
                };
                
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
        <div className="birthday-modal modal-overlay">
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
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Buscar por nombre..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-input"
                            />
                        </div>
                        <div className="players-grid">
                            {filteredPlayers.map((player) => (
                                <div key={player._id} className="player-item">
                                    <div className="player-info">
                                        <h4>{player.name}</h4>
                                        <p>DNI: {player.dni}</p>
                                        <p>Categoría: {player.category}</p>
                                        <div className="player-actions">
                                            <button 
                                                className="edit-btn" 
                                                onClick={() => handleEdit(player)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="delete-btn" 
                                                onClick={() => handleDelete(player._id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
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
                            required={!editingPlayer}
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
                                    category: ''
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