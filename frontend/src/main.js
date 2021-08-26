import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';
import VueLogger from 'vuejs-logger';
import Vuelidate from 'vuelidate';
import * as Keycloak from 'keycloak-js';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import { ToastPlugin } from 'bootstrap-vue';
import qs from 'query-string';
import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import store from './store/index.js';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { BootstrapVueIcons } from 'bootstrap-vue';

//import 'bootstrap/dist/css/bootstrap.css'
import '@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '../src/assets/css/bcgov.css';
import '../src/assets/css/global.css';


// Install BootstrapVue

//import store from './store';
import SmartTable from 'vuejs-smart-table';
//require('../node_modules/@mygovbc-bootstrap-theme/dist/mygovbc-bootstrap-theme.min.css')
Vue.use(Vuelidate);
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
Vue.use(SmartTable);
Vue.use(qs);
Vue.use(VueFilterDateParse);
Vue.use(VueFilterDateFormat);
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(ToastPlugin);


//Date time filter
Vue.filter('formatTime', function(value) {
  var date = new Date(value);
  date.toLocaleString('en-US', { timeZone: 'America/New_York' });
  return date.toString();
});
//Format simple Date
Vue.filter('formatSimpleDate', function(value) {
  var date = new Date(value);
  return date.toISOString().split('T')[0];
});


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
    store.dispatch("setToken",keycloak.token);
    store.dispatch("setRefreshToken",keycloak.refreshToken);
    store.dispatch("setPermissions",keycloak.tokenParsed.scope);
    store.dispatch("setUsername",keycloak.tokenParsed.preferred_username);


//    fruits.includes("Mango");
    if(keycloak.tokenParsed.realm_access.roles.includes("GRAD_SYSTEM_COORDINATOR")){
      store.dispatch("setRoles","administrator");    
    }else{
      store.dispatch("setRoles","authenticated");    
    }
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');


    // TODO: Maybe dont store the token in the localstore, rather use it direct from the keycloak.token object
    //localStorage.setItem("jwt", keycloak.token);
    //localStorage.setItem("refresh", keycloak.refreshToken);

    //console.log(localStorage.getItem("jwt"));
//    console.log(keycloak.token);
    setInterval(() =>{
      keycloak.updateToken(70).success((refreshed)=>{
        if (refreshed) {
          Vue.$log.debug('Token refreshed');
          // console.log(refreshed);
          // console.log(refreshed.token);
          // console.log(refreshed.refreshToken);
          // console.log("NEW TOKEN" + keycloak.token);
          // console.log("REFRESH TOKEN" + keycloak.refreshToken);
          store.dispatch("setToken",keycloak.token);
          store.dispatch("setRefreshToken",keycloak.refreshToken);
          store.dispatch("setPermissions",keycloak.refreshToken.scope);
          store.dispatch("setUsername",keycloak.refreshToken.preferred_username);
          
          
          
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

