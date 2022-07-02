<template>
  <div class="box">
    <!-- 歌单详情页 -->
    <div class="detail-container">
      <!-- 头部 -->
      <!-- 背景图 -->
      <img :src="musicList.coverImgUrl" alt="" class="detail-img" />
      <div class="detail-top">
        <span>
          <svg class="icon" aria-hidden="true" @click="goBefore">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
        </span>
        <div>
          <span class="search">
            <svg class="icon" aria-hidden="true" @click="$router.push('/searchMusic')">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
          </span>
          <span>
            <svg class="icon" aria-hidden="true"  @click="showShare = true">
              <use xlink:href="#icon-caidan "></use>
            </svg>
          </span>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="detail-content">
        <!-- 歌单图片 -->
        <div class="musicList-pic">
          <img :src="musicList.coverImgUrl" alt="" />
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-erji"></use>
            </svg>
            {{ musicList.playCount | playCountFormat }}
          </span>
        </div>
        <!-- 文字 -->
        <div class="musicList-text">
          <!-- 歌单名 -->
          <div class="songName">
            {{ musicList.name }}
          </div>
          <!-- 作者区域 -->
          <div class="creator">
            <!-- 头像 -->
            <img :src="creator.avatarUrl" alt="" />
            <!-- 昵称 -->
            <span>{{ creator.nickname }}</span>
          </div>
          <!-- 简介 -->
          <div class="song-introduce">
            <span>简介:{{musicList.description | ellipsis}}</span>
          </div>
        </div>
        <!-- 底部图标 -->
        <div class="bottom-icon">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-aixin"></use>
            </svg>
            {{dynamicSong.bookedCount}}
          </span>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
            {{dynamicSong.commentCount}}
          </span>
          <span>
            <svg class="icon" aria-hidden="true" @click="showShare = true">
              <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>分享</span>
          </span>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <SongList></SongList>
    </div>
    <!-- 回到顶部图标 -->
    <transition name="fade" enter-active-class="animate__animated animate__flash" leave-active-class="animate__animated animate__backOutDown">
      <div class="back-to-top" @click="backToTop" v-show="scrollTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huojian"></use>
        </svg>
      </div>
    </transition>
    <!-- 分享面板 -->
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import SongList from '@/components/home/SongList.vue'
import { Toast } from 'vant'
import { songDetail, dynamicSong } from '@/api/musicItem.js'
export default {
  components: {
    SongList
  },
  data () {
    return {
      // 传过来的歌单数据
      musicList: [],
      // 歌单创作人
      creator: [],
      dynamicSong: [],
      // 滚动条位置
      scrollTop: 0,
      // 分享面板
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  methods: {
    goBefore () {
      this.$router.go(-1)
    },
    // 歌单详情
    async getSongDetail (id) {
      const { data: res } = await songDetail(id)
      this.musicList = res.playlist
      this.creator = res.playlist.creator
    },
    // 歌单动态详情
    async getDynamicSong (id) {
      const { data: res } = await dynamicSong(id)
      this.dynamicSong = res
    },
    // 回到顶部
    backToTop () {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    },
    handleScroll () {
      const scroll = document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scroll
    },
    onSelect (option) {
      Toast(option.name)
      this.showShare = false
    }
  },
  created () {
    const id = this.$route.query.id
    this.getSongDetail(id)
    this.getDynamicSong(id)
  },
  mounted () {
    // 监听滚动条事件
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  .detail-container {
    width: 100%;
    position: relative;
    bottom: 1rem;
    .detail-img {
      position: fixed;
      z-index: -1;
      width: 100%;
      height: 6.5rem;
      filter: blur(0.4rem);
    }
    .detail-top {
      width: 100%;
      display: flex;
      height: 1rem;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      .search {
        margin-right: 0.2rem;
      }
      .icon {
        fill: #fff;
      }
    }
    .detail-content {
      width: 100%;
      height: 6rem;
      position: relative;
      top: 0.5rem;
      .musicList-pic {
        position: absolute;
        width: 40%;
        left: 0.4rem;
        img {
          width: 100%;
          border-radius: 0.2rem;
        }
        span {
          position: relative;
          right: 0;
          bottom: 0.7rem;
          color: #fff;
          display: flex;
          align-items: center;
        }
      }
      .musicList-text {
        width: 50%;
        height: 100%;
        position: absolute;
        right: 0;
        .songName {
          font-size: 0.4rem;
          color: #fff;
        }
        .creator {
          width: 100%;
          margin-top: 0.2rem;
          display: flex;
          align-items: center;
          img {
            width: 20%;
            height: 100%;
            border-radius: 0.4rem;
            border: 1px solid #fff;
          }
          span {
            margin-left: 0.06rem;
            color: #fff;
            text-overflow: ellipsis;
          }
        }
        .song-introduce {
          width: 100%;
          margin-top: 0.6rem;
          height: 1.2rem;
          span {
            color: #fff;
          }
        }
      }
      .bottom-icon {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 1rem;
        color: #fff;
        position: absolute;
        bottom: 1rem;
        span {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .back-to-top {
    .icon {
      height: 2rem;
      position: fixed;
      bottom: 2rem;
      right: 0;
      height: 0.8rem;
      width: 0.8rem;
    }
  }
  .footer-music {
    bottom: 0;
    border: none;
    border-top: 1px solid #999;
  }
  .icon {
    width: 0.6rem;
    height: 0.6rem;
  }
}
</style>
