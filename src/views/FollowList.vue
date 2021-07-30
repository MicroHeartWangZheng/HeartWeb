<template>
  <div class="page">
    <div class="titleContainer">
      <span>我关注的人</span>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="6" v-for="followUser in followUsers" :key="followUser.id">
          <div class="userItemContainer">
            <div class="delete" @click="clickRemove(followUser.id)"><span class="fa fa-times"></span></div>
            <el-image :src="followUser.headPic" fit="cover" @click="redict('/userdetail/'+followUser.followUserId)"></el-image>
            <div class="userInfoContainer">
              <div class="nickInfo">
                <div>{{followUser.nickName}} ·</div>
                <div>已认证</div>
                <div>
                  <el-image :src="require('../assets/认证.png')" fit="contain"></el-image>
                </div>
              </div>
              <div class="positionInfo">
                <div>现居{{followUser.homeCity}} ·</div>
                <div>{{followUser.currentCity}}人</div>
              </div>
              <div class="baseInfo" style="color:#666666">
                <div>{{followUser.year}}年 · </div>
                <div>{{followUser.height}}cm · </div>
                <div>{{followUser.educationDesc}} · </div>
                <div>{{followUser.career}}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div>
        <el-pagination background @current-change="currentIndexChange" :page-size="queryInfo.pageSize" :pager-count="7" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      followUsers: [],
      queryInfo: {
        pageIndex: 1,
        pageSize: 8,
      },
      totalCount: 0,
    };
  },
  methods: {
    async getFollowList() {
      var res = await this.$http.get("Follow", {
        params: this.queryInfo,
      });
      this.followUsers = res.data.items;
      this.totalCount = res.data.total;
    },
    async remove(id) {
      var res = await this.$http.delete("Follow/" + id);
      await this.getFollowList();
      return res ? true : false;
    },
    async clickRemove(id) {
      this.$confirm("确定取消关注吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var res = this.remove(id);
          if (res) {
            this.$message({
              type: "success",
              message: "取消关注成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "取消关注失败,请重试!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    async currentIndexChange(index) {
      this.queryInfo.pageIndex = index;
      await this.getFollowList();
    },
    redict(path) {
      this.$router.push(path);
    },
  },
  created() {
    this.getFollowList();
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
    width: 430px;
    border-top: 1px dashed #999999;
  }
  span:before {
    left: 0%;
  }
  span:after {
    right: 0%;
  }
}
.content {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.userItemContainer {
  width: 210px;
  background-color: #ffffff;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 16px;
  position: relative;
  .delete {
    position: absolute;
    right: 3px;
    top: 0px;
    color: #ff6666;
  }
  .el-image {
    width: 100%;
    height: 264px;
    border-radius: 10px 10px 0 0;
    margin-bottom: 6px;
  }
  .userInfoContainer {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
    font-family: Tahoma, Arial, Helvetica, "Microsoft YaHei New",
      "Microsoft Yahei", sans-serif;
    color: #292929;
    .nickInfo {
      display: flex;
      width: 100%;
      height: 20px;
      font-size: 14px;
      font-weight: 700;
      color: black;
      line-height: 22px;
      div {
        margin-right: 6px;
      }
      .el-image {
        width: 20px;
        height: 20px;
      }
    }
  }
  .positionInfo,
  .baseInfo {
    display: flex;
    div {
      margin-right: 6px;
    }
  }
}
</style>