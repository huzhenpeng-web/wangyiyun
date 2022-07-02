<template>
  <div class="searchDetail-container">
    <!-- 搜索框 -->
    <div class="top-search">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <van-search shape="round" @click="$router.push('/searchMusic')" />
    </div>
    <div class="search-tab">
      <van-tabs v-model="active">
        <van-tab title="单曲">
          <Song :keyword="keyword"></Song>
        </van-tab>
        <van-tab title="歌单">
          <SongList :keyword="keyword"></SongList>
        </van-tab>
        <van-tab title="专辑">
          <Album :keyword="keyword"></Album>
        </van-tab>
        <van-tab title="视频">
          <Video :keyword="keyword"></Video>
        </van-tab>
        <van-tab title="歌手">
          <Singer :keyword="keyword"></Singer>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import SongList from '@/views/searchDetail/SongList.vue'
import Song from '@/views/searchDetail/Song.vue'
import Singer from '@/views/searchDetail/Singer.vue'
import Album from '@/views/searchDetail/Album.vue'
import Video from '@/views/searchDetail/Video.vue'
export default {
  name: 'SearchDetail',
  components: {
    Song,
    SongList,
    Singer,
    Album,
    Video
  },
  data () {
    return {
      keyword: '',
      active: 0
    }
  },
  created () {
    this.keyword = this.$route.query.keywords
  }
}
</script>

<style lang="less" scoped>
.searchDetail-container {
  width: 100%;
  height: 100%;
  .top-search {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-search {
      width: 90%;
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      margin-left: 0.1rem;
    }
  }
  .search-tab {
    width: 100%;
    height: 90%;
  }
}
</style>
