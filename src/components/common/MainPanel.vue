<template>
  <div class="main-panel">
    <table class="main" cellpadding="0" cellspacing="0">
      <tbody >
        <tr>
          <th class="count-title">期数</th>
          <th v-for="item in stageNum">{{item}}</th>
          <th v-for="item in defaultNum" v-if="showCount" class="count">{{item}}</th>
        </tr>
        <tr v-if="period.numbers" v-for="(period,n) in periods" v-show="n<during||120">
          <td class="ids" >{{n+1}}</td>
          <td class="arr" v-for="item in period.arr">{{item}}</td>
          <td v-if="showCount&&period.arr" v-for="item in period.countNum">
            <span :class="{'lotte': item.count}">{{item.num}}</span>
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
        <tr v-for="period in periods">
          <td v-for="item in period.scores">
            <a :href="'/#/detail/'+period.id">{{item}}</a>
          </td>
          <td v-for="item in periods.steps">
            {{item}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {stageNum, defaultNum} from '@/config/panelConfig';
export default {
  name: 'main-panel',
  props: ['periods','showCount','during'],
  data() {
    return {
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
      console.log(this.periods);
    },
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
      vertical-align: top;
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
