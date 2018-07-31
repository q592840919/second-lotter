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
          <td class="center" v-for="(item,n) in num">
            <span :class="{'import':steps1[i][n]===0&&i<showSteps}">{{item}}</span>
            <span  class="import" :class="{'special': steps1[i][n] ===1 || !(steps1[i][n]===0&&i<showSteps)}" v-if="i<showSteps&&steps1[i][n]!==0">{{steps1[i][n]}}</span>
            <span class="show-line" v-if="(i < showSteps)&&(steps1[i][n]!==0)"
              :class="{
                'blue': steps1[i + (5 - steps1[i][n])][n] === 5,
                'yellow': steps1[i + (12 - steps1[i][n])][n] === 12,
                'origin': steps1[i + (15 - steps1[i][n])][n] === 15,
                'red': steps1[i + (20 - steps1[i][n])][n] === 20
              }"
            ></span>
          </td>
        </tr>
      </tbody>
      <tbody style="margin-left: -5px;border-left: 2px solid #ABABAB">
        <tr>
          <th v-for="item in content[0].name.split('')">{{item}}</th>
        </tr>
        <tr v-for="(num,i) in content[0].boardNumbers" v-if="num">
          <td v-for="(item,n) in num">
            <span :class="{'import':steps0[i][n]===0&&i<showSteps}">{{item}}</span>
            <span class="import" :class="{'special': steps0[i][n] ===1 || !(steps0[i][n]===0&&i<showSteps)}"  v-if="i<showSteps&&steps0[i][n]!==0">{{steps0[i][n]}}</span>
            <span class="show-line" v-if="(i < showSteps)&&(steps0[i][n]!==0)"
              :class="{
                'blue': steps0[i + (5 - steps0[i][n])][n] === 5,
                'yellow': steps0[i + (12 - steps0[i][n])][n] === 12,
                'origin': steps0[i + (15 - steps0[i][n])][n] === 15,
                'red': steps0[i + (20 - steps0[i][n])][n] === 20
              }"
            ></span>
            <!--((steps0[i][n]!==0)&&(steps0[i + (5 - steps0[i][n])][n] === 5))
                数字必须不为0且 数字以5为基准，如果i+(5 - steps0[i][n])][n]，数字列i加上（5减去数字，比如当前数字2的话，
                第10行，如果第13行为5，那么就可以加上标记）
            -->
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
  props: ['content','showSteps','steps0','steps1'],
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
        &:nth-child(6n){
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
        height: 25px;
        &:nth-child(6n){
          border-right: 6px solid #f6ab19;
        }
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
            &:nth-child(10n){
              border-right: 6px solid #f6ab19!important;
            }
          }
          td{
            width: 55px;
            position: relative;
            &:nth-child(10n){
              border-right: 6px solid #f6ab19;
            }
            .import {
              display: inline-block;
              width: 20px;
              border-radius: 50px;
              background-color: #c94c58;
              height: 20px;
              line-height: 20px;
              color: #FFFFFF;
            }
            .special{
              color: #ff1111;
              font-size: 11px;
              width: 1px;
              margin-left: 6px;
              background-color: #fdf9f8;
              box-shadow: none;
            }
            .show-line{
              position: absolute;
              height: 26px;
              display: block;
              z-index: 10;
              top: 0;
              left: 22px;
            }
            .blue{
              border-left: 2px solid blue;
            }
            .yellow{
              border-left: 2px solid #56ff00;
            }
            .origin{
              border-left: 2px solid #ffe600;
            }
            .red{
              border-left: 2px solid red;
            }
          }
            .center{
            }
        }
      }
    }
  }
</style>
