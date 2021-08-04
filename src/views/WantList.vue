<template>
  <div class="page">
    <div class="listContent">
      <div class="title">
        <span :class="chooseIndex==1?'choosed':''" @click="choose(1)">发出的申请</span>
        <span :class="chooseIndex==2?'choosed':''" @click="choose(2)">收到的申请</span>
      </div>
      <div v-if="chooseIndex==1" class="wantList">
        <div class="wantItem" v-for="(item,index) in sendList" :key="index">
          <div class="baseInfoContainer pointer" @click="redirect('userdetail/'+item.toUserId)">
            <div class="img">
              <el-image fit="cover" :src="item.headPic"></el-image>
            </div>
            <div class="baseInfo">
              <div>
                <span v-if="item.gender" class="fa fa-venus" style="margin-right:10px;color:blue;font-weight:700"></span>
                <span v-else class="fa fa-mars" style="margin-right:10px;color:#ff6666;font-weight:700"></span>
                <span style="font-size:14px;color:#ff6666;font-weight:700;">{{item.nickName}}</span>
              </div>
              <span style="font-size:12px;color:#29292;">{{item.year}}年 - {{item.height}}cm - {{item.educationDesc}} - {{item.career}}</span>
              <span style="font-size:12px;color:#999999;">{{item.createTime}} 申请</span>
            </div>
          </div>
          <div class="wechat" v-if="item.state==3">
            <span style="font-size:12px;color:#999999;font-weight:700;">Ta 的微信</span>
            <span style="font-size:12px;color:#ff6666;">微信号：{{item.weChatId}}</span>
          </div>
          <div class="state">
            <span v-if="item.state==3" class="fa fa-heart fa-2x" style="color:#ff6666;"></span>
            <span v-else class="fa fa-heart-o fa-2x" style="color:#999999;"></span>
            <span style="font-size:12px;color:#999999;">{{wantStates[item.state]}}</span>
          </div>
        </div>
      </div>

      <div v-if="chooseIndex==2" class="wantList">
        <div class="wantItem" v-for="(item,index) in receiveList" :key="index">
          <div class="baseInfoContainer pointer" @click="redirect('userdetail/'+item.fromUserId)">
            <div class="img">
              <el-image fit="cover" :src="item.headPic"></el-image>
            </div>
            <div class="baseInfo">
              <div>
                <span v-if="item.gender" class="fa fa-venus" style="margin-right:10px;color:blue;font-weight:700"></span>
                <span v-else class="fa fa-mars" style="margin-right:10px;color:#ff6666;font-weight:700"></span>
                <span style="font-size:14px;color:#ff6666;font-weight:700;">{{item.nickName}}</span>
              </div>
              <span style="font-size:12px;color:#29292;">{{item.year}}年 - {{item.height}}cm - {{item.educationDesc}} - {{item.career}}</span>
              <span style="font-size:12px;color:#999999;">{{item.createTime}} 申请</span>
            </div>
          </div>
          <div class="wechat" v-if="item.state==3">
            <span style="font-size:12px;color:#999999;font-weight:700;">Ta 的微信</span>
            <span style="font-size:12px;color:#ff6666;">微信号：{{item.weChatId}}</span>
          </div>
          <div class="operation">
            <div v-if="item.state==1||item.state==2">
              <el-button type="success" size="mini" @click="accept(item.id)" round>通 过</el-button>
              <el-button type="danger" size="mini" @click="refuse(item.id)" round>拒 绝</el-button>
            </div>
            <div v-else>
              <span style="font-size:12px;color:#999999;">{{wantStates[item.state]=='对方已拒绝'?'已拒绝':wantStates[item.state]}}</span>
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
      sendList: [],
      receiveList: [],
      queryInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
      wantStates: config.wantStates,
    };
  },
  methods: {
    async getSendList() {
      var res = await this.$http.post("Want/SendList", this.queryInfo);
      this.sendList = res.data.items;
      this.totalCount = res.data.total;
    },
    async getReceiveList() {
      var res = await this.$http.post("Want/ReceiveList", this.queryInfo);
      this.receiveList = res.data.items;
      this.totalCount = res.data.total;
    },
    async refuse(id) {
      this.$confirm("确定拒绝吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.put("Want/Refuse/" + id);
          this.$message({
            type: "success",
            message: "已拒绝!",
          });
          await this.getReceiveList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    async accept(id) {
      var res = await this.$http.put("Want/Accept/" + id);
      await this.getReceiveList();
    },
    async currentIndexChange(index) {
      this.queryInfo.pageIndex = index;
      if (this.chooseIndex == 1) await this.getSendList();
      else await this.getReceiveList();
    },
    async choose(index) {
      this.queryInfo.pageIndex = 1;
      if (index == 1) {
        await this.getSendList();
      } else {
        await this.getReceiveList();
      }
      this.chooseIndex = index;
    },
    redirect(path) {
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
  .wantList {
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