import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AuthPages.css';
import authService from '../services/authService';

const StudentRegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        usn: '',
        phone: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { name, usn, phone, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.registerStudent({ name, usn, phone, password });
            navigate('/student-login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-page">
            <Link to="/" className="auth-back-btn">Back to Home</Link>
            
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon">📝</div>
                        <h2 className="auth-title">Student Registration</h2>
                        <p className="auth-subtitle">Create your account to get started</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={onSubmit} className="auth-form">
                        <div className="auth-input-group">
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                            <span className="auth-input-icon">👤</span>
                        </div>
                        
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
                                type="tel"
                                placeholder="Phone Number"
                                name="phone"
                                value={phone}
                                onChange={onChange}
                                required
                            />
                            <span className="auth-input-icon">📱</span>
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
                        
                        <button type="submit" className="auth-submit-btn">Register</button>
                    </form>

                    <div className="auth-footer">
                        <p className="auth-footer-text">Already have an account?</p>
                        <Link to="/student-login" className="auth-footer-link">Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentRegisterPage;
