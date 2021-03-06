import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import VueCountdown from '@chenfengyuan/vue-countdown';
import VueConfetti from 'vue-confetti';

Vue.use(VueConfetti)
Vue.component(VueCountdown.name, VueCountdown);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
