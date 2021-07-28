import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
import './assets/css/normalize.css'
import 'font-awesome/css/font-awesome.min.css';
import {
  Message
} from 'element-ui';


import axios from 'axios'
// 远程后台地址
//axios.defaults.baseURL = 'https://localhost/api/'
axios.defaults.baseURL = 'https://localhost/api/'
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
  // console.log(config)
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Token = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})

axios.interceptors.response.use(response => {
  console.log("请求地址:" + response.config.url + " 返回:", response.data);
  if (response.status !== 200) {
    console.log("请重试!");
    return;
  }

  if (response.data.success !== true) {
    Message({
      message: response.data.message,
      type: 'error',
      center: true
    });
    if (response.data.message == "登录信息已过期,请重新登录") {
      router.push('/login');
    }
    return;
  }
  return response.data;
})
// 挂在到Vue实例，后面可通过this调用
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
