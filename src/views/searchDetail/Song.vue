<template>
  <div class="song-content">
    <van-cell is-link v-for="(item,index) in song" :key="item.id">
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
    <van-pagination @change="changeCurrentPage" v-model="currentPage" :page-count="(this.songCount / 30).toFixed(0)" mode="simple" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { cloudSearch } from '@/api/search.js'
export default {
  props: ['keyword'],
  data () {
    return {
      currentPage: 1,
      song: [],
      songCount: 0
    }
  },
  methods: {
    ...mapMutations(['updatePlayList', 'updatePlayListIndex']),
    playMusic (index) {
      this.updatePlayList(this.song)
      this.updatePlayListIndex(index)
    },
    async getSearchDetail (currentPage) {
      const { data: res } = await cloudSearch(this.keyword, 1, currentPage)
      this.song = res.result.songs
      this.songCount = res.result.songCount
    },
    changeCurrentPage () {
      this.getSearchDetail(this.currentPage)
    }
  },
  created () {
    this.getSearchDetail(this.currentPage)
  }
}
</script>

<style lang="less" scoped>
.song-content {
  width: 100%;
  .song {
    display: flex;
  }
  .song-name {
    display: flex;
    flex-direction: column;
  }
  .icon {
    width: 0.5rem;
    height: 0.5rem;
  }
}
</style>
