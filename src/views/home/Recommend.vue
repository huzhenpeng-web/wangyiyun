<template>
  <!-- 推荐 -->
  <div class="recommend-container">
    <!-- 搜索框 -->
    <Search></Search>
    <div class="recommend-content">
      <!-- 轮播图 -->
      <Banner></Banner>
      <!-- 你的私荐歌单 -->
      <DayMusic></DayMusic>
      <!-- 精选歌单 -->
      <GoodMusic></GoodMusic>
    </div>
  </div>
</template>

<script>
import Search from '@/components/home/Search.vue'
import Banner from '@/components/home/Banner.vue'
import DayMusic from '@/components/home/DayMusic.vue'
import GoodMusic from '@/components/home/GoodMusic.vue'
export default {
  name: 'Recommend',
  components: {
    Search,
    Banner,
    DayMusic,
    GoodMusic
  }
}
</script>

<style lang="less" scoped>
.recommend-container {
  width: 100%;
  height: 100%;
  .recommend-content {
    width: 95%;
    height: 90%;
    margin: 0 auto;
    overflow: scroll;
  }
}
</style>
