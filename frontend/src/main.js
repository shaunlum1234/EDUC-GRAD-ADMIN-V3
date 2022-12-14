import Vue,{ createApp } from '@vue/compat'
import App from './App.vue'
import router from './router'
import store from './store';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/bcgov.css';
import './assets/css/global.css';
import '@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

const app = createApp(App)
app.use(router).use(store).mount('#app')
