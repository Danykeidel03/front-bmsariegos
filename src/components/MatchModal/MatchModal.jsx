import React, { useState, useEffect, useRef } from 'react';
import { loadCSS } from '../../utils/lazyLoadCSS';
import { loadSweetAlert, showConfirm } from '../../utils/lazyLoadLibraries';
import apiMatch from '../../services/apiMatch';
import apiRival from '../../services/apiRival';
import apiTeam from '../../services/apiTeam';
import 'MatchModal.css';

const MatchModal = ({ isOpen, onClose }) => {
    const [matches, setMatches] = useState([]);
    const [rivals, setRivals] = useState([]);
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        rivalTeam: '',
        ownTeam: '',
        date: '',
        time: '',
        location: 'PABELLÓN MUNICIPAL DE SARIEGOS',
        isHome: true
    });
    const [editingMatch, setEditingMatch] = useState(null);
    const [editDateTime, setEditDateTime] = useState({ date: '', time: '' });
    const [rivalSearch, setRivalSearch] = useState('');
    const [showRivalDropdown, setShowRivalDropdown] = useState(false);
    const [matchSearch, setMatchSearch] = useState('');
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [cssLoaded, setCssLoaded] = useState(false);
    const rivalSelectorRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            loadMatches();
            loadRivals();
            loadTeams();
        }
    }, [isOpen, cssLoaded]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (rivalSelectorRef.current && !rivalSelectorRef.current.contains(event.target)) {
                setShowRivalDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const loadMatches = async () => {
        try {
            const [matchesResponse, rivalsResponse, teamsResponse] = await Promise.all([
                apiMatch.getAllMatches(),
                apiRival.getAllRivals(),
                apiTeam.getTeams()
            ]);
            
            const matchesData = matchesResponse.data.data;
            const rivalsData = rivalsResponse.data.data;
            const teamsData = teamsResponse.data.data;
            
            const matchesWithInfo = matchesData.map(match => {
                const rivalInfo = rivalsData.find(rival => rival._id === match.rivalTeam);
                const ownTeamInfo = teamsData.find(team => team._id === match.ownTeam);
                return {
                    ...match,
                    rivalTeam: rivalInfo || match.rivalTeam,
                    ownTeam: ownTeamInfo || match.ownTeam
                };
            });
            
            setMatches(matchesWithInfo);
            setFilteredMatches(matchesWithInfo);
        } catch {
            // Error silenciado
        }
    };

    const loadRivals = async () => {
        try {
            const response = await apiRival.getAllRivals();
            setRivals(response.data.data);
        } catch {
            // Error silenciado
        }
    };

    const loadTeams = async () => {
        try {
            const response = await apiTeam.getTeams();
            setTeams(response.data.data);
        } catch {
            // Error silenciado
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiMatch.createMatch(formData);
            const Swal = await loadSweetAlert();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Partido creado correctamente'
            });
            setFormData({ rivalTeam: '', ownTeam: '', date: '', time: '', location: 'PABELLÓN MUNICIPAL DE SARIEGOS', isHome: true });
            setRivalSearch('');
            loadMatches();
        } catch {
            const Swal = await loadSweetAlert();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear el partido'
            });
        }
    };

    const handleEditDateTime = async (matchId) => {
        const match = matches.find(m => m._id === matchId);
        setEditingMatch(matchId);
        setEditDateTime({
            date: match.date.split('T')[0],
            time: match.time
        });
    };

    const handleUpdateDateTime = async () => {
        try {
            await apiMatch.updateMatchDateTime(editingMatch, editDateTime);
            const Swal = await loadSweetAlert();
            Swal.fire({
                icon: 'success',
                title: 'Fecha actualizada',
                text: 'La fecha y hora se han actualizado correctamente'
            });
            setEditingMatch(null);
            loadMatches();
        } catch {
            const Swal = await loadSweetAlert();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la fecha y hora'
            });
        }
    };

    const handleFinalize = async (matchId) => {
        const Swal = await loadSweetAlert();
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
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo finalizar el partido'
                });
            }
        }
    };

    const handleDelete = async (matchId) => {
        const Swal = await loadSweetAlert();
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
                await apiMatch.deleteMatch(matchId);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'Partido eliminado correctamente'
                });
                loadMatches();
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el partido'
                });
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="match-modal">
            <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Gestión de Partidos</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="match-sections">
                        <div className="create-section">
                            <h3>Crear Nuevo Partido</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="rival-selector" ref={rivalSelectorRef}>
                                    <input
                                        type="text"
                                        placeholder="Buscar rival..."
                                        value={rivalSearch}
                                        onChange={(e) => {
                                            setRivalSearch(e.target.value);
                                            setShowRivalDropdown(true);
                                        }}
                                        onFocus={() => setShowRivalDropdown(true)}
                                        required={!formData.rivalTeam}
                                    />
                                    {showRivalDropdown && (
                                        <div className="rival-dropdown">
                                            {rivals
                                                .filter(rival => rival.name.toLowerCase().includes(rivalSearch.toLowerCase()))
                                                .slice(0, 10)
                                                .map(rival => (
                                                    <div
                                                        key={rival._id}
                                                        className="rival-option"
                                                        onClick={() => {
                                                            setFormData({...formData, rivalTeam: rival._id});
                                                            setRivalSearch(rival.name);
                                                            setShowRivalDropdown(false);
                                                        }}
                                                    >
                                                        {rival.name}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )}
                                </div>

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

                                <div className="home-away-selector">
                                    <label>
                                        <input
                                            type="radio"
                                            name="isHome"
                                            checked={formData.isHome === true}
                                            onChange={() => setFormData({...formData, isHome: true, location: 'PABELLÓN MUNICIPAL DE SARIEGOS'})}
                                        />
                                        Local
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="isHome"
                                            checked={formData.isHome === false}
                                            onChange={() => setFormData({...formData, isHome: false, location: ''})}
                                        />
                                        Suplente
                                    </label>
                                </div>

                                <button type="submit" className="submit-btn">Crear Partido</button>
                            </form>
                        </div>

                        <div className="matches-section">
                            <h3>Partidos Programados</h3>
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Buscar partidos..."
                                    value={matchSearch}
                                    onChange={(e) => {
                                        const term = e.target.value.toLowerCase();
                                        setMatchSearch(term);
                                        const filtered = matches.filter(match => 
                                            match.rivalTeam?.name?.toLowerCase().includes(term) ||
                                            match.ownTeam?.name?.toLowerCase().includes(term) ||
                                            match.location?.toLowerCase().includes(term)
                                        );
                                        setFilteredMatches(filtered);
                                    }}
                                    className="search-input"
                                />
                            </div>
                            <div className="matches-list">
                                {filteredMatches.map(match => (
                                    <div key={match._id} className="game-item">
                                        <div className="game-content">
                                            <div className="game-rival-image">
                                                {match.rivalTeam?.photoName && (
                                                    <img 
                                                        src={match.rivalTeam.photoName} 
                                                        alt={`Escudo ${match.rivalTeam.name}`}
                                                        className="rival-logo"
                                                    />
                                                )}
                                            </div>
                                            <div className="game-details">
                                                <p><strong>Equipo:</strong> {match.ownTeam?.name || 'N/A'}</p>
                                                <p><strong>Rival:</strong> {match.rivalTeam?.name || 'N/A'}</p>
                                                <p><strong>Tipo:</strong> {match.isHome ? 'Local' : 'Suplente'}</p>
                                                {editingMatch === match._id ? (
                                                    <div className="edit-datetime">
                                                        <input
                                                            type="date"
                                                            value={editDateTime.date}
                                                            onChange={(e) => setEditDateTime({...editDateTime, date: e.target.value})}
                                                        />
                                                        <input
                                                            type="time"
                                                            value={editDateTime.time}
                                                            onChange={(e) => setEditDateTime({...editDateTime, time: e.target.value})}
                                                        />
                                                        <button onClick={handleUpdateDateTime} className="save-btn">Guardar</button>
                                                        <button onClick={() => setEditingMatch(null)} className="cancel-btn">Cancelar</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p><strong>Fecha:</strong> {new Date(match.date).toLocaleDateString('es-ES').replace(/\//g, '-')}</p>
                                                        <p><strong>Hora:</strong> {match.time}</p>
                                                    </>
                                                )}
                                                <p><strong>Lugar:</strong> {match.location}</p>
                                                {match.result && <p><strong>Resultado:</strong> {match.result}</p>}
                                            </div>
                                        </div>
                                        <div className="game-actions">
                                            {match.completed !== 1 && (
                                                <>
                                                    <button 
                                                        className="edit-btn"
                                                        onClick={() => handleEditDateTime(match._id)}
                                                    >
                                                        Editar Fecha
                                                    </button>
                                                    <button 
                                                        className="finalize-btn"
                                                        onClick={() => handleFinalize(match._id)}
                                                    >
                                                        Finalizar
                                                    </button>
                                                </>
                                            )}
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(match._id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default MatchModal;