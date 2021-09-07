<template>
  <div class="page">
    <div class="listContent">
      <div class="titleContainer">
        <span>消息列表</span>
      </div>

      <div class="messageList">
        <!-- 消息：1、被举报
             2、举报后反馈
             3、动态回复，评论回复 先不做 -->
        <el-collapse @change="read">
          <el-collapse-item :title="report.userId==user.id?'举报反馈':'被举报'" :name="index" v-for="(report,index) in reports" :key="index">
              <div v-if="report.userId==user.id">举报已经收到，已经根据 “行为处罚规则” 对相应用户做出处理，感谢你的反馈。</div>
              <div v-else>{{report.dealContent}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      reports: [],
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
    };
  },
  methods: {
    async getReportList() {
      const res = await this.$http.get("Report", {
        params: this.queryInfo,
      });
      if (!res) return;
      this.reports = res.data.items;
      this.totalCount = res.data.total;
    },
    async getUser() {
      const res = await this.$http.get("User");
      if (!res) return;
      this.user = res.data;
    },
    async read(index) {
      console.log("消息", this.reports[index]);
      if (
        this.reports[index].userId == this.user.id &&
        this.reports[index].userRead
      )
        return true;
      else if (
        this.reports[index].reportUserId == this.user.id &&
        this.reports[index].reportUserRead
      )
        return true;
      else {
        const res = await this.$http.get(
          "Report/Read/" + this.reports[index].id
        );
        if (!res) return;
      }
    },
  },
  mounted() {
    this.getReportList();
    this.getUser();
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
.messageList {
  min-height: 850px;
  background-color: #fff;
}
</style>