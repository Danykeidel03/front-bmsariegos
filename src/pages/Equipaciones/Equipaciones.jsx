import './Equipaciones.css';

const Equipaciones = () => {
    const equipaciones = [
        {
            id: 1,
            name: 'Primera Equipación',
            video: '/equipaciones/primera.mp4',
            description: 'Equipación oficial local del BM Sariegos',
            url: 'https://app.cluber.es/clubes/687f46b7ad25c989158902/pagos/68eed3b68e090056051742'
        },
        {
            id: 2,
            name: 'Segunda Equipación',
            video: '/equipaciones/segunda.mp4',
            description: 'Equipación oficial visitante del BM Sariegos',
            url: 'https://app.cluber.es/clubes/687f46b7ad25c989158902/pagos/68ef59ecc1f72890888949'
        },
        {
            id: 3,
            name: 'Equipación Portero',
            video: '/equipaciones/portero.mp4',
            description: 'Equipación oficial de portero del BM Sariegos',
            url: 'https://app.cluber.es/clubes/687f46b7ad25c989158902/pagos/68ef68ff8b02a600451276'
        },
        {
            id: 4,
            name: 'Segunda Equipación Portero',
            video: '/equipaciones/segundaPorteros.mp4',
            description: 'Segunda equipación oficial de portero del BM Sariegos',
            url: 'https://app.cluber.es/clubes/687f46b7ad25c989158902/pagos/68ef6a13761fa942458675'
        }
    ];

    const handleComprar = (url) => {
        window.open(url, '_blank');
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
                                onClick={() => handleComprar(equipacion.url)}
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