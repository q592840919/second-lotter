import axios from 'axios';
axios.defaults.baseURL = 'https://api.example.com';

export default {
    awardNum () {
        axios.get('/admin');
    }
}