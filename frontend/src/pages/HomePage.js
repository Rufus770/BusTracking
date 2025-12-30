import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="home-content">
                <h1 className="home-title" data-text="Bus Tracking System">Bus Tracking System</h1>
                <p className="home-subtitle">Real-time location tracking for buses and students</p>
                
                <div className="home-buttons">
                    <Link to="/driver-login" className="home-btn home-btn-driver">
                        Driver Access
                    </Link>
                    <Link to="/student-login" className="home-btn home-btn-student">
                        Student Access
                    </Link>
                </div>

                <div className="home-feature-grid">
                    <div className="home-feature-card">
                        <div className="home-feature-icon">🚌</div>
                        <h3 className="home-feature-title">Live Tracking</h3>
                        <p className="home-feature-desc">Track bus locations in real-time with GPS accuracy</p>
                    </div>
                    <div className="home-feature-card">
                        <div className="home-feature-icon">📍</div>
                        <h3 className="home-feature-title">Easy Navigation</h3>
                        <p className="home-feature-desc">Interactive maps with smooth navigation experience</p>
                    </div>
                    <div className="home-feature-card">
                        <div className="home-feature-icon">🔒</div>
                        <h3 className="home-feature-title">Secure Access</h3>
                        <p className="home-feature-desc">Protected authentication for drivers and students</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
