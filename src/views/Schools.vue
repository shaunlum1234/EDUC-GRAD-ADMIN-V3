<template>
  <div>
    <h1>School Search</h1>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="School Search" active>
            <b-card-text>
              <input v-model="search.city" placeholder="City">
              <input v-model="search.schoolName" placeholder="School Name">
              <input v-model="search.districtName" placeholder="District Name">
              <input type="submit" @click="searchSchools">
              <!-- <input type="submit" @click="searchCourseByCourseCode"> -->
              <table v-if="schools" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Mincode</th>
                    <th>School Name</th>
                    <th>District Name</th>
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
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

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

    },
    methods: {
      getAllSchools(){
        SchoolService.getAllSchools(this.token).then((res) => {
          this.schools = res.data;
        }).catch((error) => {
          // eslint-disable-next-line no-use-before-define
          console.log('There was an error adding School information to Grad Status:' + error.response);
        });  
      },
      searchSchools(){
        this.schools = {};
        SchoolService.searchSchools(this.search, localStorage.getItem('jwt')).then((res) => {
          this.schools = res.data;
        }).catch((error) => {
          // eslint-disable-next-line no-use-before-define
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