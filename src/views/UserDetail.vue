<template>
  <div class="page">
    <div class="baseInfoContainer">
      <el-image fit="cover" :src="userDetail.headPic" alt=""></el-image>
      <div class="rightContainer">
        <div class="nickContainer">{{userDetail.nickName}}</div>
        <div class="centenContainer">
          <div>{{userDetail.year}}年 - </div>
          <div>{{userDetail.height}}cm - </div>
          <div>{{userDetail.weight}}kg - </div>
          <div>{{userDetail.homeCity}}人 - </div>
          <div>{{userDetail.career}}</div>
        </div>
        <div class="tagContainer">
          <div :class="userDetail.idCardState==4?'red':''">
            <span class="fa fa-id-card fa-3x"></span>
            <span class="tagTitle">身份认证</span>
            <span class="tagValue">已认证</span>
          </div>
          <div :class="userDetail.educationState==4?'red':''">
            <span class="fa fa-graduation-cap fa-3x"></span>
            <span class="tagTitle">学历认证</span>
            <span class="tagValue">{{userDetail.educationDesc}}</span>
          </div>
          <div :class="userDetail.companyState==4?'red':''">
            <span class="fa fa-tv fa-3x"></span>
            <span class="tagTitle">工作认证</span>
            <span class="tagValue">{{userDetail.companyName}}</span>
          </div>
          <div class="red">
            <span class="fa fa-home fa-3x"></span>
            <span class="tagTitle">现居地</span>
            <span class="tagValue">{{userDetail.currentCity}}</span>
          </div>
        </div>

        <div class="wantContainer">
          <div style="margin-right:10px">
            <span class="fa fa-heart"></span>
            <span>求认识</span>
          </div>
          <div style="background-color:rgba(0, 0, 0, 0);color: #ff6666;margin-left:10px">
            <span class="fa fa-plus"></span>
            <span> 关注</span>
          </div>
        </div>
      </div>
    </div>
    <div class="picsContainer">
      <div class="title">
        <span>生活照片</span>
      </div>

      <div class="pics">
        <el-image fit="cover" v-for="(pic,index) in userDetail.pictures" :src="pic" :preview-src-list="userDetail.pictures" :key="index"></el-image>
      </div>
    </div>
    <div class="descContainer">
      <div class="title">
        <span>关于我</span>
      </div>
      <div class="desc">
        <div class="descItem">
          <div class="descTitle">
            <span class="fa fa-circle fa-1x"></span>
            <span>自我介绍</span>
          </div>
          <div class="descContent">
            {{introduction.myIntroduce}}
          </div>
        </div>
        <div class="descItem">
          <div class="descTitle">
            <span class="fa fa-circle fa-1x"></span>
            <span>家庭背景</span>
          </div>
          <div class="descContent">{{introduction.homeIntroduce}}</div>
        </div>
        <div class="descItem">
          <div class="descTitle">
            <span class="fa fa-circle fa-1x"></span>
            <span>理想另一半</span>
          </div>
          <div class="descContent">{{introduction.halfIntroduce}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      userDetail: {},
      introduction: {
        myIntroduce: "",
        homeIntroduce: "",
        halfIntroduce: "",
      },
    };
  },
  methods: {
    async getDetail() {
      var userId = this.$route.params.id;
      const res = await this.$http.get("User/" + userId);
      console.log("resDetail", res);
      this.userDetail = res.data;
      this.introduction = JSON.parse(res.data.introduction);
      console.log("introduction", this.introduction);
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  padding-top: 30px;
}
.baseInfoContainer {
  width: 100%;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  border-radius: 10px;
  .el-image {
    height: 360px;
    width: 320px;
    border-radius: 10px;
  }

  .rightContainer {
    width: 600px;
    height: 100%;
    color: #999999;
    padding: 20px;
    .nickContainer {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      padding: 20px 0;
      color: #666666;
    }
    .centenContainer {
      display: flex;
      font-size: 14px;
      color: #999999;
      justify-content: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #e4e4e4;
    }
    .tagContainer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .red {
        color: #fd9191;
      }
      div {
        width: 100px;
        height: 90px;
        margin: 30px 0px;
        padding: 15px 0px;
        background-color: rgb(242, 242, 242);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .tagTitle {
          font-size: 13px;
          font-weight: 700;
        }
        .tagValue {
          font-size: 14px;
          padding-top: 4px;
        }
        span {
          text-align: center;
        }
      }
    }
    .wantContainer {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      div {
        width: 128px;
        height: 22px;
        color: #fff;
        padding: 6px 20px;
        background-color: #ff6666;
        border: 1px solid #ff6666;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          text-align: center;
          margin-right: 8px;
        }
      }
    }
  }
}

.picsContainer {
  margin-top: 30px;
  .pics {
    padding: 12px 12px 0 12px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    .el-image {
      width: 230px;
      height: 280px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    .pics::after {
      content: "";
      width: 220px;
    }
  }
}

.title {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
  span:before,
  span:after {
    content: "";
    position: absolute;
    top: 50%;
    float: left;
    height: 1px;
    width: 420px;
    border-top: 1px dashed #999999;
  }
  span:before {
    left: 0%;
  }
  span:after {
    right: 0%;
  }
}

.descContainer {
  margin-top: 30px;
}

.desc {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 30px;
  padding: 20px;
  .descItem {
    div {
      font-size: 13px;
    }
    .descTitle {
      color: #6e6fff;
      font-size: 13px;
      font-weight: 700;
      background-color: #f4f4ff;
      width: 100px;
      height: 26px;
      line-height: 26px;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      .fa {
        margin-right: 6px;
      }
    }
    .descContent {
      margin: 12px 0;
      line-height: 24px;
    }
  }
}
</style>