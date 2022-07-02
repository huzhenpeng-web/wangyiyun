<template>
  <div class="albumList">
    <div v-for="(item,index) in album.albums" :key="index">
      <router-link :to="{path:'/albumDetail',query:{id:item.id}}">
        <div class="albumList-box">
          <van-image :src="item.picUrl" alt="">
            <template v-slot:loading>
              <van-loading type="spinner" size="20">加载中...</van-loading>
            </template>
          </van-image>
          <div class="albumList-text">
            <span>{{item.name}}</span>
          </div>
        </div>
      </router-link>
    </div>
    <van-pagination @change="changeCurrentPage" v-model="currentPage" :page-count="Math.ceil(this.album.albumCount / 30) " mode="simple" />
  </div>
</template>

<script>
import { cloudSearch } from '@/api/search.js'
export default {
  props: ['keyword'],
  data () {
    return {
      currentPage: 1,
      album: {}
    }
  },
  methods: {
    async getSearchDetail (currentPage) {
      const { data: res } = await cloudSearch(this.keyword, 10, currentPage)
      this.album = res.result
    },
    changeCurrentPage () {
      this.getSearchDetail(this.currentPage)
    }
  },
  created () {
    this.getSearchDetail(this.currentPage)
    this.isLoading = false
  }
}
</script>

<style lang="less" scoped>
.albumList {
  width: 100%;
  .albumList-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.2rem;
    .van-image {
      width: 25%;
      height: 25%;
    }
    .albumList-text {
      width: 70%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
