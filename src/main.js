import Vue from 'vue';
import Board from './components/Board.vue';
import './assets/styles.css';
import { firestorePlugin } from 'vuefire';

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

new Vue({

    render: h => h(Board)

}).$mount('#app');
