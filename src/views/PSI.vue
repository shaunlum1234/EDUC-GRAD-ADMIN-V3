<template>
  <div>
    <h1>PSI</h1>
              <b-table striped hover :items="psi"></b-table>


  </div>
</template>

<script>
  import PSIService from '@/services/PSIService.js';
    import {
    mapGetters
  } from "vuex";
  export default {
    name: "psi",
    components: {

    },
    data() {
      return {
        psi: {},
        psiFields: ["psiName","address1","city","provinceCode","countryCode","attentionName","transmissionMode"]
      }
    },

    computed: {
      ...mapGetters({
        token: "getToken"
      }),
    },
    created() {
      PSIService.getPSI(this.token).then((res) => {
          this.psi = res.data;
        }).catch((error) => {
          // eslint-disable-next-line no-use-before-define
          console.log('There was an error adding psi information:' + error.response);
        });  
    },
    methods: {
      
    }
  };
</script>

<style scoped>
  .close-record {
    float: right;
  }

  .tab-loading {
    color: green !important;
  }

  .profile-name {
    padding-bottom: 10px;
  }
</style>