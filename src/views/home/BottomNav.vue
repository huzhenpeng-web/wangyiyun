<template>
  <!-- 底部导航 -->
  <div class="bottom-container">
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouye"></use>
          </svg>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/login">
        <span>我的</span>
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31wode"></use>
          </svg>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.icon {
  width: 0.4rem;
  height: 0.4rem;
}
</style>
