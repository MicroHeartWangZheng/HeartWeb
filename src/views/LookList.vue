<template>
  <div class="page">
    <div class="listContent">
      <div class="titleContainer">
        <span>来访列表</span>
      </div>

      <div class="lookList">
        <div class="title">
          <span>今日访客：{{sum.todayCount}}</span>
          <span>总访客数：{{sum.sumCount}}</span>
        </div>

        <div class="lookItem" @click="redirectDetail(item.visitorId)" v-for="(item,index) in lookList" :key="index">
          <div class="baseInfoContainer">
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
              <div>
                <span style="font-size:12px;color:#999999;margin-right:10px;">来访次数：{{item.count}}</span>
                <span style="font-size:12px;color:#999999;">最近来访：{{item.lastUpdateTime}}</span>
              </div>
            </div>
          </div>
          <div class="state">
            <el-button type="danger" size="mini" round>{{item.gender?'他':'她'}}的主页</el-button>
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
export default {
  data() {
    return {
      lookList: [],
      sum: {
        todayCount: 0,
        sumCount: 0,
        newCount: 0,
      },
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
    };
  },
  methods: {
    async getLookList() {
      var res = await this.$http.get("Visitor", { params: this.queryInfo });
      this.lookList = res.data.items;
      this.totalCount = res.data.total;
    },
    //统计
    async getSum() {
      var res = await this.$http.get("Visitor/Sum");
      this.sum = res.data;
    },
    //点击页码
    async currentIndexChange(index) {
      this.queryInfo.pageIndex = index;
      await this.getLookList();
    },
    //跳转到详情页面
    redirectDetail(visitorId) {
      if (visitorId != "0") {
        this.$router.push("/UserDetail/" + visitorId);
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
  },
  mounted() {
    this.getLookList();
    this.getSum();
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
}
.listContent {
  padding: 12px;
  .lookList {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    width: 100%;
    height: 1100px;
    .title {
      width: 800px;
      height: 30px;
      margin: 20px auto;
      display: flex;
      justify-content: center;
      span {
        margin: 0 30px;
      }
    }
    .lookItem {
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
      .state {
        display: flex;
        align-items: center;
        justify-items: center;
        justify-content: space-between;
        height: 60px;
        font-size: 12px;
      }
    }
    .lookItem:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>