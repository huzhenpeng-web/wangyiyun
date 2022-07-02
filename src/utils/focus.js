import Vue from 'vue'
Vue.directive('focus', {
  inserted: function (el) {
    if (el.querySelector('input')) {
      el.querySelector('input').focus()
    }
  }
})
