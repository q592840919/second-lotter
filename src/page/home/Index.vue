<template>
  <div class="index">
    <div class="time">
      <div>
        当前系统时间：{{now}}
      </div>
    </div>
    <div class="info">
        上一期开奖：32145  下一期开奖时间：2018-07-12 10:20:00
    </div>
    <div class="main">
      <Main-panel/>
    </div>
    <div class="operation">
      <div class="oprat">
        <input placeholder="输入每注金额(元)"/>
        <button>计算下注金额</button>
      </div>
      <div class="info">
        <table class="pay"  cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <th>下注分值</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
            </tr>
            <tr>
              <td>下注金额</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import MainPanel from '@/components/common/MainPanel'
export default {
  name: 'index',
  data() {
    return {
      now: Date
    };
  },
  mounted () {
    const vm = this;
    vm.now = vm.getFormatDate(new Date());
  },
  components: {
    MainPanel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .index {
    width: 1200px;
    margin: auto;
    .time {
      font-size: 18px;
      margin: 20px 0;
    }
    .main {
      margin-top: 60px;
    }
    .operation{
      margin-top: 60px;
      text-align: right;
      .info{
        float: right;
        margin: 10px 0;
        table{
          td{
            line-height: 35px;
          }
          th{
            padding: 0 15px;
          }
        }
      }
    }
  }
</style>
