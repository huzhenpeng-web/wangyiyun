<template>
  <div>
    <div v-for="item in singer.artists" :key="item.id" class="singer">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <van-image :src="item.img1v1Url" alt="">
          <template v-slot:loading>
            <van-loading type="spinner" size="20">加载中...</van-loading>
          </template>
        </van-image>
      </div>
      <!-- 歌手介绍 -->
      <div class="singer-content">
        <span>{{item.name}}</span>
        <div>
          <span v-show="item.alias[0]">别名:{{item.alias[0]}}&nbsp;</span>
          <span>专辑:{{item.albumSize}}&nbsp;</span>
          <span>MV:{{item.mvSize}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloudSearch } from '@/api/search.js'
export default {
  props: ['keyword'],
  data () {
    return {
      singer: {}
    }
  },
  methods: {
    async getSearchDetail () {
      const { data: res } = await cloudSearch(this.keyword, 100, 1)
      this.singer = res.result
    }
  },
  created () {
    this.getSearchDetail()
  }
}
</script>

<style lang="less" scoped>
.singer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .avatar-box {
    width: 25%;
    height: 25%;
    .van-image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .singer-content {
    width: 70%;
  }
}
</style>
