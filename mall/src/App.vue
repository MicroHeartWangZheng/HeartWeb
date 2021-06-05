<template>
  <div id="app">
   <TabBar>
     <TabBarItem>
        <img src="../../../assets/img/tabbar/首页.png" />
        <div>首页</div>
     </TabBarItem>
      <TabBarItem>
        <img src="../../../assets/img/tabbar/分类.png" />
        <div>分类</div>
     </TabBarItem>
      <TabBarItem>
        <img src="../../../assets/img/tabbar/购物车.png" />
        <div>购物车</div>
     </TabBarItem>
      <TabBarItem>
        <img src="../../../assets/img/tabbar/我的.png" />
        <div>我的</div>
     </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
import TabBar from "./components/content/tabbar/TabBar.vue";
import TabBarItem from "./components/content/tabbar/TabBarItem.vue";

export default {
  name: "App",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
@import "./assets/css/base.css";
</style>
