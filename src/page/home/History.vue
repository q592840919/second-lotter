<template>
  <div class="history">
    <div class="date">
      选择往期日期：
      <date-picker v-model="time" :first-day-of-week="1"></date-picker>
      <span class="time-num">显示期数</span>
      <input />
    </div>
    <div class="content">
      <Main-panel :showCount="true"/>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import MainPanel from '@/components/common/MainPanel'
export default {
  name: 'market',
  data() {
    return {
      time: ''
    };
  },
  components: {
    DatePicker,
    MainPanel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.history {
  width: 1200px;
  margin: 30px auto 0;
  text-align: center;
  .date{
    padding-bottom: 20px;
    margin: auto;
    width: 1200px;
    margin-bottom: 30px;
    border-bottom: 1px dashed #DCDCDC;
    .time-num{
      margin-left: 30px;
    }
  }
}
</style>
