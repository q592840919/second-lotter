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
        <span>中奖号码：</span>
        <input v-model="secDate.numbers" maxlength="5"/>
        <button @click="addAward">添加</button>
      </div>
    </div>
    <div class="time">
      <div>
        <!-- <span>当前系统时间：</span>
        <span class="is-time">{{now}}</span> -->
        <!-- <span>中奖号码：</span>
        <input v-model="secDate.numbers"/>
        <span>期数：</span>
        <input v-model="secDate.periodId"/>
        <button @click="editAward">修改</button> -->
      </div>
    </div>
    <div class="main">
      <Main-panel :showCount="true" :periods="periods"/>
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
              <th>下注分值</th>
              <th v-for="item in scores">{{item}}</th>
            </tr>
            <tr class="value-mog">
              <td>下注金额</td>
              <td  v-for="item in money">{{item}}</td>
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
      periods: Object,  //主板副板返回值
      scores: Array,    //下注分数
      money: [],        //下注金额
      secDate: {        //主板副板参数
        periodId: '',
        numbers: '',
        dayId: ''
      },
      price: 1          //输入金额
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
      obj.forEach((period,index) => {
        period.countNum = new Array(10);
        period.arr = period.numbers?period.numbers.split(''): null;
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
      let rep = await getData.addAward(vm.now, `numbers=${vm.secDate.numbers}`);
      vm.getPeriodList();
    },
    async editAward () {      //修改每期中奖号码
      const vm = this;
      let rep = await getData.addAward(vm.numbers);
      vm.getPeriodList();
    },
    async computePrice () {     //计算下注金额
      const vm = this;
      let rep = await getData.computePrice(vm.now, vm.price);
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
