import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/home/Index';
import Login from '@/page/home/Login';
import Detail from '@/page/home/Detail';
import History from '@/page/home/History';
import Subplate from '@/page/home/Subplate';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Index
    },
    {
      path: '/subplate',
      component: Subplate
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    {
      path: '/history',
      component: History
    }
  ]
});
