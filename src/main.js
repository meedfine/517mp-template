import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "uview-ui";
import clHeader from './components/clHeader.vue';
import "./assets/css/mintui.css"
import "./assets/iconfont/iconfont.css"

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.use(uView);
Vue.component('clHeader', clHeader);

App.mpType = 'app'


const app = new Vue({
  store,
  ...App
})
app.$mount()
