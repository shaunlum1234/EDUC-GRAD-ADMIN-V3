<template>
  <div class="d-flex justify-content-center">
    <b-row align="center" justify="center">
      <b-col xs="10" sm="10" md="8" lg="4" xl="3">
        <b-card class="session-expired-card">
          <b-card-title class="gov-header">
            <h4 id="logout_text">Logged Out</h4>
          </b-card-title>
          <b-card-text id="logout_descriptor">
            <b-row style="margin: .3rem">You have Logged out.</b-row>
            <a id="login-button" @click="clearStorage" :href="routes.LOGIN" class="ma-1" dark color='#003366'>Log In</a><span>again if you wish to continue.</span>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>  
</template>

<script>
import {Routes} from '@/utils/constants';

export default {
  name: "Logout",
  data() {
    return {
      routes: Routes
    };
  },
  created() {
    this.$store.commit('auth/setJwtToken');
  },
  methods: {
    clearStorage() {
      this.$store.commit('auth/setJwtToken');
    }
  }
}  
</script>
