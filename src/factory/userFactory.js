import getData from '@/service/getData';
export default {
    isLogin() {
        getData.checkLogin();
    }
}