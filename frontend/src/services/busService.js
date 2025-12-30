import axios from 'axios';

const API_URL = 'http://localhost:5005/api/buses';

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
