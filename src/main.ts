import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import VueCountdown from '@chenfengyuan/vue-countdown';
import VueConfetti from 'vue-confetti';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueConfetti)
Vue.component(VueCountdown.name, VueCountdown);
Vue.use(VueGoogleMaps, { load: { key: '', region: 'MX', language: 'ES' }});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
