import React, { useState } from 'react';
import './Login.css';
import apiUser from '../../../api/apiUser';
import { loadSweetAlert } from '../../../utils/lazyLoadLibraries';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ mail: '', pass: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiUser.loginUser(credentials);
      onLogin(true);
    } catch (error) {
      const Swal = await loadSweetAlert();
      if (error.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Usuario o contraseña incorrectos',
        });
      } else if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor. Intenta de nuevo.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error inesperado. Intenta de nuevo.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img
          src="/logo-123.webp"
          alt="Logo BM Sariegos"
          className="login-logo"
          width="88"
          height="88"
        />
        <h1 className="login-title">Panel de Administración</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-mail">
              Usuario
            </label>
            <input
              id="login-mail"
              type="text"
              name="mail"
              autoComplete="username"
              className="form-input"
              value={credentials.mail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="login-pass">
              Contraseña
            </label>
            <input
              id="login-pass"
              type="password"
              name="pass"
              autoComplete="current-password"
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
