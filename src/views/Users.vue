<template>
  <div class="page">
    <div v-if="!user.vip" class="titleContainer">
      <span>非VIP仅看部分用户
        <el-link class="vipSearchBtn" type="danger" :underline="false" @click="vipSearch">VIP搜索全部</el-link>
      </span>
    </div>
    <div class="searchContainer" v-else>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select clearable v-model="queryInfo.startYear" placeholder="开始年份">
            <el-option v-for="year in years" :key="year" :label="year" :value="year"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="queryInfo.endYear" placeholder="结束年份">
            <el-option v-for="year in years" :key="year" :label="year" :value="year"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="queryInfo.heightMin" placeholder="最低身高">
            <el-option v-for="heightOption in heightOptions" :key="heightOption.value" :label="heightOption.label" :value="heightOption.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="queryInfo.heightMax" placeholder="最高身高">
            <el-option v-for="heightOption in heightOptions" :key="heightOption.value" :label="heightOption.label" :value="heightOption.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-cascader clearable :props="{ checkStrictly: true }" :value="[queryInfo.homeProvince,queryInfo.homeCity]" :options="regions" placeholder="出生地" @change="chooseHome"> </el-cascader>
        </el-col>
        <el-col :span="4">
          <el-cascader clearable :props="{ checkStrictly: true }" :value="[queryInfo.currentProvince,queryInfo.currentCity]" :options="regions" placeholder="所在地" @change="chooseCurrent"></el-cascader>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4">
          <el-select clearable v-model="queryInfo.education" placeholder="学历">
            <el-option v-for="(value,key) in educationTypes" :key="key" :label="value" :value="key*1"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" icon="el-icon-search" @click="vipSearch">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="user in users" :key="user.id">
            <div class="userItemContainer pointer">
              <el-image :src="user.headPic" fit="cover" @click="redict('/userdetail/'+user.id)"></el-image>
              <div class="userInfoContainer">
                <div class="nickInfo">
                  <div>{{user.nickName.length>10?user.nickName.slice(0,7)+'...':user.nickName}}</div>
                  <div>· 已认证</div>
                  <div>
                    <el-image :src="require('../assets/认证.png')" fit="contain"></el-image>
                  </div>
                </div>
                <div class="positionInfo">
                  <span>现居{{user.homeCity}} - {{user.currentCity}}人</span>
                </div>
                <div class="baseInfo" style="color:#999999">
                  <span>{{user.year}}年 - {{user.educationDesc}} - {{user.height}}cm - {{user.career}}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
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
      users: [],
      user: {},
      queryInfo: {
        startYear: null,
        endYear: null,
        heightMin: null,
        heightMax: null,
        homeProvince: null,
        homeCity: null,
        currentProvince: null,
        currentCity: null,
        education: null,
        pageIndex: 1,
        pageSize: 16,
      },
      years: [], //出身年份
      heightOptions: [], //身高
      regions: [], //地区
      educationTypes: config.educationTypes,
      totalCount: 0,
    };
  },
  methods: {
    async getUser() {
      const res = await this.$http.get("User");
      this.user = res.data;
    },
    async getUserList() {
      var url = this.user.vip ? "User/GetListForVIP" : "User/GetList";
      const res = await this.$http.get(url, { params: this.queryInfo });
      this.users = res.data.items;
      this.totalCount = res.data.total;
    },
    //vip搜索
    vipSearch() {
      //VIP搜索
      if (this.user.vip) {
        this.getUserList();
        return;
      }
      //非VIP 跳转
      this.$message({
        message: "搜索功能为会员特有功能，请先开通会员。",
      });
      setTimeout(() => {
        this.$router.push("/vip");
      }, 1500);
    },
    //点击页码
    async currentIndexChange(index) {
      this.queryInfo.pageIndex = index;
      await this.getUserList();
    },
    //查询出身地
    chooseHome(region) {
      this.queryInfo.homeProvince = region[0];
      this.queryInfo.homeCity = region[1];
    },
    //查询当前位置
    chooseCurrent(region) {
      this.queryInfo.currentProvince = region[0];
      this.queryInfo.currentCity = region[1];
    },
    //初始化年份
    initYear() {
      var that = this;
      for (var i = 1980; i < 2021; i++) {
        that.years.push(i);
      }
    },
    //初始化身高
    initHeightOptions() {
      var that = this;
      for (var i = 150; i < 200; i++) {
        that.heightOptions.push({ value: i, label: i + "cm" });
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
    //统一跳转页面
    redict(path) {
      this.$router.push(path);
    },
  },
  created() {
    this.initHeightOptions();
    this.initRegion();
    this.initYear();
    this.getUser().then(() => {
      this.getUserList();
    });
  },
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  padding-top: 30px;
}

.searchContainer {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 10px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
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
    width: 360px;
    border-top: 1px dashed #999999;
  }
  span:before {
    left: 0%;
  }
  span:after {
    right: 0%;
  }
  .vipSearchBtn {
    margin-left: 10px;
    font-size: 13px;
    font-weight: 700;
  }
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.userItemContainer {
  width: 210px;
  background-color: #ffffff;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 16px;
  .el-image {
    width: 100%;
    height: 264px;
    border-radius: 10px 10px 0 0;
    margin-bottom: 6px;
  }
  .userInfoContainer {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
    font-family: Tahoma, Arial, Helvetica, "Microsoft YaHei New",
      "Microsoft Yahei", sans-serif;
    color: #292929;
    .nickInfo {
      display: flex;
      width: 100%;
      height: 20px;
      font-size: 14px;
      font-weight: 700;
      color: #ff6666;
      line-height: 22px;
      div {
        margin-right: 6px;
      }
      .el-image {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>