import React from 'react';
import './Privacy.css';
import SEO from '../../components/SEO/SEO';

const Privacy = () => {
    return (
        <>
            <SEO 
                title="Política de Privacidad - Balonmano Sariegos"
                description="Política de privacidad del Club de Balonmano Sariegos. Información sobre el tratamiento de datos personales."
                keywords="política privacidad, protección datos, balonmano sariegos, RGPD"
            />
            <div className="privacy-page">
                <div className="privacy-header">
                    <h1>Política de Privacidad</h1>
                </div>
                
                <div className="privacy-content">
                    <section>
                        <h2>1. Responsable del tratamiento</h2>
                        <p>Club de Balonmano Sariegos es el responsable del tratamiento de los datos personales que nos proporciones a través de nuestra página web.</p>
                    </section>

                    <section>
                        <h2>2. Datos que recopilamos</h2>
                        <p>Recopilamos los siguientes tipos de datos:</p>
                        <ul>
                            <li>Datos de contacto (nombre, email, teléfono) cuando te registras como socio</li>
                            <li>Información deportiva relacionada con la práctica del balonmano</li>
                            <li>Datos de navegación y cookies técnicas necesarias para el funcionamiento de la web</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Finalidad del tratamiento</h2>
                        <p>Utilizamos tus datos para:</p>
                        <ul>
                            <li>Gestionar tu inscripción como socio del club</li>
                            <li>Comunicarte información sobre entrenamientos, partidos y eventos</li>
                            <li>Mejorar nuestros servicios deportivos</li>
                            <li>Cumplir con obligaciones legales</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Base legal</h2>
                        <p>El tratamiento de tus datos se basa en:</p>
                        <ul>
                            <li>Tu consentimiento para el envío de comunicaciones</li>
                            <li>La ejecución del contrato de socio</li>
                            <li>El cumplimiento de obligaciones legales deportivas</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Conservación de datos</h2>
                        <p>Conservaremos tus datos mientras seas socio del club y durante el tiempo necesario para cumplir con las obligaciones legales aplicables.</p>
                    </section>

                    <section>
                        <h2>6. Tus derechos</h2>
                        <p>Tienes derecho a:</p>
                        <ul>
                            <li>Acceder a tus datos personales</li>
                            <li>Rectificar datos inexactos</li>
                            <li>Suprimir tus datos</li>
                            <li>Limitar el tratamiento</li>
                            <li>Portabilidad de datos</li>
                            <li>Oponerte al tratamiento</li>
                        </ul>
                        <p>Para ejercer estos derechos, contacta con nosotros a través de nuestro formulario de contacto.</p>
                    </section>

                    <section>
                        <h2>7. Contacto</h2>
                        <p>Si tienes dudas sobre esta política de privacidad, puedes contactarnos a través de la sección de contacto de nuestra web.</p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Privacy;