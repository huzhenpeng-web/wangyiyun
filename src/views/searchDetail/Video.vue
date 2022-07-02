<template>
  <div class="mv-container">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 左侧mv -->
      <div class="mv" v-for="(item,index) in videosUrl" :key="index">
        <div class="left">
          <video ref="videoRef" controls>
            <source :src="item.url">
          </video>
        </div>
        <div class="right">
          <span>{{item.title}}</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { cloudSearch } from '@/api/search.js'
import { getVideoUrl } from '@/api/album.js'
export default {
  props: ['keyword'],
  data () {
    return {
      // 视频数量
      videoCount: 0,
      // 视频
      videos: [],
      videosUrl: [],
      currentPage: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    async getSearchDetail (currentPage) {
      const { data: res } = await cloudSearch(this.keyword, 1014, currentPage)
      this.videoCount = res.result.videoCount
      this.videos = res.result.videos
      this.getVideos()
      this.loading = false
    },
    // 获取视频url
    getVideos () {
      this.videos.forEach(async item => {
        const { data: res } = await getVideoUrl(item.vid)
        if (res.urls.length !== 0) {
          res.urls[0].title = item.title
          this.videosUrl.push(res.urls[0])
        }
      })
    },
    // 上拉加载新数据
    onLoad () {
      this.currentPage++
      this.getSearchDetail(this.currentPage)
      if (this.videosUrl.length >= 50) {
        this.finished = true
      }
    }
  },
  mounted () {
    this.getSearchDetail(this.currentPage)
  }
}
</script>

<style lang="less" scoped>
.mv-container {
  width: 100%;
  height: 100%;
  .van-list {
    width: 100%;
    height: 100%;
  }
  .mv {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;
    align-items: center;
    .left {
      width: 60%;
      height: 100%;
      video {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 35%;
      height: 100%;
    }
  }
}
</style>
