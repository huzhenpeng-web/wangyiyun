import http from '@/api/index.js'

// 根据歌单id 获取歌单详情
export function songDetail (id) {
  return http.get(`playlist/detail?id=${id}`)
}

// 歌单详情动态
export function dynamicSong (id) {
  return http.get(`playlist/detail/dynamic?id=${id}`)
}

// 获取歌单所有歌曲
export function allSong (id) {
  return http.get(`playlist/track/all?id=${id}`)
}

// 获取歌词
export function lyric (id) {
  return http.get(`lyric?id=${id}`)
}

// 获取歌曲评论
export function songComment (id) {
  return http.get(`comment/music?id=${id}`)
}

// 获取歌曲详情
export function songsDetail (ids) {
  return http.get(`song/detail?ids=${ids}`)
}
