import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
    login (params) {
       return axios.post(`/login/`,params);
    },
    //获取首页所有数据
    periodList (dayId) {
       return axios.get(`/period/${dayId}`);
    },
    //添加中奖号码
    addAward (dayId,params) {
        return axios.post(`/period/${dayId}`, params ,{headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
        }});
    },
    //计算分值
    computePrice (dayId, params) {
        return axios.get(`/period/${dayId}/price?price=${params}`);
    },
    //副板详情
    boardDetail (num,dayId) {
        return axios.get(`/board/${num}/${dayId}`);
    },
    //查看副板某个数字分值
    board (params) {
        return axios.post(`/board/`+ params);
    },
    deleteBoard (params) {
        return axios.delete(`/board/`, params);
    },
    //返回所有生成副板数字
    boardListAll () {
        return axios.get(`/board/list`);
    },
    //生成副板
    viewBoard (dayId) {
        return axios.get(`/board/${dayId}`);
    },
}