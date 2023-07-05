import Vue,{ createApp } from '@vue/compat'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/bcgov.css';
import './assets/css/global.css';
import '@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

const app = createApp(App)
app.use(createPinia());
app.use(router)
app.mount('#app')
