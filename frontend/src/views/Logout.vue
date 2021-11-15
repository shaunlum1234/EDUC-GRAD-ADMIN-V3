<template>
  <div class="d-flex justify-content-center">
    <div class="card col-sm-12 col-md-4 col-lg-4">
      <div class="container pt-3 pb-4"> 
        <h1>Logout Successful</h1>
        <p>Please login using the Login Portal if you require access</p>
                     <a
              v-bind:href="
                'https://soam-tools.apps.silver.devops.gov.bc.ca/auth/realms/master/protocol/openid-connect/auth?client_id=educ-grad-school-api-service&redirect_uri=' +
                host + '&kc_idp_hint=IDIR'
              "
              class="nav-link"
              >Login</a
            >
      </div>  
    </div>
  </div>  
</template>

<script>

export default {
  name: "Logout",
  data() {
    return {
      host: location.protocol + "//" + location.host
    }

  },
  created() {},
  computed: {},
  methods: {}
  
}  
</script>

<style scoped>
</style>
