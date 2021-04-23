<template>
  <div>
    <h1>School search</h1>
      <b-container class="my-4">
        <b-row align-v="stretch" class="row-eq-height">
          <b-col>
            <label class="float-left" for="city">City</label>
            <b-input class="" v-model="search.city" placeholder="" id="city"/>
          </b-col>
          <b-col>
            <label class="w-100" for="school name">School name</label>
            <b-input class="" v-model="search.schoolName" id="school name" placeholder=""/>
          </b-col>
          <b-col>
            <label class="w-100" for="district name">District name</label>
            <b-input class="" v-model="search.districtName" id="district name" placeholder=""/>
          </b-col>
          <b-col align-self="baseline">
            <label class="w-100 h-100">&nbsp;<br /></label>
            <b-button variant="primary" class="" type="submit" @click="searchSchools"> Search </b-button>
          </b-col>
        </b-row>
      </b-container>


 

              
              <!--<b-input class="float-left col-3 mx-1 my-3" v-model="search.city" placeholder="City"/>
              <b-input class="float-left col-3 mx-1 my-3" v-model="search.schoolName" placeholder="School name"/>
              <b-input class="float-left col-3 mx-1 my-3" v-model="search.districtName" placeholder="District name"/>
              <b-button variant="primary" class="float-left col-auto mx-1 my-3" type="submit" @click="searchSchools"> Search </b-button>-->
              <!-- <input type="submit" @click="searchCourseByCourseCode"> -->
              <table v-if="schools" class="table table-striped">
                <thead>
                  <tr>
                    <th>Mincode</th>
                    <th>School name</th>
                    <th>District name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="school in schools" :key="school.minCode">
                    <td>{{school.minCode}}</td>
                    <td>{{school.schoolName}}</td>
                    <td>{{school.districtName}}</td>
                  </tr>
                </tbody>
              </table>


  </div>
</template>

<script>
  import SchoolService from '@/services/SchoolService.js';
    import {
    mapGetters
  } from "vuex";
  export default {
    name: "schools",
    components: {

    },
    data() {
      return {
        schools: {},
        search: {
          city:"",
          schoolName: "",
          districtName: "",
        },
        show: false,
        displayMessage: null,
      };
    },
    computed: {
      ...mapGetters({
        token: "getToken"
      }),
    },
    created() {
      this.getAllSchools();
    },
    methods: {
      getAllSchools(){
        SchoolService.getAllSchools(this.token).then((res) => {
          this.schools = res.data;
        }).catch((error) => {

          // eslint-disable-next-line
          console.log('There was an error adding School information to Grad Status:' + error.response);
        });  
      },
      searchSchools(){
        this.schools = {};
        SchoolService.searchSchools(this.search, localStorage.getItem('jwt')).then((res) => {
          this.schools = res.data;
        }).catch((error) => {
          // eslint-disable-next-line
          console.log('There was an error adding School information to Grad Status:' + error.response);
        });  
      }
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