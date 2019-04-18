import Vue from 'vue'
import Board from './components/Board.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Board),
}).$mount('#grid')
