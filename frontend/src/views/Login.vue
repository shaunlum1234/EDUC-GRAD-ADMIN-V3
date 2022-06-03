<template>
  <div class="d-flex justify-content-center">
    <div class="card col-sm-12 col-md-4 col-lg-4">
      <div class="container pt-3 pb-4"> 
        <b-card>
          <b-card-title class="gov-header">
            <h4 id="login_text">Log In</h4>
          </b-card-title>
          <b-card-text id="login_descriptor">
            To access the Graduation Administration Application, you must have a valid IDIR.
          </b-card-text>
          <b-card-body>
            <b-row >
              <b-button type="button" class="btn btn-primary btn-lg btn-block" @click="clearStorage" :href="routes.LOGIN">
                Login
              </b-button>
            </b-row>
          </b-card-body>
        </b-card>
      </div>  
    </div>
  </div>  
</template>

<script>
import { Routes } from '@/utils/constants';
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      token: "",
      routes: Routes
    }
  },
  computed: {
  ...mapGetters({
      getToken: "getToken",
    }),
  },
  methods: {
    clearStorage(){
      // e.preventDefault()
      // if (this.password.length > 0) {
      //   LoginService.handleSubmit(this.id, this.password).then((response) => {
      //       this.$store.dispatch('setToken', response.data.access_token);
      //   });
      // }
      this.$store.dispatch('setToken', null);
    }
  }
}
</script>
