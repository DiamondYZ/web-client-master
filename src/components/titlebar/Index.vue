<template>
  <div class="title-bar">
    <div class="title-bar__left"><slot name="left"></slot></div>
    <div class="title-bar__center"><slot name="center"></slot></div>
    <div class="title-bar__right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'Titlebar'
  }
</script>

<style>
  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    margin-bottom: 20px;
    border-bottom: 1px solid #DCDFE6;
  }
</style>
