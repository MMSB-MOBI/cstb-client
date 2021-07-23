import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router"
import Socketio from './plugins/socket.io'
import PrimeVue from 'primevue/config';
import { defineCustomElements } from '@mmsb/result_page/dist/loader';

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "./assets/style.css"

const app = createApp(App);
defineCustomElements(window);
app.config.isCustomElement = tag => tag === 'result-page';

app.use(PrimeVue);
app.use(router);
app.use(Socketio, {
    connection: 'localhost:3005'
})
app.mount('#app');