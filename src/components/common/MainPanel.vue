<template>
  <div class="main-panel">
    <table class="main" cellpadding="0" cellspacing="0">
      <tbody >
        <tr>
          <th class="count-title">期数</th>
          <th v-for="item in stageNum">{{item}}</th>
          <th v-for="item in defaultNum" v-if="showCount" class="count">{{item}}</th>
        </tr>
        <tr v-for="(period,n) in periods" v-show="n<during||120">
          <td class="ids" >{{n+1}}</td>
          <td class="arr lotter" v-if="period.arr" v-for="item in period.arr"><span class="lotte">{{item}}</span></td>
          <td  v-if="!period.arr&&index<5" class="arr-null" v-for="(item,index) in defaultNum"></td>
          <td class="center" v-if="showCount" v-for="item in period.countNum">
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
          <td class="scores-it" v-for="item in period.scores">
            <a :href="'/index.html#/detail/'+now">{{item}}</a>
          </td>
        </tr>
        <tr>
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
  props: ['periods','showCount','during','now'],
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
        &:nth-child(6){
          border-right: 6px solid #f6ab19;
        }
        &:nth-child(16){
          border-right: 6px solid #f6ab19;
        }
      }
      .count-title{
        padding: 0 19px;
      }
      .count{
        padding: 0 19px;
        background-color: #c2ffe6;
      }
      td{
        height: 26px;
        &:nth-child(6){
          border-right: 6px solid #f6ab19;
        }
        &:nth-child(16){
          border-right: 6px solid #f6ab19;
        }
        .lotte{
          display: inline-block;
          width: 20px;
          border-radius: 50px;
          background-color: #fdf9f8;
          height: 20px;
          line-height: 20px;
          color: #000000;
          box-shadow: 0 0 10px #038fff;
        }
        .cout{
          color: #708b3a;
          display: inline-block;
          margin-left: 7px;
          margin-bottom: -3px;
          font-size: 11px;
        }
      }
      .center{
        background-color: #FFFEFF;
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
          background-color: #FFFEFF;
          a{
            
            color: #000000;
          }
        }
      }
      .scores-it{
        width: 42px;
        height: 26px;
      }
    }
  }
</style>
