<template>
  <div class="songList">
    <div v-for="(item,index) in songList.playlists" :key="index">
      <router-link :to="{path:'/musicDetail',query:{id:item.id}}">
        <div class="songList-box">
          <van-image :src="item.coverImgUrl" alt="">
            <template v-slot:loading>
              <van-loading type="spinner" size="20">加载中...</van-loading>
            </template>
          </van-image>
          <div class="songList-text">
            <span>{{item.name}}</span>
            <span>{{item.description | ellipsis}}</span>
          </div>
        </div>
      </router-link>
    </div>
    <van-pagination @change="changeCurrentPage" v-model="currentPage" :page-count="Math.ceil(this.songList.playlistCount / 30) " mode="simple" />
  </div>
</template>

<script>
import { cloudSearch } from '@/api/search.js'
export default {
  props: ['keyword'],
  data () {
    return {
      currentPage: 1,
      songList: {}
    }
  },
  methods: {
    async getSearchDetail (currentPage) {
      const { data: res } = await cloudSearch(this.keyword, 1000, currentPage)
      this.songList = res.result
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
.songList {
  width: 100%;
  .songList-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.2rem;
    .van-image{
      width: 25%;
      height: 25%;
    }
    .songList-text {
      width: 70%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
