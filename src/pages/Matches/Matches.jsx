import React from 'react';
import './Matches.css';
import MatchesSection from '../../components/MatchesSection/MatchesSection';
import SEO from '../../components/SEO/SEO';

const Matches = () => {
    return (
        <>
            <SEO 
                title="Partidos - Balonmano Sariegos"
                description="Calendario de partidos del Club de Balonmano Sariegos. Próximos encuentros, resultados y toda la información deportiva."
                keywords="partidos, calendario, balonmano sariegos, encuentros, resultados"
            />
            <div className="matches-page">
                <MatchesSection />
            </div>
        </>
    );
};

export default Matches;