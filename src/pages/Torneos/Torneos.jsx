import './Torneos.css';
import { useState } from 'react';
import Seo from '../../components/ui/SEO/SEO';
import InscripcionForm from './InscripcionForm';

const TORNEOS = [
  {
    id: 'femenino',
    modifier: 'fem',
    title: 'V Torneo Femenino BM Sariegos',
    fechas: '5 al 8 de febrero de 2027',
    ocasion: 'Carnaval',
    categorias: 'Infantil, cadete y juvenil femenino',
    dossier: '/dossiers/Dossier_V_Torneo_Femenino_BM_Sariegos_2027.pdf',
    portada: {
      src: '/torneos/fem-02.webp',
      alt: 'Jugadora cadete del BM Sariegos sonriendo con el balón',
    },
    galeria: [
      { src: '/torneos/fem-03.webp', alt: 'Juvenil del BM Sariegos lanzando en suspensión' },
      { src: '/torneos/fem-04.webp', alt: 'Jugadoras del BM Sariegos organizando el ataque' },
      { src: '/torneos/fem-05.webp', alt: 'Juvenil del BM Sariegos armando el lanzamiento' },
      { src: '/torneos/fem-06.webp', alt: 'Cadete del BM Sariegos armando el brazo para lanzar' },
      { src: '/torneos/fem-07.webp', alt: 'Infantil del BM Sariegos armando el lanzamiento' },
      {
        src: '/torneos/fem-11.webp',
        alt: 'Cientos de jugadoras y jugadores de base reunidos en el pabellón',
      },
      { src: '/torneos/fem-12.webp', alt: 'Dos jugadoras del BM Sariegos abrazadas y sonrientes' },
    ],
    sedes: [
      {
        src: '/torneos/fem-08.webp',
        alt: 'Partido en el pabellón municipal de Sariegos',
        name: 'Pabellón municipal de Sariegos',
      },
      {
        src: '/torneos/fem-09.webp',
        alt: 'Interior del polideportivo de Navatejera',
        name: 'Polideportivo de Navatejera',
      },
      {
        src: '/torneos/fem-10.webp',
        alt: 'Pista del pabellón universitario Hansi Rodríguez',
        name: 'Pabellón universitario Hansi Rodríguez',
      },
    ],
    precios: { esp: 130, mor: 225, alf: 242, fc: 220, ext: 40 },
    tipo: 'jugadora',
  },
  {
    id: 'masculino',
    modifier: 'masc',
    title: 'III Torneo Masculino BM Sariegos',
    fechas: '21 al 24 de marzo de 2027',
    ocasion: 'Semana Santa',
    categorias: 'Infantil, cadete y juvenil masculino',
    dossier: '/dossiers/Dossier_III_Torneo_Masculino_BM_Sariegos_2027.pdf',
    portada: {
      src: '/torneos/masc-02.webp',
      alt: 'Jugador cadete del BM Sariegos armando el lanzamiento',
    },
    galeria: [
      { src: '/torneos/masc-03.webp', alt: 'Jugadores infantiles del BM Sariegos aplaudiendo' },
      {
        src: '/torneos/masc-04.webp',
        alt: 'Infantil del BM Sariegos lanzando entre dos defensores',
      },
      { src: '/torneos/masc-05.webp', alt: 'Juvenil del BM Sariegos en suspensión' },
      { src: '/torneos/masc-06.webp', alt: 'Cadete del BM Sariegos armando el brazo para lanzar' },
      {
        src: '/torneos/masc-07.webp',
        alt: 'Cadete del BM Sariegos recibiendo el balón en el pivote',
      },
      {
        src: '/torneos/masc-08.webp',
        alt: 'Infantil del BM Sariegos en suspensión con el número 27',
      },
      { src: '/torneos/masc-09.webp', alt: 'Infantil del BM Sariegos penetrando hacia portería' },
      { src: '/torneos/masc-10.webp', alt: 'Infantil del BM Sariegos lanzando en suspensión' },
      {
        src: '/torneos/masc-14.webp',
        alt: 'Cientos de jugadores y jugadoras de base reunidos en el pabellón',
      },
      {
        src: '/torneos/masc-15.webp',
        alt: 'Foto de familia de los participantes de la edición anterior',
      },
    ],
    sedes: [
      {
        src: '/torneos/masc-11.webp',
        alt: 'Partido en el pabellón municipal de Sariegos',
        name: 'Pabellón municipal de Sariegos',
      },
      {
        src: '/torneos/masc-12.webp',
        alt: 'Interior del polideportivo de Navatejera',
        name: 'Polideportivo de Navatejera',
      },
      {
        src: '/torneos/masc-13.webp',
        alt: 'Pista del pabellón universitario Hansi Rodríguez',
        name: 'Pabellón universitario Hansi Rodríguez',
      },
    ],
    precios: { esp: 130, mor: 225, alf: 250, fc: 240, ext: 40 },
    tipo: 'jugador',
  },
];

const ALOJAMIENTOS = [
  {
    key: 'esp',
    name: 'Espacios Sariegos',
    detalle: 'Instalaciones del municipio con colchonetas (traer saco de dormir)',
  },
  {
    key: 'mor',
    name: 'Hotel Las Moreras',
    detalle: 'Habitaciones dobles o triples, según disponibilidad',
  },
  { key: 'alf', name: 'Hotel Alfageme', detalle: 'Necesita transporte propio a Sariegos' },
  {
    key: 'fc',
    name: 'Hoteles FC',
    detalle: 'Los Cubos e Infantas León. Necesita transporte propio',
  },
  {
    key: 'ext',
    name: 'Sin alojamiento',
    detalle: 'Torneo y comidas de los días de competición (precio aproximado)',
  },
];

const COLABORADORES = [
  {
    src: '/torneos/logo-escudo-balonmano-sariegos.webp',
    alt: 'Escudo del Club Balonmano Sariegos',
  },
  {
    src: '/torneos/logo-escudo-del-ayuntamiento-de-sariegos.webp',
    alt: 'Escudo del Ayuntamiento de Sariegos',
  },
  { src: '/torneos/logo-logotipo-de-esport-plus-tv.webp', alt: 'Logotipo de Esport Plus TV' },
];

const Torneo = ({ torneo, onInscribir }) => {
  const { id, modifier, title, fechas, ocasion, categorias, dossier, portada } = torneo;
  return (
    <section className={`torneo torneo--${modifier}`} id={id} aria-labelledby={`${id}-titulo`}>
      <div className="torneo__cabecera">
        <div className="torneo__texto">
          <p className="torneo__ocasion">{ocasion}</p>
          <h2 id={`${id}-titulo`}>{title}</h2>
          <p className="torneo__fechas">{fechas}</p>
          <p className="torneo__categorias">{categorias}</p>
          <div className="torneo__acciones">
            <a className="torneos-btn torneos-btn--primary" href={dossier} download>
              Descargar dossier (PDF)
            </a>
            <a className="torneos-btn" href={dossier} target="_blank" rel="noopener noreferrer">
              Ver en el navegador
            </a>
            <a className="torneos-btn" href="#inscripcion" onClick={() => onInscribir(modifier)}>
              Inscribirse
            </a>
          </div>
        </div>
        <img
          className="torneo__portada"
          src={portada.src}
          alt={portada.alt}
          width="600"
          height="793"
          loading="lazy"
          decoding="async"
        />
      </div>

      <h3 className="torneo__subtitulo">Galería</h3>
      <ul className="torneo__galeria">
        {torneo.galeria.map((foto) => (
          <li key={foto.src}>
            <img src={foto.src} alt={foto.alt} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>

      <h3 className="torneo__subtitulo">Sedes</h3>
      <ul className="torneo__sedes">
        {torneo.sedes.map((sede) => (
          <li key={sede.src}>
            <figure>
              <img src={sede.src} alt={sede.alt} loading="lazy" decoding="async" />
              <figcaption>{sede.name}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <h3 className="torneo__subtitulo">Alojamiento y precios</h3>
      <p className="torneo__nota">
        Precio por {torneo.tipo} para todo el torneo, con pensión completa. Incluye inscripción,
        arbitrajes, trofeos y agua.
      </p>
      <ul className="torneo__precios">
        {ALOJAMIENTOS.map((aloj) => (
          <li key={aloj.key}>
            <div>
              <strong>{aloj.name}</strong>
              <span>{aloj.detalle}</span>
            </div>
            <b className="torneo__precio">
              {aloj.key === 'ext' ? '~' : ''}
              {torneo.precios[aloj.key]} €
            </b>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Torneos = () => {
  const [preseleccion, setPreseleccion] = useState(null);
  return (
    <>
      <Seo
        title="Torneos de Base - BM Sariegos"
        description="V Torneo Femenino (5-8 febrero 2027) y III Torneo Masculino (21-24 marzo 2027) del BM Sariegos. Dossier, sedes, alojamiento y precios."
        keywords="torneo balonmano base, torneo femenino balonmano, torneo masculino balonmano, BM Sariegos, León"
      />
      <div className="torneos-container">
        <header className="torneos-header">
          <div className="torneos-header__inner">
            <h1>Torneos de base BM Sariegos</h1>
            <p>
              <strong>Temporada 2026-27.</strong> Doce plazas por categoría, adjudicadas por orden
              de inscripción.
            </p>
            <nav aria-label="Torneos" className="torneos-header__nav">
              {TORNEOS.map((t) => (
                <a key={t.id} href={`#${t.id}`}>
                  {t.title}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="torneos-main">
          {TORNEOS.map((t) => (
            <Torneo key={t.id} torneo={t} onInscribir={(torneo) => setPreseleccion({ torneo })} />
          ))}

          <InscripcionForm preseleccion={preseleccion} />

          <ul className="torneos-logos" aria-label="Organizan y colaboran">
            {COLABORADORES.map((logo) => (
              <li key={logo.src}>
                <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" height="64" />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default Torneos;
