<template>
  <div>
    <div class="header">
      <div class="headerContainer">
        <img src="../assets/logo.png">
        <div class="titleContainer">
          <span @click="redirect('/users')">用户列表</span>
          <span @click="redirect('/momentlist')">动态</span>
           <span @click="redirect('/followlist')">关注列表</span>
          <el-dropdown @command="handleCommand">
            <span>我的</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="fa fa-id-card" command="/my">我的主页</el-dropdown-item>
              <el-dropdown-item icon="fa fa-heartbeat" command="wantList">申请列表
                <el-badge v-if="newWantCount!=0" class="mark" :value="newWantCount" />
              </el-dropdown-item>
              <el-dropdown-item icon="fa fa-clock-o" command="lookList">来访列表
                <el-badge v-if="newVisitorCount!=0" class="mark" :value="newVisitorCount" />
              </el-dropdown-item>
              <el-dropdown-item icon="fa fa-pencil-square-o" command="/SetpOne">修改资料</el-dropdown-item>
              <el-dropdown-item icon="fa fa-diamond" command="/vip">购买会员</el-dropdown-item>
              <el-dropdown-item icon="fa fa-cog" command="/setting">账号设置</el-dropdown-item>
              <el-dropdown-item icon="fa fa-sign-out" command="signOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="pointer" @click="redirect('/My')">
          <el-avatar v-if="user.headPic==''" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-avatar v-else :src="user.headPic"></el-avatar>
        </div>
      </div>
    </div>
    <div class="contentContainer">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <div class="bottomContainer">
      <span>© 2021 杭州月老科技 版权所有</span>
      <span>网站备案/许可证号：浙ICP备2021006379号-1</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      newVisitorCount: 0,
      newWantCount: 0,
    };
  },
  methods: {
    async getDetail() {
      const res = await this.$http.get("User");
      this.user = res.data;
    },
    redirect(path) {
      this.$router.push(path);
    },
    async handleCommand(path) {
      if (path === "signOut") {
        await this.destoryToken();
        window.sessionStorage.removeItem("token");
        this.redirect("/login");
        return;
      }
      if (path === "lookList") {
        this.newVisitorCount = 0;
        this.redirect("/looklist");
        return;
      }
      if (path === "wantList") {
        this.newWantCount = 0;
        this.redirect("/wantList");
        return;
      }
      this.$router.push(path);
      return;
    },
    //销毁Token
    async destoryToken() {
      var token = window.sessionStorage.getItem("token");
      var res = await this.$http.get("Token/Destory/" + token);
      return res ? true : false;
    },
    //新访客数量
    async getNewVisitorCount() {
      var res = await this.$http.get("Visitor/NewVisitorCount");
      this.newVisitorCount = res.data;
    },
    //新申请人数量
    async getNewWantCount() {
      var res = await this.$http.get("Want/NewCount");
      this.newWantCount = res.data;
    },
  },
  mounted() {
    this.getDetail();
    this.getNewVisitorCount();
    this.getNewWantCount();
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
   min-height:850px;
}
.content {
  width: 1000px;

  margin: auto;
  padding-bottom: 20px;
}

.bottomContainer {
  bottom: 0;
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