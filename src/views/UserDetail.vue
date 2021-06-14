<template>
  <div class="page">
    <div class="baseInfoContainer">
      <el-image fit="cover" :src="userDetail.headPic" alt=""></el-image>
      <div class="rightContainer">
        <div class="nickContainer">{{userDetail.nickName}}</div>
        <div class="centenContainer">
          <div>{{userDetail.year}}年 | </div>
          <div>{{userDetail.height}}cm | </div>
          <div>{{userDetail.weight}}kg | </div>
          <div>{{userDetail.education}}</div>
        </div>
        <div class="tagContainer">
            <i class="fal fa-id-card fa-3x" style="color: #fd9191; padding-right:8px;"></i>
        </div>
      </div>
    </div>
    <div class="PicsContainer"></div>
    <div class="DescContainer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userDetail: {
        nickName: "小月亮",
        year: 94,
        height: 164,
        weight: 54,
        homeCity: "杭州",
        currentProvince: "安徽",
        currentCity: "滁州",
        education: "本科",
        companyName: "杭州捷配有限公司",
        headPic:
          "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
        pictures: [
          "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
          "https://heart.lostsea.cn/upload/2021-02-07/96603cdd851f45bfa0939db49a8e8829.jpg",
        ],
      },
    };
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
    height: 500px;
    width: 370px;
    border-radius: 10px 0 0 10px;
  }

  .rightContainer {
    width: 560px;
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
      padding-bottom: 20px;
      border-bottom: 1px solid #e4e4e4;
    }
    .tagContainer{
        width: 100%;
        height: 200px;
    }
  }
}
</style>