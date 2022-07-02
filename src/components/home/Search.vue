<template>
  <!-- 搜索框 -->
  <div class="search-container">
    <van-search v-model="searchInput" :placeholder="keyword" shape="round" @focus="$router.push('/searchMusic')" />
  </div>
</template>

<script>
import { defaultSearch } from '@/api/home'
export default {
  data () {
    return {
      searchInput: '',
      keyword: ''
    }
  },
  methods: {
    // 获取默认输入的关键词
    async getdefaultSearch () {
      const { data: res } = await defaultSearch()
      this.keyword = res.data.showKeyword
    }
  },
  created () {
    this.getdefaultSearch()
  }
}
</script>

<style lang="less" scoped>
.van-search {
  margin-top: 0.2rem;
}
</style>
