import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home.vue'
import MyPage from '@/views/mine/MyPage.vue'
import MusicDetail from '@/components/home/MusicListDetail.vue'
import store from '@/store/index'
import Search from '@/views/search/Search'
import SearchDetail from '@/views/search/SearchDetail'
import AlbumDetail from '@/views/album/AlbumDetail'
import Login from '@/views/mine/Login'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  component: Home
}, {
  path: '/myPage',
  component: MyPage
}, {
  path: '/musicDetail',
  component: MusicDetail
}, {
  path: '/searchMusic',
  component: Search
}, {
  path: '/searchDetail',
  component: SearchDetail
}, {
  path: '/albumDetail',
  component: AlbumDetail
}, {
  path: '/login',
  component: Login
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/musicDetail') {
    store.commit('updatePlayVideoStatus', true)
    store.commit('updateBottomNavShow', false)
  } else if (to.path === '/home') {
    store.commit('updateBottomNavShow', true)
    store.commit('updatePlayVideoStatus', true)
  } else if (to.path === '/searchMusic') {
    store.commit('updateBottomNavShow', false)
    store.commit('updatePlayVideoStatus', false)
  } else if (to.path === '/searchDetail') {
    store.commit('updatePlayVideoStatus', true)
  } else if (to.path === '/login') {
    store.commit('updateBottomNavShow', false)
    store.commit('updatePlayVideoStatus', false)
  }
  next()
})

export default router
