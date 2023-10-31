import axios from "axios";
const api = axios.create(
    {
        //baseURL: 'http://192.168.1.10:3000',
        baseURL :'http://192.168.56.1:10101',
        timeout: 5000,
        //baseURL: 'http://192.168.101.12:3000'
    }
);

export default api;