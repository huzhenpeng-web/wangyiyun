<template>
  <!-- 精品歌单 -->
  <div class="good-music">
    <!-- 头部文字区域 -->
    <div class="top-text">
      <span>精品歌单</span>
    </div>
    <!-- 歌单区域 -->
    <div class="list-content">
      <van-swipe :loop="false" :width="150" :show-indicators="false">
        <van-swipe-item v-for="item in goodMusicList" :key="item.id">
          <div>
            <router-link :to="{path:'/musicDetail',query:{id:item.id}}">
              <!-- 歌单图片 -->
              <van-image :src="item.coverImgUrl" lazy-load>
                <template v-slot:loading>
                  <van-loading type="spinner" size="20">加载中...</van-loading>
                </template>
              </van-image>
              <!-- 播放量 -->
              <div class="playCount">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-24gl-play"></use>
                </svg>
                <span>{{item.playCount | playCountFormat}}</span>
              </div>
              <!-- 歌单名 -->
              <span>{{item.name}}</span>
            </router-link>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { GoodMusicList } from '@/api/home'
export default {
  data () {
    return {
      goodMusicList: []
    }
  },
  methods: {
    async getGoodMusicList () {
      const { data: res } = await GoodMusicList()
      this.goodMusicList = res.playlists
    }
  },
  created () {
    this.getGoodMusicList()
  }
}
</script>

<style lang="less" scoped>
.good-music {
  width: 100%;
  height: 5rem;
  position: relative;
  .top-text {
    margin-top: 0.4rem;
    font-weight: 600;
    font-size: 0.5rem;
  }
  .list-content {
    width: 100%;
    margin-top: 0.2rem;
    .playCount {
      position: relative;
      width: 1.6rem;
      height: 0.3rem;
      background-color: gray;
      border-radius: 0.1rem;
      bottom: 0.4rem;
      opacity: 0.8;
      display: flex;
      align-items: center;
      .icon,
      span {
        color: #fff;
        fill: currentColor;
      }
    }
    .van-swipe-item {
      div {
        margin-right: 0.16rem;
      }
      .van-image {
        width: 100%;
        height: 90%;
        border-radius: 0.1rem;
      }
    }
  }
}
</style>
