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

              <el-dropdown-item icon="fa fa-cog" command="message">消息
                <el-badge v-if="messageCount!=0" class="mark" :value="messageCount" />
              </el-dropdown-item>

              <!-- <el-dropdown-item icon="fa fa-cog" command="/message">消息</el-dropdown-item> -->
              <el-dropdown-item icon="fa fa-calendar-check-o" command="sign">签到</el-dropdown-item>
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
        <div class="customer">
          <el-popover placement="left" width="100" height="100" trigger="hover">
            <div class="qrcode">
              <div style="text-align: center;">关注公众号咨询客服</div>
              <el-image :src="require('../assets/公众号.jpg')"></el-image>
            </div>
            <el-image slot="reference" @mouseover="changeCustomer('in')" @mouseout="changeCustomer('out')" :src="customerPicPath" fit="contain"></el-image>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="bottomContainer">
      <span>© 2021 杭州月老科技 版权所有</span>
      <span>网站备案/许可证号：浙ICP备2021006379号-1</span>
    </div>

    <!--签到弹出框-->
    <el-dialog title="签到" :visible.sync="signDialog.visiable" width="440px">
      <div class="signContainer">
        <div class="signItem" v-for="(item,index) in rewards" :key="index">
          <div style="font-size:15px;font-weight:700;color:#ff6666">第{{index+1}}天</div>
          <el-image v-if="keepDays>=(index+1)" :src="require('../assets/签到.png')"></el-image>
          <el-image v-else :src="require('../assets/未签到.png')"></el-image>
          <div>+{{item}}红线</div>
        </div>
      </div>
      <div class="signBtnContainer">
        <el-button type="danger" style="width:50%;border-radius:20px;" @click="sign">签 到</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      newVisitorCount: 0,
      newWantCount: 0,
      messageCount: 0,
      signDialog: {
        visiable: false,
      },
      rewards: [],
      keepDays: 0, //连续签到天数
      customerPicPath: require("../assets/客服灰色.png"),
    };
  },
  methods: {
    async getDetail() {
      const res = await this.$http.get("User");
      this.user = res.data;
    },
    async sign() {
      const res = await this.$http.post("Sign");
      if (!res) return;
      this.$message({
        message: "签到成功!",
        type: "success",
      });
      this.keepDays += 1;
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
      } else if (path === "lookList") {
        this.newVisitorCount = 0;
        this.redirect("/looklist");
        return;
      } else if (path === "wantList") {
        this.newWantCount = 0;
        this.redirect("/wantList");
        return;
      } else if (path === "sign") {
        this.signDialog.visiable = true;
        await this.getRewards();
        await this.getKeepDays();
        return;
      } else if (path === "message") {
        this.messageCount = 0;
        this.redirect("/message");
        return;
      }
      this.$router.push(path);
      return;
    },
    async getRewards() {
      var res = await this.$http.get("Sign/Rewards");
      if (!res) return;
      this.rewards = res.data;
    },
    async getKeepDays() {
      const res = await this.$http.get("Sign");
      if (!res) return;
      this.keepDays = res.data;
      console.log("keepdays", this.keepDays);
    },
    //销毁Token
    async destoryToken() {
      var token = window.sessionStorage.getItem("token");
      var res = await this.$http.get("Token/Destory/" + token);
      if (!res) return;
      return res ? true : false;
    },
    //新访客数量
    async getNewVisitorCount() {
      var res = await this.$http.get("Visitor/NewVisitorCount");
      if (!res) return;
      this.newVisitorCount = res.data;
    },
    //新申请人数量
    async getNewWantCount() {
      var res = await this.$http.get("Want/NewCount");
      if (!res) return;
      this.newWantCount = res.data;
    },
    //未读消息数量
    async getMessageCount() {
      var res = await this.$http.get("Report/UnreadCount");
      if (!res) return;
      this.messageCount = res.data;
    },
    changeCustomer(param) {
      if (param == "in") this.customerPicPath = require("../assets/客服.png");
      else this.customerPicPath = require("../assets/客服灰色.png");
    },
  },
  mounted() {
    this.getDetail();
    this.getNewVisitorCount();
    this.getNewWantCount();
    this.getMessageCount();
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
    width: 920px;
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
  min-height: 850px;
}
.content {
  width: 1000px;
  margin: auto;
  padding-bottom: 20px;
  .customer {
    position: fixed;
    bottom: 100px;
    right: 100px;
    .el-image {
      height: 40px;
      width: 40px;
    }
  }
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

.signContainer {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  .signItem {
    width: 80px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
.signBtnContainer {
  display: flex;
  justify-content: center;
}
</style>