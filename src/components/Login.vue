<template>
  <div class="box">
    <div class="centerBox">
      <el-form ref="loginFormRef" :model="loginData" :rules="loginFormRules">
        <el-form-item prop="phone">
          <el-input v-model="loginData.phone" prefix-icon="iconfont el-icon-mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginData.password" prefix-icon="iconfont el-icon-lock" type="password" show-password
            placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <div style="display:flex;justify-content:space-between; flex-direction:row;width:100%">
        <el-link class="redirect-link" @click="toRegister" :underline="false" type="danger">立即注册</el-link>
        <el-link class="redirect-link" @click="toFindPassword" :underline="false" type="danger">忘记密码</el-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        phone: "",
        password: "",
      },
      loginFormRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确手机号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    toRegister() {
      this.$router.push("/register");
    },
    toFindPassword() {
      this.$router.push("/findpassword");
    },
    login() {
      this.$router.push("/home");
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
    padding: 20px;
  }
}

.loginBtn {
  width: 100%;
  height: 36px;
  padding: 6px 10px;
  background-color: #ff6666;
  color: #ffffff;
  border-color: #ff6666;
  border-radius: 10px;
  font-size: 16px;
}
.loginBtn:hover {
  background-color: #ff7575;
  border-color: #ff7575;
  color: #ffffff;
}
/deep/ .el-input {
  font-size: 14px;
  background-color: blue;
  border: none !important;
}
.redirect-link {
  font-size: 14px;
}
</style>