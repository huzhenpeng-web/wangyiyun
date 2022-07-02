<template>
  <div class="home-nav">
    <van-tabs v-model="active">
      <van-tab title="推荐">
        <Recommend></Recommend>
      </van-tab>
      <van-tab title="音乐馆">
        <Music></Music>
      </van-tab>
      <van-tab title="专辑">
        <Album></Album>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Recommend from '@/views/home/Recommend.vue'
import Music from '@/views/home/Music.vue'
import Album from '@/views/home/Album.vue'
export default {
  components: {
    Recommend,
    Music,
    Album
  },
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style lang="less" scoped>
.home-nav {
  width: 100%;
  height: 100%;
  .van-tabs {
    height: 100%;
  }
}
</style>
