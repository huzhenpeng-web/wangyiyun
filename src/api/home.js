import http from '@/api/index'

// 默认搜索
export function defaultSearch () {
  return http.get('search/default')
}

// 轮播图数据
export function banners () {
  return http.get('banner?type=2')
}

// 获取推荐（私荐）歌单
export function personMusicList () {
  return http.get('personalized?limit=15')
}

// 获取精品歌单
export function GoodMusicList () {
  return http.get('top/playlist/highquality?limit=15')
}
