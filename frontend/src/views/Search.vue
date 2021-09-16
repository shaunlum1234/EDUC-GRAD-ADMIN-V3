<template>
  <div>
    <h1>Admin Dashboard</h1>


<div>
      <b-card-group deck>
      <b-card class="text-center m-1">
        
        <b-card-text><div></div><i class="fas fa-times-circle text-danger h1"></i><h2>231/232 Last Run: Yesterday September 14, 2021 at 6:00pm</h2></b-card-text>
      </b-card>
            <b-card  class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h2>600/1000 Total number of students picked up for the batch grad run by date</h2></b-card-text>
      </b-card>
      <b-card  class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h2>600/1000 Total number of students picked up for the batch grad run by date</h2></b-card-text>
      </b-card>
      <b-card  class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h2>600/1000 Total number of students picked up for the batch grad run by date</h2></b-card-text>
      </b-card>            
                                 
    </b-card-group>
  <div class="mt-3">
  <h2>Programs</h2>
  
    <b-card-group deck>
      <b-card header="2018-EN" class="text-center m-1">
        <b-card-text><i class="fas fa-times-circle text-danger h1"></i><h3>231/232</h3></b-card-text>
      </b-card>
            <b-card header="2018-PF" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h3>175/175</h3></b-card-text>
      </b-card>
      <b-card header="1996" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h3>0</h3></b-card-text>
      </b-card>
      <b-card header="2004" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h3>81/81</h3></b-card-text>
      </b-card>
      <b-card header="2004-EN" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h3>100/100</h3></b-card-text>
      </b-card>                                      
    </b-card-group>
  </div>
  <div class="mt-3">
    <b-card-group deck>
      <b-card header="1986" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h3>232/232</h3></b-card-text>
      </b-card>
            <b-card header="2018-PF" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h3>175/175</h3></b-card-text>
      </b-card>
      <b-card header="1950" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h3>0</h3></b-card-text>
      </b-card>
      <b-card header="SCCP" class="text-center m-1">
        <b-card-text><i class="fas fa-check-circle text-success h1"></i><h3>81/81</h3></b-card-text>
      </b-card>
      <b-card header="2004-PF" class="text-center m-1">
        <b-card-text><i class="fas fa-times-circle text-danger h1"></i><h3>100/200</h3></b-card-text>
      </b-card> 
    </b-card-group>
  </div>
  <div>
      <!-- For each job:

      Time
      Date
      Who ran it
      Status (run, cancelled, in queue, running, failed)
      Expected  (eg. 1000) - How many students have the process flag set to Y (How many we are expecting to Graduation)

      400 did not run in the job (technical problem)
      Processed (600/1000) - Total number of students picked up for the batch grad run by date – i.e.

      Success: Number of graduated students and changes to students
      Failed records (any error message [change, graduation, certificate production etc])
      Once run then the flag goes from Y to N – if there is a failure at any point the flag stays at Y -->
  </div>

</div>
<hr/>
  <h2>Graduation Batch Runs</h2>
  <div class="col-7 float-left">
    <b-table bordered :items="items" :fields="fields" :tbody-tr-class="rowClass"></b-table>
  </div>
    <!-- <SearchForm v-on:searchResults="displaySearchResults" searchAPI="searchSchools" :searchAPIFields="searchAPIFields"></SearchForm>
    <DisplayTable v-if="searchResults" :items="searchResults" :fields="schoolFields" title="schoolsearch" ></DisplayTable> -->
    <div class="col-5 float-left">
      <b-table bordered :items="items" :fields="fields" :tbody-tr-class="rowClass"></b-table>
    </div>
    <!-- <SearchForm v-on:searchResults="displaySearchResults" searchAPI="searchSchools" :searchAPIFields="searchAPIFields"></SearchForm>
    <DisplayTable v-if="searchResults" :items="searchResults" :fields="schoolFields" title="schoolsearch" ></DisplayTable> -->
   </div>   
</template>

<script>
// @ is an alias to /src
//import SearchForm from "@/components/SearchForm.vue"
//import { store } from "@/store.js";
  import {
    mapGetters
  } from "vuex";
export default {
  name: "test",
  data() {
    return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', status: 'awesome' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
        ],
        searchResults: [],
        searchAPIFields: {
          schoolName:{
            value:"",
            contains:false
          },
          mincode:{
            value:"",
            contains:false
          }
        },
        schoolFields: [
          {
            key: 'more',
            label: '',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'minCode',
            label: 'Mincode',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'schoolName',
            label: 'School Name',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'districtName',
            label: 'District',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'openFlag',
            label: 'Open',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'Schl Org',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'Indep Type',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'independentAffiliation',
            label: 'Indep Affil',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'transcriptEligibility',
            label: 'Tran Elig',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'certificateEligibility',
            label: 'Cert Elig',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'Marks Display',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'Append Trans',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'signatureDistrict',
            label: 'Sig Distno',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'New School Code',
            sortable: true,
            class: 'text-center'
          },
        ],        
    };
    
  },
  created() {
  
  },
  methods: {
    displaySearchResults(value){
      
      this.searchResults = value
    }
  },
  computed:{
    results(){
      return this.searchResults;
    },
    ...mapGetters({
      courses: "getStudentCourses",
      gradStatusCourses: "gradStatusCourses",
      studentGradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      gradStatusPendingUpdates: "getHasGradStatusPendingUpdates"
    }),
  },
  components: {
   
  },
};
</script>
<style scoped>
.alert,
.card,
.btn.btn-primary {
  position: inherit;
}
h6 {
  font-size: 1.5rem;
}
.find {
  padding-bottom: 1rem;
}
</style>
