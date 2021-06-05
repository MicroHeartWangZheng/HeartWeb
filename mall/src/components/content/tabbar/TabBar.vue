<template>
  <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 1px rgb(100, 100, 100, 0.1);
}
.tab-bar-Item {
  flex: 1;
  text-align: center;
  height: 49px;
}

.tab-bar-Item img {
  height: 24px;
  width: 24px;
}
</style>
