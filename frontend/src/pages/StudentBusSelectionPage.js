import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BusPages.css';
import busService from '../services/busService';

const StudentBusSelectionPage = () => {
    const [buses, setBuses] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Not authorized');
                    navigate('/student-login');
                    return;
                }
                const res = await busService.getBuses(token);
                setBuses(res.data);
            } catch (err) {
                setError('Could not fetch buses');
            }
        };

        fetchBuses();
    }, [navigate]);

    const handleBusSelection = (busId) => {
        navigate(`/map/${busId}`);
    };

    return (
        <div className="bus-page">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            
            <div className="bus-header">
                <h2 className="bus-title">Select a Bus to Track</h2>
                <p className="bus-subtitle">Choose a bus to view its live location</p>
            </div>

            {error && (
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3 className="error-title">Error</h3>
                    <p className="error-message">{error}</p>
                </div>
            )}

            {!error && (
                buses.length > 0 ? (
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
                )
            )}
        </div>
    );
};

export default StudentBusSelectionPage;

