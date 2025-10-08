import { useState, useEffect } from 'react';
import apiTeam from '../../services/apiTeam';
import apiBirthday from '../../services/apiBirthday';
import apiClasificaciones from '../../services/apiClasificaciones';
import apiMatch from '../../services/apiMatch';
import apiRival from '../../services/apiRival';
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage';
import './Teams.css';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [clasificaciones, setClasificaciones] = useState({});
    const [matches, setMatches] = useState([]);
    const [rivals, setRivals] = useState([]);
    const [expandedTeam, setExpandedTeam] = useState(null);
    const [activeTab, setActiveTab] = useState('players');

    useEffect(() => {
        fetchTeams();
        fetchPlayers();
        fetchClasificaciones();
        fetchMatches();
        fetchRivals();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await apiTeam.getTeams();
            setTeams(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching teams:', error);
            setTeams([]);
        }
    };

    const fetchPlayers = async () => {
        try {
            const response = await apiBirthday.getAllPlayers();
            setPlayers(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching players:', error);
            setPlayers([]);
        }
    };

    const fetchClasificaciones = async () => {
        try {
            const response = await apiClasificaciones.getClasificaciones();
            setClasificaciones(response.data || {});
        } catch (error) {
            console.error('Error fetching clasificaciones:', error);
            setClasificaciones({});
        }
    };

    const fetchMatches = async () => {
        try {
            const response = await apiMatch.getAllMatches();
            setMatches(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching matches:', error);
            setMatches([]);
        }
    };

    const fetchRivals = async () => {
        try {
            const response = await apiRival.getAllRivals();
            setRivals(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching rivals:', error);
            setRivals([]);
        }
    };

    const getPlayersByTeam = (teamName) => {
        return Array.isArray(players) ? players.filter(player => player.category === teamName) : [];
    };

    const toggleTeam = (teamId) => {
        setExpandedTeam(expandedTeam === teamId ? null : teamId);
    };

    const getClasificacionByTeam = (teamName) => {
        return Object.values(clasificaciones).find(clasificacion => 
            clasificacion.teamName === teamName
        );
    };

    const cleanTeamName = (name) => {
        return name.replace(/^-\d+\s/, '');
    };

    const getUpcomingMatchesByTeam = (teamId) => {
        const now = new Date();
        return matches
            .filter(match => 
                !match.completed && 
                new Date(match.date) >= now &&
                match.ownTeam === teamId
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5)
            .map(match => {
                const rivalInfo = rivals.find(rival => rival._id === match.rivalTeam);
                return {
                    ...match,
                    rivalTeam: rivalInfo || match.rivalTeam
                };
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    return (
        <div className="teams-container">
            <h1>Equipos</h1>
            <div className="teams-list">
                {Array.isArray(teams) && teams.map(team => (
                    <div key={team._id} className="team-card">
                        <div 
                            className="team-header"
                            onClick={() => toggleTeam(team._id)}
                        >
                            <img 
                                src="logo.png" 
                                alt={team.name}
                                className="team-logo"
                            />
                            <h2>{team.name}</h2>
                            <span className={`arrow ${expandedTeam === team._id ? 'expanded' : ''}`}>
                                ▼
                            </span>
                        </div>
                        
                        {expandedTeam === team._id && (
                            <div className="team-content">
                                <div className="tabs">
                                    <button 
                                        className={`tab ${activeTab === 'players' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('players')}
                                    >
                                        Jugadores
                                    </button>
                                    <button 
                                        className={`tab ${activeTab === 'clasificacion' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('clasificacion')}
                                    >
                                        Clasificación
                                    </button>
                                    <button 
                                        className={`tab ${activeTab === 'partidos' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('partidos')}
                                    >
                                        Próximos Partidos
                                    </button>
                                </div>
                                
                                {activeTab === 'players' && (
                                    <div className="players-list">
                                        {getPlayersByTeam(team.name).map(player => (
                                            <div key={player._id} className="player-card">
                                                <img 
                                                    src={player.photoName} 
                                                    alt={player.name}
                                                    className="player-photo"
                                                />
                                                <div className="player-info">
                                                    <h3>{player.name}</h3>
                                                    <p>{calculateAge(player.birthDay)} años</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {activeTab === 'clasificacion' && (
                                    <div className="clasificacion-container">
                                        {(() => {
                                            const clasificacion = getClasificacionByTeam(team.name);
                                            if (!clasificacion) {
                                                return <p>No hay clasificación disponible</p>;
                                            }
                                            return (
                                                <div className="clasificacion-info">
                                                    <h3>{clasificacion.category} - {clasificacion.division}</h3>
                                                    <div className="clasificacion-table">
                                                        <div className="table-header">
                                                            <span>Pos</span>
                                                            <span>Equipo</span>
                                                            <span>PJ</span>
                                                            <span>G</span>
                                                            <span>E</span>
                                                            <span>P</span>
                                                        </div>
                                                        {clasificacion.clasificacion.map(equipo => (
                                                            <div 
                                                                key={equipo.posicion} 
                                                                className={`table-row ${equipo.nombre.includes(team.name) ? 'highlight' : ''}`}
                                                            >
                                                                <span>{equipo.posicion}</span>
                                                                <span>{cleanTeamName(equipo.nombre)}</span>
                                                                <span>{equipo.partidosJugados}</span>
                                                                <span>{equipo.ganados}</span>
                                                                <span>{equipo.empatados}</span>
                                                                <span>{equipo.perdidos}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                                
                                {activeTab === 'partidos' && (
                                    <div className="partidos-container">
                                        {(() => {
                                            const upcomingMatches = getUpcomingMatchesByTeam(team._id);
                                            if (upcomingMatches.length === 0) {
                                                return <p>No hay próximos partidos</p>;
                                            }
                                            return (
                                                <div className="partidos-list">
                                                    {upcomingMatches.map(match => (
                                                        <div key={match._id} className="partido-item">
                                                            <div className="teams-match">
                                                                <div className="team-match">
                                                                    <OptimizedImage src="/logo.png" alt="BM Sariegos" className="team-logo-match" width={30} height={30} />
                                                                    <span>BM SARIEGOS</span>
                                                                </div>
                                                                <div className="vs">VS</div>
                                                                <div className="team-match">
                                                                    {match.rivalTeam?.photoName ? (
                                                                        <OptimizedImage src={match.rivalTeam.photoName} alt={match.rivalTeam.name} className="team-logo-match" width={30} height={30} />
                                                                    ) : (
                                                                        <div className="no-logo-match">?</div>
                                                                    )}
                                                                    <span>{match.rivalTeam?.name}</span>
                                                                </div>
                                                            </div>
                                                            <div className="match-details">
                                                                <span className="match-date">{formatDate(match.date)}</span>
                                                                <span className="match-time">{match.time.slice(0, 5)}</span>
                                                                <span className="match-location">{match.location}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;