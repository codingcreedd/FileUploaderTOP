import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:1200/folders',
    withCredentials: true,
    responseType: 'json'
})