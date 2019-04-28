import Vue from 'vue';
import Board from './components/Board.vue';
import './assets/styles.css';

Vue.config.productionTip = false;

new Vue({

    render: h => h(Board)

}).$mount('#app');
