import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuetify, { iconfont: 'md' })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
