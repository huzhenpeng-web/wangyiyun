<template>
  <div class="detail-container">
    <!-- 背景图 -->
    <img :src="musicList.al.picUrl" alt="" class="bgImg">
    <!-- 头部区域 -->
    <div class="detail-top">
      <!-- 左侧 -->
      <div></div>
      <!-- 中间文字 -->
      <div class="top-center">
        <span>推荐</span>
        <span @click="isLyricShow = false" :class="{fontColor:!isLyricShow}">歌曲</span>
        <span @click="isLyricShow = true" :class="{fontColor:isLyricShow}">歌词</span>
      </div>
      <!-- 右侧 -->
      <div class="top-right">
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
        </span>
      </div>
    </div>
    <!-- 中间区域 -->
    <div class="detail-content" v-show="!isLyricShow">
      <img src="@/assets/imgs/needle-ab.png" alt="" class="needle-ab" :class="{needle_ab_active:!isbtnShow}">
      <img src="@/assets/imgs/disc-plus.png" alt="" class="disc-plus">
      <img :src="musicList.al.picUrl" alt="" class="img_ar" :class="{img_ar_active:!isbtnShow,img_ar_paused:isbtnShow}">
      <!-- 歌名、歌手 -->
      <div class="content">
        <div class="content-left">
          <span class="song-name">{{musicList.name}}</span>
          <span style="font-size:0.45rem;">
            <span v-for="(item,index) in musicList.ar" :key="index">
              <span v-if="index !== 0">|</span>
              {{item.name}}
            </span>
          </span>
          <span v-for="(item,index) in lyric" :key="index" v-show="currentTime * 1000 >= item.time && currentTime * 1000 <= item.pre">{{item.lrc}}</span>
        </div>
        <div class="content-right">
          <van-badge :content="100 + 'w+'">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
              </svg>
            </span>
          </van-badge>
        </div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="detail-footer">
      <div class="footer-top">
        <van-badge :content="999 + '+'">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-changge"></use>
          </svg>
        </van-badge>
        <van-badge>
          <template #content>
            <span>on</span>
          </template>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shengyin_o"></use>
          </svg>
        </van-badge>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-03"></use>
        </svg>
        <van-badge :content="100 + 'w+'">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-taolun"></use>
          </svg>
        </van-badge>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youcecaidan"></use>
        </svg>
      </div>
      <div class="footer-content">
        <van-slider @drag-start="dragStart" @drag-end="dragEnd" v-model="songTime" @change="onChange" min="0" :max="duration" step="0.05"/>
        <span class="songTime">{{this.songTime | songFormat}}/{{this.duration | songFormat}}</span>
      </div>
      <div class="footer-bottom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-suijibofang"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
          <use xlink:href="#icon-24gl-play"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinleliebiao-"></use>
        </svg>
      </div>
    </div>
    <!-- 歌词区域 -->
    <div class="lyric" v-show="isLyricShow" ref="musicLyricRef">
      <p v-for="(item,index) in lyric" :key="index" :class="{active:(currentTime * 1000 >= item.time && currentTime * 1000 <= item.pre)}">
        {{item.lrc}}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['musicList', 'play', 'isbtnShow', 'adduration'],
  data () {
    return {
      // 是否显示歌词
      isLyricShow: false,
      songTime: 0,
      dragStatus: false
    }
  },
  methods: {
    ...mapMutations(['updateDragStatus', 'updatePlayListIndex', 'updateDuration', 'updateCurrentTime']),
    goPlay (val) {
      let index = parseInt(this.playListIndex) + val
      // 如果是第一首那么就切换到最后一首
      if (index < 0) {
        index = this.playList.length - 1
      } else if (index === this.playList.length) {
        index = 0
      }
      this.adduration()
      this.updatePlayListIndex(index)
    },
    // 拖拽进度条
    onChange () {
      this.updateDragStatus([true, this.songTime])
    },
    // 开始拖动
    dragStart () {
      this.dragStatus = true
    },
    // 拖动结束
    dragEnd () {
      this.dragStatus = false
    }
  },
  computed: {
    ...mapState(['lyricList', 'currentTime', 'playListIndex', 'playList', 'duration']),
    // 处理歌词
    lyric () {
      let arr = []
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          // 分钟
          const min = item.slice(1, 3)
          // 秒数
          const sec = item.slice(4, 6)
          // 毫秒
          let mill = item.slice(7, 10)
          const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          // 歌词部分
          let lrc = item.slice(11, item.length)
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9)
            lrc = item.slice(10, item.length)
          }
          return { min, mill, sec, lrc, time }
        })
      }
      arr.forEach((item, i) => {
        if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
          item.pre = 1000000
        } else {
          item.pre = arr[i + 1].time
        }
      })
      return arr
    }
  },
  created () {
    // 获取歌曲时长
    this.adduration()
    this.songTime = this.currentTime
  },
  updated () {
    this.adduration()
  },
  watch: {
    currentTime (newValue) {
      if (this.dragStatus !== true) {
        this.songTime = newValue
      }
      const p = document.querySelector('p.active')
      if (p) {
        // 当前歌词离顶部一定距离后
        if (p.offsetTop > 200) {
          this.$refs.musicLyricRef.scrollTop = p.offsetTop - 200
        }
      }
      if (newValue === this.duration) {
        this.updatePlayListIndex(this.playListIndex + 1)
        this.play()
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail-container {
  width: 100%;
  height: 100%;
  position: relative;
  .icon {
    width: 0.6rem;
    height: 0.6rem;
  }
  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(1rem);
  }
  .detail-top {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .top-center {
      width: 33%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 0.6rem;
    }
    .icon {
      fill: #fff;
    }
  }
  .detail-content {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .needle-ab {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-25deg);
      transition: all 2s;
    }
    .needle_ab_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }
    .disc-plus {
      width: 5rem;
      height: 5rem;
      top: 1.6rem;
      z-index: -1;
      position: absolute;
    }
    .img_ar {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      top: 2.5rem;
      z-index: -1;
      animation: rotate_ar 30s linear infinite;
    }
    .img_ar_active {
      animation-play-state: running;
    }
    .img_ar_paused {
      animation-play-state: paused;
    }
    @keyframes rotate_ar {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
    .content {
      width: 100%;
      position: absolute;
      bottom: 0.8rem;
      height: 20%;
      display: flex;
      justify-content: space-between;
      color: #fff;
      .content-left {
        width: 70%;
        display: flex;
        flex-direction: column;
        .song-name {
          font-size: 0.6rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .content-right {
        width: 15%;
        margin-top: .3rem;
      }
    }
  }
  .detail-footer {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    .footer-top {
      display: flex;
      width: 100%;
      position: absolute;
      justify-content: space-between;
    }
    .footer-content {
      position: absolute;
      width: 100%;
      top: 1rem;
      .range{
        width: 100%;
      }
      .songTime{
        position: absolute;
        right: 0;
        margin-top:.2rem;
        display: block;
      }
      .van-slider{
        width: 90%;
        margin: 0 auto;
      }
    }
    .footer-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  .fontColor{
    color: #fff;
  }
  .lyric{
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: scroll;
    p{
      color: #fff;
      // mix-blend-mode: difference;
    }
    .active{
      font-size: .6rem;
      font-weight:800;
    }
  }
}
</style>
