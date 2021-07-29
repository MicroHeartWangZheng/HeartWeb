<template>
  <div class="page">
    <div class="titleContainer">
      <span>非VIP仅看部分用户
        <el-link class="vipSearchBtn" type="danger" :underline="false">VIP搜索全部</el-link>
      </span>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="user in users" :key="user.id">
        <div class="userItemContainer">
          <el-image :src="user.headPic" fit="cover" @click="redict('/userdetail/'+user.id)"></el-image>
          <div class="userInfoContainer">
            <div class="nickInfo">
              <div>{{user.nickName}} ·</div>
              <div>已认证</div>
              <div>
                <el-image :src="require('../assets/认证.png')" fit="contain"></el-image>
              </div>
            </div>
            <div class="positionInfo">
              <div>现居{{user.homeCity}} ·</div>
              <div>{{user.currentCity}}人</div>
            </div>
            <div class="baseInfo" style="color:#666666">
              <div>{{user.year}}年 · </div>
              <div>{{user.height}}cm · </div>
              <div>{{user.educationDesc}} · </div>
              <div>{{user.career}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-pagination background :page-size="queryInfo.pageIndex" :page-count="queryInfo.pageSize" layout="prev, pager, next" :total="totalCount / queryInfo.pageSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        pageIndex: 1,
        pageSize: 20,
      },
      users: [],
      totalCount: 0,
    };
  },
  methods: {
    async getList() {
      const res = await this.$http.get("User/GetList", {
        params: this.queryInfo,
      });

      this.users = res.data.items;
      this.totalCount = res.data.total;
    },
    redict(path) {
      this.$router.push(path);
    },
  },
  created() {
    this.getList();
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
    width: 360px;
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

.userItemContainer {
  width: 210px;
  background-color: #ffffff;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 16px;
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