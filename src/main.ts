import { createApp } from 'vue'
import Vue from 'vue'; 
import App from './App.vue'
import router from "./router/router"
import Socketio from './plugins/socket.io'
import PrimeVue from '@mmsb/primevue-forked/config';
import { defineCustomElements } from '@mmsb/result_page/dist/loader';


import '@mmsb/primevue-forked/resources/themes/saga-blue/theme.css'
import '@mmsb/primevue-forked/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "./assets/style.css"

const app = createApp(App);
defineCustomElements(window);
document.title = "CSTB"; 
app.config.isCustomElement = tag => tag === 'result-page';

app.use(PrimeVue);
app.use(router);

app.use(Socketio, {
    connection: '/'
})
app.mount('#app');
