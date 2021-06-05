<template>
  <div class="tab-bar-Item">

      <slot></slot>
      <slot></slot>
   
</template>

<script>
export default {
  name: "TabBarItem",
};
</script>

<style>
.tab-bar-Item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-Item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>
