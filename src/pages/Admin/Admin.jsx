import React, { useState } from 'react';
import './Admin.css';
import Login from '../../components/Login/Login';
import AdminPanel from '../../components/AdminPanel/AdminPanel';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (success) => {
        setIsAuthenticated(success);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div className="admin-container">
            {!isAuthenticated ? (
                <Login onLogin={handleLogin} />
            ) : (
                <AdminPanel onLogout={handleLogout} />
            )}
        </div>
    );
};

export default Admin;