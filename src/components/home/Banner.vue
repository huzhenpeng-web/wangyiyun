<template>
  <!-- 轮播图 -->
  <div class="banner">
    <van-skeleton title :row="3" :loading="loading">
      <van-swipe>
        <van-swipe-item v-for="(item, index) in banners" :key="index">
          <van-image :src="item.pic" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20">加载中...</van-loading>
            </template>
          </van-image>
        </van-swipe-item>
      </van-swipe>
    </van-skeleton>
  </div>
</template>

<script>
import { banners } from '@/api/home'
export default {
  data () {
    return {
      banners: [],
      loading: true
    }
  },
  methods: {
    // 获取轮播图数据
    async getBanners () {
      const { data: res } = await banners()
      this.banners = res.banners
    }
  },
  created () {
    this.getBanners()
    this.loading = false
  }
}
</script>

<style lang="less" scoped>
.banner {
  width: 95%;
  height: 5rem;
  margin: 0 auto;
  .van-swipe {
    height: 100%;
  }
  .van-image{
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
  }
}
</style>
