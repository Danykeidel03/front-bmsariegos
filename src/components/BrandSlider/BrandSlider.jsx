import { useEffect, useState } from 'react';
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
            } catch (error) {
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
                    <a key={index} className='logoLink'>
                        <img src={sponsor.photoName} alt={sponsor.name} loading="lazy" />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BrandSlider;
