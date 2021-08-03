<template>
  <div class="page">
    <div class="listContent">
      <div class="title">
        <span :class="chooseIndex==1?'choosed':''" @click="choose(1)">收到的申请</span>
        <span :class="chooseIndex==2?'choosed':''" @click="choose(2)">发出的申请</span>
      </div>
      <div v-if="chooseIndex==1" class="sendList">
        <div class="wantItem" v-for="(item,index) in sendList" :key="index">
          <div class="baseInfoContainer">
            <div class="img" @click="redict('userdetail/'+item.toUserId)">
              <el-image fit="cover" :src="item.headPic"></el-image>
            </div>
            <div class="baseInfo">
              <span style="font-size:14px;color:#ff6666;font-weight:700;">{{item.nickName}}</span>
              <span style="font-size:12px;color:#999999;">{{item.year}}年|{{item.height}}cm|{{item.educationDesc}}|{{item.career}}</span>
              <span style="font-size:12px;color:#999999;">{{item.createTime}} 发出</span>
            </div>
          </div>
          <div class="wechat">
            <span style="font-size:12px;color:#999999;font-weight:700;">Ta 的微信</span>
            <span style="font-size:12px;color:#ff6666;">微信号：{{item.weChatId}}</span>
          </div>
          <div class="state">
            <span class="fa fa-heart fa-2x" style="color:#ff6666;"></span>
            <span style="font-size:12px;color:#999999;">{{item.replyTime}} 回复</span>
          </div>
        </div>
      </div>

      <div v-if="chooseIndex==2" class="sendList">
        <div class="wantItem" v-for="(item,index) in receiveList" :key="index">
          <div class="baseInfoContainer">
            <div class="img" @click="redict('userdetail/'+item.fromUserId)">
              <el-image fit="cover" :src="item.headPic"></el-image>
            </div>
            <div class="baseInfo">
              <span style="font-size:14px;color:#ff6666;font-weight:700;">{{item.nickName}}</span>
              <span style="font-size:12px;color:#999999;">{{item.year}}年|{{item.height}}cm|{{item.educationDesc}}|{{item.career}}</span>
              <span style="font-size:12px;color:#999999;">{{item.createTime}} 发出</span>
            </div>
          </div>
          <div class="wechat">
            <span style="font-size:12px;color:#999999;font-weight:700;">Ta 的微信</span>
            <span style="font-size:12px;color:#ff6666;">微信号：{{item.weChatId}}</span>
          </div>
          <div class="state">
            <span class="fa fa-heart fa-2x" style="color:#ff6666;"></span>
            <span style="font-size:12px;color:#999999;">{{item.replyTime}} 回复</span>
          </div>
        </div>
      </div>
      <div>
        <el-pagination background :page-size="search.pageIndex" :pager-count="search.pageSize" layout="prev, pager, next" :total="search.totalCount/search.pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chooseIndex: 1,
      sendList: [],
      receiveList: [],
      search: {
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
    };
  },
  methods: {
    async getSendList() {
      var res = await this.$http.post("Want/SendList", this.search);
      console.log("sentList", res);
      this.sendList = res.data.items;
      this.totalCount = res.data.total;
    },
    async getReceiveList() {
      var res = await this.$http.post("Want/ReceiveList", this.search);
      console.log("receiveList", res);
      this.receiveList = res.data.items;
      this.totalCount = res.data.total;
    },
    async choose(index) {
      if (index == 1) {
        await this.getSendList();
      } else {
        await this.getReceiveList();
      }
      this.chooseIndex = index;
    },
    redict(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    this.getSendList();
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
    width: 100%;
    margin-top: 20px;
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
  .sendList {
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
      .wechat {
        padding: 10px 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
      }
      .state {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        height: 60px;
      }
    }
    .wantItem:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>