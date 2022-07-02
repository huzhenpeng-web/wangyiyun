<template>
  <!-- 歌曲播放 -->
  <div class="song-list">
    <div class="list-title">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangqi-bofang"></use>
      </svg>
      <span>
        播放全部(共{{songList.length}}首)
      </span>
    </div>
    <van-cell is-link v-for="(item,index) in songList" :key="item.id">
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
</template>

<script>
import { allSong } from '@/api/musicItem'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      songList: []
    }
  },
  methods: {
    // 获取歌单里的歌曲
    async getAllSong (id) {
      const { data: res } = await allSong(id)
      this.songList = res.songs
    },
    playMusic (index) {
      this.updatePlayList(this.songList)
      this.updatePlayListIndex(index)
    },
    ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
  },
  created () {
    const id = this.$route.query.id
    this.getAllSong(id)
  }
}
</script>

<style lang="less" scoped>
.list-title {
  font-size: 0.5rem;
  margin-left: 0.2rem;
}
.song-list {
  width: 100%;
  height: 100%;
  .song {
    display: flex;
  }
  .song-name {
    display: flex;
    flex-direction: column;
  }
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
