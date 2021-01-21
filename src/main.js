import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';
import VueLogger from 'vuejs-logger';
import * as Keycloak from 'keycloak-js'
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import qs from 'query-string';
import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import store from './store/index.js';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { BootstrapVueIcons } from 'bootstrap-vue'



// Install BootstrapVue

//import store from './store';
import SmartTable from 'vuejs-smart-table';
require('../node_modules/@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css')
Vue.config.productionTip = false;
const options = {
  isEnabled: true,
  logLevel : Vue.config.productionTip  ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
};
Vue.use(VueLogger, options);
Vue.use(SmartTable)
Vue.use(BootstrapVue)
Vue.use(qs)
Vue.use(VueFilterDateParse)
Vue.use(VueFilterDateFormat)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

//keycloak init options
let initOptions = {
  url: 'https://soam-tools.apps.silver.devops.gov.bc.ca/auth', realm: 'master', clientId: 'educ-grad-school-api-service', onLoad:'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad ,"checkLoginIframe" : false}).success((auth) =>{
    
    if(!auth) {
      window.location.reload();
    } else {
      Vue.$log.info("Authenticated");
    }
  
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');


    // TODO: Maybe dont store the token in the localstore, rather use it direct from the keycloak.token object
    //localStorage.setItem("jwt", keycloak.token);
    //localStorage.setItem("refresh", keycloak.refreshToken);
    console.log("KEYCLOAK TOKEN" + keycloak.token);
    store.commit("setToken",keycloak.token);
    store.commit("setRefreshToken",keycloak.refreshToken);
    //console.log(localStorage.getItem("jwt"));
    setInterval(() =>{
      keycloak.updateToken(70).success((refreshed)=>{
        if (refreshed) {
          Vue.$log.debug('Token refreshed');
        } else {
          Vue.$log.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        }
      }).error(()=>{
          Vue.$log.error('Failed to refresh token');
      });


    }, 60000)

}).error(() =>{
  Vue.$log.error("Authenticated Failed");
});


