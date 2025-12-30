import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AuthPages.css';
import authService from '../services/authService';

const StudentLoginPage = () => {
    const [formData, setFormData] = useState({
        usn: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/student/bus-selection');
        }
    }, [navigate]);

    const { usn, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.loginStudent({ usn, password });
            localStorage.setItem('token', res.data.token);
            navigate('/student/bus-selection');
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
                        <div className="auth-icon">🎓</div>
                        <h2 className="auth-title">Student Login</h2>
                        <p className="auth-subtitle">Track your bus in real-time</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={onSubmit} className="auth-form">
                        <div className="auth-input-group">
                            <input
                                type="text"
                                placeholder="USN"
                                name="usn"
                                value={usn}
                                onChange={onChange}
                                required
                            />
                            <span className="auth-input-icon">🎫</span>
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

                    <div className="auth-footer">
                        <p className="auth-footer-text">Don't have an account?</p>
                        <Link to="/student-register" className="auth-footer-link">Register here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLoginPage;

