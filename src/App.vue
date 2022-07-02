<template>
  <div class="app-container">
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- 底部播放组件 -->
    <FooterMusic v-show="playVideoStatus"></FooterMusic>
    <!-- 底部导航 -->
    <BottomNav v-show="bottomNavShow"></BottomNav>
  </div>
</template>

<script>
import FooterMusic from '@/views/music/FooterMusic.vue'
import BottomNav from '@/views/home/BottomNav.vue'
import { mapState } from 'vuex'
export default {
  components: {
    FooterMusic,
    BottomNav
  },
  computed: {
    ...mapState(['bottomNavShow', 'playVideoStatus'])
  }
}
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
