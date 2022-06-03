<template>
  <b-container class="blue-back" fluid>
      <b-row align="center" justify="center">
        <b-col xs="4" sm="4" md="4" lg="4" xl="4">
          <b-card class="error-card">
            <b-card-title class="gov-header">
              <h4 id="error_text">System Error</h4>
            </b-card-title>
            <b-card-text id="error_message">
              You have encountered a System Error. Close your Web browser, open a new session, then try again.
            </b-card-text>
          </b-card>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
};
</script>

<style scoped>
  .v-icon{
    padding-left: 10px;
  }
  .error-card{
    margin-top: 5%;
    min-width: 30%;
  }
  .gov-header{
    color: #003366;
  }
  .v-btn{
    text-transform: none
  }
  .blue-back{
    background-color: aliceblue;
    height: 100%;
  }
  .detail-text{
    color: rgba(0, 0, 0, 0.54);
    font-size: 0.875rem;
  }
</style>
