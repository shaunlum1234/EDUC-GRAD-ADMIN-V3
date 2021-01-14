<template>
  <div class="d-flex justify-content-center">
    <div class="card col-sm-12 col-md-4 col-lg-4">
      <div class="container pt-3 pb-4"> 
        <h1>Logout Success</h1>
        <p>Please </p>
        <button type="submit" class="btn btn-primary btn-lg btn-block">
         <a href="https://soam-tools.apps.silver.devops.gov.bc.ca/auth/realms/master/protocol/openid-connect/auth?client_id=educ-grad-school-api-service&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&state=5b910d89-8168-4062-9f2f-a7f25bc75a2e&response_mode=fragment&response_type=code&scope=openid&nonce=7bb97e48-c80e-4b32-a656-3565e5d079b0">Login</a>
        </button>  
      </div>  
    </div>
  </div>  
</template>

<script>

export default {
  name: "Logout",
  data() {},
  created() {},
  computed: {},
  methods: {}
}  
</script>

<style scoped>
</style>
