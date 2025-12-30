import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AuthPages.css';
import authService from '../services/authService';

const DriverLoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('driverToken');
        if (token) {
            navigate('/driver/bus-selection');
        }
    }, [navigate]);

    const { username, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.loginDriver({ username, password });
            localStorage.setItem('driverToken', res.data.token);
            navigate('/driver/bus-selection');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-page">
            <Link to="/" className="auth-back-btn">Back to Home</Link>
            
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon">🚗</div>
                        <h2 className="auth-title">Driver Login</h2>
                        <p className="auth-subtitle">Access your driver dashboard</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={onSubmit} className="auth-form">
                        <div className="auth-input-group">
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={onChange}
                                required
                            />
                            <span className="auth-input-icon">👤</span>
                        </div>
                        
                        <div className="auth-input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                            <span className="auth-input-icon">🔑</span>
                        </div>
                        
                        <button type="submit" className="auth-submit-btn">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DriverLoginPage;

