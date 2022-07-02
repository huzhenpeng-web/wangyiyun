import Vue from 'vue'

// 播放量统计过滤器
Vue.filter('playCountFormat', function (count) {
  if (count >= 100000000) {
    return (count / 100000000).toFixed(2) + '亿'
  } else if (count >= 10000000) {
    return (count / 10000000).toFixed(2) + '千万'
  } else if (count >= 10000) {
    return (count / 10000).toFixed(2) + '万'
  }
})

// 文本长度过滤器
Vue.filter('ellipsis', function (value) {
  if (!value) return ''
  if (value.length > 28) {
    return value.slice(0, 28) + '...'
  }
  return value
})

// 歌曲时间过滤器
Vue.filter('songFormat', function (value) {
  const n = (value % 60).toFixed(0)
  // 小于一分钟
  if (value < 60) {
    const a = value.toFixed(0)
    return '00:' + (a > 9 ? a : '0' + a)
  } else if (value < 600) {
    return '0' + Math.floor(value / 60) + ':' + (n > 9 ? n : '0' + n)
  } else {
    return Math.floor(value / 60) + ':' + (n > 9 ? n : '0' + n)
  }
})

// 日期过滤器
Vue.filter('dateFormat', function (originVal) {
  // 先把传参毫秒转化为new Date()
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  // 月份是从0开始,需要+1。  +''是把数字转化为字符串,padStart(2,'0')是把字符串设置为2位数,不足2位则在开头加'0'
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  // const hh = (dt.getHours() + '').padStart(2, '0')
  // const mm = (dt.getMinutes() + '').padStart(2, '0')
  // const ss = (dt.getSeconds() + '').padStart(2, '0')
  // return `${y}-${m}-${d}-${hh}:${mm}:${ss}`
  return `${y}-${m}-${d}`
})
