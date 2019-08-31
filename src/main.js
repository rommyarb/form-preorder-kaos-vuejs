import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import {
  firestorePlugin
} from 'vuefire'
import router from './router'

Vue.config.productionTip = false

Vue.use(SuiVue)
Vue.use(firestorePlugin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')