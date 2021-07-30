<template>
  <div class="page">
    <div class="titleContainer">
      <span>充值记录</span>
    </div>

    <div class="orderList">
      <div>
        <div class="orderItem" v-for="(item, index) in orderList" :key="index">
          <span :class="item.orderState==4?'fa fa-check-circle green':'fa fa-times-circle-o red'"> {{ item.goodsDesc }}--{{ item.payAmount }}元</span>
          <span>{{ item.orderStateDesc }}</span>
          <span>{{ item.createTime }}</span>
        </div>
      </div>

      <div>
        <el-pagination @current-change="currentIndexChange" :page-size="queryInfo.pageSize" :pager-count="7" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: [],
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
    };
  },
  methods: {
    async getOrderList() {
      var res = await this.$http.get("Order", {
        params: this.queryInfo,
      });
      this.orderList = res.data.items;
      this.totalCount = res.data.total;
      console.log("orderList", this.orderList);
    },
    async currentIndexChange(index) {
      this.queryInfo.pageIndex = index;
      await this.getOrderList();
    },
  },
  created() {
    this.getOrderList();
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

.orderList {
  background-color: #fff;
  border-radius: 10px;
  padding: 12px;
  width: 100%;
  height: 860px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .orderItem {
    width: 800px;
    height: 40px;
    margin: 20px auto;
    display: flex;
    padding: 10px 20px;
    border-radius: 10px;
    border-bottom: 1px solid #f2f2f2;
    justify-content: space-between;
    align-items: center;
  }
  .orderItem:hover {
    background-color: #f2f2f2;
  }
}

.green {
  color: #52c41a;
}
.red {
  color: #ff6666;
}
</style>