<script setup>
import { RouterLink, RouterView } from 'vue-router'
import StudentService from './services/StudentService.js'
import HttpStatus from 'http-status-codes';
</script>

<template>
<div class="container">
  <header>
    <div class="wrapper">
     
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/assessments">Assessments</RouterLink>
        <a v-if="userInfo" href="/api/auth/logout">Logout</a>
      </nav>
       <strong>LOGGED IN USER DETAILS:</strong> {{ userInfo }}
       <br/><br/>

    </div>
  </header>
  <RouterView />
  </div>
  

  
</template>
<script>
import { mapActions, mapMutations, mapGetters,mapState } from 'vuex';
export default {
  name: 'app',
  components: {

  },
   computed: {

    ...mapGetters('auth', ['roles','isAuthenticated', 'loginError', 'isLoading', 'userInfo']),
    ...mapGetters('app', ['getProgramOptions']),
    ...mapState('app', ['pageTitle']),
    dataReady: function() {
      return this.userInfo;
    },   
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations('auth', ['setLoading']),
    ...mapActions('auth', ['getJwtToken', 'getUserInfo', 'logout']),
  },
  
  async created() {
    this.setLoading(true);
    this.getJwtToken().then(() =>
      Promise.all([this.getUserInfo()])
    ).catch(e => {
      console.log(e)
      if(! e.response || e.response.status !== HttpStatus.UNAUTHORIZED) {
        this.logout();
        this.$router.replace({name: 'error', query: { message: `500_${e.data || 'ServerError'}` } });
      }
    }).finally(() => {
      this.setLoading(false);
      console.log(this.getUserInfo())
    });
  }
};
</script>
<style scoped>
</style>
