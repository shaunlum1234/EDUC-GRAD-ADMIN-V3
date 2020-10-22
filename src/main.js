import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue'

// Install BootstrapVue

//import store from './store';
import SmartTable from 'vuejs-smart-table';
require('../node_modules/@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css')
Vue.config.productionTip = false;
Vue.use(SmartTable)
Vue.use(BootstrapVue)

new Vue({
  router,
//  store,
  render: h => h(App)
}).$mount('#app');
