<template>
  <div class="index">
    <div class="time">
      当前系统时间：{{now}}
    </div>
    <div class="info">
      
    </div>
    <div class="main">
    </div>
    <div class="operation">
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      now: Date
    };
  },
  mounted () {
    const vm = this;
    vm.now = vm.getFormatDate(new Date());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .index {
    width: 1200px;
    margin: auto;
    .time {
      font-size: 18px;
    }
  }
</style>
