import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import io from 'socket.io-client';
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

const MapViewPage = () => {
    const { busId } = useParams();
    const [position, setPosition] = useState(null);
    const socketRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Connect to WebSocket server
        const socket = io('https://bus-tracking-backend-vwjm.onrender.com');
        socketRef.current = socket;

        // Join the room for the selected bus
        socketRef.current.emit('joinBusRoom', busId);

        // Listen for location updates
        socketRef.current.on('location', (data) => {
            setPosition([data.lat, data.lng]);
        });

        // Clean up on component unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [busId]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="bus-page">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            
            <div className="tracking-container">
                <div className="tracking-header">
                    <div className="tracking-status">
                        <span className="tracking-status-icon">📡</span>
                        <div className="tracking-status-text">
                            <h3>Live Bus Tracking</h3>
                            <p>Viewing real-time location updates</p>
                        </div>
                    </div>
                    <div className="tracking-info">
                        <div className="tracking-info-item">
                            <span className="tracking-info-icon">🚌</span>
                            <div>
                                <div className="tracking-info-label">Bus ID</div>
                                <div className="tracking-info-value">{busId}</div>
                            </div>
                        </div>
                        <div className="tracking-info-item">
                            <span className="tracking-info-icon">📍</span>
                            <div>
                                <div className="tracking-info-label">Status</div>
                                <div className="tracking-info-value">{position ? 'Live' : 'Connecting...'}</div>
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
                                <Popup>
                                    <strong>Bus Location</strong><br />
                                    Bus ID: {busId}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    ) : (
                        <div className="map-loading">
                            <div className="map-loading-spinner"></div>
                            <p className="map-loading-text">Waiting for location data...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapViewPage;

