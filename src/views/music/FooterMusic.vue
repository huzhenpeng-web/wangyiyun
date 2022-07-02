<template>
  <div class="footer-music">
    <!-- 左侧 -->
    <div class="footer-left" @click="showDetailPane">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div>
        <p>{{playList[playListIndex].name}}</p>
        <span>横滑可以切换上下首</span>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="footer-right">
      <!-- 播放icon -->
      <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
        <use xlink:href="#icon-yunhang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <!-- 列表icon -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinleliebiao-"></use>
      </svg>
    </div>
    <audio @timeupdate="getCurr" ref="audioRef" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <!-- 弹出层 -->
    <van-popup closeable  close-icon="arrow-down" @close="openBottom" close-icon-position="top-left" v-model="showDetail" position="bottom" :style="{ width:'100%',height: '100%'}">
      <MusicDetail :adduration="addDuration" :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow"/>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MusicDetail from '@/views/music/MusicDetail.vue'
export default {
  components: {
    MusicDetail
  },
  data () {
    return {
      showDetail: false,
      interval: 0
    }
  },
  computed: {
    ...mapState(['dragStatus', 'sliderStatus', 'playList', 'playListIndex', 'isbtnShow', 'detailShow', 'currentTime', 'bottomNavShow'])
  },
  methods: {
    play () {
      // 判断音乐播放的状态
      if (this.$refs.audioRef.paused) {
        if (this.currentTime !== 0) {
          this.$refs.audioRef.currentTime = this.currentTime
        }
        this.$refs.audioRef.play()
        this.updateIsbtnShow(false)
        this.setMusicStatus([this.$refs.audioRef.currentTime, true])
      } else {
        this.$refs.audioRef.pause()
        this.updateIsbtnShow(true)
        this.setMusicStatus([this.$refs.audioRef.currentTime, false])
      }
    },
    // 显示与隐藏歌曲面板
    showDetailPane () {
      if (this.showDetail === false) {
        this.showDetail = true
      } else {
        this.showDetail = false
      }
      this.updateBottomNavShow(false)
      this.updateDetailShow(this.showDetail)
    },
    // 显示底部和头部
    openBottom () {
      this.updateDetailShow(this.showDetail)
      const path = this.$route.path
      if (path === '/musicDetail' || path === '/searchDetail' || path === '/albumDetail') {
        return this.updateBottomNavShow(false)
      }
      this.updateBottomNavShow(true)
    },
    // 音频进度改变触发的函数
    getCurr () {
      // 拖动
      if (this.dragStatus === true) {
        this.$refs.audioRef.currentTime = this.currentTime
        return this.updateDragStatus([false, this.currentTime])
      }
      this.updateCurrentTime(this.$refs.audioRef.currentTime)
    },
    // 歌曲时长
    addDuration () {
      this.updateDuration(this.$refs.audioRef.duration)
    },
    ...mapMutations(['updateDragStatus', 'updateBottomNavShow', 'updateIsbtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration', 'setMusicStatus'])
  },
  watch: {
    // 监听歌曲下标 下标发生改变 开始播放音乐
    playListIndex () {
      this.$refs.audioRef.autoplay = true
      if (this.$refs.audioRef.paused) { // 如果本来为暂停 改变图标
        this.$refs.audioRef.play()
        this.updateIsbtnShow(false)
      }
      this.setMusicStatus([this.$refs.audioRef.currentTime, true])
      // this.addDuration(this.$refs.audioRef.duration)
    },
    playList () {
      if (this.isbtnShow) {
        this.$refs.audioRef.autoplay = true
        this.updateIsbtnShow(false)
      }
    },
    currentTime (newVal) {
      this.setMusicStatus([newVal, true])
    }
  },
  mounted () {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    // 获取本地播放数据
    const obj = window.localStorage.getItem('musicStatus')
    if (obj) {
      const musicStatus = JSON.parse(window.localStorage.getItem('musicStatus'))
      this.setMusicStatus([musicStatus.currentTime, musicStatus.playStatus])
    }
  },
  updated () {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    this.addDuration()
  }
}
</script>

<style lang="less" scoped>
.footer-music {
  width: 100%;
  height: 1rem;
  background-color: pink;
  position: fixed;
  bottom: 50px;
  display: flex;
  border-top: 1px solid #999;
  padding: 0.2rem;
  justify-content: space-between;
  z-index: 1;
  .footer-left {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 1rem;
    }
  }
  .footer-right {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 0.4rem;
    .icon {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>
