import axios from 'axios';
axios.defaults.baseURL = 'https://api.example.com';

export default {
    login (params) {
        axios.post(`/login${params}`);
    },
    periodList (dayId) {
        axios.get(`/period/${dayId}`);
    },
    boardDetail (params) {
        axios.get(`/board/${params.dayId}/${params.id}`);
    },
    boardList (dayId) {
        axios.get(`/board/${dayId}`);
    },
    board () {
        axios.get(`/board`);
    }
}