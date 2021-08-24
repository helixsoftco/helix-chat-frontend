import Vue from 'vue';
import Dev from './serve.vue';
import "@/index.scss"
import "bootstrap/scss/bootstrap-reboot.scss"

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
