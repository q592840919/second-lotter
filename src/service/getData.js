import axios from 'axios';

export default {
    login (params) {
       return axios.post(`/login/`,params);
    },
    periodList (dayId) {
       return axios.get(`/period/${dayId}`);
    },
    boardDetail (params) {
        return axios.get(`/board/${params.dayId}/${params.id}`);
    },
    boardList (dayId) {
        return axios.get(`/board/${dayId}`);
    },
    board () {
        return axios.get(`/board`);
    },
    addPrice (params) {
        return axios.post(`/period`, params);
    },
    countPrice (dayId, params) {
        return axios.post(`/period/${dayId}`, params);
    }
}