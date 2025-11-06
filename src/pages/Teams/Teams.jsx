import { useState, useEffect } from 'react';
import apiTeam from '../../services/apiTeam';
import apiBirthday from '../../services/apiBirthday';
import apiClasificaciones from '../../services/apiClasificaciones';
import apiMatch from '../../services/apiMatch';
import apiRival from '../../services/apiRival';
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage';
import LocalOptimizedImage from '../../components/LocalOptimizedImage/LocalOptimizedImage';
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

    const getCompletedMatchesByTeam = (teamId) => {
        return matches
            .filter(match => 
                match.completed === 1 &&
                match.ownTeam._id === teamId
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
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
                            <LocalOptimizedImage 
                                src="logo.png" 
                                alt={team.name}
                                className="team-logo"
                                width={30}
                                height={30}
                                quality={75}
                                sizes="30px"
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
                                        Resultados
                                    </button>
                                </div>
                                
                                {activeTab === 'players' && (
                                    <div className="players-list">
                                        {getPlayersByTeam(team.name).map(player => (
                                            <div key={player._id} className="player-card">
                                                <OptimizedImage 
                                                    src={player.photoName} 
                                                    alt={player.name}
                                                    className="player-photo"
                                                    width={60}
                                                    height={60}
                                                    quality={75}
                                                    sizes="60px"
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
                                                            <span>PT</span>
                                                            <span>J</span>
                                                            <span>G</span>
                                                            <span>E</span>
                                                        </div>
                                                        {clasificacion.clasificacion.map(equipo => (
                                                            <div 
                                                                key={equipo.posicion} 
                                                                className={`table-row ${equipo.nombre.includes(team.name) ? 'highlight' : ''}`}
                                                            >
                                                                <span>{equipo.posicion}</span>
                                                                <span style={equipo.nombre.toLowerCase().includes('sariegos') || equipo.nombre === 'CASA DEL PUEBLO BMS ZARDINO' ? {fontWeight: 'bold'} : {}}>{cleanTeamName(equipo.nombre)}</span>
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
                                            const completedMatches = getCompletedMatchesByTeam(team._id);
                                            
                                            if (completedMatches.length === 0) {
                                                return <p>No hay resultados disponibles</p>;
                                            }
                                            return (
                                                <div className="partidos-list">
                                                    {completedMatches.map(match => (
                                                        <div key={match._id} className="partido-item">
                                                            <div className="match-header">
                                                                <span className="match-date">{formatDate(match.date)}</span>
                                                            </div>
                                                            
                                                            <div className="teams-match">
                                                                <div className="team-match">
                                                                    <OptimizedImage src="/logo.png" alt="BM Sariegos" className="team-logo-match" width={25} height={30} />
                                                                    <span className='own-team'>Sariegos</span>
                                                                </div>
                                                                
                                                                <div className="vs">{match.result}</div>
                                                                
                                                                <div className="team-match">
                                                                    {match.rivalTeam?.photoName ? (
                                                                        <OptimizedImage src={match.rivalTeam.photoName} alt={match.rivalTeam.name} className="team-logo-match" width={25} height={30} />
                                                                    ) : (
                                                                        <div className="no-logo-match">?</div>
                                                                    )}
                                                                    <span>{match.rivalTeam?.name}</span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="match-category">{match.ownTeam?.category}</div>
                                                            <div className="match-location">{match.location}</div>
                                                            <div className="match-type">{match.isHome ? 'LOCAL' : 'VISITANTE'}</div>
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