<template>
  <div class="detail">
    <div class="date">
      <span class="now-date">当前查看日期：</span>
      <span class="is-time marginr-15">{{now}}</span>
      <span class="now-num ">当前查看数字：</span>
      <span class="marginr-15"></span>
      <span class="other">其他可查看数字：</span>
      <span class=""></span>
    </div>
    <div class="num">
      <p>副板列表</p>
      <div class="list">
        <div class="every-num" v-for="(item,i) in panels" @click="changeNum(i)">
          <span v-if="item" class="ids" :class="{'choose': chooseNum === i}">{{i+1}}</span>
          <span v-if="item" class="value">{{item}}</span>
        </div>
      </div>
    </div>
    <div class="panel">
      <Detail-panel :showSteps="showSteps" v-if="openStep" :content="content"/>
    </div>
  </div>
</template>

<script>
import DetailPanel from '@/components/common/DetailPanel'
import getData from '@/service/getData';
export default {
  name: 'detail',
  data() {
    return {
      now: Date,
      panels: Array,     //副板列表
      content: Array,      //副板详情参数
      chooseNum: 0,
      showSteps: 120,
      openStep: false
    };
  },
  mounted () {
    const vm = this;
    vm.init();
  },
  components: {
    DetailPanel
  },
  methods: {
    init () {
      const vm = this;
      vm.now = vm.$route.params.dayId || vm.getFormatDate(new Date(),1);
      vm.getBoardList(vm);
    },

    async getBoardList () {       //生成上面副板列表
      const vm = this,rep = await getData.boardListAll();     //获取左边的值
      vm.panels= new Array(rep.data.length);
      vm.panels = rep.data;
      vm.getBoardDetail(vm.panels[0]);
    },
    changeNum (i) {       //选择数字生成副板
      const vm = this;
      vm.chooseNum = i;
      if(vm.panels[i]){
        vm.getBoardDetail(vm.panels[i]);
      }
    },
    async getBoardDetail (id) {       //生成下面副板详情
      const vm = this,
      rep = await getData.boardDetail(id,vm.now);
      vm.content = rep.data;
      vm.content[0].arr = [];
      vm.content[0].numbers.forEach((cent,index) => {
        vm.content[0].arr[index] = cent?cent.split(''): null;
        if(cent){
          vm.showSteps = index;
        } 
      });
      vm.showSteps = vm.showSteps + 2;
      vm.openStep = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.detail {
  width: 1400px;
  margin: auto;
  .date{
    margin-top: 30px;
    .now-date{

    }
  }
  .num{
    padding-bottom: 20px;
    border-bottom: 1px dashed #DCDCDC;
    .list{
      font-size: 0;
      .every-num{
        display: inline-block;
        font-size: 16px;
        border: 1px solid #ABABAB;
        line-height: 23px;
        margin: 0 10px 10px 0;
        .ids{
          border-right: 1px solid #ABABAB;
          height: 23px;
          display: inline-block;
          width: 32px;
          text-align: center;
          background-color: #d7f2ff;
          cursor: pointer;
        }
        .choose{
          background-color: #ffb100;
          color: #FFFFFF;
        }
        .value{
          letter-spacing: 2px;
          width: 110px;
          text-align: center;
        }
      }
      &>span{
        font-size: 16px;
        border: 1px solid #ABABAB;
        border-right: 0;
        padding: 5px 10px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        &:last-child{
          border-right: 1px solid #ABABAB;
        }
      }
    }
  }
  .panel{
    margin-top: 30px;
  }
}
</style>
