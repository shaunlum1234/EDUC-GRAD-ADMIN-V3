<template>
  <div id="app">
    <Bcheader class="bcheader" style="margin-bottom: 15px; text-transform: capitalize">
    <a v-b-toggle.sidebar-1>username {{ isAuthenticated }} </a>
    <b-sidebar id="sidebar-1" title="Permissions" shadow>
      <div class="px-3 py-2">
 
      </div>
    </b-sidebar>
        (<a>role</a>) | 
<!--        <router-link-->
<!--      to="/logout"-->
<!--      class="text-white"-->
<!--      id="logout-route"-->
<!--    >Logout</router-link>-->
        <a href='#'>Logout</a>
        </Bcheader>
    
    <div class="container" style="height: 100%;">
        <transition
          name="fade"
        >

        <router-view />

       
      </transition>
    </div>
    <BCFooter></BCFooter>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters,mapState } from 'vuex';

import Bcheader from "@/components/BCHeader";
import BCFooter from "@/components/BCFooter";
import { Routes } from '@/utils/constants';
export default {
  components: {
    Bcheader,
    BCFooter
  },
  data() {
      return {
        routes: Routes,
        host: location.protocol + "//" + location.host,
      }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'loginError', 'isLoading', 'userInfo']),
    ...mapState('app', ['pageTitle']),
  },
  methods:{
      ...mapMutations('auth', ['setLoading']),
      ...mapActions('auth', ['getJwtToken', 'getUserInfo', 'logout']),
  },
  async created() {
    this.setLoading(true);
    this.getJwtToken().then(() =>
      Promise.all([this.getUserInfo()]).then(function(){
      })
    ).catch(e => {
      if(! e.response) {
        this.logout();
        this.$router.replace({name: 'error', query: { message: `500_${e.data || 'ServerError'}` } });
      }
    
    }).finally(() => {
      this.setLoading(false);
    });
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
  font-size: 14px;
  margin-top: 135px !important;
}
.logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
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
.container {
    max-width: 100% !important;
}
@media (min-width: 1300px){
  .container {
      /* max-width: 1300px !important; */
      max-width: 100%;
      /* padding-right: 50px !important;
      padding-left: 50px !important; */
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
