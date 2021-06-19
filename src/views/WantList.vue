<template>
  <div class="page">
    <div class="listContent">
      <div class="title">
        <span>收到的申请</span>
        <span>发出的申请</span>
      </div>
      <div class="wantList">
        <div class="wantItem" v-for="item in wantList" :key="item.id">
          <div class="baseInfoContainer">
            <div class="img" @click="redict('userdetail/'+item.id)">
              <el-image fit="cover" :src="item.headPic"></el-image>
            </div>
            <div class="baseInfo">
              <span style="font-size:14px;color:#ff6666;font-weight:700;">{{item.nickName}}</span>
              <span
                style="font-size:12px;color:#999999;">{{item.year}}年|{{item.height}}cm|{{item.education}}|{{item.work}}</span>
              <span style="font-size:12px;color:#999999;">{{item.reviceTime}} 收到</span>
            </div>
          </div>
          <div class="wechat">
            <span style="font-size:12px;color:#999999;font-weight:700;">Ta 的微信</span>
            <span style="font-size:12px;color:#ff6666;">微信号：{{item.wechatId}}</span>
          </div>
          <div class="state">
            <span class="fa fa-heart fa-2x" style="color:#ff6666;"></span>
            <span style="font-size:12px;color:#999999;">{{item.replyTime}} 通过</span>
          </div>
        </div>
      </div>
      <div>
        <el-pagination background :page-size="search.pageIndex" :pager-count="search.pageSize"
          layout="prev, pager, next" :total="search.totalCount/search.pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wantList: [
        {
          id: 1,
          nickName: "小月亮",
          year: 94,
          height: 164,
          weight: 54,
          education: "本科",
          work: "软件开发工程师",
          wechatId: "MicroHeart",
          replyTime: "2020-01-26",
          reviceTime: "2020-01-26 09:00:00",
          headPic:
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
        },
        {
          id: 2,
          nickName: "小月亮",
          year: 94,
          height: 164,
          weight: 54,
          education: "本科",
          work: "软件开发工程师",
          wechatId: "MicroHeart",
          replyTime: "2020-01-26",
          reviceTime: "2020-01-26 09:00:00",
          headPic:
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
        },
        {
          id: 3,
          nickName: "小月亮",
          year: 94,
          height: 164,
          weight: 54,
          education: "本科",
          work: "软件开发工程师",
          wechatId: "MicroHeart",
          replyTime: "2020-01-26",
          reviceTime: "2020-01-26 09:00:00",
          headPic:
            "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
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
    height: 700px;

    .wantItem {
      width: 800px;
      height: 64px;
      margin: 20px auto;
      display: flex;
      padding: 10px 20px;
      border-bottom: 1px solid #f2f2f2;
      justify-content: space-between;
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