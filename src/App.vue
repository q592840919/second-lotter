<template>
  <div id="app">
    <Menu/>
    <router-view/>
  </div>
</template>

<script>
import userFactory from "@/factory/userFactory";
import interceptors from "@/factory/interceptors";
import Menu from "@/components/common/Menu";
export default {
  name: "App",
  components: {
    Menu
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      userFactory.isLogin();
    }
  },
  watch: {
    $route: "init"
  }
};
</script>

<style lang="less">
@import "./style/common.less";
#app {
}
</style>
