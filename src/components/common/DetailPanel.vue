<template>
  <div class="main-panel">
    <table class="main" cellpadding="0" cellspacing="0">
      <tbody >
        <tr>
          <th class="count-title">期数</th>
          <th v-for="item in stageNum">{{item}}</th>
        </tr>
        <tr v-for="(arr,n) in content[0].arr" >
          <td class="ids" >{{n+1}}</td>
          <td v-if="arr" class="arr" v-for="item in arr">{{item}}</td>
          <td v-if="!arr&&index<5" class="arr-null" v-for="(item,index) in defaultNum"></td>
        </tr>
      </tbody>
    </table>
    <table  class="vice"  cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <th v-for="item in content[1].name.split('')">{{item}}</th>
        </tr>
        <tr v-for="(num,i) in content[1].boardNumbers" v-if="num">
          <td v-for="(item,n) in num">
            <span >{{item}}</span>
            <span  class="import"  v-if="i<showSteps">{{content[1].steps[i][n]}}</span>
          </td>
        </tr>
      </tbody>
      <tbody style="margin-left: -5px;border-left: 2px solid #ABABAB">
        <tr>
          <th v-for="item in content[0].name.split('')">{{item}}</th>
        </tr>
        <tr v-for="(num,i) in content[0].boardNumbers" v-if="num">
          <td v-for="(item,n) in num">
            <span >{{item}}</span>
            <span  class="import" v-if="i<showSteps">{{content[0].steps[i][n]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {stageNum, defaultNum} from '@/config/panelConfig';
export default {
  name: 'detail-panel',
  props: ['content','showSteps'],
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
      tbody{
        display: inline-block;
        tr{
          th{
            background-color: #d7f2ff;
            padding: 0 15px;
          }
          td{
            color: #bd8b18;
            width: 55px;
            .import {
              display: inline-block;
              width: 20px;
              border-radius: 50px;
              background-color: #0088ff;
              height: 20px;
              line-height: 20px;
              color: #FFFFFF;
            }
          }
        }
      }
    }
  }
</style>
