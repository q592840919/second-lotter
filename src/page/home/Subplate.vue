<template>
  <div class="subplate">
    <div class="init">
      <!-- <span class="">需要生成的副板数：</span><input v-model="viceNum" @change="initVice" maxlength="3"/> -->
    </div>
    <div class="content">
      <div class="left">
        <div class="info">
          <div class="oprat">
            <button @click="initBoard(false)">生成副板</button>
          </div>
          <div class="list" v-for="(item,i) in panel">
            <span :class="{'choose': chooseNum === i+1}" @click="viewBoard(item.value,i+1)">{{i+1}}</span>
            <input :class="{'chooseer': chooseNum === i+1}" :value="item.value" maxlength="10"/>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">副板分值</div>
        <table class="vice"  cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <th v-for="item in defaultNum">{{item}}</th>
            </tr>
            <tr v-for="vPanel in vicePanel[0]">
              <td v-for="item in vPanel.numbers">{{item}}</td>
            </tr>
            <tr v-for="vPanel in vicePanel[1]">
              <td v-for="item in vPanel.numbers">{{item}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {defaultNum} from '@/config/panelConfig';
import getData from '@/service/getData';
export default {
  name: 'subplate',
  data() {
    return {
      now: Date,
      viceNum: 200,         //初始化左侧副板数
      defaultNum: defaultNum,
      panel: [],       //左侧副板填入框
      chooseNum: 1,          //选择的左侧副板数字
      vicePanel: []         //右侧副板
    };
  },
  mounted () {
    const vm = this;
    vm.init();
  },
  methods: {
    init () {
      const vm = this;
      vm.initVice();
    },
    async initVice () {         //初始化左边副板填入框
      const vm = this;
      vm.now = vm.getFormatDate(new Date(),1);
      for(let index = 0; index < vm.viceNum; index++){
        vm.$set(vm.panel,index,'');
      }
      let i = 0, rep;
      rep = await getData.boardListAll();     //获取左边的值
      
      for (;i<rep.data.length;i++) {
        vm.panel[i] = {
          value: rep.data[i]
          };
      }
      if(vm.panel[0].value){
        vm.viewBoard(vm.panel[0].value);
      }
    },
    changeNum (i) {       //选择数字生成副板
      const vm = this;
      if(vm.panel[i]){
        vm.viewBoard(vm.panel[i]);
      }
    },
    async viewBoard (num,i){         //生成右侧副板
      const vm = this,
      rep = await getData.viewBoard(num);
      vm.vicePanel = rep.data;
      if(i){
      vm.chooseNum = i;
      }
    },
    async initBoard (num){         //生成右侧副板
      const vm = this,
      rep = await getData.board(document.querySelector('.chooseer').value);
      vm.vicePanel = rep.data;
    }
  } 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .subplate {
    width: 1000px;
    margin: auto;
    .init{
      margin-top: 30px;
    }
    .content{
      margin-top: 30px;
      .left{
        display: inline-block;
        width: 220px;
        margin-right: 50px;
        vertical-align: middle;
        .info{
          padding-top: 20px;
          border-top: 1px dashed #CCCCCC;
          .oprat{
            margin-bottom: 20px;
          }
          .list{
            span{
              border: 1px solid #BCBCBC;
              border-right: 0;
              line-height: 27px;
              display: inline-block;
              vertical-align: middle;
              text-align: center;
              background-color: #d7f2ff;
              width: 32px;
              text-align: center;
              cursor: pointer;
            }
            .choose{
              background-color: #ffb100;
              color: #FFFFFF;
            }
            input{
              border-radius: 0;
              letter-spacing: 2px;
              font-size: 14px;
            }
          }
        }
      }
      .right{
        display: inline-block;
        vertical-align: top;
        padding-top: 20px;
        border-top: 1px dashed #CCCCCC;
        .title{
          text-align: center;
          margin-bottom: 20px;
        }
        .vice{
          width: 600px;
          th{
            width: 35px;
          }
        }
      }
    }
  }
</style>
