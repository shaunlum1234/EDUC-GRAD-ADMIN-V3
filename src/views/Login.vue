<template>

  <div>
      {{ token }}
  </div>
</template>
<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
//import LoginService from "@/services/LoginService.js";
export default {
  name: "Login",
  data() {
    return {
        token: "";
      }
    };
  },
  created() {
      this.token = LoginService.login();
  },
  components: {},
  },
  methods: {
  },
};
</script>
<style scoped>
</style>
