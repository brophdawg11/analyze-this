import Vue from 'vue'
import './plugins/vuetify'
import config from '../../config'
import App from './App.vue'
import router from './router'
import store from './store'
import io from 'socket.io-client';

const server = `http://localhost:${config.dashboard.port}`;
console.log('Connecting to socket.io server', server);
const socket = io(server);

socket.on('anaytics-event', function (data) {
    console.log('Received event from socket', data);
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
