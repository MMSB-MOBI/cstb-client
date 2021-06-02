import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "./assets/style.css"
import router from "./router/router"
import Socketio from './plugins/socket.io'
import PrimeVue from 'primevue/config';
// import { applyPolyfills, defineCustomElements } from '@mmsb/mmsb-select/loader'
import { defineCustomElements } from '@mmsb/result_page/dist/loader';

const app = createApp(App);
defineCustomElements(window);
app.config.isCustomElement = tag => tag === 'result-page';

app.use(PrimeVue);
app.use(router);
app.use(Socketio, {
    connection: 'localhost:4000',
    /*     options: {
    //         // Your Socket.io options here
    //     }*/
})
app.mount('#app');