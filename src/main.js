import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "uview-ui";
import clHeader from './components/clHeader.vue';
import './assets/css/common.styl'
import "./assets/css/mintui.css"
import "./assets/iconfont/iconfont.css"
import utils from './assets/js/utils.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$utils = utils;
Vue.use(uView);
Vue.component('clHeader', clHeader);

App.mpType = 'app'

Vue.filter("autoProtocol",function(value){
  // 测试过try不影响性能
  try {
    if(imgUtils){
      value = imgUtils.getLocalImg(value);
    }
  } finally {
    // 公有云打包
    return value = value ? value.replace(/^(http:)/, "") : value;
    // 本地file文件打包
    // value = value ? value.replace(/^(http:)/, "https:") : value;
    // return value ? value.replace(/^(https:\/\/rs.517na.com)/, window.rsFileUrl) : value;
  }
})


const app = new Vue({
  store,
  ...App
})
app.$mount()
