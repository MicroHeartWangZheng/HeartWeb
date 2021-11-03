<template>
  <div class="page">
    <div class="baseInfoContainer">
      <el-image fit="cover" :src="user.headPic" alt=""></el-image>
      <div class="rightContainer">
        <div class="warnContainer" @click="clickReport">
          <el-tooltip effect="dark" content="举报" placement="left-end">
            <span class="fa fa-exclamation-triangle"></span>
          </el-tooltip>
        </div>
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
            <span class="tagValue">{{user.idCardState=='4'?'已认证':'未认证'}}</span>
          </div>
          <div :class="user.educationState==4?'red':''">
            <span class="fa fa-graduation-cap fa-3x"></span>
            <span class="tagTitle">学历认证</span>
            <span v-if="!setting.HideSchool && user.educationState==4" class="tagValue">{{user.schoolName}}</span>
            <span v-else-if="setting.HideSchool && user.educationState==4" class="tagValue">已隐藏</span>
            <span v-else class="tagValue">未认证</span>
          </div>
          <div :class="user.companyState==4?'red':''">
            <span class="fa fa-tv fa-3x"></span>
            <span class="tagTitle">工作认证</span>
            <span v-if="!setting.HideCompany && user.companyState==4" class="tagValue">{{user.companyName}}</span>
            <span v-else-if="setting.HideCompany && user.companyState==4" class="tagValue">已隐藏</span>
            <span v-else class="tagValue">未认证</span>
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
      </div>
      <div class="desc">
        <div class="descItem">
          <div class="descTitle">
            <span class="fa fa-circle fa-1x"></span>
            <span>自我介绍</span>
          </div>
          <div class="descContent br">{{introduction.myIntroduce}}</div>
        </div>
        <div class="descItem">
          <div class="descTitle">
            <span class="fa fa-circle fa-1x"></span>
            <span>家庭背景</span>
          </div>
          <div class="descContent br">{{introduction.homeIntroduce}}</div>
        </div>
        <div class="descItem">
          <div class="descTitle">
            <span class="fa fa-circle fa-1x"></span>
            <span>理想另一半</span>
          </div>
          <div class="descContent br">{{introduction.halfIntroduce}}</div>
        </div>
      </div>
    </div>
    <el-dialog title="举报原因" :visible.sync="dialogVisible" width="30%">
      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入举报内容" v-model="reportContent">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="danger" @click="report" size="mini">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      introduction: {
        myIntroduce: "",
        homeIntroduce: "",
        halfIntroduce: "",
      },
      setting: {},
      dialogVisible: false,
      reportContent: "",
    };
  },
  methods: {
    async getDetail() {
      var userId = this.$route.params.id;
      const res = await this.$http.get("User/" + userId);
      this.user = res.data;
      if (this.user.introduction)
        this.introduction = JSON.parse(res.data.introduction);
      if (this.user.setting) this.setting = JSON.parse(res.data.setting);
    },
    //申请
    async want() {
      this.$confirm("申请消耗100m红线，确定申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.post("Want/" + this.user.id);
          if (res) {
            this.$message({
              type: "success",
              message: "已发出申请，等待对方回应。",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //关注
    async follow() {
      const res = await this.$http.post("Follow/" + this.user.id);
      if (res) {
        this.$message({
          message: "关注成功",
          type: "success",
        });
      }
    },
    //点击举报
    clickReport() {
      this.dialogVisible = true;
    },
    async report() {
      if (this.reportContent.length == 0) {
        this.$message({
          message: "举报原因必填",
          type: "error",
        });
        return false;
      }
      var data = {
        reportUserId: this.$route.params.id,
        content: this.reportContent,
      };
      var res = await this.$http.post("Report", data);
      if (!res) return;
      this.dialogVisible = false;
      this.reportContent = "";
      this.$message({
        message: "举报成功,工作人员会在三个工作日处理完成。",
        type: "success",
      });
    },
    //足迹
    async look() {
      await this.$http.get("Visitor/" + this.$route.params.id);
    },
  },
  mounted() {
    this.getDetail().then(() => {
      this.look();
    });
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
    height: 363px;
    width: 320px;
    border-radius: 10px;
  }
  .rightContainer {
    width: 600px;
    height: 100%;
    color: #999999;
    padding: 20px;

    position: relative;
    .warnContainer {
      position: absolute;
      right: 8px;
      top: 5px;
      font-size: 28px;
      color: #ff7777;
    }
    .warnContainer:hover {
      font-size: 30px;
      color: #ff6666;
    }
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