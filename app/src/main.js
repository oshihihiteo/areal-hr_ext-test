import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/main.css';
import VueTheMask from 'vue-the-mask'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueTheMask)
app.mount('#app');
