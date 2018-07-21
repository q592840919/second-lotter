<template>
  <div class="main-panel">
    <table class="main" cellpadding="0" cellspacing="0">
      <tbody >
        <tr>
          <th class="count-title">期数</th>
          <th v-for="item in stageNum">{{item}}</th>
          <th v-for="item in defaultNum" class="count">{{item}}</th>
        </tr>
        <tr>
          <td v-for="item in period.numbers"></td>
          <td v-for="item in period.countNum">
            <span class="lotte">{{item.num}}</span>
            <span class="cout" v-if="item.count">{{item.count}}</span>
          </td>
          <!-- <td><span class="lotte">1</span><span class="cout">2</span></td> -->
        </tr>
      </tbody>
    </table>
    <table class="vice"  cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <th v-for="item in defaultNum">{{item}}</th>
        </tr>
        <tr>
          <td v-for="item in period.numbers">
            <a href="/#/detail/1">1</a>
          </td>
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
</template>

<script>
import getData from '@/service/getData';
import {stageNum, defaultNum} from '@/config/panelConfig';
export default {
  name: 'main-panel',
  data() {
    return {
      now: Date,
      period: Object,
      stageNum: stageNum, 
      defaultNum: defaultNum
    };
  },
  mounted () {
    const vm = this;
    vm.init();
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
        vm.parseNum(vm.period);
      }
    },
    parseNum (obj) {
      obj.countNum = new Array(10);
      let i = 0,n = 0;
      for(;i<countNum.length;i++){
        vm.periods.numbers.forEach((item)=>{
          if(item === i){
            obj.countNum[i] = {
              num: item, 
              count: ++n
            };
          }
        })
        n = 0;
        obj.countNum[i] = obj.countNum[i] ? obj.countNum[i] : {num: ''};
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .main-panel {
    text-align: center;
    font-size: 0;
    .main{
      font-size: 18px;
      border-right: 0;
      display: inline-block;
      th{
        background-color: #fff6c2;
        padding: 0 12px;
      }
      .count-title{
        padding: 0 19px;
      }
      .count{
        padding: 0 19px;
        background-color: #c2ffe6;
      }
      td{
        .lotte{
          display: inline-block;
          width: 20px;
          border-radius: 50px;
          background-color: #c84c59;
          height: 20px;
          line-height: 20px;
          color: #FFFFFF;
        }
        .cout{
          color: #f6ab19;
          display: inline-block;
          margin-left: 3px;
        }
      }
    }
    .vice{
      font-size: 18px;
      display: inline-block;
      tr{
        th{
          background-color: #d7f2ff;
          padding: 0 15px;
        }
        td{
          cursor: pointer;
          color: #1E50A2;
        }
      }
    }
  }
</style>
