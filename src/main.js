// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import jquery from 'jquery';
import App from './App';
import router from './router/router';

window.$ = jquery;

Vue.config.productionTip = false;

Vue.prototype.getFormatDate = (date, type) => {
  let o = {
    'year': date.getFullYear(),
    'month': (date.getMonth() + 1).toString().length === 1 ? 0 + (date.getMonth() + 1).toString() : date.getMonth() + 1,
    'day': date.getDate(),
    'hours': date.getHours(),
    'min': date.getMinutes().toString().length === 1 ? 0 + date.getMinutes().toString() : date.getMinutes(),
    'second': date.getSeconds().toString().length === 1 ? 0 + date.getSeconds().toString() : date.getSeconds()
  };
  switch (type){
    case 1:
      return `${o.year}${o.month}${o.day}`;
    default:
      return `${o.year}-${o.month}-${o.day} ${o.hours}:${o.min}:${o.second}`;
  }
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
