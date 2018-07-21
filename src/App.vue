<template>
  <div id="app">
    <Menu/>
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/common/Menu';
export default {
  name: 'App',
  components : {
    Menu
  }
};
</script>

<style lang="less">
@import './style/common.less';
#app {
}
</style>
