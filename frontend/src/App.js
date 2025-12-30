import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import HomePage from './pages/HomePage';
import DriverLoginPage from './pages/DriverLoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentRegisterPage from './pages/StudentRegisterPage';
import BusSelectionPage from './pages/BusSelectionPage';
import StudentBusSelectionPage from './pages/StudentBusSelectionPage';
import MapViewPage from './pages/MapViewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/driver-login" element={<DriverLoginPage />} />
        <Route path="/student-login" element={<StudentLoginPage />} />
        <Route path="/student-register" element={<StudentRegisterPage />} />
        <Route path="/driver/bus-selection" element={<BusSelectionPage />} />
        <Route path="/student/bus-selection" element={<StudentBusSelectionPage />} />
        <Route path="/map/:busId" element={<MapViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
