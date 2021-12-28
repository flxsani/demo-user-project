import axios from 'axios';
// const API_ROOT = process.env.BASE_URL;
const API_ROOT = 'https://reqres.in/api/';

const ApiService = {
    getMethod(endpoint) {
        console.log("BaseUrl::", API_ROOT);
        return axios.get(`${API_ROOT}${endpoint}`).then(response => { return response.data; })
    },
    postMethod(endpoint, data) {
        return axios.post(`${API_ROOT}${endpoint}`, data).then(response => { return response.data; })
    },

};
export default ApiService;