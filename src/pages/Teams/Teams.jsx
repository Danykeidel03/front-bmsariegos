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

    const getPlayersByTeam = (teamName) => {
        return Array.isArray(players) ? players.filter(player => player.category === teamName) : [];
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;