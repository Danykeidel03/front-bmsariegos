import { useEffect, useState } from 'react';
import SEOLink from '../SEOLink/SEOLink';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import './BrandSlider.css';
import apiSponsor from '../../services/apiSponsor';

const BrandSlider = () => {
    const [sponsors, setSponsors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const response = await apiSponsor.getSponsors();
                setSponsors(Array.isArray(response.data.data) ? response.data.data : []);
            } catch {
                setSponsors([]);
            } finally {
                setLoading(false);
            }
        };
        
        const timer = setTimeout(fetchSponsors, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading && sponsors.length > 0) {
            const original = document.querySelector(".logos-slide");
            const slider = document.querySelector(".logo-slider");

            if (original && slider && slider.children.length < 2) {
                const copy = original.cloneNode(true);
                slider.appendChild(copy);
            }
        }
    }, [sponsors, loading]);

    if (loading) return <div style={{height: '100px'}}></div>;

    return (
        <div className="logo-slider">
            <div className="logos-slide">
                {sponsors.map((sponsor, index) => (
                    <SEOLink 
                        key={index} 
                        className='logoLink'
                        href={sponsor.website}
                        external={!!sponsor.website}
                        ariaLabel={`Visitar sitio web de ${sponsor.name}`}
                    >
                        <OptimizedImage 
                            src={sponsor.photoName} 
                            alt={sponsor.name} 
                            width={184}
                            height={123}
                            quality={30}
                            sizes="184px"
                        />
                        <span className="sr-only">{sponsor.name}</span>
                    </SEOLink>
                ))}
            </div>
        </div>
    );
};

export default BrandSlider;
