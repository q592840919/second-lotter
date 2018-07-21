<template>
  <div class="subplate">
    <div class="init">
      <span class="">需要生成的副板数：</span><input/>
    </div>
    <div class="content">
      <div class="left">
        <div class="oprat">
          <button>生成副板</button>
        </div>
        <div class="info">
          <div class="list">
            <span>1</span><input/>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">副板分值</div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'subplate',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
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
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px dashed #CCCCCC;
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
            }
            input{
              border-radius: 0;
            }
          }
        }
      }
      .right{
        display: inline-block;
        vertical-align: -38px;
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
