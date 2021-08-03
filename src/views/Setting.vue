<template>
  <div class="page">
    <div class="titleContainer">
      <span>账号设置</span>
    </div>
    <div class="contentContainer borderRadius">
      <div class="row">
        <div class="top">
          <div class="rowTitle">隐藏毕业院校</div>
          <el-switch class="rowValue" v-model="setting.HideSchool" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
        <div class="bottom">
          是否在资料页面展示毕业院校？
        </div>
        <div class="line"></div>
      </div>

      <div class="row">
        <div class="top">
          <div class="rowTitle">隐藏公司信息</div>
          <el-switch class="rowValue" v-model="setting.HideCompany" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
        <div class="bottom">
          是否在资料页面展示公司信息？
        </div>
        <div class="line"></div>
      </div>

      <div class="row">
        <div class="top">
          <div class="rowTitle">未工作认证用户申请</div>
          <el-switch class="rowValue" v-model="setting.NoWorkAuthApply" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
        <div class="bottom">
          未工作认证用户是否允许申请？
        </div>
        <div class="line"></div>
      </div>

      <div class="row">
        <div class="top">
          <div class="rowTitle">状态</div>
          <el-select class="rowValue" @change="stateChange" v-model="state" :placeholder="states[state]">
            <el-option v-for="(value,key) in states" :key="key" :label="value" :value="key*1">
            </el-option>
          </el-select>
        </div>
        <div class="bottom">
        </div>
        <div class="line"></div>
      </div>

      <div class="row">
        <el-button @click="submit">提 交</el-button>
      </div>
    </div>

  </div>
</template>
<script>
import config from "/src/common/config.js";
export default {
  data() {
    return {
      setting: {},
      state: 1,
      states: config.states,
    };
  },
  methods: {
    async getDetail() {
      const res = await this.$http.get("User");
      console.log("resDetail", res);
      this.setting = JSON.parse(res.data.setting);
      this.state = res.data.state;
    },
    async submit() {
      const res = await this.$http.put("User/Setting", this.setting);
      console.log("setting", res);
    },
    updateState() {
      const res = this.$http.put(this.state);
    },

    stateChange(chooseValue) {
      console.log("choose", chooseValue);
      switch (chooseValue) {
        case 1:
          break;
        case 2:
          break;
        case 3:
        case 4:
          break;
      }
      this.state = chooseValue;
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
  background-color: #fff;
  padding-bottom: 30px;
  height: 1000px;
  .row {
    height: 48px;
    width: 460px;
    margin: auto;
    padding: 30px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .el-button {
      width: 160px;
      border-radius: 24px;
      margin-top: 20px;
      margin: auto;
      background-color: #ff7777;
      color: #fff;
    }
    .el-button:hover {
      background-color: #ff6666;
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .rowTitle {
    }
    .rowValue {
      width: 100px;
    }
  }
  .bottom {
    margin-top: 10px;
    font-size: 12px;
    width: 100%;
    color: #909399;
  }
}
</style>