import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import store from './store/index.js';
// Install BootstrapVue

//import store from './store';
import SmartTable from 'vuejs-smart-table';
require('../node_modules/@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css')
Vue.config.productionTip = false;
Vue.use(SmartTable)
Vue.use(BootstrapVue)
Vue.use(VueFilterDateParse)
Vue.use(VueFilterDateFormat)
Vue.use(Vuex)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');