<template>
  <div class="page">
    <div class="titleContainer">
      <span>修改资料</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedIndex: 2,
    };
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    chooseGoods(index) {
      this.selectedIndex = index;
    },
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
</style>