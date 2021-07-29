<template>
  <div class="page">
    <div class="baseInfoContainer">
      <el-image fit="cover" :src="user.headPic" alt=""></el-image>
      <div class="rightContainer">
        <div class="nickContainer">{{user.nickName}}</div>
        <div class="centenContainer">
          <div>{{user.year}}年 - </div>
          <div>{{user.height}}cm - </div>
          <div>{{user.weight}}kg - </div>
          <div>{{user.educationDesc}} - </div>
          <div>{{user.homeCity}}人 - </div>
          <div>现居{{user.currentCity}} - </div>
          <div>{{user.career}}</div>
        </div>
        <div class="tagContainer">
          <div :class="user.idCardState==4?'red':''">
            <span class="fa fa-id-card fa-3x"></span>
            <span class="tagTitle">身份认证</span>
            <span class="tagValue">已认证</span>
          </div>
          <div :class="user.educationState==4?'red':''">
            <span class="fa fa-graduation-cap fa-3x"></span>
            <span class="tagTitle">学历认证</span>
            <span v-if="setting.HideSchool" class="tagValue">{{user.schoolName}}(已隐藏)</span>
            <span v-else class="tagValue">{{user.schoolName}}</span>
          </div>
          <div :class="user.companyState==4?'red':''">
            <span class="fa fa-tv fa-3x"></span>
            <span class="tagTitle">工作认证</span>
            <span v-if="setting.HideCompany" class="tagValue">{{user.companyName}}(已隐藏)</span>
            <span v-else class="tagValue">{{user.companyName}}</span>
          </div>
        </div>
        <div class="wantContainer">
          <div style="margin-right:10px" @click="want">
            <span class="fa fa-heart"></span>
            <span>求认识</span>
          </div>
          <div style="background-color:rgba(0, 0, 0, 0);color: #ff6666;margin-left:10px" @click="follow">
            <span class="fa fa-plus"></span>
            <span>关 注</span>
          </div>
        </div>
      </div>
    </div>
    <div class="picsContainer">
      <div class="title">
        <span>生活照片</span>
        <el-link class="redirect" type="danger" @click="redirect('/UpdatePictures')" :underline="false">修改</el-link>
      </div>

      <el-row :gutter="20" class="pics" style="margin:0px;">
        <el-col :span="6" v-for="(pic,index) in user.pictures" :key="index">
          <el-image fit="cover" :src="pic" :preview-src-list="user.pictures"></el-image>
        </el-col>
      </el-row>

    </div>
    <div class="descContainer">
      <div class="title">
        <span>关于我</span>
        <el-link class="redirect" :type="editDesc?'success':'danger'" :underline="false" @click="edit">{{editDesc?"完成":"修改"}}</el-link>
      </div>
      <div class="desc">
        <div class="descItem">
          <div class="descTitle">
            <span class="fa fa-circle fa-1x"></span>
            <span>自我介绍</span>
          </div>
          <div class="descContent">
            <div v-if="!editDesc">{{introduction.myIntroduce}}</div>
            <el-input v-else type="textarea" placeholder="请输入内容" v-model="introduction.myIntroduce" :autosize="{ minRows: 3, maxRows: 50 }"></el-input>
          </div>
        </div>
        <div class="descItem">
          <div class="descTitle">
            <span class="fa fa-circle fa-1x"></span>
            <span>家庭背景</span>
          </div>
          <div class="descContent">
            <div v-if="!editDesc">{{introduction.homeIntroduce}}</div>
            <el-input v-else type="textarea" placeholder="请输入内容" v-model="introduction.homeIntroduce" :autosize="{ minRows: 3, maxRows: 50 }"></el-input>
          </div>
        </div>
        <div class="descItem">
          <div class="descTitle">
            <span class="fa fa-circle fa-1x"></span>
            <span>理想另一半</span>
          </div>
          <div class="descContent">
            <div v-if="!editDesc">{{introduction.halfIntroduce}}</div>
            <el-input v-else type="textarea" placeholder="请输入内容" v-model="introduction.halfIntroduce" :autosize="{ minRows: 3, maxRows: 50 }"></el-input>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      editDesc: false,
      introduction: {
        myIntroduce: "",
        homeIntroduce: "",
        halfIntroduce: "",
      },
      setting: {},
    };
  },
  methods: {
    async getDetail() {
      const res = await this.$http.get("User");
      this.user = res.data;
      this.introduction = JSON.parse(this.user.introduction);
      this.setting = JSON.parse(this.user.setting);
    },
    redirect(path) {
      this.$router.push(path);
    },
    async want() {
      this.$message.error("不能申请自己");
    },
    async follow() {
      this.$message.error("不能关注自己");
    },
    //点击编辑
    async edit() {
      this.editDesc = !this.editDesc;
      if (this.editDesc == false) {
        var req = {
          Introduction: JSON.stringify(this.introduction),
        };
        console.log("提交介绍", req);
        var res = await this.$http.put(
          "UserExtend/UpdateIntroduction",
          req
        );
      }
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
        width: 160px;
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
    padding-top: 12px;
    border-radius: 10px;
    background-color: #fff;
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

  .redirect {
    margin-left: 10px;
    font-size: 13px;
    font-weight: 700;
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

// /deep/ .descContent .el-textarea .el-textarea__inner {
//   border: none;
//   font-size: 14px;
//   color: #000;
// }
</style>