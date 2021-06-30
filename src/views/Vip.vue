<template>
  <div class="page">
    <div class="titleContainer">
      <span>我的会员</span>
    </div>
    <div class="container">
      <div class="userInfo">
        <div>
          <span class="fa fa-user-o fa-3x" style="color: #ff6666"></span>
          <span style="margin-left: 30px; font-size: 700"
            >当前为：免费用户</span
          >
        </div>
        <div>
          <el-image
            :src="require('../assets/金币.png')"
            fit="contain"
          ></el-image>
          <el-link @click="redirect('/orderlist')" type="danger" style="margin-left: 30px">充值记录>></el-link>
        </div>
      </div>

      <div class="tableContainer">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>未认证用户</th>
              <th>认证用户</th>
              <th>VIP用户</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>用户列表</td>
              <td>仅看部分</td>
              <td>仅看部分</td>
              <td>查看全部</td>
            </tr>
            <tr>
              <td>精确搜索</td>
              <td style="color: #ff6666">✘</td>
              <td style="color: #ff6666">✘</td>
              <td style="color: #52c41a">✔</td>
            </tr>
            <tr>
              <td>申请功能</td>
              <td style="color: #ff6666">✘</td>
              <td style="color: #ff6666">✘</td>
              <td style="color: #52c41a">✔</td>
            </tr>
            <tr>
              <td>访客列表</td>
              <td style="color: #ff6666">✘</td>
              <td style="color: #ff6666">✘</td>
              <td style="color: #52c41a">✔</td>
            </tr>
            <tr>
              <td>推送功能</td>
              <td style="color: #ff6666">✘</td>
              <td style="color: #52c41a">✔</td>
              <td style="color: #52c41a">✔</td>
            </tr>
            <tr>
              <td>查看收藏</td>
              <td style="color: #ff6666">✘</td>
              <td style="color: #ff6666">✘</td>
              <td style="color: #52c41a">✔</td>
            </tr>
            <tr>
              <td>申请次数</td>
              <td style="color: #ff6666">✘</td>
              <td>100红线/次</td>
              <td>一次/天</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="goodsContainer">
        <div
          :class="selectedIndex === 1 ? 'goodsItem redBorder' : 'goodsItem'"
          @click="chooseGoods(1)"
        >
          <div class="title">月卡</div>
          <div class="unitPrice">￥1.3/天</div>
          <div class="lineTitle">￥49</div>
          <div class="price">￥39</div>
          <div :class="selectedIndex === 1 ? 'selectedIcon' : 'close'"></div>
          <div class="discount">8折</div>
        </div>
        <div
          :class="selectedIndex === 2 ? 'goodsItem redBorder' : 'goodsItem'"
          @click="chooseGoods(2)"
        >
          <div class="title">季卡</div>
          <div class="unitPrice">￥1.1/天</div>
          <div class="lineTitle">￥147</div>
          <div class="price">￥99</div>
          <div :class="selectedIndex === 2 ? 'selectedIcon' : 'close'"></div>
          <div class="discount">6.7折</div>
        </div>
        <div
          :class="selectedIndex === 3 ? 'goodsItem redBorder' : 'goodsItem'"
          @click="chooseGoods(3)"
        >
          <div class="title">年卡</div>
          <div class="unitPrice">￥1/天</div>
          <div class="lineTitle">￥588</div>
          <div class="price">￥365</div>
          <div :class="selectedIndex === 3 ? 'selectedIcon' : 'close'"></div>
          <div class="discount">6.2折</div>
        </div>
      </div>
      <div class="buyButton">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedIndex: 2,
    };
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    chooseGoods(index) {
      this.selectedIndex = index;
    },
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
.container {
  width: 100%;
  height: 830px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  .userInfo {
    display: flex;
    justify-content: space-between;
    width: 800px;
    margin: 20px auto;
    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 200px;
      height: 60px;
    }
    span {
      height: 48px;
      line-height: 48px;
    }
    .el-image {
      width: 50px;
      height: 50px;
    }
  }
  .tableContainer {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-bottom: 30px;
    table {
      border-collapse: collapse;
      border-spacing: 0;
      thead {
        background-color: #ff6666;
        height: 50px;
        line-height: 30px;
        border-radius: 10px;
        color: #ffffff;
      }
      tbody:before {
        content: "-";
        display: block;
        line-height: 1em;
        color: transparent;
      }
      tr {
        th,
        td {
          width: 200px;
          text-align: center;
          border: 1px #f2f2f2 solid;
          height: 40px;
        }
      }
    }
  }

  .goodsContainer {
    display: flex;
    justify-content: space-between;
    width: 800px;
    margin: auto;
    .goodsItem {
      display: flex;
      justify-content: space-between;
      text-align: center;
      display: flex;
      flex-direction: column;
      height: 180px;
      width: 160px;
      border-radius: 10px;
      color: black;
      background-color: #f2f2f2;
      padding: 20px 16px;
      position: relative;
    }
  }
  .buyButton {
    width: 50%;
    height: 50px;
    line-height: 50px;
    border-radius: 20px;
    margin: auto;
    text-align: center;
    margin-top: 40px;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    background: linear-gradient(to right, #fe695c, #fd3b72);
  }
}
.selectedIcon {
  background-color: #fd3b72;
  background-image: url("../assets/选中.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 30px;
  width: 30px;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 14px 0 10px 0;
}
.close {
  display: none;
}

.discount {
  border-radius: 15px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(to right, #fe695c, #fd3b72);
  position: absolute;
  width: 70px;
  height: 24px;
  line-height: 24px;
  top: -12px;
  right: 50%;
  margin-right: -35px;
}

.redBorder {
  border: 1px solid #fd3b72;
}
.title {
  font-size: 18px;
  font-weight: 700;
}
.unitPrice {
  font-size: 20px;
  font-weight: 700;
  color: #fd3b72;
}
.lineTitle {
  font-size: 16px;
  text-decoration: line-through;
}
.price {
  font-size: 14px;
}
</style>