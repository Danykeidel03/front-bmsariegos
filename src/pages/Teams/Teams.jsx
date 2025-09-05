import { useState, useEffect } from 'react';
import apiTeam from '../../services/apiTeam';
import apiBirthday from '../../services/apiBirthday';
import './Teams.css';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [expandedTeam, setExpandedTeam] = useState(null);

    useEffect(() => {
        fetchTeams();
        fetchPlayers();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await apiTeam.getTeams();
            setTeams(response.data);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    const fetchPlayers = async () => {
        try {
            const response = await apiBirthday.getBirthday();
            setPlayers(response.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const getPlayersByTeam = (teamId) => {
        return players.filter(player => player.teamId === teamId);
    };

    const toggleTeam = (teamId) => {
        setExpandedTeam(expandedTeam === teamId ? null : teamId);
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
                {teams.map(team => (
                    <div key={team.id} className="team-card">
                        <div 
                            className="team-header"
                            onClick={() => toggleTeam(team.id)}
                        >
                            <img 
                                src={team.image} 
                                alt={team.name}
                                className="team-logo"
                            />
                            <h2>{team.name}</h2>
                            <span className={`arrow ${expandedTeam === team.id ? 'expanded' : ''}`}>
                                ▼
                            </span>
                        </div>
                        
                        {expandedTeam === team.id && (
                            <div className="players-list">
                                {getPlayersByTeam(team.id).map(player => (
                                    <div key={player.id} className="player-card">
                                        <img 
                                            src={player.image} 
                                            alt={player.name}
                                            className="player-photo"
                                        />
                                        <div className="player-info">
                                            <h3>{player.name}</h3>
                                            <p>{calculateAge(player.birthDate)} años</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;