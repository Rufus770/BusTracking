import axios from 'axios';

const API_URL = 'https://bus-tracking-backend-vwjm.onrender.com/api/buses';

const getBuses = (token) => {
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const busService = {
    getBuses,
};

export default busService;
