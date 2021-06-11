<template>
  <div class="box">
    <div class="center">
      <el-form>
        <el-form-item>
          <el-input prefix-icon="iconfont el-icon-mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="icon-ok-sign icon-large" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="iconfont el-icon-lock" placeholder="设置密码（8～20位的数字和字母）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="iconfont el-icon-lock" placeholder="再次输入密码"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 300px;
    width: 350px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 20px;
  }
}
.iconfont{
  font-size: 18px;
}
</style>