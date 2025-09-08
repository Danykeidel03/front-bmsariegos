import React from 'react';
import './Terms.css';
import SEO from '../../components/SEO/SEO';

const Terms = () => {
    return (
        <>
            <SEO 
                title="Términos y Condiciones - Balonmano Sariegos"
                description="Términos y condiciones de uso del Club de Balonmano Sariegos. Normas y condiciones para socios y usuarios."
                keywords="términos condiciones, normas club, balonmano sariegos, reglamento"
            />
            <div className="terms-page">
                <div className="terms-header">
                    <h1>Términos y Condiciones</h1>
                </div>
                
                <div className="terms-content">
                    <section>
                        <h2>1. Aceptación de términos</h2>
                        <p>Al acceder y utilizar la página web del Club de Balonmano Sariegos, aceptas cumplir con estos términos y condiciones de uso.</p>
                    </section>

                    <section>
                        <h2>2. Uso de la web</h2>
                        <p>Esta web está destinada a:</p>
                        <ul>
                            <li>Proporcionar información sobre el club y sus actividades</li>
                            <li>Facilitar la inscripción de nuevos socios</li>
                            <li>Comunicar noticias y eventos relacionados con el balonmano</li>
                            <li>Mostrar información sobre equipos y competiciones</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Registro como socio</h2>
                        <p>Para ser socio del club debes:</p>
                        <ul>
                            <li>Completar el formulario de inscripción con datos veraces</li>
                            <li>Aceptar el reglamento interno del club</li>
                            <li>Cumplir con las cuotas establecidas</li>
                            <li>Respetar las normas deportivas y de convivencia</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Obligaciones de los socios</h2>
                        <p>Como socio del club te comprometes a:</p>
                        <ul>
                            <li>Asistir regularmente a entrenamientos y actividades</li>
                            <li>Mantener un comportamiento deportivo y respetuoso</li>
                            <li>Cuidar las instalaciones y material deportivo</li>
                            <li>Cumplir con las decisiones del cuerpo técnico</li>
                            <li>Representar dignamente al club en competiciones</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Cuotas y pagos</h2>
                        <p>Las cuotas del club se establecen anualmente y deben abonarse en los plazos indicados. El impago puede conllevar la suspensión temporal de la participación en actividades.</p>
                    </section>

                    <section>
                        <h2>6. Responsabilidad</h2>
                        <p>El club no se hace responsable de:</p>
                        <ul>
                            <li>Lesiones derivadas de la práctica deportiva</li>
                            <li>Pérdida o daño de objetos personales</li>
                            <li>Interrupciones en el servicio web por causas técnicas</li>
                        </ul>
                        <p>Se recomienda contar con seguro médico y deportivo.</p>
                    </section>

                    <section>
                        <h2>7. Propiedad intelectual</h2>
                        <p>Todos los contenidos de esta web (textos, imágenes, logos) son propiedad del Club de Balonmano Sariegos y están protegidos por derechos de autor.</p>
                    </section>

                    <section>
                        <h2>8. Modificaciones</h2>
                        <p>El club se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán comunicados a través de la web.</p>
                    </section>

                    <section>
                        <h2>9. Contacto</h2>
                        <p>Para cualquier consulta sobre estos términos, puedes contactarnos a través de nuestro formulario de contacto.</p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Terms;