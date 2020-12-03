<template>
  <div id="app">
    <!-- <Header></Header> -->
    <Bcheader style="margin-bottom: 15px;"></Bcheader>
    <div class="main-container">
        <transition
          name="fade"
        >
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import Bcheader from "@/components/BCHeader";
export default {
  components: {
    Bcheader
  }
};
</script>
<style lang="css">
@import "/node_modules/@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
</style>

<style>
#app {
  background: #F9F9FB;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main-container{
  margin-top:130px;
}
.logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: "Lato";
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
  transition: opacity .5s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: .2;
}
.main-container{
  font-size: 14px;
}

</style>
