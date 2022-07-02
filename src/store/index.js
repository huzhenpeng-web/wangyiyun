import Vue from 'vue'
import Vuex from 'vuex'
import { lyric } from '@/api/musicItem'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 为播放列表添加默认值
    playList: [{
      al: {
        id: 34567265,
        name: '不将就',
        pic: 109951165798918420,
        picUrl: 'https://p1.music.126.net/e-Uc6W3Kug-HFHJ5nvCUPg==/109951166562828988.jpg',
        pic_str: '109951166562828988'
      },
      name: '不将就',
      id: 31654343
    }],
    playListIndex: 0, // 默认下标为0
    isbtnShow: true, // 暂停按钮的显示
    detailShow: false, // 歌曲详情页的显示
    lyricList: {}, // 歌词
    currentTime: 0, // 当前时间
    playStatus: false, // 播放状态
    duration: 0, // 歌曲总时长
    bottomNavShow: false, // 底部导航显示状态
    dragStatus: false, // 拖拽状态
    playVideoStatus: true // 底部播放器
  },
  getters: {},
  mutations: {
    // 改变播放按钮
    updateIsbtnShow (state, value) {
      state.isbtnShow = value
    },
    // 更改播放列表
    updatePlayList (state, value) {
      state.playList = value
    },
    // 更改下标
    updatePlayListIndex (state, value) {
      state.playListIndex = value
    },
    // 歌曲详情页
    updateDetailShow (state, value) {
      state.detailShow = value
    },
    // 更改歌词
    updateLyricList (state, value) {
      state.lyricList = value
    },
    // 改变当前时间
    updateCurrentTime (state, value) {
      state.currentTime = value
    },
    // 进度条
    updateDuration (state, value) {
      state.duration = value
    },
    // 存储当前音乐的播放时间和状态
    setMusicStatus (state, value) {
      state.currentTime = value[0]
      state.playStatus = value[1]
      const musicStatus = {
        currentTime: state.currentTime,
        playStatus: state.playStatus
      }
      window.localStorage.setItem('musicStatus', JSON.stringify(musicStatus))
    },
    // 改变底部状态栏
    updateBottomNavShow (state, value) {
      state.bottomNavShow = value
    },
    // 拖动状态
    updateDragStatus (state, value) {
      state.dragStatus = value[0]
      state.currentTime = value[1]
    },
    updatePlayVideoStatus (state, value) {
      state.playVideoStatus = value
    }
  },
  actions: {
    async getLyric (context, value) {
      const { data: res } = await lyric(value)
      context.commit('updateLyricList', res.lrc)
    }
  },
  modules: {}
})
