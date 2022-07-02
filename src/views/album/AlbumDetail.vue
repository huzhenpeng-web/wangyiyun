<template>
  <div class="album-container">
    <!-- 头部导航 -->
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span>{{album.type}}</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
    <!-- 专辑封面 信息 -->
    <div class="album-content">
      <!-- 左侧 -->
      <div class="left">
        <img :src="album.picUrl" alt="">
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span style="font-size:0.4rem;">{{album.name}}</span>
        <div>
          <!-- 歌手头像 -->
          <img :src="artist.picUrl" alt="">
          <span>{{artist.name}}</span>
        </div>
        <!-- 发行时间 -->
        <span style="margin-top:0.5rem;">发行时间:{{album.publishTime | dateFormat}}</span>
      </div>
    </div>
    <!-- 专辑分享 评论 -->
    <div class="album-comment">
      <div>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <span></span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-taolun"></use>
        </svg>
        <span>{{info.commentCount}}</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{info.shareCount}}</span>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="album-list">
      <div class="list-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangqi-bofang"></use>
        </svg>
        <span>
          播放全部(共{{album.size}}首)
        </span>
      </div>
      <van-cell is-link v-for="(item,index) in songs" :key="item.id">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="song" @click="playMusic(index)">
            <div style="margin-right:0.2rem;">{{index + 1}}</div>
            <div class="song-name">
              <span class="custom-title">{{item.name}}</span>
              <span>
                <span v-for="(i,indexItem) in item.ar" :key="indexItem">
                  <span v-if="indexItem != 0">|</span>
                  {{item.ar[indexItem].name}}
                </span>
                <span>· {{item.al.name}}</span>
              </span>
            </div>
          </div>
        </template>
        <template #right-icon>
          <svg class="icon" aria-hidden="true" v-if="item.mv !== 0">
            <use xlink:href="#icon-bofangMV"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youcecaidan"></use>
          </svg>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { getAlbum } from '@/api/album.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      albumId: 0,
      // 专辑信息
      album: {},
      // 专辑里的歌曲
      songs: [],
      // 歌手信息
      artist: {},
      // 专辑评论等数据
      info: {}
    }
  },
  methods: {
    async getAlbumContent () {
      const { data: res } = await getAlbum(this.albumId)
      this.album = res.album
      this.songs = res.songs
      this.artist = res.album.artist
      this.info = res.album.info
      console.log(res)
    },
    playMusic (index) {
      this.updatePlayList(this.songs)
      this.updatePlayListIndex(index)
    },
    ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
  },
  created () {
    this.albumId = this.$route.query.id
    this.getAlbumContent()
  }
}
</script>

<style lang="less" scoped>
.album-container {
  width: 100%;
  height: 100%;
  position: relative;
  .top {
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .album-content {
    width: 100%;
    height: 20%;
    position: relative;
    display: flex;
    justify-content: space-between;
    .left {
      width: 35%;
      height: 80%;
      position: relative;
      top: 0.25rem;
      left: 0.4rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 18%;
      }
    }
    .right {
      position: relative;
      top: 0.25rem;
      width: 50%;
      height: 60%;
      display: flex;
      flex-direction: column;
      div {
        width: 60%;
        margin-top: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
    }
  }
  .album-comment {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
    div {
      display: flex;
      align-items: center;
    }
  }
  .album-list {
    width: 100%;
    .list-title {
      display: flex;
      align-items: center;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
    .song {
      display: flex;
      .song-name {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
