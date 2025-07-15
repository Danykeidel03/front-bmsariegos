import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className='contact-container'>
            <h1 className='contact-title'>Contacto</h1>
            <form className='contact-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='form-label' htmlFor='name'>Nombre</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-input'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className='form-group'>
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-input'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className='form-group'>
                    <label className='form-label' htmlFor='subject'>Asunto</label>
                    <input
                        type='text'
                        id='subject'
                        name='subject'
                        className='form-input'
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className='form-group'>
                    <label className='form-label' htmlFor='message'>Mensaje</label>
                    <textarea
                        id='message'
                        name='message'
                        className='form-textarea'
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                
                <button type='submit' className='submit-btn'>
                    Enviar Mensaje
                </button>
            </form>
        </div>
    );
};

export default Contact;