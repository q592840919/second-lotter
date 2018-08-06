import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
    login(params) {
        return axios.post(`/login/`, params);
    },
    //获取首页所有数据
    periodList(dayId) {
        return axios.get(`/period/${dayId}`);
    },
    //添加中奖号码
    addAward(dayId, params) {
        return axios.post(`/period/${dayId}`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    editAward(params) {
        return axios.get(`/period/${params.dayId}/${params.periodId}?numbers=${params.numbers}`);
    },
    //计算分值
    computePrice(dayId, params) {
        return axios.get(`/period/${dayId}/price?price=${params.price}&steps=${params.steps}`);
    },
    //副板详情
    boardDetail(num, dayId) {
        return axios.get(`/board/${num}/${dayId}`);
    },
    //查看副板某个数字分值
    board2(num) {
        return axios.get(`/board2/` + num);
    },
    deleteBoard(num) {
        return axios.delete(`/board/${num}`);
    },
    //返回所有生成副板数字
    boardListAll(dayId) {
        return axios.get(`/board/list/${dayId}`);
    },
    //返回所有生成副板数字
    boardAll() {
        return axios.get(`/board/list/`);
    },
    //生成副板
    viewBoard(dayId) {
        return axios.get(`/board/${dayId}`);
    },
    checkLogin() {
        return axios.get(`/login/status`);
    }
}
