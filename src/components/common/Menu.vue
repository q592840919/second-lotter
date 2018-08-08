<template>
  <div class="menu" v-if="$route.path!=='/login'">
    <ul class="menu-list">
      <li v-for="item in nav">
        <a @click="changeNav(item.path)" :class="{'choose' :item.path === isChoose}">
            {{item.name}}
        </a>
      </li>
    <button class="logout" @click="logout">登出</button>
    </ul>
  </div>
</template>

<script>
import { nav, chooseNav } from '@/config/navConfig';
import getData from "@/service/getData";
export default {
  name: 'menus',
  data() {
    return {
      nav: nav,
      isChoose: String,
      chooseNav: chooseNav
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    changeNav (path) {
      const vm = this;
      vm.$router.push(path);
      vm.colorNav();
    },
    colorNav () {
      const vm = this;
      for(let i in vm.chooseNav){
        if(vm.chooseNav[i].path === vm.$route.path){
          vm.isChoose = vm.chooseNav[i].code;
        }
      }
      if(vm.$route.path.indexOf('detail') !== -1){
        vm.isChoose = '/subplate';
      }
    },
    init () {
      const vm = this;
      vm.colorNav();
    },
    async logout () {
      const vm = this,
      rep = await getData.logout();
      if(rep.data === 1){
        vm.$router.push("/index.html#/login");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .menu{
    border-bottom: 1px solid #f0f0f0;
    .menu-list{
      width: 1000px;
      margin: auto;
      .logout{
        float: right;
        margin-top: 10px;
      }
      li{
        display: inline-block;
        margin-right: 30px;
        line-height: 50px;
        font-size: 20px;
        a{
          color: #333333;
          cursor: pointer;
        }
        .choose{
          color: #009DDC;
        }
      }
    }
  }
</style>
