import axios from 'axios';

const API_URL = 'https://bus-tracking-backend-vwjm.onrender.com/api/auth'; // Adjust if your backend runs on a different port

// Register a new student
const registerStudent = (userData) => {
    return axios.post(`${API_URL}/student/register`, userData);
};

// Login a student
const loginStudent = (userData) => {
    return axios.post(`${API_URL}/student/login`, userData);
};

// Login a driver
const loginDriver = (credentials) => {
    return axios.post(`${API_URL}/driver/login`, credentials);
};

const authService = {
    registerStudent,
    loginStudent,
    loginDriver,
};

export default authService;
