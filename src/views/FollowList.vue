<template>
  <div class="page">
    <div class="listContent">
      <div class="title">
        <span :class="chooseIndex==1?'choosed':''" @click="choose(1)">关注</span>
        <span :class="chooseIndex==2?'choosed':''" @click="choose(2)">粉丝</span>
      </div>
      <div v-if="chooseIndex==1" class="followList">
        <div class="wantItem" v-for="(item,index) in followList" :key="index">
          <div class="baseInfoContainer pointer" @click="redirectDetail(item.followUserId)">
            <div class="img">
              <el-image fit="cover" :src="item.headPic"></el-image>
            </div>
            <div class="baseInfo">
              <div>
                <span v-if="item.gender" class="fa fa-venus" style="margin-right:10px;color:blue;font-weight:700"></span>
                <span v-else class="fa fa-mars" style="margin-right:10px;color:#ff6666;font-weight:700"></span>
                <span style="font-size:14px;color:#ff6666;font-weight:700;">{{item.nickName}}</span>
              </div>
              <span style="font-size:12px;color:#29292;">{{item.year}}年 - {{item.currentCity}} - {{item.educationDesc}} - {{item.career}}</span>
              <span style="font-size:12px;color:#999999;">{{item.createTime}} 关注</span>
            </div>
          </div>

          <div class="operation">
            <div>
              <el-button type="success" size="mini" @click="cancel(item.id)" round>取消关注</el-button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="chooseIndex==2" class="followList">
        <div class="wantItem" v-for="(item,index) in fansList" :key="index">
          <div class="baseInfoContainer pointer" @click="redirectDetail(item.userId)">
            <div class="img">
              <el-image fit="cover" :src="item.headPic"></el-image>
            </div>
            <div class="baseInfo">
              <div>
                <span v-if="item.gender" class="fa fa-venus" style="margin-right:10px;color:blue;font-weight:700"></span>
                <span v-else class="fa fa-mars" style="margin-right:10px;color:#ff6666;font-weight:700"></span>
                <span style="font-size:14px;color:#ff6666;font-weight:700;">{{item.nickName}}</span>
              </div>
              <span style="font-size:12px;color:#29292;">{{item.year}}年 - {{item.currentCity}} - {{item.educationDesc}} - {{item.career}}</span>
              <span style="font-size:12px;color:#999999;">{{item.createTime}} 关注</span>
            </div>
          </div>

          <div class="operation">
            <div v-if="item.userId=='0'">
              <el-button type="success" size="mini" @click="unlock" round>解 锁</el-button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-pagination background @current-change="currentIndexChange" :page-size="queryInfo.pageSize" :pager-count="7" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import config from "/src/common/config.js";
export default {
  data() {
    return {
      chooseIndex: 1,
      followList: [],
      fansList: [],
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
      wantStates: config.wantStates,
    };
  },
  methods: {
    async getFollowList() {
      var res = await this.$http.get("Follow/GetFollowList", {
        params: this.queryInfo,
      });
      this.followList = res.data.items;
      this.totalCount = res.data.total;
    },
    async getFansList() {
      var res = await this.$http.get("Follow/GetFansList", {
        params: this.queryInfo,
      });
      this.fansList = res.data.items;
      this.totalCount = res.data.total;
    },
    async cancel(id) {
      this.$confirm("确定去掉关注吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete("Follow/" + id);
          this.$message({
            type: "success",
            message: "取消关注成功!",
          });
          await this.getFollowList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    async currentIndexChange(index) {
      this.queryInfo.pageIndex = index;
      if (this.chooseIndex == 1) await this.getFollowList();
      else await this.getFansList();
    },
    async choose(index) {
      //初始化分页
      this.queryInfo.pageIndex = 1;
      if (index == 1) {
        await this.getFollowList();
      } else {
        await this.getFansList();
      }
      this.chooseIndex = index;
    },
    redirectDetail(userId) {
      if (userId != "0") {
        this.$router.push("/UserDetail/" + userId);
        return;
      }
      //非VIP 跳转
      this.$message({
        message: "查看来访人员为会员特有功能，请先开通会员。",
      });
      setTimeout(() => {
        this.$router.push("/vip");
      }, 1500);
    },
    unlock() {
      this.$message({
        message: "查看关注为会员特有功能，请先开通会员。",
      });
      setTimeout(() => {
        this.$router.push("/vip");
      }, 1500);
    },
  },
  mounted() {
    this.getFollowList();
  },
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
}
.listContent {
  background-color: #fff;
  border-radius: 10px;
  padding: 12px;
  .title {
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin: 20px auto 0 auto;
    font-size: 16px;
    span {
      width: 100px;
      border-radius: 20px;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
    span:hover,
    .choosed {
      background-color: #ff6666;
      color: #fff;
    }
  }
  .followList {
    width: 100%;
    height: 1040px;
    .wantItem {
      width: 800px;
      height: 64px;
      margin: 20px auto;
      display: flex;
      padding: 10px 20px;
      border-bottom: 1px solid #f2f2f2;
      justify-content: space-between;
      border-radius: 10px;
      .baseInfoContainer {
        display: flex;
        align-items: center;
        .img {
          display: flex;
          align-items: center;
          margin-right: 10px;
          .el-image {
            width: 64px;
            height: 64px;
            border-radius: 50%;
          }
        }
        .img:hover {
          cursor: pointer;
        }
        .baseInfo {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 60px;
        }
      }
      .operation {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .wantItem:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>