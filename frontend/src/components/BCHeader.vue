<template>
  <div>
    <img
      class="min-nav d-md-none"
      src="../assets/images/bcid-logo-rev-en.svg"
      width="200"
      height="44"
      alt="B.C. Government Logo"
    />
    <header>
      <div class="container">
        <div class="banner">
          <a class="navbar-brand" href="https://www2.gov.bc.ca">
            <img
              class="img-fluid d-none d-md-block"
              src="../assets/images/bcid-logo-rev-en.svg"
              width="181"
              height="44"
              alt="B.C. Government Logo"
            />
          </a>
          <h1>Graduation Records and Achievement Data</h1>
        </div>
         <div class="float-right" style="margin-top: -20px"><slot></slot></div>
      </div>
    </header>
    <nav aria-label="Menu" class="navbar navbar-expand-lg navbar-dark bg-primary-nav burgernav">
      <button
        class="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li>
            <router-link to="/">Select Student</router-link>
          </li>
          <li>
            <router-link to="/admin-graduation-programs">Programs</router-link>
          </li>
          <li><router-link to="/courses">Courses</router-link></li>
          <li><router-link to="/assessments">Assessments</router-link></li>
          <li><router-link to="/schools">Schools</router-link></li>
          <li><router-link to="/psi">PSI</router-link></li>
          <li><router-link to="/codes">Codes</router-link></li>
          <li><router-link to="/admin">Dashboard</router-link></li>
        </ul>
      </div>
    </nav>
    <nav class="navigation-main" id="navbar" aria-label="aria-label">
      <div class="container">
        <ul>
          <li>
            <router-link to="/" id="select-student-route">Select Student</router-link>
          </li>
          <li>
            <router-link to="/admin-graduation-programs" id="programs-route"
              >Programs</router-link
            >
          </li>
          <li><router-link to="/courses" id="courses-route">Courses</router-link></li>
          <li><router-link to="/assessments" id="assessments-route">Assessments</router-link></li>
          <li><router-link to="/schools" id="schools-route">Schools</router-link></li>
          <li><router-link to="/psi" id="psi-route">PSI</router-link></li>
          <li><router-link to="/codes" id="codes-route">Codes</router-link></li>
           <li><router-link to="/admin">Dashboard</router-link></li>
          <li v-if="!profile.pen" class="disabled"><a id="profile-route" class="text-decoration-none text-disabled" :disabled=true>Profile (Student not loaded)</a></li>
          <li v-else><router-link :to="`/student-profile/${this.profile.pen}/${this.profile.studentID}`" id="profile-route">Profile ({{profile.pen? profile.pen : 'Student not loaded'}})</router-link></li>

          <li>
             <form v-on:submit.prevent>
              <div class="form-group top-search">
                <!-- Pen Input -->
                <div>                
                    <b-form-input maxlength=9 minlength=9 size="sm" id="search-by-pen-header" type="search" v-model="penInput" placeholder="PEN"
                      ref="penSearch" v-on:keyup="keyHandler" class="w-75 float-left m-1">
                    </b-form-input>
                    <button v-if="!searchLoading" v-on:click="findStudentByPen" class="btn btn-primary float-left">
                      <i class="fas fa-search" aria-hidden="true"></i>
                    </button>
                    <button v-if="searchLoading" class="btn btn-success ml-2 float-left">
                      <i class="fas fa-search" aria-hidden="true"></i>
                    </button>  
                    
                </div>
              </div>
            </form>
          </li>
        </ul>     
      </div>
    </nav>
    
  </div>
</template>

<script>

import StudentService from "@/services/StudentService.js";
import sharedMethods from '../sharedMethods';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pen: "",
      searchLoading:false,
      penInput: "",
      studentSearchResults: [],
      host: location.protocol + "//" + location.host,
    };
  },
  created() {
    this.loadStudent = sharedMethods.loadStudent;
    this.showNotification = sharedMethods.showNotification    
  },
   computed: {
    ...mapGetters({
      token: "getToken",
      roles: "getRoles",
      profile: "getStudentProfile"
    }),
  },
  methods: {
    logout() {
        if (localStorage.getItem('jwt') != null){

            localStorage.removeItem('jwt');
            localStorage.removeItem('refresh');
        }         
      this.$store.commit("unsetStudent");
      this.$store.commit("logout");
      this.$router.push("/logout");
    },
    selectStudent() {
      this.$router.push("/");
    },
    findStudentByPen: function() {
      if (this.penInput) {
        this.searchLoading = true;
        this.studentSearchResults = [];
        StudentService.getStudentByPen(this.penInput, this.token)
        .then((response) => {
          if (response.data) {
            this.loadStudent(response.data);
            this.searchLoading = false;
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log('BCHeader: ' + error);
          this.searchLoading = false;
          this.showNotification("danger", "Student cannot be found on the GRAD or PEN database");
        });
      }
    },
    keyHandler: function (e) {
      if (e.keyCode === 13) {
        this.studentSearchResults = [];
        if (this.penInput) {
          this.findStudentByPen();
        }
      }
    }
  }
}  
</script>
<style scoped>
.navbar,
.nav {
  z-index: 100;
}
#navbar {
  z-index: 100;
}
header {
  z-index: 100;
  background-color: #036;
  border-bottom: 2px solid #fcba19;
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
  visibility: hidden;
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

.navigation-main {
  display: none;
  position: fixed;
  top: 65px;
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
  padding: 0 15px 0 15px;
  text-decoration: none;
}

.navigation-main ul li a:hover {
  text-decoration: underline;
}

.navigation-main ul .active {
  text-decoration: underline;
  font-weight: bold;
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

@media screen and (min-width: 768px) {
  .top-search{
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .navigation-main {
    display: block;
    margin-bottom: 100px;
  }
  .burgernav {
    display: none;
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

  header .nav-btn {
    display: none;
    width: auto;
    margin: 0 0 0 auto;
    cursor: pointer;
  }
}
/* @media screen and (min-width: 768px) and (max-width: 1330px){
  .top-search{
    right: -99px;
  }
} */
@media screen and (min-width: 768px) and (max-width: 899px) {
  header h1 {
    font-size: calc(7px + 2.2vw);
    visibility: visible;
  }
  .top-search{
    position: inherit;
  }
}

@media screen and (min-width: 900px) {
  header h1 {
    font-size: 2em;
    visibility: visible;
  }
}
.min-nav {
  position: fixed;
  left: 80px;
  z-index: 110;
  top: 5px;
}
.burgernav {
  position: fixed;
}
</style>
