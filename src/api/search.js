import http from '@/api/index'

// 搜索
export function cloudSearch (keywords, type, currentPage) {
  return http.get(`cloudsearch?keywords=${keywords}&type=${type}&offset=${(currentPage - 1) * 30}`)
}

// 新歌速递
export function topSong () {
  return http.get('top/song?type=7')
}

// 搜索建议
export function searchSuggest (keywords) {
  return http.get(`search/suggest?keywords=${keywords}&type=mobile`)
}
