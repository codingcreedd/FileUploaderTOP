import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:1200/logs',
    withCredentials: true
})