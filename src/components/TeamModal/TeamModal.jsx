import { useState, useEffect } from 'react';
import '../../styles/modals-responsive.css';
import './TeamModal.css';
import { showAlert } from '../../utils/lazyLoadLibraries';
import apiTeam from '../../services/apiTeam';

const TeamModal = ({ isOpen, onClose }) => {
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        division: ''
    });
    const [editingTeam, setEditingTeam] = useState(null);
    const [editName, setEditName] = useState('');
    const [hasOrderChanges, setHasOrderChanges] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchTeams();
        }
    }, [isOpen]);

    const fetchTeams = async () => {
        try {
            const response = await apiTeam.getTeams();
            const teamsData = Array.isArray(response.data.data) ? response.data.data : [];
            setTeams(teamsData);
        } catch {
            setTeams([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await apiTeam.createTeam(formData);
            await showAlert('Éxito', 'Equipo creado correctamente', 'success');
            setFormData({ name: '', category: '', division: '' });
            fetchTeams();
        } catch {
            await showAlert('Error', 'No se pudo crear el equipo', 'error');
        }
    };

    const handleDelete = async (teamId) => {
        try {
            await apiTeam.deleteTeam(teamId);
            await showAlert('Éxito', 'Equipo eliminado correctamente', 'success');
            fetchTeams();
        } catch {
            await showAlert('Error', 'No se pudo eliminar el equipo', 'error');
        }
    };

    const handleEditName = (team) => {
        setEditingTeam(team._id);
        setEditName(team.name);
    };

    const handleSaveName = async (teamId) => {
        try {
            await apiTeam.updateTeamName(teamId, editName);
            await showAlert('Éxito', 'Nombre actualizado exitosamente', 'success');
            setEditingTeam(null);
            setEditName('');
            fetchTeams();
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.status === 404 ? 'Equipo no encontrado' : 'Error del servidor';
            await showAlert('Error', errorMessage, 'error');
        }
    };

    const handleCancelEdit = () => {
        setEditingTeam(null);
        setEditName('');
    };

    const moveTeamUp = (index) => {
        if (index === 0) return;
        const newTeams = [...teams];
        [newTeams[index], newTeams[index - 1]] = [newTeams[index - 1], newTeams[index]];
        setTeams(newTeams);
        setHasOrderChanges(true);
    };

    const moveTeamDown = (index) => {
        if (index === teams.length - 1) return;
        const newTeams = [...teams];
        [newTeams[index], newTeams[index + 1]] = [newTeams[index + 1], newTeams[index]];
        setTeams(newTeams);
        setHasOrderChanges(true);
    };

    const saveOrder = async () => {
        const teamOrders = teams.map((team, index) => ({
            id: team._id,
            order: index + 1
        }));

        try {
            await apiTeam.reorderTeams(teamOrders);
            setHasOrderChanges(false);
            await showAlert('Éxito', 'Orden actualizado correctamente', 'success');
        } catch (error) {
            console.log(error);
            await showAlert('Error', 'No se pudo actualizar el orden', 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content team-modal">
                <div className="modal-header">
                    <h2>Gestión de Equipos</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Equipo:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="category">Categoría:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="division">División:</label>
                        <input
                            type="text"
                            id="division"
                            name="division"
                            value={formData.division}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">
                        Crear Equipo
                    </button>
                </form>

                <div className="teams-list">
                    <div className="teams-header">
                        <h3>Equipos Existentes</h3>
                        {hasOrderChanges && (
                            <button className="save-order-btn" onClick={saveOrder}>
                                Guardar Orden
                            </button>
                        )}
                    </div>
                    {!Array.isArray(teams) || teams.length === 0 ? (
                        <p>No hay equipos creados</p>
                    ) : (
                        teams.map((team, index) => (
                            <div key={team._id} className="team-item">
                                <div className="order-controls">
                                    <button 
                                        className="arrow-btn"
                                        onClick={() => moveTeamUp(index)}
                                        disabled={index === 0}
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        className="arrow-btn"
                                        onClick={() => moveTeamDown(index)}
                                        disabled={index === teams.length - 1}
                                    >
                                        ↓
                                    </button>
                                </div>
                                <div className="team-info">
                                    {editingTeam === team._id ? (
                                        <div className="edit-name">
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="edit-input"
                                            />
                                            <button 
                                                className="save-btn"
                                                onClick={() => handleSaveName(team._id)}
                                            >
                                                Guardar
                                            </button>
                                            <button 
                                                className="cancel-btn"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <strong>{team.name}</strong>
                                            <span>{team.category} - {team.division}</span>
                                        </>
                                    )}
                                </div>
                                <div className="team-actions">
                                    {editingTeam !== team._id && (
                                        <button 
                                            className="edit-btn"
                                            onClick={() => handleEditName(team)}
                                        >
                                            Editar
                                        </button>
                                    )}
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(team._id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamModal;