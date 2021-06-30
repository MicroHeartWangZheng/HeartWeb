<template>
  <div class="page">
    <div class="titleContainer">
      <span>充值记录</span>
    </div>

    <div class="orderList">
      <div class="orderItem" v-for="(item, index) in orderList" :key="index">
        <span :class= "item.orderState==='支付完成'?'fa fa-check-circle green':'fa fa-times-circle-o red'"> {{ item.goodName }}--{{ item.payAmount }}元</span>
        <span>{{ item.orderState }}</span>
        <span>{{ item.createTime }}</span>
      </div>
      <div>
        <el-pagination
          background
          :page-size="search.pageIndex"
          :pager-count="search.pageSize"
          layout="prev, pager, next"
          :total="search.totalCount / search.pageSize"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: [
        {
          id: 1,
          goodName: "月卡",
          orderState: "支付完成",
          payAmount: 49,
          createTime: "2020-01-02 09:48:53",
        },
        {
          id: 2,
          goodName: "季卡",
          orderState: "支付完成",
          payAmount: 365,
          createTime: "2020-01-02 09:48:53",
        },
        {
          id: 3,
          goodName: "年卡",
          orderState: "未支付",
          payAmount: 365,
          createTime: "2020-01-02 09:48:53",
        },
        {
          id: 4,
          goodName: "年卡",
          orderState: "支付完成",
          payAmount: 365,
          createTime: "2020-01-02 09:48:53",
        },
        {
          id: 1,
          goodName: "月卡",
          orderState: "支付完成",
          payAmount: 49,
          createTime: "2020-01-02 09:48:53",
        },
        {
          id: 2,
          goodName: "季卡",
          orderState: "未支付",
          payAmount: 365,
          createTime: "2020-01-02 09:48:53",
        },
        {
          id: 3,
          goodName: "年卡",
          orderState: "未支付",
          payAmount: 365,
          createTime: "2020-01-02 09:48:53",
        },
        {
          id: 4,
          goodName: "年卡",
          orderState: "已支付",
          payAmount: 365,
          createTime: "2020-01-02 09:48:53",
        },
        {
          id: 3,
          goodName: "年卡",
          orderState: "未支付",
          payAmount: 365,
          createTime: "2020-01-02 09:48:53",
        },
        {
          id: 4,
          goodName: "年卡",
          orderState: "已支付",
          payAmount: 365,
          createTime: "2020-01-02 09:48:53",
        },
      ],
      search: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 101,
      },
    };
  },
  methods: {
    redict(path) {
      this.$router.push(path);
    },
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

.green{
  color: #52c41a;
}
.red{
   color: #ff6666;
}
</style>