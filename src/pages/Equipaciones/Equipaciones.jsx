import './Equipaciones.css';

const Equipaciones = () => {
    const equipaciones = [
        {
            id: 1,
            name: 'Primera Equipación',
            video: '/equipaciones/primera.mp4',
            description: 'Equipación oficial local del BM Sariegos'
        },
        {
            id: 2,
            name: 'Segunda Equipación',
            video: '/equipaciones/segunda.mp4',
            description: 'Equipación oficial visitante del BM Sariegos'
        },
        {
            id: 3,
            name: 'Equipación Portero',
            video: '/equipaciones/portero.mp4',
            description: 'Equipación oficial de portero del BM Sariegos'
        }
        ,
        {
            id: 4,
            name: 'Segunda Equipación Portero',
            video: '/equipaciones/segundaPorteros.mp4',
            description: 'Segunda equipación oficial de portero del BM Sariegos'
        }
    ];

    const handleComprar = () => {
        window.open('https://cluber.es/', '_blank');
    };

    return (
        <div className="equipaciones-container">
            <h1>Equipaciones</h1>
            <div className="equipaciones-grid">
                {equipaciones.map(equipacion => (
                    <div key={equipacion.id} className="equipacion-card">
                        <div className="equipacion-video">
                            <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline
                                className="video-player"
                            >
                                <source src={equipacion.video} type="video/mp4" />
                            </video>
                        </div>
                        <div className="equipacion-info">
                            <h3>{equipacion.name}</h3>
                            <p>{equipacion.description}</p>
                            <button 
                                className="comprar-btn"
                                onClick={handleComprar}
                            >
                                Comprar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Equipaciones;