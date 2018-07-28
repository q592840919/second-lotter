export default {
    isLogin () {
        if(!window.sessionStorage.getItem('isLogin')){
            location.href = '/index.html#/login';
        }
    }
}