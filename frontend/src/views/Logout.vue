<template>
  <div class="d-flex justify-content-center">
    <div class="card col-sm-12 col-md-4 col-lg-4">
      <div class="container pt-3 pb-4"> 
        <h1>Logout Successful</h1>
        <p>Please login using the Login Portal if you require access</p>
                     <a
     
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
