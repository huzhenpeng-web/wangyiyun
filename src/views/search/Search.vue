<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <div class="top-search">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <van-search v-focus @keyup="getSuggestDebounce" @keydown.enter="beginSearch" clearable v-model="searchInput" :placeholder="keyword" shape="round" />
    </div>
    <!-- 搜索记录 -->
    <div class="search-history" v-show="isSearchHistory">
      <div class="history-top">
        <span class="left">搜索记录</span>
        <van-icon name="delete-o" size="0.6rem" @click="removeAllTags" />
      </div>
      <div class="history-content">
        <span class="content-span" v-for="(item,index) in searchHistory" :key="index">
          <van-tag round type="primary" @click="tagSearch(item)" closeable @close="removeTag(index)" size="large">{{item}}</van-tag>
        </span>
      </div>
    </div>
    <!-- 新歌速递 -->
    <div class="new-music" v-show="!isSearchSuggest">
      <div class="music-title" style="font-size:0.6rem;">新歌速递</div>
      <div class="music-content">
        <van-cell-group inset v-for="(item,index) in newMusic" :key="index" class="music-content-group">
          <router-link :to="{path:'/searchDetail',query:{keywords:item.name}}">
            <van-cell :value="item.name" :title="(index+1)" center />
          </router-link>
        </van-cell-group>
      </div>
    </div>
    <!-- 搜索建议 -->
    <div class="searchSuggest" v-show="isSearchSuggest">
      <van-cell-group inset v-for="(item,index) in suggest" :key="index">
        <router-link :to="{path:'/searchDetail',query:{keywords:item.keyword}}">
          <van-cell :value="item.keyword" :title="(index+1)" center  @click="setSearchHistory(item.keyword)"/>
        </router-link>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { defaultSearch } from '@/api/home'
import { topSong, searchSuggest } from '@/api/search'
import debounce from '@/utils/debounce.js'
export default {
  name: 'Search',
  data () {
    return {
      // 搜索框
      searchInput: '',
      // 关键字
      keyword: '',
      // 真实关键字
      realKeyWord: '',
      // 搜索历史
      searchHistory: [],
      // 搜索历史的展示
      isSearchHistory: false,
      // 新歌速递
      newMusic: [],
      isSearchSuggest: false,
      // 搜索建议
      suggest: []
    }
  },
  methods: {
    // 获取默认输入的关键词
    async getdefaultSearch () {
      const { data: res } = await defaultSearch()
      this.keyword = res.data.showKeyword
      this.realKeyWord = res.data.realkeyword
    },
    // 按下回车 发起搜索
    beginSearch () {
      if (this.searchInput === '') {
        this.searchInput = this.realKeyWord
      }
      this.search()
      this.setSearchHistory(this.searchInput)
      this.searchInput = ''
    },
    search () {
      this.$router.push(`/searchDetail?keywords=${this.searchInput}`)
    },
    // 移除搜索记录标签
    removeTag (index) {
      this.link = false
      // 根据下标删除记录
      this.searchHistory.splice(index, 1)
      // 更新本地记录
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    },
    // 删除所有记录
    removeAllTags () {
      this.searchHistory = []
      // 删除本地记录
      localStorage.removeItem('searchHistory')
    },
    // 获取新歌
    async getNewMusic () {
      const { data: res } = await topSong()
      this.newMusic = res.data
      if (this.newMusic.length > 30) {
        this.newMusic.splice(30)
      }
    },
    // 获取搜索建议
    async getSuggest () {
      if (this.searchInput === '') {
        return
      }
      const { data: res } = await searchSuggest(this.searchInput)
      this.suggest = res.result.allMatch
      this.isSearchSuggest = true
      this.isSearchHistory = false
    },
    // 搜索建议节流
    getSuggestDebounce: debounce.debounce(function () {
      this.getSuggest()
    }, 500),
    // 标签搜索
    tagSearch (keyword) {
      this.$router.push(`/searchDetail?keywords=${keyword}`)
    },
    // 存储搜索记录
    setSearchHistory (search) {
      this.searchHistory.unshift(search)
      // 去重
      this.searchHistory = [...new Set(this.searchHistory)]
      // 设置数组长度
      if (this.searchHistory.length > 10) {
        this.searchHistory.splice(this.searchHistory.length - 1, 1)
      }
      // 搜索历史 存储到本地
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    }
  },
  created () {
    // 获取默认搜索关键字
    this.getdefaultSearch()
    this.getNewMusic()
  },
  mounted () {
    // 从本地取出搜索历史 赋值
    if (localStorage.getItem('searchHistory')) {
      this.isSearchHistory = true
      this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    }
  },
  watch: {
    searchHistory () {
      if (this.searchHistory.length !== 0) {
        this.isSearchHistory = true
      } else {
        this.isSearchHistory = false
      }
    },
    searchInput () {
      if (this.searchInput === '') {
        this.isSearchSuggest = false
        this.isSearchHistory = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  width: 100%;
  height: 100%;
  .top-search {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-search {
      width: 90%;
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      margin-left: 0.1rem;
    }
  }
  .search-history {
    width: 100%;
    height: 20%;
    .history-top {
      width: 100%;
      height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        font-size: 0.6rem;
      }
    }
    .history-content {
      margin-top: 0.4rem;
      height: calc(100% - 0.8rem);
      .content-span {
        padding: 0.1rem;
        .van-tag {
          margin-top: 0.1rem;
        }
      }
    }
    .new-music {
      width: 100%;
    }
  }
}
</style>
