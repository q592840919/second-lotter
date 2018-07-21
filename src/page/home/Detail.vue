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
        <span v-for="item in numList" @click="getBoardDetail(item.id)">{{item.value}}</span>
        <span>1</span>
        <span>1</span>
        <span>1</span>
        <span>1</span>
        <span>1</span>
        <span>1</span>
      </div>
    </div>
    <div class="panel">
      <Main-panel/>
    </div>
  </div>
</template>

<script>
import MainPanel from '@/components/common/MainPanel'
export default {
  name: 'detail',
  data() {
    return {
      now: Date,
      numList: Array
    };
  },
  mounted () {
    const vm = this;
    vm.now = vm.getFormatDate(new Date(), 1);
    vm.init();
  },
  components: {
    MainPanel
  },
  methods: {
    init () {
      const vm = this;
      vm.now = vm.getFormatDate(new Date());
    },
    async getBoardDetail (id) {
      const vm = this,
      rep = await getData.boardDetail();
      if(rep.success){
        vm.periods = rep.data.data.periods;
        vm.parseNum(vm.period);
      }
    },
    async getBoardList (time) {
      const vm = this,
      rep = await getData.boardList(time);
      if(rep.success){
        vm.numList = rep.data.data;
        vm.getBoardDetail(id);
      }
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
