<template>
  <!-- 每日推荐歌单 -->
  <div class="list-container">
    <!-- 头部文字区域 -->
    <div class="list-top">
      <span>你的私荐歌单</span>
    </div>
    <!-- 歌单区域 -->
    <div class="list-content">
      <van-swipe :loop="false" :width="150" :show-indicators="false">
        <van-swipe-item v-for="item in musicList" :key="item.id">
          <div>
            <router-link :to="{path:'/musicDetail',query:{id:item.id}}">
              <!-- 歌单图片 -->
              <van-image :src="item.picUrl" lazy-load>
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
import { personMusicList } from '@/api/home.js'
export default {
  data () {
    return {
      musicList: {}
    }
  },
  methods: {
    // 获取推荐歌单
    async getMusicList () {
      const { data: res } = await personMusicList()
      this.musicList = res.result
    }
  },
  created () {
    this.getMusicList()
  }
}
</script>

<style lang="less" scoped>
.list-container {
  width: 100%;
  height: 5rem;
  margin: 0 auto;
  .list-top {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 0.5rem;
  }
  .list-content {
    margin-top: 0.2rem;
    width: 100%;
    position: relative;
    .playCount {
      position: relative;
      width: 1.6rem;
      height: 0.3rem;
      background-color: gray;
      border-radius: 0.1rem;
      opacity: 0.8;
      bottom: 0.4rem;
      display: flex;
      align-items: center;
      .icon,
      span {
        color: #fff;
      }
    }
    .van-swipe-item {
      div {
        margin-right: 0.16rem;
      }
    }
    .van-image{
      width: 100%;
      height: 90%;
      border-radius: 0.1rem;
    }
  }
}
</style>
