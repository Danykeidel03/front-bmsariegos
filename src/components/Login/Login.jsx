import React, { useState } from 'react';
import './Login.css';
import apiUser from '../../services/apiUser';
import Swal from 'sweetalert2';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ mail: '', pass: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await apiUser.loginUser(credentials);
            onLogin(true);
        } catch (error) {
            if(error.status === 401){
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: 'Usuario o contraseña incorrectos'
                });
            }else if(error.status === 500){
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'No se pudo conectar con el servidor. Intenta de nuevo.'
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error inesperado. Intenta de nuevo.'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2 className="login-title">Panel de Administración</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Usuario</label>
                        <input
                            type="text"
                            name="mail"
                            className="form-input"
                            value={credentials.mail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            name="pass"
                            className="form-input"
                            value={credentials.pass}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;