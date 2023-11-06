import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `http://localhost:3000`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default axiosClient;