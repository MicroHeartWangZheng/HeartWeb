    <template>
  <div class="page">
    <div class="titleContainer">
      <span>{{title}}</span>
    </div>
    <div class="titleContainer">
      <div style="font-size:14px">{{desc}}</div>
    </div>
    <div class="contentContainer borderRadius">

      <div class="content">
        <el-steps class="steps" :active="currentStep" finish-status="success">
          <el-step title="基本资料"></el-step>
          <el-step title="图片信息"></el-step>
          <el-step title="认证信息"></el-step>
        </el-steps>

        <div class="stepOne" v-if="currentStep==0">
          <div class="row">
            <div class="title">昵称</div>
            <el-input class="right" v-model="user.nickName" :maxlength="20"></el-input>
          </div>
          <el-divider></el-divider>

          <div class="row">
            <div class="title">性别<span style="color:#b5b4b4;font-size:12px;">（认证后不能修改）</span></div>
            <el-select class="right" v-model="user.gender" :disabled="user.idCardState==4?true:false" placeholder="男">
              <el-option v-for="genderOption in genderOptions" :key="genderOption.value" :label="genderOption.label" :value="genderOption.value">
              </el-option>
            </el-select>
          </div>
          <el-divider></el-divider>

          <div class="row">
            <div class="title">出生日期<span style="color:#b5b4b4;font-size:12px;">（认证后不能修改）</span></div>
            <el-date-picker class="right" :disabled="user.idCardState==4?true:false" v-model="user.birthDate" :default-value="'1990-01-01'" value-format="yyyy-MM-dd" :clearable="false" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
          <el-divider></el-divider>

          <div class="row">
            <div class="title">学历<span style="color:#b5b4b4;font-size:12px;">（认证后不能修改）</span></div>
            <el-select class="right" v-model="user.education" :disabled="user.educationState==4?true:false" placeholder="学历">
              <el-option v-for="education in educations" :key="education.value" :label="education.label" :value="education.value">
              </el-option>
            </el-select>
          </div>
          <el-divider></el-divider>

          <div class="row">
            <div class="title">身高<span style="color:#b5b4b4;font-size:12px;">（认证后不能修改）</span></div>
            <el-select class="right" :disabled="user.idCardState==4?true:false" v-model="user.height" placeholder="身高(cm)">
              <el-option v-for="heightOption in heightOptions" :key="heightOption.value" :label="heightOption.label" :value="heightOption.value">
              </el-option>
            </el-select>
          </div>
          <el-divider></el-divider>

          <div class="row">
            <div class="title">体重</div>
            <el-select class="right" v-model="user.weight" placeholder="体重(kg)">
              <el-option v-for="weightOption in weightOptions" :key="weightOption.value" :label="weightOption.label" :value="weightOption.value">
              </el-option>
            </el-select>
          </div>
          <el-divider></el-divider>

          <div class="row">
            <div class="title">出生地<span style="color:#b5b4b4;font-size:12px;">（认证后不能修改）</span></div>
            <el-cascader class="right" :disabled="user.idCardState==4?true:false" :value="[user.homeProvince,user.homeCity]" :options="regions" @change="chooseHome">
            </el-cascader>
          </div>
          <el-divider></el-divider>

          <div class="row">
            <div class="title">现居地</div>
            <el-cascader class="right" :value="[user.currentProvince,user.currentCity]" :options="regions" @change="chooseCurrent">
            </el-cascader>
          </div>
          <el-divider></el-divider>

          <div class="row">
            <div class="title">职业</div>
            <el-input class="right" v-model="user.career" :maxlength="20"></el-input>
          </div>
          <el-divider></el-divider>

          <div class="row">
            <div class="center">
              <el-button @click="nextSetp(1)">下 一 步</el-button>
            </div>
          </div>
        </div>

        <div class="stepTwo" v-if="currentStep==1">
          <div class="stepTwoContent">
            <div class="picItem pointer" v-for="(pic,index) in pictures" :key="index">
              <el-image :src="pic" fit="cover" style="width: 100%; height: 100%" :preview-src-list="pictures"> </el-image>
              <div class="bottom">
                <div v-if="headPicIndex!==index" @click="setHeadPic(index)">设为封面</div>
                <div v-else>封面</div>
                <div @click="deletePic(index)">删除</div>
              </div>
            </div>
            <el-upload :multiple="true"  :limit="10"  :show-file-list="false"  :on-success="uploadPicture"  :auto-upload="true" action="http://localhost:5000/api/File/Upload">
              <div class="picItem pointer">
                <i class="el-icon-plus"></i>
              </div>
            </el-upload>
          </div>
          <div class="stepTwoBottom">
            <el-button @click="beforeSetp(0)">上 一 步</el-button>
            <el-button @click="nextSetp(2)">下 一 步</el-button>
          </div>
        </div>
        <div class="stepThree" v-if="currentStep==2">
          <div class="authContainer">
            <div class="authTop">
              身份认证
            </div>
            <div class="authContent">
              <div class="row">
                <div class="title">真实姓名<span style="color:#b5b4b4;font-size:12px;">（认证后不能修改）</span></div>
                <el-input class="right" :disabled="user.idCardState==4?true:false" v-model="user.name" :maxlength="10"></el-input>
              </div>
              <el-divider></el-divider>
              <div class="row">
                <div class="title">身份证号<span style="color:#b5b4b4;font-size:12px;">（认证后不能修改）</span></div>
                <el-input class="right" :disabled="user.idCardState==4?true:false" v-model="user.idCardNo" :maxlength="18"></el-input>
              </div>
              <el-divider></el-divider>
              <div class="row">
                <div class="title">身份证照片</div>
                <el-upload action="http://localhost:5000/api/File/Upload" :show-file-list="false" :on-success="uploadIdPicSuccess">
                  <el-tag v-if="user.idCardPicFileName">{{user.idCardPicFileName}}</el-tag>
                  <el-tag v-else-if="user.idCardPic">已上传</el-tag>
                  <el-button v-else>上传</el-button>
                </el-upload>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
          <div class="authContainer">
            <div class="authTop">
              学历认证
            </div>
            <div class="authContent">
              <div class="row">
                <div class="title">学历</div>
                <el-select class="right" v-model="user.education" placeholder="学历" :disabled="user.educationState==4?true:false">
                  <el-option v-for="education in educations" :key="education.value" :label="education.label" :value="education.value">
                  </el-option>
                </el-select>
              </div>
              <el-divider></el-divider>
              <div class="row">
                <div class="title">学校名称<span style="color:#b5b4b4;font-size:12px;">（全称）</span></div>
                <el-input class="right" v-model="user.schoolName" :maxlength="20"></el-input>
              </div>
              <el-divider></el-divider>
              <div class="row">
                <div class="title">学信网验证码</div>
                <el-input class="right" v-model="user.xhwCode" :maxlength="20"></el-input>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
          <div class="authContainer">
            <div class="authTop">
              工作认证
            </div>
            <div class="authContent">
              <div class="row">
                <div class="title">公司名称</div>
                <el-input class="right" placeholder="公司全称" v-model="user.companyName" :maxlength="20"></el-input>
              </div>
              <el-divider></el-divider>
              <div class="row">
                <div class="title">证明图片<span style="color:#b5b4b4;font-size:12px;">(钉钉/微信/合同)</span></div>
                <el-upload action="http://localhost:5000/api/File/Upload" :show-file-list="false" :on-success="uploadCompanyPicSuccess">
                  <el-tag v-if="user.companyPicFileName">{{user.companyPicFileName}}</el-tag>
                  <el-tag v-else-if="user.companyPic">已上传</el-tag>
                  <el-button v-else>上传</el-button>
                </el-upload>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
          <div class="authContainer">
            <div class="authTop">
              联系信息
            </div>
            <div class="authContent">
              <div class="row">
                <div class="title">微信号<span style="color:#b5b4b4;font-size:12px;">(用于申请通过后联系)</span></div>
                <el-input class="right" v-model="user.weChatId" :maxlength="20"></el-input>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
          <div class="stepTwoBottom">
            <el-button @click="beforeSetp(1)">上 一 步</el-button>
            <el-button @click="submit()">完 成</el-button>
          </div>
          <div class="center">

          </div>
        </div>
      </div>

    </div>

    <el-dialog :visible.sync="pictureDialog.visible">
      <img width="100%" :src="pictureDialog.pictureUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentStep: 0,
      title: "基本资料",
      desc: "以下资料都是必填项。你想多了解一些未来的Ta，Ta也一样 ^_^",
      user: {},
      pictures: [], //所有的图片
      headPicIndex: 0,
      pictureDialog: {
        visible: false,
        pictureUrl: "",
      },
      genderOptions: [
        {
          value: true,
          label: "男",
        },
        {
          value: false,
          label: "女",
        },
      ],
      heightOptions: [],
      weightOptions: [],
      regions: [],
      educations: [
        {
          value: 2,
          label: "专科",
        },
        {
          value: 3,
          label: "本科",
        },
        {
          value: 4,
          label: "硕士",
        },
        {
          value: 5,
          label: "博士",
        },
      ],
    };
  },
  methods: {
    //获取
    async getUser() {
      var res = await this.$http.get("user");
      this.user = res.data;
      this.user.pictures.forEach((item, index, arr) => {
        this.pictures.unshift(item);
      });
      if (this.user.headPic) this.pictures.unshift(this.user.headPic);
    },
    async submit() {
      var result = await this.updateIdCard();
      if (result) result = await this.updateCompany();
      if (result) result = await this.updateEducation();
      if (result) result = await this.updateWeChatId();
      if (result) this.redirect("My/");
    },
    setHeadPic(headPicIndex) {
      this.headPicIndex = headPicIndex;
    },
    deletePic(index) {
      if (index == this.headPicIndex) this.headPicIndex = 0;
      if (index < this.headPicIndex) this.headPicIndex--;
      this.pictures.splice(index, 1);
    },
    async updateHeadPic() {
      if (this.pictures.length == 0) {
        this.$message({
          message: "请至少上传一张图片",
          type: "error",
        });
        return false;
      }
      var req = {
        headPic: this.pictures[this.headPicIndex],
      };
      var res = await this.$http.put("User/UpdateHeadPic", req);
      return res ? true : false;
    },
    async updatePictures() {
      var tempPicsStr = JSON.stringify(this.pictures);
      var tempPics = JSON.parse(tempPicsStr);
      tempPics.splice(this.headPicIndex, 1);
      var req = {
        Pictures: tempPics,
      };
      await this.$http.put("UserExtend/UpdatePictures", req);
    },
    async updateIdCard() {
      if (this.user.name.length == 0 || this.user.name.length > 10) {
        this.$message({
          message: "请填写真实姓名",
          type: "error",
        });
        return false;
      }
      if (this.user.idCardNo.length != 18) {
        this.$message({
          message: "请填写真实身份证号",
          type: "error",
        });
        return false;
      }
      if (this.user.idCardPic.length == 0) {
        this.$message({
          message: "请上传身份证人物面照片",
          type: "error",
        });
        return false;
      }

      var req = {
        name: this.user.name,
        idCardNo: this.user.idCardNo,
        idCardPic: this.user.idCardPic,
      };
      var res = await this.$http.put("UserExtend/UpdateIdCard", req);
      return res ? true : false;
    },
    async updateCompany() {
      if (this.user.companyName.length == 0) {
        this.$message({
          message: "请填写公司名称",
          type: "error",
        });
        return false;
      }
      if (this.user.companyPic.length == 0) {
        this.$message({
          message: "请上传在职证明",
          type: "error",
        });
        return false;
      }
      var res = await this.$http.put(
        "UserExtend/UpdateCompany?companyName=" +
          this.user.companyName +
          "&companyPic=" +
          this.user.companyPic
      );
      return res ? true : false;
    },
    async updateEducation() {
      if (this.user.xhwCode.length == 0) {
        this.$message({
          message: "请填写学信网验证码",
          type: "error",
        });
        return false;
      }
      if (this.user.schoolName.length == 0) {
        this.$message({
          message: "请填写学校名称",
          type: "error",
        });
        return false;
      }
      var req = {
        XHWCode: this.user.xhwCode,
        SchoolName: this.user.schoolName,
        Education: this.user.education,
      };
      var res = await this.$http.put("UserExtend/UpdateEducation", req);
      return res ? true : false;
    },
    async updateWeChatId() {
      if (this.user.weChatId.length == 0) {
        this.$message({
          message: "请填写微信号，确保对方能联系到您",
          type: "error",
        });
        return false;
      }
      var res = await this.$http.put(
        "UserExtend/UpdateWeChatId?wechatId=" + this.user.weChatId
      );
      return res ? true : false;
    },
    uploadCompanyPicSuccess(res, file) {
      this.user.companyPic = res.data;
      this.user.companyPicFileName = file.name;
    },
    uploadIdPicSuccess(res, file) {
      this.user.idCardPic = res.data;
      this.user.idCardPicFileName = file.name;
    },
    redirect(path) {
      this.$router.push(path);
    },
    chooseCurrent(region) {
      this.user.currentProvince = region[0];
      this.user.currentCity = region[1];
    },
    chooseHome(region) {
      this.user.homeProvince = region[0];
      this.user.homeCity = region[1];
    },
    beforeSetp(beforeSetp) {
      switch (beforeSetp) {
        case 0:
          this.title = "基本资料";
          this.desc =
            "以下资料都是必填项。你想多了解一些未来的Ta，Ta也一样 ^_^";
          break;
        case 1:
          this.title = "照片";
          this.desc = "上传展示你真实风采的照片，给Ta留下美好的第一印象";
          break;
      }
      this.currentStep = beforeSetp;
    },
    async nextSetp(nextSetp) {
      var result = false;
      switch (nextSetp) {
        case 1:
          this.title = "照片";
          this.desc = "上传展示你真实风采的照片，给Ta留下美好的第一印象";
          result = await this.updateBaseInfo();
          break;
        case 2:
          result = await this.updateHeadPic();
          await this.updatePictures();
          break;
      }
      console.log("result", result);
      if (result) this.currentStep = nextSetp;
    },
    async updateBaseInfo() {
      if (this.user.nickName.length <= 0) {
        this.$message({
          message: "请填写昵称",
          type: "error",
        });
        return false;
      }
      if (this.user.nickName.length < 2 || this.user.nickName.length > 12) {
        this.$message({
          message: "昵称长度在2到12之间",
          type: "error",
        });
        return false;
      }
      if (
        this.user.homeProvince.length <= 0 ||
        this.user.homeCity.length <= 0
      ) {
        this.$message({
          message: "出生地必填",
          type: "error",
        });
        return false;
      }
      if (
        this.user.currentProvince.length <= 0 ||
        this.user.currentCity.length <= 0
      ) {
        this.$message({
          message: "现居地必填",
          type: "error",
        });
        return false;
      }
      const res = await this.$http.put("User/UpdateBaseInfo", this.user);
      console.log("updateBaseInfoResponse", res);
      return res ? true : false;
    },
    uploadPicture(response, file, fileList) {
      this.pictures.push("http://localhost:5000" + file.response.data);
    },
    //点击 放大图片
    bigPicture(file) {
      this.pictureDialog.visible = true;
      this.pictureDialog.pictureUrl = file.url;
    },
    //初始化身高
    initHeightOptions() {
      var that = this;
      for (var i = 150; i < 200; i++) {
        that.heightOptions.push({ value: i, label: i + "cm" });
      }
    },
    //初始化体重
    initWeightOptions() {
      var that = this;
      for (var i = 40; i < 120; i++) {
        that.weightOptions.push({ value: i, label: i + "kg" });
      }
    },
    //初始化地区
    async initRegion() {
      const regions = await this.$http.get("Region");
      regions.data.forEach((region) => {
        const children = [];
        region.childrens.forEach((child) => {
          children.push({ value: child.name, label: child.name });
        });
        this.regions.push({
          value: region.name,
          label: region.name,
          children: children,
        });
      });
    },
  },
  mounted() {
    this.initHeightOptions();
    this.initWeightOptions();
    this.initRegion();
    this.getUser();
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

.contentContainer {
  width: 100%;
  background-color: #fff;
  .content {
    width: 470px;
    margin: auto;
    padding: 30px 0px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 34px;
    padding: 20px 0 10px 0;
    .title {
      width: 210px;
      height: 20px;
      padding: 7px 15px;
      font-size: 14px;
      font-weight: 700;
      color: #999999;
    }
    .right {
      width: 240px;
    }
  }
}
.stepTwo {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.stepTwoContent {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.stepTwoBottom {
  margin-top: 30px;
  display: flex;
  justify-content: center;

  .el-button {
    width: 160px;
    border-radius: 50px;
    color: #fff;
    margin: 0 30px;
    background-color: #ff7777;
  }
  .el-button:hover {
    background-color: #ff6666;
  }
}

.authContainer {
  width: 100%;
  .authTop {
    margin: 30px 0px 10px 0px;
    font-size: 18px;
    text-align: center;
    font-weight: 550;
    color: #666666;
  }
}

.picItem {
  height: 140px;
  width: 140px;
  background-color: #fbfbff;
  border: 1px dashed #cdcbcb;
  border-radius: 6px;
  box-sizing: border-box;
  line-height: 140px;
  margin: 0px 5px 10px;
  position: relative;
}

.picItem .bottom {
  position: absolute;
  bottom: 0px;
  opacity: 0.7;
  background-color: #f2f2f2;
  width: 124px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #ff6666;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
}

.center {
  width: 100%;
  text-align: center;
  margin: 30px auto 20px auto;
}
.center .el-button {
  width: 200px;
  border-radius: 15px;
  color: #fff;
  background-color: #ff7777;
}
.center .el-button:hover {
  background-color: #ff6666;
}

/deep/ .right .el-input__inner {
  border: none;
  height: 40px;
  color: #ff6666;
  font-size: 13px;
  background-color: #eeeeee;
}
/deep/ .right .el-input__inner:focus {
  box-shadow: none;
}

/deep/ .steps .is-process {
  color: #ff6666;
  border-color: #ff6666;
}

.row .el-tag {
  background-color: #ff7777;
  color: #fff;
}
.borderRadius {
  border-radius: 8px;
}
.el-divider {
  width: 470px;
  margin: auto;
}
.input {
  border: none;
}
</style>