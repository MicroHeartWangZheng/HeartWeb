<template>
  <div class="page">
    <div class="titleContainer">
      <span>我的会员</span>
    </div>
    <div class="container">
      <div class="userInfo">
        <div>
          <span class="fa fa-user-o fa-3x" style="color:#ff6666"></span>
          <span style="margin-left: 30px;font-size:700">当前为：免费用户</span>
        </div>
        <div>
          <el-image :src="require('../assets/金币.png')" fit="contain"></el-image>
          <el-link type="danger" style="margin-left: 30px;">充值记录>></el-link>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>未认证用户</th>
            <th>认证用户</th>
            <th>VIP用户</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>异性用户列表</td>
            <td>仅看部分</td>
            <td>仅看部分</td>
            <td>查看全部</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    redict(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  padding-top: 30px;
}
.titleContainer {
  display: flex;
  justify-content: center;
  position: relative;
  color: #999999;
  font-size: 18px;
  margin-bottom: 20px;
  span:before,
  span:after {
    content: "";
    position: absolute;
    top: 50%;
    float: left;
    height: 1px;
    width: 440px;
    border-top: 1px dashed #999999;
  }
  span:before {
    left: 0%;
  }
  span:after {
    right: 0%;
  }
  .vipSearchBtn {
    margin-left: 10px;
    font-size: 13px;
    font-weight: 700;
  }
}

.container {
  width: 100%;
  height: 1000px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  .userInfo {
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 200px;
      height: 60px;
    }
    span {
      height: 48px;
      line-height: 48px;
      
    }
    .el-image {
      width: 50px;
      height: 50px;
    }
  }
}
</style>