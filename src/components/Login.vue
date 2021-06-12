<template>
  <div class="box">
    <div v-if="showRegister" class="registerCenterBox">
      <el-form>
        <el-form-item>
          <el-input prefix-icon="iconfont el-icon-mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="iconfont el-icon-circle-check" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="iconfont el-icon-lock" placeholder="设置密码（6～20位的数字和字母）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="iconfont el-icon-lock" placeholder="再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="registerBottom">
            <el-button class="registerBtn">注册</el-button>
            <span>点击注册默认您同意
              <el-link :underline="false" href="">《面向对象用户条款》</el-link>
            </span>
            <el-link class="redirect-link" @click="redirect" :underline="false" type="danger">我是会员，立即登录</el-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="loginCenterBox">
      <el-form>
        <el-form-item>
          <el-input prefix-icon="iconfont el-icon-mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:12px">
          <el-input prefix-icon="iconfont el-icon-lock" show-password placeholder="密码"></el-input>
          <el-link style="font-size:14px;float:right" :underline="false" type="danger">忘记密码?</el-link>
        </el-form-item>
        <el-form-item>
          <div class="registerBottom">
            <el-button class="registerBtn">登录</el-button>
            <span>
              <el-link class="redirect-link" @click="redirect" :underline="false" type="danger">我还不是会员，立即注册
              </el-link>
            </span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showRegister: false,
    };
  },
  methods: {
    redirect() {
      this.showRegister = !this.showRegister;
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
  .registerCenterBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 340px;
    width: 300px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 20px;
  }
}
.registerBottom {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.registerBtn {
  width: 168px;
  height: 36px;
  padding: 6px 20px;
  background-color: #ff6666;
  color: #ffffff;
  border-color: #ff6666;
  border-radius: 10px;
  font-size: 16px;
}
.registerBtn:hover {
  background-color: #ff7575;
  border-color: #ff7575;
  color: #ffffff;
}

.loginCenterBox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 20px;
}

.el-input {
  font-size: 14px;
}

span {
  font-size: 12px;
}
.el-link {
  height: 22px;
  font-size: 12px;
}
.redirect-link {
  font-size: 14px;
}
</style>