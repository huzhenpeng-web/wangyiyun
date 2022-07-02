<template>
  <div class="home-container">
    <!-- 头部导航 -->
    <HomeNav></HomeNav>
  </div>
</template>

<script>
import HomeNav from '@/components/home/HomeNav.vue'
export default {
  components: {
    HomeNav
  }
}
</script>

<style lang="less" scoped>
.home-container{
  width: 100%;
  height: 85%;
}
</style>
