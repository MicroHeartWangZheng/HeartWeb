<template>
  <div class="box">
    <div class="centerBox">
      <el-form ref="loginFormRef" :model="loginData" :rules="loginFormRules">
        <el-form-item prop="phone" class="formItem">
          <el-input v-model="loginData.phone" prefix-icon="iconfont el-icon-mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="formItem">
          <el-input class="valiCode" v-model="loginData.code" prefix-icon="iconfont el-icon-lock" placeholder="验证码"></el-input>
          <el-link class="send" :underline="false" @click="sendCode">{{timerStr}}</el-link>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        phone: null,
        code: null,
      },
      timer: "", //计时器
      timerNum: 60,
      timerStr: "发送验证码",
      loginFormRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确手机号", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    jump(path) {
      this.$router.push(path);
    },
    timerNumChange() {
      if (this.timerNum !== 0) {
        this.timerNum--;
        console.log("timerNum", this.timerNum);
        this.timerStr = "重新获取" + this.timerNum + "s";
        return;
      }
      this.timerStr = "发送验证码";
      clearInterval(this.timer);
    },
    async sendCode() {
      //验证手机号
      if (this.loginData.phone.length !== 11) {
        this.$message({
          message: "请输入正确手机号",
          type: "warning",
        });
        return;
      }
      //在发送倒数时,点击发送验证码 
      if(this.timerStr!="发送验证码")
        return;

      const res = await this.$http.get("Sms/Send/" + this.loginData.phone);
      if (!res) return;
      //设置定时器
      this.timer = setInterval(this.timerNumChange, 1000);
    },
    async login() {
      const res = await this.$http.post("Sms/Login", this.loginData);
      if (res) {
        //设置Token
        window.sessionStorage.removeItem("token");
        window.sessionStorage.setItem("token", res.data);
        this.$router.push("/home");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  .centerBox {
    position: absolute;
    left: 40%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 30px 30px 0 30px;
  }
}

.loginBtn {
  width: 100%;
  height: 36px;
  padding: 6px 10px;
  background-color: #ff7777;
  color: #ffffff;
  border-color: #ff7777;
  border-radius: 10px;
  font-size: 16px;
}
.loginBtn:hover {
  background-color: #ff6666;
  border-color: #ff6666;
  color: #ffffff;
}
.formItem {
  position: relative;
  margin-bottom: 30px;
}
.send {
  position: absolute;
  bottom: 0px;
  right: 20px;
}
/deep/ .formItem .el-link {
  color: #909399;
}

/deep/ .formItem .el-link:hover {
  color: #ff6666;
}
</style>