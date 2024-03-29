import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://47.120.59.186:3000";
Vue.prototype.$http = axios;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
