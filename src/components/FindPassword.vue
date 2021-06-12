<template>
  <div class="box">
    <div class="centerBox">
      <el-form ref="findPwdFormRef" :model="findPwdData" :rules="findPwdFormRules">
        <el-form-item prop="phone">
          <el-input v-model="findPwdData.phone" prefix-icon="iconfont el-icon-mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="validaCode">
          <el-input v-model="findPwdData.validaCode" prefix-icon="iconfont el-icon-circle-check" placeholder="验证码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="findPwdBtn">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      findPwdData: {
        phone: "",
        validaCode: "",
      },
      findPwdFormRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确手机号", trigger: "blur" },
        ],
        validaCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入正确验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
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
    height: 170px;
    width: 300px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 20px;
  }
}
.findPwdBtn {
  width: 100%;
  height: 36px;
  padding: 6px 20px;
  background-color: #ff6666;
  color: #ffffff;
  border-color: #ff6666;
  border-radius: 10px;
  font-size: 16px;
}
.findPwdBtn:hover {
  background-color: #ff7575;
  border-color: #ff7575;
  color: #ffffff;
}

.el-input {
  font-size: 14px;
}
.el-link {
  height: 22px;
  font-size: 12px;
}
</style>