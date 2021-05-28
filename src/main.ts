import { createApp } from 'vue'
import App from './App.vue'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import "./assets/style.css"
import router from "./router/router"
// import Socketio from './plugins/socket.io'

const app = createApp(App);
app.use(router);
// app.use(Socketio, {
//     connection: 'http://localhost:4000',
//     options: {
//         // Your Socket.io options here
//     }
// })
app.mount('#app');