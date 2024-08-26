import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:1200/files',
    withCredentials: true,
    responseType: 'json'
})