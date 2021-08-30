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
        <el-collapse>
          <el-collapse-item title="一致性 Consistency" name="1" v-for="(report,index) in reports" :key="index">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
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
      reports:[],
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
    };
  },
  methods: {
    async getReportList() {
      const res = await this.$http.get("Report/GetList", {
        params: this.queryInfo,
      });
      if (!res) return;
      this.reports = res.data.items;
      this.totalCount = res.data.total;
    },
  },
  mounted() {},
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