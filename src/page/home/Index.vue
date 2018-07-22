<template>
  <div class="index">
    <div class="time">
      <div>
        <span>当前系统时间：</span>
        <span class="is-time">{{now}}</span>
      </div>
    </div>
    <div class="lotte-time">
        <span>上一期开奖：</span>
        <span class="lot-num">33333</span>
        <span>下一期开奖时间：</span>
        <span class="is-time">{{now}}</span>
    </div>
    <div class="main">
      <Main-panel/>
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
import MainPanel from '@/components/common/MainPanel'
import {defaultNum} from '@/config/panelConfig';
import getData from '@/service/getData';
export default {
  name: 'index',
  data() {
    return {
      now: Date,
      defaultNum: defaultNum,
      period: Object,
      stageNum: stageNum, 
      scores: Array
    };
  },
  mounted () {
    const vm = this;
    vm.now = vm.getFormatDate(new Date());
    vm.init();
  },
  components: {
    MainPanel
  },
  methods: {
    init () {
      const vm = this;
      vm.now = vm.getFormatDate(new Date());
    },
    async getPeriodList () {
      const vm = this,
      rep = await getData.periodList();
      if(rep.success){
        vm.periods = rep.data.data.periods;
        vm.scores = rep.data.data.scores;
        vm.parseNum(vm.periods);
      }
    },
    parseNum (obj) {
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
