import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import { firestorePlugin } from 'vuefire';

Vue.config.productionTip = false

Vue.use(SuiVue);
Vue.use(firestorePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
