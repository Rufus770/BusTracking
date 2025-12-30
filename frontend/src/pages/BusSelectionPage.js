import React, { useState, useEffect, useRef } from 'react';
import busService from '../services/busService';
import io from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import '../styles/BusPages.css';

// Create custom bus icon
const busIcon = L.divIcon({
    className: 'custom-bus-icon',
    html: `<div style="font-size: 32px; text-align: center;">🚌</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
});

const BusSelectionPage = () => {
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [position, setPosition] = useState(null);
    const [error, setError] = useState('');
    const socketRef = useRef(null);
    const watchIdRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const token = localStorage.getItem('driverToken');
                if (!token) {
                    setError('Not authorized');
                    return;
                }
                const res = await busService.getBuses(token);
                setBuses(res.data);
            } catch (err) {
                setError('Could not fetch buses');
            }
        };

        fetchBuses();

        // Connect to WebSocket server
        socketRef.current = io('http://localhost:5005'); // Adjust if your backend is elsewhere

        return () => {
            // Disconnect socket and stop watching location on component unmount
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    const handleBusSelection = (busId) => {
        setSelectedBus(busId);
        
        // Stop tracking previous bus if any
        if (watchIdRef.current) {
            navigator.geolocation.clearWatch(watchIdRef.current);
        }

        // Start tracking location
        if (navigator.geolocation) {
            watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newPosition = [latitude, longitude];
                    setPosition(newPosition);
                    socketRef.current.emit('locationUpdate', {
                        busId,
                        lat: latitude,
                        lng: longitude,
                    });
                },
                (err) => {
                    console.error('Geolocation error:', err);
                    setError('Could not get location. Please enable location services.');
                },
                { enableHighAccuracy: true }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('driverToken');
        navigate('/');
    };

    return (
        <div className="bus-page">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            
            {error && (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3 className="error-title">Error</h3>
                    <p className="error-message">{error}</p>
                </div>
            )}

            {!selectedBus && !error && (
                <>
                    <div className="bus-header">
                        <h2 className="bus-title">Select Your Bus</h2>
                        <p className="bus-subtitle">Choose a bus to start tracking</p>
                    </div>
                    
                    {buses.length > 0 ? (
                        <div className="bus-grid">
                            {buses.map((bus) => (
                                <div key={bus.id} className="bus-card" onClick={() => handleBusSelection(bus.id)}>
                                    <span className="bus-card-icon">🚌</span>
                                    <h3 className="bus-card-name">{bus.name}</h3>
                                    <span className="bus-card-id">ID: {bus.id}</span>
                                    <span className="bus-card-arrow">→</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">🚌</div>
                            <h3 className="empty-state-title">No Buses Available</h3>
                            <p className="empty-state-text">Please check back later</p>
                        </div>
                    )}
                </>
            )}

            {selectedBus && (
                <div className="tracking-container">
                    <div className="tracking-header">
                        <div className="tracking-status">
                            <span className="tracking-status-icon">📡</span>
                            <div className="tracking-status-text">
                                <h3>Tracking Active</h3>
                                <p>Your location is being broadcast in real-time</p>
                            </div>
                        </div>
                        <div className="tracking-info">
                            <div className="tracking-info-item">
                                <span className="tracking-info-icon">🚌</span>
                                <div>
                                    <div className="tracking-info-label">Bus ID</div>
                                    <div className="tracking-info-value">{selectedBus}</div>
                                </div>
                            </div>
                            <div className="tracking-info-item">
                                <span className="tracking-info-icon">📍</span>
                                <div>
                                    <div className="tracking-info-label">Status</div>
                                    <div className="tracking-info-value">{position ? 'Live' : 'Acquiring...'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="map-container">
                        {position ? (
                            <MapContainer center={position} zoom={15}>
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                />
                                <Marker position={position} icon={busIcon}>
                                    <Popup>Your Current Location</Popup>
                                </Marker>
                            </MapContainer>
                        ) : (
                            <div className="map-loading">
                                <div className="map-loading-spinner"></div>
                                <p className="map-loading-text">Acquiring your location...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusSelectionPage;

