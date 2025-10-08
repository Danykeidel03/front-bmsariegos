import React, { useState, useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '../../styles/modals-responsive.css';
import './BirthdayModal.css';
import apiTeam from '../../services/apiTeam';
import apiBirthday from '../../services/apiBirthday';
import Swal from 'sweetalert2';

const BirthdayModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        dni: '',
        birthDay: '',
        category: '',
        photo: null
    });
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [crop, setCrop] = useState({ aspect: 1, width: 50, height: 50, unit: '%', x: 25, y: 25 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamsResponse, playersResponse] = await Promise.all([
                    apiTeam.getTeams(),
                    apiBirthday.getAllPlayers()
                ]);
                setTeams(Array.isArray(teamsResponse.data.data) ? teamsResponse.data.data : []);
                const playersData = Array.isArray(playersResponse.data.data) ? playersResponse.data.data : [];
                setPlayers(playersData);
                setFilteredPlayers(playersData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setTeams([]);
                setPlayers([]);
            }
        };
        
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const handleEdit = (player) => {
        setEditingPlayer(player);
        setFormData({
            name: player.name,
            dni: player.dni,
            birthDay: player.birthDay.split('T')[0],
            category: player.category,
            photo: null
        });
        setShowForm(true);
    };

    const fetchPlayers = async () => {
        try {
            const response = await apiBirthday.getAllPlayers();
            const playersData = Array.isArray(response.data.data) ? response.data.data : [];
            setPlayers(playersData);
            setFilteredPlayers(playersData);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = players.filter(player => 
            player.name.toLowerCase().includes(term)
        );
        setFilteredPlayers(filtered);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Redimensionar manteniendo proporción
                const maxDimension = 1200;
                let { width, height } = img;
                
                if (width > maxDimension || height > maxDimension) {
                    const ratio = Math.min(maxDimension / width, maxDimension / height);
                    width *= ratio;
                    height *= ratio;
                }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob(resolve, 'image/jpeg', 0.92);
            };
            
            img.src = URL.createObjectURL(file);
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
            setCrop({ aspect: 1, width: 50, height: 50, unit: '%', x: 25, y: 25 });
            setShowCropper(true);
        };
        reader.readAsDataURL(file);
    };
    
    const getCroppedImg = (image, crop) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        
        canvas.width = crop.width;
        canvas.height = crop.height;
        
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        
        return new Promise((resolve) => {
            canvas.toBlob(resolve, 'image/jpeg', 0.92);
        });
    };
    
    const handleCropComplete = async () => {
        if (!completedCrop || !imgRef.current) return;
        
        try {
            const croppedFile = await getCroppedImg(imgRef.current, completedCrop);
            setFormData(prev => ({ ...prev, photo: croppedFile }));
            setShowCropper(false);
        } catch (error) {
            Swal.fire('Error', 'No se pudo recortar la imagen', 'error');
        }
    };



    const handleDelete = async (playerId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await apiBirthday.deleteBirthday(playerId);
                Swal.fire('Eliminado', 'Jugador eliminado correctamente', 'success');
                await fetchPlayers();
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el jugador', 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingPlayer) {
                const data = {
                    name: formData.name,
                    dni: formData.dni,
                    birthDay: formData.birthDay,
                    category: formData.category
                };
                
                await apiBirthday.updateBirthday(editingPlayer._id, data);
                Swal.fire('Éxito', 'Jugador actualizado correctamente', 'success');
            } else {
                await onSubmit(formData);
            }
            
            setFormData({
                name: '',
                dni: '',
                birthDay: '',
                category: '',
                photo: null
            });
            setEditingPlayer(null);
            setShowForm(false);
            await fetchPlayers();
        } catch (error) {
            Swal.fire('Error', 'No se pudo guardar el jugador', 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="birthday-modal modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Gestión de Jugadores</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                {!showForm ? (
                    <div className="players-list">
                        <div className="list-header">
                            <h3>Jugadores Existentes</h3>
                            <button className="add-btn" onClick={() => setShowForm(true)}>Añadir Nuevo</button>
                        </div>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Buscar por nombre..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-input"
                            />
                        </div>
                        <div className="players-grid">
                            {filteredPlayers.map((player) => (
                                <div key={player._id} className="player-item">
                                    {player.photoName && (
                                        <div className="player-photo-container">
                                            <img 
                                                src={player.photoName} 
                                                alt={player.name}
                                                className="player-photo-modal"
                                            />
                                        </div>
                                    )}
                                    <div className="player-info">
                                        <h4>{player.name}</h4>
                                        <p>DNI: {player.dni}</p>
                                        <p>Categoría: {player.category}</p>
                                        <div className="player-actions">
                                            <button 
                                                className="edit-btn" 
                                                onClick={() => handleEdit(player)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="delete-btn" 
                                                onClick={() => handleDelete(player._id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="birthday-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
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
                        <label htmlFor="dni">DNI:</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthDay">Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            id="birthDay"
                            name="birthDay"
                            value={formData.birthDay}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Categoría:</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            {teams.map((team, index) => (
                                <option key={index} value={team.name}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="photo">Foto:</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            onChange={handleFileChange}
                            accept="image/*"
                            required={!editingPlayer}
                        />
                        {formData.photo && (
                            <div className="photo-preview">
                                <img src={URL.createObjectURL(formData.photo)} alt="Preview" style={{width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #ddd'}} />
                                <p style={{fontSize: '12px', color: '#666', marginTop: '5px'}}>Vista previa</p>
                            </div>
                        )}
                    </div>
                    
                    {showCropper && (
                        <div className="crop-modal">
                            <div className="crop-container">
                                <h3>Recortar imagen</h3>
                                <ReactCrop
                                    crop={crop}
                                    onChange={(newCrop) => setCrop(newCrop)}
                                    onComplete={(c) => setCompletedCrop(c)}
                                    aspect={1}
                                    circularCrop
                                >
                                    <img
                                        ref={imgRef}
                                        src={imagePreview}
                                        alt="Crop"
                                        style={{ maxWidth: '100%', maxHeight: '400px' }}
                                    />
                                </ReactCrop>
                                <div className="crop-actions">
                                    <button type="button" onClick={() => setShowCropper(false)}>Cancelar</button>
                                    <button type="button" onClick={handleCropComplete}>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    )}

                        <div className="form-actions">
                            <button type="button" onClick={() => {
                                setShowForm(false);
                                setEditingPlayer(null);
                                setFormData({
                                    name: '',
                                    dni: '',
                                    birthDay: '',
                                    category: ''
                                });
                            }} className="cancel-btn">
                                Cancelar
                            </button>
                            <button type="submit" className="submit-btn">
                                {editingPlayer ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BirthdayModal;