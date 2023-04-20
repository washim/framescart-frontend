import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/main.css';

axios.defaults.baseURL = "http://localhost:8000";

const app = createApp(App);

app.use(router, axios);
app.use(store);
app.mount('#app');
