import React, { useState, useEffect } from 'react';
import './MatchModal.css';
import apiMatch from '../../services/apiMatch';
import apiRival from '../../services/apiRival';
import apiTeam from '../../services/apiTeam';
import Swal from 'sweetalert2';

const MatchModal = ({ isOpen, onClose, onSubmit }) => {
    const [matches, setMatches] = useState([]);
    const [rivals, setRivals] = useState([]);
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        rivalTeam: '',
        ownTeam: '',
        date: '',
        time: '',
        location: ''
    });

    useEffect(() => {
        if (isOpen) {
            loadMatches();
            loadRivals();
            loadTeams();
        }
    }, [isOpen]);

    const loadMatches = async () => {
        try {
            const response = await apiMatch.getAllMatches();
            setMatches(response.data.data);
        } catch (error) {
            console.error('Error al cargar partidos:', error);
        }
    };

    const loadRivals = async () => {
        try {
            const response = await apiRival.getAllRivals();
            setRivals(response.data.data);
        } catch (error) {
            console.error('Error al cargar rivales:', error);
        }
    };

    const loadTeams = async () => {
        try {
            const response = await apiTeam.getTeams();
            setTeams(response.data.data);
        } catch (error) {
            console.error('Error al cargar equipos:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiMatch.createMatch(formData);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Partido creado correctamente'
            });
            setFormData({ rivalTeam: '', ownTeam: '', date: '', time: '', location: '' });
            loadMatches();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear el partido'
            });
        }
    };

    const handleFinalize = async (matchId) => {
        const { value: result } = await Swal.fire({
            title: 'Finalizar Partido',
            input: 'text',
            inputLabel: 'Resultado (ej: 2-1)',
            inputPlaceholder: 'Introduce el resultado',
            showCancelButton: true,
            confirmButtonText: 'Finalizar',
            cancelButtonText: 'Cancelar'
        });

        if (result) {
            try {
                await apiMatch.updateMatch(matchId, { result, completed: 1 });
                Swal.fire({
                    icon: 'success',
                    title: 'Partido finalizado',
                    text: `Resultado: ${result}`
                });
                loadMatches();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo finalizar el partido'
                });
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content match-modal">
                <div className="modal-header">
                    <h2>Gestión de Partidos</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="match-sections">
                        <div className="create-section">
                            <h3>Crear Nuevo Partido</h3>
                            <form onSubmit={handleSubmit}>
                                <select
                                    value={formData.rivalTeam}
                                    onChange={(e) => setFormData({...formData, rivalTeam: e.target.value})}
                                    required
                                >
                                    <option value="">Seleccionar rival</option>
                                    {rivals.map(rival => (
                                        <option key={rival._id} value={rival._id}>{rival.name}</option>
                                    ))}
                                </select>

                                <select
                                    value={formData.ownTeam}
                                    onChange={(e) => setFormData({...formData, ownTeam: e.target.value})}
                                    required
                                >
                                    <option value="">Seleccionar equipo propio</option>
                                    {teams.map(team => (
                                        <option key={team._id} value={team._id}>{team.name}</option>
                                    ))}
                                </select>

                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    required
                                />

                                <input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Ubicación"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    required
                                />

                                <button type="submit" className="submit-btn">Crear Partido</button>
                            </form>
                        </div>

                        <div className="matches-section">
                            <h3>Partidos Programados</h3>
                            <div className="matches-list">
                                {matches.map(match => (
                                    <div key={match._id} className="match-item">
                                        <div className="match-info">
                                            <p><strong>Rival:</strong> {match.rivalTeam?.name || 'N/A'}</p>
                                            <p><strong>Fecha:</strong> {match.date}</p>
                                            <p><strong>Hora:</strong> {match.time}</p>
                                            <p><strong>Lugar:</strong> {match.location}</p>
                                            {match.result && <p><strong>Resultado:</strong> {match.result}</p>}
                                        </div>
                                        {!match.completed && (
                                            <button 
                                                className="finalize-btn"
                                                onClick={() => handleFinalize(match._id)}
                                            >
                                                Finalizar
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchModal;