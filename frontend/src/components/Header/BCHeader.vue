<template>
  <div>
    <header>
      <div class="container">
        <div class="banner">
          <a class="navbar-brand" href="https://www2.gov.bc.ca">
            <img
              class="img-fluid d-md-block"
              src="../../assets/images/bcid-logo-rev-en.svg"
              width="185"
              height="45"
              alt="B.C. Government Logo"
            />
          </a>
          <h1>Graduation Records and Achievement Data</h1>
        </div>
        <div class="float-right user-profile">
          <slot></slot>
        </div>
      </div>
    </header>

    <b-navbar
      toggleable
      aria-label="Menu"
      class="navbar navbar-expand-lg navbar-dark burgernav"
    >
      <b-navbar-toggle target="navbarSmallScreen"></b-navbar-toggle>
    </b-navbar>
    <b-collapse id="navbarSmallScreen" is-nav>
      <b-navbar-nav class="mr-auto">
        <b-nav-item>
          <router-link to="/">Student Search</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/programs">Programs</router-link>
        </b-nav-item>
        <b-nav-item
          ><router-link to="/courses">Courses</router-link></b-nav-item
        >
        <b-nav-item
          ><router-link to="/assessment">Assessments</router-link></b-nav-item
        >
        <b-nav-item
          ><router-link to="/schools">Schools</router-link></b-nav-item
        >
        <b-nav-item><router-link to="/psi">PSI</router-link></b-nav-item>
        <b-nav-item><router-link to="/codes">Codes</router-link></b-nav-item>
        <b-nav-item
          ><router-link to="/school-reports"
            >School Reports</router-link
          ></b-nav-item
        >
        <b-nav-item
          ><router-link to="/batch-processing"
            >Batch Processing</router-link
          ></b-nav-item
        >
        <b-nav-item class="user-burgernav">
          <div><slot></slot></div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <nav class="navigation-main" id="navbar" aria-label="aria-label">
      <div class="container">
        <ul>
          <li>
            <router-link to="/" id="select-student-route"
              >Student Search</router-link
            >
          </li>
          <li>
            <router-link to="/programs" id="programs-route"
              >Programs</router-link
            >
          </li>
          <li>
            <router-link to="/courses" id="courses-route">Courses</router-link>
          </li>
          <li>
            <router-link to="/assessments" id="assessments-route"
              >Assessments</router-link
            >
          </li>
          <li>
            <router-link to="/schools" id="schools-route">Schools</router-link>
          </li>
          <li><router-link to="/psi" id="psi-route">PSI</router-link></li>
          <li><router-link to="/codes" id="codes-route">Codes</router-link></li>
          <li>
            <router-link to="/school-reports">School Reports</router-link>
          </li>
          <li>
            <router-link to="/batch-processing">Batch Processing</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import sharedMethods from "@/sharedMethods";
export default {
  data() {
    return {
      pen: "",
      searchLoading: false,
      penInput: "",
      studentSearchResults: [],
      host: location.protocol + "//" + location.host,
      studentUrlID: "",
    };
  },
  created() {
    this.loadStudent = sharedMethods.loadStudent;
    this.showNotification = sharedMethods.showNotification;
  },
  computed: {
    ...mapGetters({
      //profile: "getStudentProfile",
    }),
  },
  methods: {
    logout() {
      if (localStorage.getItem("jwt") != null) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("refresh");
      }
      this.$store.commit("unsetStudent");
      this.$store.commit("logout");
      this.$router.push("/logout");
    },
  },
};
</script>
<style scoped>
.navbar,
.nav {
  z-index: 100;
}
.navbar-brand {
  padding-top: 0.5rem;
  padding-left: 65px;
}
#navbar {
  z-index: 100;
}
header {
  z-index: 100;
  background-color: var(--primary-nav);
  border-bottom: 2px solid var(--bcgold);
  padding: 0 30px 0 30px;
  color: #fff;
  display: flex;
  height: 65px;
  top: 0;
  position: fixed;
  width: 100%;
  -webkit-box-shadow: 0 6px 8px -4px #b3b1b3;
  -moz-box-shadow: 0 6px 8px -4px #b3b1b3;
  box-shadow: 0 6px 8px -4px #b3b1b3;
}

header h1 {
  font-family: "BC Sans", "Noto Sans", Verdana, Arial, sans-serif;
  font-weight: normal; /* 400 */
  margin: 5px 5px 0 18px;
  text-transform: none;
  display: none;
  /* visibility: hidden; */
}

header .banner {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 10px 0 0;
}

header .other {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

header a [class^="fas fa-"] {
  color: white;
  font-size: 1.4em;
  font-style: bold;
  line-height: 1;
  padding: 5px;
  -webkit-font-smoothing: antialiased;
}

header .nav-btn {
  display: block;
  width: auto;
  margin: 0 0 0 auto;
  cursor: pointer;
}

.user-profile {
  margin-top: 0px;
  display: none;
}

.navigation-main {
  display: none;
  position: fixed;
  top: 85px;
  color: #fcba19;
  background-color: #38598a;
  width: 100%;
  -webkit-box-shadow: 0 6px 8px -4px #b3b1b3;
  -moz-box-shadow: 0 6px 8px -4px #b3b1b3;
  box-shadow: 0 6px 8px -4px #b3b1b3;
  padding: 10px 0 10px 0;
}

.navigation-main ul {
  display: flex;
  flex-direction: column;
  margin: 0;
  color: #fff;
  list-style: none;
  margin-left: -25px;
}

.navigation-main ul li {
  margin: 5px 0;
}

.navigation-main ul li a {
  display: flex;
  font-size: 0.813em;
  font-weight: normal;
  color: #fff;
  padding: 0 14px 0 14px;
  text-decoration: none;
}

.navigation-main ul li a:hover {
  text-decoration: underline;
}

.navigation-main ul .active {
  text-decoration: underline;
  font-weight: bold;
}

.burgernav {
  position: fixed;
}
#navbarSmallScreen {
  z-index: 100;
  /* padding: 10px 0; */
  background-color: #38598a;
  color: white;
  top: 65px;
  position: fixed;
  width: 100%;
  -webkit-box-shadow: 0 6px 8px -4px #b3b1b3;
  -moz-box-shadow: 0 6px 8px -4px #b3b1b3;
  box-shadow: 0 6px 8px -4px #b3b1b3;
}
#navbarSmallScreen a {
  color: white;
  margin-left: 10px;
}
.user-burgernav {
  padding: 5px 0 5px 15px;
  background-color: var(--primary-nav);
  border-top: 2px solid var(--bcgold);
}

:focus {
  outline: 4px solid #3b99fc;
  outline-offset: 1px;
}

/*
    These are sample media queries only. Media queries are quite subjective
    but, in general, should be made for the three different classes of screen
    size: phone, tablet, full. 
  */

@media screen and (min-width: 774px) {
  header {
    height: 85px;
  }
  header h1 {
    display: inline;
  }
  .top-search {
    position: absolute;
    top: -78px;
    right: 20px;
  }
  .burgernav {
    display: none;
  }
  .navigation-main {
    display: block;
    margin-bottom: 100px; /* do I need this? */
  }
  .navigation-main ul {
    flex-direction: row;
  }
  .navigation-main ul li {
    margin: 0;
  }
  .navigation-main ul li a {
    border-right: 1px solid #9b9b9b;
  }
  .navbar-brand {
    padding-left: 0;
  }
  .user-profile {
    display: block;
  }
  /* removes vertical line on last item on nav */
  #profile-route {
    border-right: none;
  }
}

@media screen and (min-width: 774px) and (max-width: 1360px) {
  header h1 {
    font-size: calc(5px + 2.05vw);
  }
  .navigation-main ul li a {
    padding: 0 calc(2px + 0.85vw) 0 calc(2px + 0.85vw);
    font-size: calc(8.5px + 0.35vw);
  }
}

@media screen and (min-width: 1200px) {
  header {
    height: 65px;
  }
  .navigation-main {
    top: 65px;
  }
  .top-search {
    position: absolute;
    top: 1px;
    right: 20px;
  }
  .user-profile {
    margin-top: -20px;
  }
}
</style>
