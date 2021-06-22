<template>
  <div>
    <div class="header">
      <div class="headerContainer">
        <img src="../assets/logo.png">
        <div class="titleContainer">
          <span @click="redirect('/users')">找对象</span>
          <span @click="redirect('/moment')">动态</span>
          <span @click="redirect('/wantlist')">申请列表</span>
          <el-dropdown @command="handleCommand">
            <span>我的</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="fa fa-id-card" command="/my">我的主页</el-dropdown-item>
              <el-dropdown-item icon="fa fa-eye" command="/followlist">关注列表</el-dropdown-item>
              <el-dropdown-item icon="fa fa-diamond" command="/vip">会员与金币</el-dropdown-item>
              <el-dropdown-item icon="fa fa-cog" command="/setting">账号设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
      </div>
    </div>
    <div class="contentContainer">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <div class="bottomContainer">
      <span>© 2021 月老科技 版权所有</span>
      <span>网站备案/许可证号：浙ICP备2021006379号-1</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    handleCommand(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 6px 0px;
  background-color: #ff6666;
  .headerContainer {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: auto;
  }
  .titleContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    line-height: 26px;
    span {
      border-radius: 10px;
      padding: 8px 30px;
      margin-left: 10px;
      font-size: 19px;
    }
    span:hover {
      background-color: #fff157;
      color: #622c03;
    }
    .el-dropdown {
      color: #fff;
      .el-dropdown-menu {
        color: #333333;
      }
    }
  }
}
.el-dropdown-menu > li:hover {
  background-color: #ff6666;
  color: #fff;
}
.contentContainer {
  background-color: #f2f2f2;
}
.content {
  width: 1000px;
  margin: auto;
  padding-bottom: 20px;
}

.bottomContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #2a2a2a;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  span {
    padding: 8px 0 0 0;
  }
}
</style>