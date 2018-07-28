<template>
  <div class="index">
    <div class="time">
      <div class="num-award">
        <span>中奖号码：</span>
        <input v-model="secDate.numbers" maxlength="5" @keyup.enter="addAward"/>
        <!-- <button  class="buttons" @click="addAward" >添加</button> -->

        <div class="award-time">
          上一期(<span class="reds">{{showNum}}</span>期数)中奖号码:<span class="reds">{{lastAward}}</span>
        </div>
      </div>
      <div class="operation">
        <div class="oprat">
          <input v-model="price" placeholder="输入每注金额(元)"/>
          <button @click="computePrice">计算下注金额</button>
        </div>
        <div class="info">
          <table class="pay"  cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <th>序号</th>
                <th v-for="item in defaultNum">{{item}}</th>
              </tr>
              <tr class="value-mog">
                <td>下注金额</td>
                <td  v-for="item in money">{{item}}</td>
              </tr>
              <tr>
                <th>遗漏步数</th>
                <th v-for="item in scores">{{item}}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="main">
      <Main-panel :showCount="true" :periods="periods" :now="getFormatDate(new Date(),1)"/>
    </div>
  </div>
</template>

<script>
import {defaultNum} from '@/config/panelConfig';
import MainPanel from '@/components/common/MainPanel';
import getData from '@/service/getData';
export default {
  name: 'index',
  data() {
    return {
      now: Date,
      periods: Object,  //主板副板返回值
      scores: Array,    //下注分数
      money: [],        //下注金额
      secDate: {        //主板副板参数
        periodId: '',
        numbers: '',
        dayId: ''
      },
      price: 1,          //输入金额
      defaultNum: defaultNum,
      showNum: null,
      lastAward: ''
    };
  },
  // filters: {
  //   subFour (value) {
  //     if(value){
  //       return Number(value).toFixed(4);
  //     }else{
  //       return '';
  //     }
  //   }
  // },
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
      vm.money = new Array(10);
      vm.getPeriodList();
    },
    async getPeriodList () {          //获取主板信息
      const vm = this,
      rep = await getData.periodList(vm.now);
      vm.periods = rep.data.periods;
      vm.scores = rep.data.scores;
      vm.parseNum(vm.periods);
    },
    parseNum (obj) {          //计算主板累计数字
      if(!obj){
        return;
      }
      const vm = this;
      obj.forEach((period,index) => {
        period.countNum = new Array(10);
        period.arr = period.numbers?period.numbers.split(''): null;
        if(!period.numbers&&!vm.showNum){
          vm.showNum = index;
          vm.lastAward = obj[index-1].numbers;
        }
        if(period.arr){
          period.arr.length = 5;
        }
        let i = 0,n = 0;
        for (;i<period.countNum.length;i++) {
          if(period.numbers){
            period.arr.forEach((item) => {
              if(parseInt(item) === i){
                period.countNum[i] = {
                  num: item,
                  count: ++n
                };
              }
            })
          }
          n = 0;
          period.countNum[i] = period.countNum[i] ? period.countNum[i] : {num: ''};
        }
      })
    },
    async addAward () {        //增加每期中奖号码
      const vm = this;
      if(vm.secDate.numbers.length!=5){
        return;
      }
      let rep = await getData.addAward(vm.now, `numbers=${vm.secDate.numbers}`);
      vm.secDate.numbers = '';
      vm.lastAward = vm.secDate.numbers;
      vm.showNum = vm.showNum + 1;
      vm.getPeriodList();
    },
    async editAward () {      //修改每期中奖号码
      const vm = this;
      let rep = await getData.addAward(vm.numbers);
      vm.getPeriodList();
    },
    async computePrice () {     //计算下注金额
      const vm = this,
      params = {
        price: vm.price,
        steps: `${vm.scores.join()}`
      };
      let rep = await getData.computePrice(vm.now, params);
      vm.money = rep.data;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .index {
    width: 1300px;
    margin: auto;
    input{
      margin-right: 10px;
    }
    .time {
      font-size: 18px;
      margin: 20px auto;
      display: table;
      width: 1180px;
      padding-bottom: 30px;
      border-bottom: 1px dashed #ABABAB;
      >div{
        display: inline-block;
      }
      .num-award{
        input{
          width: 200px;
          letter-spacing: 5px;
          font-size: 30px;
          height: 50px;
          color: red;
        }
        .buttons{
          display: block;
          margin: 10px 0 10px 200px;
        }
      }
      .award-time{
        margin: 20px 0;
        .reds{
          color: red;
          font-size: 25px;
        }
      }
      .operation{
        text-align: right;
        float: right;
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
  }
</style>
