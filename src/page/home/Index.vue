<template>
  <div class="index">
    <div class="lotte-time">
        <!-- <span>上一期开奖：</span>
        <span class="lot-num">33333</span> -->
        <!-- <span>下一期开奖时间：</span>
        <span class="is-time">{{now}}</span> -->
    </div>
    <div class="time">
      <div>
        <!-- <span>当前系统时间：</span>
        <span class="is-time">{{now}}</span> -->
        <span>期数：</span>
        <input v-model="secDate.price"/>
        <span>中奖号码：</span>
        <input v-model="secDate.numbers"/>
        <button @click="addPrice">添加</button>
      </div>
    </div>
    <div class="main">
      <Main-panel :showCount="true" :periods="periods"/>
    </div>
    <div class="operation">
      <div class="oprat">
        <input placeholder="输入每注金额(元)"/>
        <button>计算下注金额</button>
      </div>
      <div class="info">
        <table class="pay"  cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <th>下注分值</th>
              <th v-for="item in scores">{{item}}</th>
            </tr>
            <tr>
              <td>下注金额</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import MainPanel from '@/components/common/MainPanel';
import getData from '@/service/getData';
export default {
  name: 'index',
  data() {
    return {
      now: Date,
      periods: Object,
      scores: Array,
      secDate: {
        price: '',
        numbers: '',
        dayId: ''
      }
    };
  },
  mounted () {
    const vm = this;
    vm.init();
  },
  components: {
    MainPanel
  },
  methods: {
    init () {
      const vm = this;
      vm.now = vm.secDate.dayId = vm.getFormatDate(new Date(),1);
      vm.getPeriodList();
    },
    async getPeriodList () {
      console.log(getData.periodList);
      const vm = this,
      rep = await getData.periodList(vm.now);
      vm.periods = rep.data.periods;
      vm.scores = rep.data.scores;
      vm.parseNum(vm.periods);
    },
    parseNum (obj) {
      if(!obj){
        return;
      }
      obj.forEach((period,index) => {
        period.countNum = new Array(10);
        let i = 0,n = 0;
        for (;i<period.countNum.length;i++) {
          period.numbers.forEach((item) => {
            if(item === i){
              period.countNum[i] = {
                num: item, 
                count: ++n
              };
            }
          })
          n = 0;
          period.countNum[i] = period.countNum[i] ? period.countNum[i] : {num: ''};
        }
      })
    },
    async addPrice () {
      const vm = this;
      let rep = await getData.addPrice(vm.secDate);
      
    }
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
      margin: 20px 0;
    }
    .lotte-time{
      margin-top: 20px;
      .lot-num{
        color: red;
        margin-right: 30px;
      }
    }
    .main {
      margin-top: 60px;
    }
    .operation{
      margin-top: 60px;
      text-align: right;
      .info{
        float: right;
        margin: 10px 0;
        table{
          td{
            line-height: 35px;
          }
          th{
            padding: 0 15px;
          }
        }
      }
    }
  }
</style>
