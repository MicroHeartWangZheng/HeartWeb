import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
import './assets/css/normalize.css'
import 'font-awesome/css/font-awesome.min.css';

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')