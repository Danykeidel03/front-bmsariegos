import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import './MatchesBar.css';
import apiMatch from '../../services/apiMatch';
import apiRival from '../../services/apiRival';
import apiTeam from '../../services/apiTeam';

const MatchesBar = () => {
    const [matches, setMatches] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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
                .slice(0, 8)
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
        <div className="matches-bar">
            <div className="container">
                <div className="matches-bar-content">
                    <div 
                        className="matches-list"
                        onMouseDown={(e) => {
                            setIsDragging(true);
                            setStartX(e.pageX - e.currentTarget.offsetLeft);
                            setScrollLeft(e.currentTarget.scrollLeft);
                        }}
                        onMouseLeave={() => setIsDragging(false)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseMove={(e) => {
                            if (!isDragging) return;
                            e.preventDefault();
                            const x = e.pageX - e.currentTarget.offsetLeft;
                            const walk = (x - startX) * 2;
                            e.currentTarget.scrollLeft = scrollLeft - walk;
                        }}
                    >
                        {matches.map(match => (
                            <div key={match._id} className="match-item">
                                <div className="match-info">
                                    <div className="match-category">{match.ownTeam?.category}</div>
                                    <div className="teams">
                                        <div className="team">
                                            <OptimizedImage src="/logo.png" alt="BM Sariegos" className="team-logo" width={25} height={30} />
                                            <span className="team-name">BM SARIEGOS</span>
                                        </div>
                                        <div className="team">
                                            {match.rivalTeam?.photoName ? (
                                                <OptimizedImage src={match.rivalTeam.photoName} alt={match.rivalTeam.name} className="team-logo" width={25} height={30} />
                                            ) : (
                                                <div className="no-logo">?</div>
                                            )}
                                            <span className="team-name">{match.rivalTeam?.name}</span>
                                        </div>
                                    </div>
                                    <div className="match-datetime">
                                        <span className="match-date">{formatDate(match.date)}</span>
                                        <span className="match-time">{match.time.slice(0, 5)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/partidos" className="view-all-btn">Ver todos los partidos</Link>
                </div>
            </div>
        </div>
    );
};

export default MatchesBar;