<script setup>
import { RouterLink, RouterView } from "vue-router";
import StudentService from "./services/StudentService.js";
import HttpStatus from "http-status-codes";
</script>

<template>
  <div>
    <BCHeader class="bcheader"></BCHeader>
    <div class="container main-content">
      <RouterView />
    </div>
    <BCFooter class="bc-footer"></BCFooter>
  </div>
</template>
<script>
import BCFooter from "./components/BCFooter.vue";
import BCHeader from "./components/Header/BCHeader.vue";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
export default {
  name: "app",
  components: {
    BCFooter,
    BCHeader,
  },
  computed: {
    ...mapGetters("auth", [
      "roles",
      "isAuthenticated",
      "loginError",
      "isLoading",
      "userInfo",
    ]),
    ...mapGetters("app", ["getProgramOptions"]),
    ...mapState("app", ["pageTitle"]),
    dataReady: function () {
      return this.userInfo;
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("auth", ["setLoading"]),
    ...mapActions("auth", ["getJwtToken", "getUserInfo", "logout"]),
  },

  async created() {
    this.setLoading(true);
    this.getJwtToken()
      .then(() => Promise.all([this.getUserInfo()]))
      .catch((e) => {
        console.log(e);
        if (!e.response || e.response.status !== HttpStatus.UNAUTHORIZED) {
          this.logout();
          this.$router.replace({
            name: "error",
            query: { message: `500_${e.data || "ServerError"}` },
          });
        }
      })
      .finally(() => {
        this.setLoading(false);
        console.log(this.getUserInfo());
      });
  },
};
</script>
<style>
#app {
  background: #f9f9fb;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bc-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 58px; /* Height of the footer */
  z-index: 100;
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
  transition: opacity 0.5s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.2;
}
.container {
  max-width: 100% !important;
}
.main-content {
  padding-bottom: 60px;
}
@media (min-width: 1300px) {
  .container {
    /* max-width: 1300px !important; */
    max-width: 100%;
    /* padding-right: 50px !important;
      padding-left: 50px !important; */
  }
}
.bcheader {
  height: 115px;
}
@media (max-width: 768px) {
  .bcheader {
    height: 75px;
  }
}
</style>
