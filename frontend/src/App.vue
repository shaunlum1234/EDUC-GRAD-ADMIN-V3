<template>
  <div id="app">
    <!-- <Header></Header> -->
    <Bcheader class="bcheader" style="margin-bottom: 15px; text-transform: capitalize">
    <a v-b-toggle.sidebar-1>{{username}}</a>
    <b-sidebar id="sidebar-1" title="Permissions" shadow>
      <div class="px-3 py-2">
        <h1>{{username}}</h1>
        <p>
          {{permissions}}
        </p>
      </div>
    </b-sidebar>
        (<a @click="toggleRole">{{role}}</a>) | 
        <router-link
      to="/admin"
      class="text-white"
      id="dashboard-route"
    >Dashboard</router-link> | 
        <!-- <a
        @click="logout"
          v-bind:href="
          isDev?
            'https://soam-tools.apps.silver.devops.gov.bc.ca/auth/realms/master/protocol/openid-connect/logout?redirect_uri=' +
            host :'https://soam-dev.apps.silver.devops.gov.bc.ca/auth/realms/master/protocol/openid-connect/logout?redirect_uri=' +
            host
          "
          class="float-right text-white"
          >Logout</a>  -->


        <router-link
      to="/logout"
      class="text-white"
      id="logout-route"
    >Logout</router-link>
        </Bcheader>
    
    <div class="container">
        <transition
          name="fade"
        >
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import {
  mapGetters
} from "vuex";

import Bcheader from "@/components/BCHeader";
export default {
  components: {
    Bcheader
  },
  created() {
    if(this.role == "administrator"){
      this.$store.dispatch("setApplicationVariables");
    }
  },
  data() {
      return { 
        host: location.protocol + "//" + location.host,
      }
  },
  computed: {
    isDev(){
       if(window.location.host == "dev.grad.gov.bc.ca" || window.location.host == "localhost:8080"){
          return true;
       }else{
         return false;
       }
     },
    ...mapGetters({
      role: "getRoles",
      permissions: "getPermissions",
      username: "getUsername",
    }),
  },
  methods:{
    logout(){
      //delete siteminder session cookie
      document.cookie = 'SMSESSION=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    toggleRole(){
      if(this.role == "administrator"){
         this.$store.dispatch("setRoles","authenticated");
      }else if(this.role == "authenticated"){
         this.$store.dispatch("setRoles","debug");
      }else if(this.role == "debug"){
         this.$store.dispatch("setRoles","administrator");
      }
    }
  }
}


</script>

<style>

#app {
  background: #F9F9FB;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main-container{
  margin-top:130px;
}
.logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: "Lato";
}

.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}

ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav > li > a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  display: block;
  padding-bottom: 0.5em;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: .2;
}
.main-container{
  font-size: 14px;
  margin-top: 135px !important;
}
.container {
    max-width: 100% !important;
}
@media (min-width: 1300px){
  .container {
      max-width: 1300px !important;
  }

  
}
  .bcheader{
    height:115px;
  }
@media (max-width: 768px){
  .bcheader{
    height:75px;
  }
}
</style>
