import React from 'react';
import LocalOptimizedImage from '../LocalOptimizedImage/LocalOptimizedImage';
import './SocialLinks.css';

const SocialLinks = () => {
    return (
        <div className="social-links">
            <h3>Sigue al Sariegos en las redes sociales</h3>
            <div className="social-icons">
                <a href="https://www.instagram.com/balonmanosariegos?igsh=MXJveWU0ZnljcTduYw==" target="_blank" rel="noopener noreferrer" className="no-underline" aria-label="Instagram">
                    <LocalOptimizedImage src="instagram-56.webp" alt="Instagram" className="social-icon" width={56} height={56} quality={70} sizes="56px" />
                </a>
                <a href="https://www.tiktok.com/@bmsariegos?_t=ZN-8zYVE2axXko&_r=1" target="_blank" rel="noopener noreferrer" className="no-underline" aria-label="TikTok">
                    <LocalOptimizedImage src="tiktok-56.webp" alt="TikTok" className="social-icon" width={56} height={56} quality={70} sizes="56px" />
                </a>
                <a href="https://youtube.com/@balonmanosariegos3521?si=IIi08w8o6mOhvQio" target="_blank" rel="noopener noreferrer" className="no-underline" aria-label="YouTube">
                    <LocalOptimizedImage src="youtube-56.webp" alt="YouTube" className="social-icon" width={56} height={56} quality={70} sizes="56px" />
                </a>
                <a href="https://x.com/bsariegos?s=21" target="_blank" rel="noopener noreferrer" className="no-underline" aria-label="X (Twitter)">
                    <LocalOptimizedImage src="x-56.webp" alt="X (Twitter)" className="social-icon" width={56} height={56} quality={70} sizes="56px" />
                </a>
                <a href="https://www.esportplus.tv/category/64d211b808340ccc0bf2e000/sub-category/68cbe353edc81caf2f5909c5/" target="_blank" rel="noopener noreferrer" className="no-underline" aria-label="EsportPlus TV">
                    <LocalOptimizedImage src="esportplus-56.webp" alt="EsportPlus TV" className="social-icon" width={56} height={56} quality={70} sizes="56px" />
                </a>
            </div>
        </div>
    );
};

export default SocialLinks;
