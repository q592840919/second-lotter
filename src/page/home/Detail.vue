<template>
  <div class="detail">
    <div class="date">
      <span class="now-date">当前查看日期：</span>
      <span class="is-time marginr-15">{{now}}</span>
      <!-- <span class="now-num ">当前查看数字：</span>
      <span class="marginr-15"></span>
      <span class="other">其他可查看数字：</span>
      <span class=""></span> -->
    </div>
    <div class="num">
      <p>副板列表</p>
      <div class="list">
        <div class="every-num" v-if="stepsLists[i]" v-for="(item,i) in panels" @click="changeNum(i)">
          <span v-if="item" class="ids" :class="{'choose': chooseNum === i}" :style="{'background-color':stepsLists[i].color}">{{i+1}}</span>
          <span v-if="item" class="value">{{item.value}}</span>
        </div>
      </div>
    </div>
    <div class="panel">
      <Detail-panel :showSteps="showSteps" v-if="openStep" :content="content" :steps0="content[0].steps" :steps1="content[1].steps"/>
    </div>
  </div>
</template>

<script>
import DetailPanel from "@/components/common/DetailPanel";
import getData from "@/service/getData";
export default {
  name: "detail",
  data() {
    return {
      now: Date,
      panels: Array, //副板列表
      content: Array, //副板详情参数
      chooseNum: 0,
      showSteps: 120,
      openStep: false,
      stepsLists: ""
    };
  },
  mounted() {
    const vm = this;
    vm.init();
  },
  components: {
    DetailPanel
  },
  methods: {
    init() {
      const vm = this;
      vm.now = vm.$route.params.dayId || vm.getFormatDate(new Date(), 1);
      vm.getBoardList(vm);
    },

    async getBoardList() {
      //生成上面副板列表
      const vm = this,
        response = await getData.boardListAll(vm.now),
        rep = response.data;
      console.log(rep);
      vm.panels = new Array(rep.data.length);
      vm.panels = rep.data;
      vm.getBoardDetail(vm.panels[0].value);
      vm.checkStepList();
    },
    changeNum(i) {
      //选择数字生成副板
      const vm = this;
      vm.chooseNum = i;
      if (vm.panels[i]) {
        vm.getBoardDetail(vm.panels[i].value);
      }
    },
    async getBoardDetail(id) {
      //生成下面副板详情
      const vm = this,
        rep = await getData.boardDetail(id, vm.now);
      vm.content = rep.data;
      vm.content[0].arr = [];
      vm.content[0].numbers.forEach((cent, index) => {
        vm.content[0].arr[index] = cent ? cent.split("") : null;
        if (cent) {
          vm.showSteps = index;
        }
      });
      vm.showSteps = vm.showSteps + 2;
      vm._numLineColor(0);
      vm._numLineColor(1);
      console.log(vm.content);
      vm.openStep = true;
    },
    async checkStepList() {
      const vm = this;
      let rep = await getData.boardListAll(vm.now);
      vm.stepsLists = rep.data.data;
      //计算最大值
      vm.stepsLists.forEach((item, i) => {
        item.maxValue = Math.max.apply(
          null,
          item.steps[0].concat(item.steps[1])
        );
        if (19 < item.maxValue) {
          item.color = "red";
        } else if (15 < item.maxValue) {
          item.color = "#ffe600";
        } else if (12 < item.maxValue) {
          item.color = "#56ff00";
        } else if(9 < item.maxValue){
          item.color = "blue";
        }
      });
    },
    _numLineColor(index) {
      let vm = this,
        obj = vm.content[index],
        i = obj.steps.length - 1,
        n = 0;
      obj.color = JSON.parse(JSON.stringify(obj.steps));
      for (; n < 10; ++n) {
        for (; 0 <= i; i--) {
          obj.color[i][n] = "";
          if (5 <= obj.steps[i][n]) {
            vm._writeLine(obj, i, n);
            i = i - obj.steps[i][n] + 1;
          }
        }
        i = obj.steps.length - 1;
      }
    },
    _writeLine(obj, i, n) {
      let color,
        num = obj.steps[i][n],
        z = 0;
      //是啥颜色
      if (num >= 20) {
        color = "red";
      } else if (num >= 16) {
        color = "origin";
      } else if (num >= 13) {
        color = "yellow";
      } else {
        color = "blue";
      }
      //赋值颜色
      for (; z < num; z++) {
        obj.color[i][n] = color;
        i--;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.detail {
  width: 1400px;
  margin: auto;
  .date {
    margin-top: 30px;
    .now-date {
    }
  }
  .num {
    padding-bottom: 20px;
    border-bottom: 1px dashed #dcdcdc;
    .list {
      font-size: 0;
      .every-num {
        display: inline-block;
        font-size: 16px;
        border: 1px solid #ababab;
        line-height: 23px;
        margin: 0 10px 10px 0;
        .ids {
          border-right: 1px solid #ababab;
          height: 23px;
          display: inline-block;
          width: 32px;
          text-align: center;
          background-color: #d7f2ff;
          cursor: pointer;
        }
        .choose {
          background-color: #ffb100;
          color: #ffffff;
        }
        .yellow {
          background-color: #56ff00;
        }
        .origin {
          background-color: #ffe600;
        }
        .red {
          background-color: red;
        }
        .value {
          letter-spacing: 2px;
          width: 110px;
          text-align: center;
        }
      }
      & > span {
        font-size: 16px;
        border: 1px solid #ababab;
        border-right: 0;
        padding: 5px 10px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        &:last-child {
          border-right: 1px solid #ababab;
        }
      }
    }
  }
  .panel {
    margin-top: 30px;
  }
}
</style>
