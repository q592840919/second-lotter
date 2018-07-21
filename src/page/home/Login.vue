<template>
  <div class="login">
    <div class="tip-login-in">
      <div class="tip-header">
        <div class="tip-title">
          <span class="icon-Setthewindow"></span>

          <span>魔镜管理后台登录</span>
        </div>
      </div>

      <div class="tip-content">
        <div class="login-form">
            <form id="adminSubmit">
              <div class="form-line">
                <span>账号：</span><input type="text" name="user" placeholder="账号" class="ad_email" autocomplete="off" id="ad_email">
              </div>
              <div class="form-line">
                <span>密码：</span><input type="password" name="password" placeholder="密码" class="ad_password" autocomplete="off" id="ad_password">
              </div>
              <div class="form-line form-line-span">
                <span class="info"></span>
              </div>
              <div class="form-btn">
                <input type="submit" value="登录" class="sign_in">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'market',
  data() {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login {
  .tip-login-in{
    background: #fff none repeat scroll 0 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 1px #ccc;
    height: auto;
    left: 50%;
    margin-left: -200px;
    position: fixed;
    top: 30%;
    width: 400px;
    .tip-header{
      border-bottom: 1px solid #ccc;
      height: 45px;
      width: 100%;
      .tip-title{
        color: #555;
        float: left;
        font-size: 18px;
        margin: 10px 0 0 15px;
      }
    }
    .tip-content{
      font-size: 18px;
      margin: 20px 0 0;
      text-align: center;
      .login-form{
        margin-top: 10px;
      }
      .form-line{
        input{
          box-sizing: border-box;
          width: 70%;
          height: 42px;
          border-width: 1px;
          border: 1px solid #ccc;
          text-indent: 0.5em;
          font-size: 16px;
        }
      }
      .form-btn{
        background-color: #eeeeee;
        width: 100%;
        margin-top: 15px;
        input{
          background-color: #337ab7;
          border-color: #337ab7;
          border-radius: 5px;
          color: #ffffff;
          cursor: pointer;
          font-family: "microsoft YaHei";
          font-size: 16px;
          font-weight: 600;
          height: 32px;
          letter-spacing: 15px;
          line-height: 32px;
          margin-bottom: 10px;
          margin-top: 10px;
          text-indent: 18px;
          width: 120px;
        }
      }
    }
  }
}
</style>
