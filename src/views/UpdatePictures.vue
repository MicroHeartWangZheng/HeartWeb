<template>
  <div class="page">
    <div class="titleContainer">
      <span>修改图片</span>
    </div>

    <div class="titleContainer">
      <div style="font-size:14px">上传展示你真实风采的照片，给Ta留下美好的第一印象</div>
    </div>

    <div class="contentContainer borderRadius">
      <div class="stepTwoContent">
        <div class="picItem pointer" v-for="(pic,index) in pictures" :key="index">
          <el-image :src="pic" fit="cover" style="width: 100%; height: 100%" :preview-src-list="pictures">
          </el-image>
          <div class="bottom">
            <div v-if="headPicIndex!==index" @click="setHeadPic(index)">设为封面</div>
            <div v-else>封面</div>
            <div @click="deletePic(index)">删除</div>
          </div>
        </div>
        <el-upload :multiple="true"  :limit="10"  :show-file-list="false"  :on-success="uploadPicture"  :auto-upload="true" action="https://localhost/api/File/Upload">
          <div class="picItem pointer">
            <i class="el-icon-plus"></i>
          </div>
        </el-upload>
      </div>
      <div class="center">
        <el-button @click="submit">完成</el-button>
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
      title: "基本资料",
      desc: "以下资料都是必填项。你想多了解一些未来的Ta，Ta也一样 ^_^",
      user: {},
      pictures: [],
      headPicIndex: 0,
      pictureDialog: {
        visible: false,
        pictureUrl: "",
      },
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
      this.pictures.unshift(this.user.headPic);
    },
    async submit() {
      var res = await this.updateHeadPic();
      if (res) res = await this.updatePictures();
      if (res) this.redirect("/My");
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
      this.pictures.splice(this.headPicIndex, 1);
      var req = {
        Pictures: this.pictures,
      };
      var res = await this.$http.put("UserExtend/UpdatePictures", req);
      return res ? true : false;
    },
    redirect(path) {
      this.$router.push(path);
    },
    uploadPicture(response, file, fileList) {
      this.pictures.push("https://localhost" + file.response.data);
    },
    //点击 放大图片
    bigPicture(file) {
      this.pictureDialog.visible = true;
      this.pictureDialog.pictureUrl = file.url;
    },
  },
  mounted() {
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
  height: 650px;
  background-color: #fff;
  padding: 50px 0px;
}
.stepTwoContent {
  width: 500px;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
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