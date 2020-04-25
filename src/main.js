import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/icon/iconfont.css'
import './less/common.less'
import axios from './utils/axios'
import VueClipboard from 'vue-clipboard2'

import {
  Button,
  Icon,
  Rate,
  Tabs,
  Drawer,
  Input,
  InputNumber,
  Spin,
  Message,
  Modal,
  Select,
  DatePicker,
  FormModel,
  LocaleProvider,
  Progress
} from 'ant-design-vue'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$message = Message

Vue.use(VueClipboard)

Vue.use(Button)
Vue.use(Icon)
Vue.use(Rate)
Vue.use(Tabs)
Vue.use(Drawer)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Spin)
Vue.use(Message)
Vue.use(Modal)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(LocaleProvider)
Vue.use(FormModel)
Vue.use(Progress)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
