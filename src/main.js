import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件   的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
import Carsouel from '@/components/Carsouel'
Vue.component(Carsouel.name, Carsouel)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
//引入MockServer.js----mock数据
import "@/mock/mockServe"
import "swiper/dist/js/swiper";
import "swiper/dist/css/swiper.css";

// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'
import atm from '@/assets/qianlong.webp'
// 引入lazyload插件(lazyload需要装1.3.3版本)
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 加载默认图片
  loading: atm,
})

Vue.config.productionTip = false
import { reqGetSearchInfo } from '@/api'
import { Button } from 'element-ui'
console.log(reqGetSearchInfo({}));

// 引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组建身上有$route,$router属性
  router,
  // 注册仓库：组件实例的身上会多个一个属性$store属性
  store
}).$mount('#app')
