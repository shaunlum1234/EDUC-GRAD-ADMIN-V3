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
  if(value){
    var date = new Date(value);
    date.toLocaleString('en-US', { timeZone: 'America/New_York' });
    return date.toString();  
  }else{
    return "";
  }
  
});
//Format simple Date
Vue.filter('formatSimpleDate', function(value) {
  if(value){
    var date = new Date(value);
    return date.toISOString().split('T')[0];
  }else{
    return "";
  }
});

Vue.filter('formatSetenceCase', function(value) {
  
  const result = value.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
});
//keycloak init options
let token = localStorage.getItem('jwt');
let refreshToken = localStorage.getItem('refresh');


let initOptions;
//THIS should be replaced with configmap env variables from each Openshift environment.

if(window.location.host == 'dev.grad.gov.bc.ca' || window.location.host == 'localhost:8080'){
  //localhost and dev.grad.gov.bc.ca keycloak
  if(window.location.search == "?login=noidir"){
    initOptions = {
      url: 'https://soam-tools.apps.silver.devops.gov.bc.ca/auth', realm: 'master', clientId: 'educ-grad-school-api-service', onLoad:'login-required'
    }
  }else{
    
    initOptions = {
      url: 'https://soam-tools.apps.silver.devops.gov.bc.ca/auth', realm: 'master', clientId: 'educ-grad-school-api-service', idpHint:'IDIR', onLoad:'check-sso'
    }
  }
}else{
  //test.grad.gov.bc.ca keycloak
  initOptions = {
    url: 'https://soam-dev.apps.silver.devops.gov.bc.ca/auth', realm: 'master', clientId: 'educ-grad-test-service', idpHint:'IDIR', onLoad:'check-sso'
  }
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad, token, refreshToken ,"checkLoginIframe" : false,  idpHint:'IDIR'}).success((auth) =>{
    
    if(auth) {
      store.dispatch("setToken",keycloak.token);
      store.dispatch("setRefreshToken",keycloak.refreshToken);
      store.dispatch("setPermissions",keycloak.tokenParsed.scope);
      store.dispatch("setUsername",keycloak.tokenParsed.name);
  
  
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
      setInterval(() =>{
        keycloak.updateToken(70).success((refreshed)=>{
          if (refreshed) {
            Vue.$log.debug('Token refreshed');
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
        
    } else {
      if(window.location.search == "?login=noidir"){
        keycloak.login();
      }else{
        keycloak.login({idpHint:'IDIR'});
      }   
      
    }
   

}).error(() =>{
  Vue.$log.error("Authenticated Failed");
});