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
      <Main-panel :showCount="false" :periods="periods"/>
    </div>
  </div>
</template>

<script>
import MainPanel from '@/components/common/MainPanel'
import getData from '@/service/getData';
export default {
  name: 'detail',
  data() {
    return {
      now: Date,
      panels: Array,     //副板列表
      periods: Array,      //副板详情参数
      chooseNum: 0
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
      vm.now = vm.getFormatDate(new Date(),1);
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
      rep = await getData.boardDetail(vm.now,id);
      vm.periods = rep.data[0].periods;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.detail {
  width: 1200px;
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
