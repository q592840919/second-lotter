<template>
  <div class="main-panel">
    <table class="main" cellpadding="0" cellspacing="0">
      <tbody >
        <tr>
          <th>期数</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
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
          <td>1</td>
          <td>2</td>
          <td>1</td>
          <td>3</td>
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
          <td>1</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
    <table class="vice"  cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
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
</template>

<script>
export default {
  name: 'main-panel',
  data() {
    return {
      now: Date
    };
  },
  mounted () {
    const vm = this;
    vm.now = vm.getFormatDate(new Date());
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
      th{
        background-color: #fff6c2;
        padding: 0 12px;
      }
    }
    .vice{
      font-size: 18px;
      display: inline-block;
      th{
        background-color: #d7f2ff;
        padding: 0 15px;
      }
    }
  }
</style>
