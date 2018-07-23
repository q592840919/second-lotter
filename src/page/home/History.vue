<template>
  <div class="history">
    <div class="date">
      选择往期日期：
      <date-picker v-model="time" :first-day-of-week="1" @change="getPeriodList(time)"></date-picker>
      <span class="time-num">显示期数</span>
      <input v-model="during"/>
    </div>
    <div class="content">
      <Main-panel :showCount="false" :periods="periods" :during="during"/>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import MainPanel from '@/components/common/MainPanel'
import getData from '@/service/getData';
export default {
  name: 'history',
  data() {
    return {
      time: new Date(),
      now: Date,
      periods: Object,
      during: 120
    };
  },
  components: {
    DatePicker,
    MainPanel
  },
   mounted () {
    const vm = this;
    vm.init();
  },
  methods: {
    init () {
      const vm = this;
      vm.now = vm.getFormatDate(new Date(),1);
      vm.getPeriodList();
    },
    async getPeriodList (dayid) {          //获取主板信息
      const vm = this,
      rep = await getData.periodList(dayid ? vm.getFormatDate(dayid,1) : vm.now);
      vm.periods = rep.data.periods;
      vm.periods.forEach((period,index) => {
        period.arr = period.numbers?period.numbers.split(''): null;
        if(period.arr){
          period.arr.length = 5;
        }
      });
    }
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
