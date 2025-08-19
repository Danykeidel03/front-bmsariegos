import { useEffect, useState } from 'react';
import './BrandSlider.css';
import apiSponsor from '../../services/apiSponsor';

const BrandSlider = () => {
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        const fetchSponsors = async () => {
            console.log('Fetching sponsors...');
            try {
                const response = await apiSponsor.getSponsors();
                setSponsors(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                console.error('Error fetching sponsors:', error);
                setSponsors([]);
            }
        };
        
        fetchSponsors();
    }, []);

    useEffect(() => {
        const original = document.querySelector(".logos-slide");
        const slider = document.querySelector(".logo-slider");

        if (original && slider && slider.children.length < 2) {
            const copy = original.cloneNode(true);
            slider.appendChild(copy);
        }
    }, [sponsors]);

    return (
        <div className="logo-slider">
            <div className="logos-slide">
                {Array.isArray(sponsors) && sponsors.map((sponsor, index) => (
                    <a key={index} className='logoLink'>
                        <img src={sponsor.photoName} alt={sponsor.name} />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BrandSlider;
