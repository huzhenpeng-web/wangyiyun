import http from '@/api/index'

// 获取专辑内容
export function getAlbum (id) {
  return http.get(`album?id=${id}`)
}

// 获取视频播放地址
export function getVideoUrl (id) {
  return http.get(`video/url?id=${id}`)
}
