import React from 'react';
import './About.css';
import SEO from '../../components/ui/SEO/SEO';
import OptimizedImage from '../../components/ui/OptimizedImage/OptimizedImage';

const About = () => {
  return (
    <>
      <SEO
        title="Quiénes Somos - BM Sariegos"
        description="Conoce al Club Balonmano Sariegos, el club con más fichas federativas de León. Descubre nuestra historia, valores y categorías."
        keywords="BM Sariegos, balonmano León, club balonmano, categorías base, sénior"
      />

      <div className="about-container">
        <header className="about-header">
          <h1>💙🤾 ¡VEN A VIVIR EL BALONMANO CON EL BM SARIEGOS! 🤾🤍</h1>
        </header>

        <div className="about-content">
          <section className="about-intro">
            <div className="about-intro-text">
              <p>
                En pleno corazón del Alfoz de León, a solo unos minutos de la capital, el Club
                Balonmano Sariegos se ha convertido en un referente del balonmano provincial y
                autonómico. Somos el club con más fichas federativas de toda la provincia de León, y
                cada temporada seguimos creciendo gracias a la pasión y el esfuerzo de nuestros
                jugadores, familias y entrenadores. 🙌
              </p>

              <p>
                Nuestro pabellón, el Municipal de Sariegos, es el escenario donde se respira
                balonmano a diario. Aquí entrenan y compiten desde los más pequeños que empiezan en
                las categorías base 🏃♂️, hasta nuestros equipos sénior, que representan con orgullo
                los colores azul y blanco en cada partido 💪.
              </p>
            </div>
            <figure className="about-intro-media">
              <OptimizedImage
                src="quienesSomos.webp"
                alt="BM Sariegos - Quiénes Somos"
                className="about-hero-image"
              />
            </figure>
          </section>

          <section className="about-features">
            <h2>¿Qué nos diferencia?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true"></span>
                <p>Un ambiente familiar y cercano donde cada jugador/a encuentra su sitio.</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true"></span>
                <p>
                  Una estructura sólida que fomenta tanto la formación deportiva como los valores
                  del esfuerzo, respeto y compañerismo.
                </p>
              </div>
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true"></span>
                <p>
                  Oportunidades para todas las edades y niveles: iniciación, categorías base,
                  competición y sénior.
                </p>
              </div>
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true"></span>
                <p>Actividades, torneos y experiencias que van mucho más allá del deporte.</p>
              </div>
            </div>
          </section>

          <section className="about-categories">
            <h2>Nuestras Categorías</h2>

            <div className="categories-section">
              <h3>Categorías Masculinas y Femeninas</h3>
              <div className="category-grid">
                <div className="category-item">
                  <h4>Infantil</h4>
                  <p>Nacid@s 2013-2012</p>
                </div>
                <div className="category-item">
                  <h4>Cadete</h4>
                  <p>Nacid@s 2011-2010</p>
                </div>
                <div className="category-item">
                  <h4>Juvenil</h4>
                  <p>Nacid@s 2009-2008</p>
                </div>
                <div className="category-item">
                  <h4>Senior</h4>
                  <p>Nacid@s 2008 en adelante</p>
                </div>
              </div>
            </div>

            <div className="categories-section">
              <h3>Categorías Mixtas</h3>
              <div className="category-grid">
                <div className="category-item">
                  <h4>Alevines</h4>
                  <p>Nacidos 2015-2016</p>
                </div>
                <div className="category-item">
                  <h4>Benjamines</h4>
                  <p>Nacidos 2017-2018</p>
                </div>
                <div className="category-item">
                  <h4>Prebenjamines</h4>
                  <p>Nacidos 2019-2020</p>
                </div>
              </div>
              <div className="training-info">
                <p>
                  <strong>Alevines:</strong> Martes y Jueves 16:00-17:00
                </p>
                <p>
                  <strong>Benjamines y Prebenjamines:</strong> Lunes y Miércoles 16:00-17:00
                </p>
              </div>
              <div className="training-start">Comienzo de entrenamientos: Octubre</div>
            </div>
          </section>

          <section className="about-cta">
            <div className="cta-content">
              <p>
                En el BM Sariegos no solo jugamos al balonmano… lo vivimos. Cada entrenamiento, cada
                partido y cada convivencia nos hacen más grandes como club y como familia.
              </p>

              <p>
                👉 Si te gusta el deporte, quieres divertirte, hacer amigos y formar parte de una
                comunidad que no deja de crecer, ¡este es tu sitio!
              </p>

              <p>
                📍 Estamos en Sariegos (a 10 minutos de León). Ven a probar y descubre por qué cada
                vez somos más los que llevamos el azul y blanco con orgullo.
              </p>

              <p className="final-cta">
                <strong>El balonmano te está esperando. ¿Te unes? 💙🤍</strong>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
