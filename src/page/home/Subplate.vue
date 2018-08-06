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
          <div class="list-all" v-if="openVice">
            <div class="list" v-for="(item,i) in panel">
              <span class="titles" :class="{'choose': chooseNum === i+1}" @click="viewBoard(item.value,i+1)">{{i+1}}</span>
              <input :class="{'chooseer': chooseNum === i+1}" v-model="item.value" @keyup.enter="initBoard" maxlength="10"/>
              <span class="close" @click="close(item.value,i)">X</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">副板分值</div>
        <table class="vice"  cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <th v-for="item in vicePanel[1].name.split('')" class="title-num">{{item}}</th>
              <th class="choose">序号</th>
            </tr>
            <tr v-for="(vPanel,i) in vicePanel[1].numbers">
              <td v-for="item in vPanel" >{{item}}</td>
              <td class="choose">{{i+1}}</td>
            </tr>
          </tbody>
          
          <tbody>
            <tr>
              <th v-for="item in vicePanel[0].name.split('')" class="title-num">{{item}}</th>
              <th class="choose">序号</th>
            </tr>
            <tr v-for="(vPanel,i) in vicePanel[0].numbers">
              <td v-for="item in vPanel" >{{item}}</td>
              <td class="choose">{{i+1}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultNum } from "@/config/panelConfig";
import getData from "@/service/getData";
export default {
  name: "subplate",
  data() {
    return {
      now: Date,
      viceNum: 3000, //初始化左侧副板数
      defaultNum: defaultNum,
      panel: [], //左侧副板填入框
      chooseNum: 1, //选择的左侧副板数字
      openVice: false,
      vicePanel: [{ name: "", numbers: [] }, { name: "", numbers: [] }] //右侧副板
    };
  },
  mounted() {
    const vm = this;
    vm.init();
  },
  methods: {
    init() {
      const vm = this;
      vm.initVice();
    },
    async initVice() {
      //初始化左边副板填入框
      const vm = this;
      vm.now = vm.getFormatDate(new Date(), 1);
      vm.panel = new Array(vm.viceNum);
      for (let index = 0; index < vm.viceNum; index++) {
        vm.panel[index] = {
          value: ""
        };
      }
      let i = 0,
        response = await getData.boardListAll(vm.now),
        rep;
      rep = response.data; //获取左边的值

      for (; i < rep.data.length; i++) {
        vm.panel[i] = {
          value: rep.data[i].value
        };
      }

      vm.openVice = true;
      if (vm.panel[0].value) {
        vm.viewBoard(vm.panel[0].value);
      }
    },
    async viewBoard(num, i) {
      //生成右侧副板
      let vm = this,
        rep;
      vm.chooseNum = i || vm.chooseNum;
      if (!num) {
        return;
      } else {
        rep = await getData.viewBoard(num);
        vm.vicePanel = rep.data[0]
          ? rep.data
          : [[{ numbers: [] }], [{ numbers: [] }]];
      }
    },
    async initBoard() {
      //生成右侧副板
      const vm = this,
        rep = await getData.board2(document.querySelector(".chooseer").value);
      if (rep.data.success) {
        vm.viewBoard(document.querySelector(".chooseer").value);
      } else {
        alert(rep.data.errorMsg);
      }
    },
    async close(num, i) {
      const vm = this;
      if (!num) {
        return;
      }
      vm.$set(vm.panel, i, { value: "" });
      const rep = await getData.deleteBoard(num);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.subplate {
  width: 1200px;
  margin: auto;
  .choose {
    background-color: #ffb100;
    color: #ffffff;
  }
  .title-num {
    color: #3d61cf;
    background-color: #fff6f5;
  }
  .init {
    margin-top: 30px;
  }
  .content {
    margin-top: 30px;
    .left {
      display: inline-block;
      width: 230px;
      margin-right: 50px;
      vertical-align: middle;
      .info {
        padding-top: 20px;
        border-top: 1px dashed #cccccc;
        .oprat {
          margin-bottom: 20px;
        }
        .list-all {
          height: 800px;
          overflow: auto;
          .list {
            .titles {
              border: 1px solid #bcbcbc;
              border-right: 0;
              line-height: 27px;
              display: inline-block;
              vertical-align: middle;
              text-align: center;
              background-color: #d7f2ff;
              width: 55px;
              text-align: center;
              cursor: pointer;
            }
            .choose {
              background-color: #ffb100;
              color: #ffffff;
            }
            input {
              border-radius: 0;
              letter-spacing: 2px;
              font-size: 14px;
              margin-left: -5px;
              width: 120px;
            }
            .close {
              display: none;
              cursor: pointer;
              font: 20px/20px sans-serif;
              color: #009ddc;
            }
            &:hover {
              .close {
                display: inline-block;
              }
            }
          }
        }
      }
    }
    .right {
      display: inline-block;
      vertical-align: top;
      padding-top: 20px;
      border-top: 1px dashed #cccccc;
      .title {
        text-align: center;
        margin-bottom: 20px;
      }
      .vice {
        width: 792px;
        tbody {
          display: inline-block;
        }
        th {
          width: 35px;
        }
        .panels {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
