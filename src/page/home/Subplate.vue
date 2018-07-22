<template>
  <div class="subplate">
    <div class="init">
      <span class="">需要生成的副板数：</span><input v-model="viceNum" @change="initVice" maxlength="3"/>
    </div>
    <div class="content">
      <div class="left">
        <div class="info">
          <div class="oprat">
            <button >生成副板</button>
          </div>
          <div class="list" v-for="item in panel">
            <span>{{item}}</span><input v-model="item.value" maxlength="10"/>
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
            <tr>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {defaultNum} from '@/config/panelConfig';
export default {
  name: 'subplate',
  data() {
    return {
      viceNum: 20,
      panel: Array,
      defaultNum: defaultNum,
      choosePanel: 0
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
    initVice () {
      const vm = this;
      vm.panel = new Array(parseInt(vm.viceNum));
      let i = 0;
      for (;i<vm.panel.length;i++) {
        vm.panel[i] = i + 1;
      }
    },
    initBoard (){
      
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
        width: 215px;
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
              padding: 0 10px;
              background-color: #d7f2ff;
              width: 48px;
            }
            input{
              border-radius: 0;
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
