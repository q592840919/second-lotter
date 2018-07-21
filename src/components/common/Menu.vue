<template>
  <div class="menu">
    <ul class="menu-list">
      <li v-for="item in nav">
        <a @click="changeNav(item.path)" :class="{'choose' :item.path === isChoose}">
            {{item.name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { nav, chooseNav } from '@/config/navConfig';

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
    },
    init () {
      const vm = this;
      vm.colorNav();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .menu{
    border-bottom: 1px solid #f0f0f0;
    .menu-list{
      width: 1200px;
      margin: auto;
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
