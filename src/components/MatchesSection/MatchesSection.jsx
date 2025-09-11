import React, { useState, useEffect } from 'react';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import './MatchesSection.css';
import apiMatch from '../../services/apiMatch';
import apiRival from '../../services/apiRival';
import apiTeam from '../../services/apiTeam';

const MatchesSection = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        loadUpcomingMatches();
    }, []);

    const loadUpcomingMatches = async () => {
        try {
            const [matchesResponse, rivalsResponse, teamsResponse] = await Promise.all([
                apiMatch.getAllMatches(),
                apiRival.getAllRivals(),
                apiTeam.getTeams()
            ]);
            
            const matchesData = matchesResponse.data.data;
            const rivalsData = rivalsResponse.data.data;
            const teamsData = teamsResponse.data.data;
            
            const now = new Date();
            const upcomingMatches = matchesData
                .filter(match => !match.completed && new Date(match.date) >= now)
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(match => {
                    const rivalInfo = rivalsData.find(rival => rival._id === match.rivalTeam);
                    const ownTeamInfo = teamsData.find(team => team._id === match.ownTeam);
                    return {
                        ...match,
                        rivalTeam: rivalInfo || match.rivalTeam,
                        ownTeam: ownTeamInfo || match.ownTeam
                    };
                });
            
            setMatches(upcomingMatches);
        } catch (error) {
            console.error('Error al cargar partidos:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    };

    return (
        <section className="matches-section">
            <div className="container">
                <h2>Próximos Partidos</h2>
                <div className="matches-grid">
                    {matches.map(match => (
                        <div key={match._id} className="match-card">
                            <div className="match-header">
                                <span className="match-date">{formatDate(match.date)}</span>
                                <span className="match-time">{match.time.slice(0, 5)}</span>
                            </div>
                            
                            <div className="match-teams">
                                <div className="team">
                                    <OptimizedImage src="/logo.png" alt="BM Sariegos" className="team-logo" width={25} height={30} />
                                    <span>Sariegos</span>
                                </div>
                                
                                <div className="vs">VS</div>
                                
                                <div className="team">
                                    {match.rivalTeam?.photoName ? (
                                        <OptimizedImage src={match.rivalTeam.photoName} alt={match.rivalTeam.name} className="team-logo" width={25} height={30} />
                                    ) : (
                                        <div className="no-logo">?</div>
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
            </div>
        </section>
    );
};

export default MatchesSection;