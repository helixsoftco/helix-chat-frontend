import Vue from 'vue';
import Dev from './serve.vue';
import '../src/index.scss'

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
