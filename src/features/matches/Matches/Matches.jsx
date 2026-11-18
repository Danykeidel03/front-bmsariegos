import React from 'react';
import './Matches.css';
import MatchesSection from '../MatchesSection/MatchesSection';
import Seo from '../../../components/ui/SEO/SEO';

const Matches = () => {
  return (
    <>
      <Seo
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
