<template>
  <div>
    <h1>Search Results</h1>
    <SearchForm v-on:searchResults="displaySearchResults" searchAPI="searchSchools" :searchAPIFields="searchAPIFields"></SearchForm>
    <DisplayTable v-if="searchResults" :items="searchResults" :fields="schoolFields" title="schoolsearch" ></DisplayTable>
   </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from "@/components/SearchForm.vue"
import DisplayTable from "@/components/DisplayTable.vue"
//import { store } from "@/store.js";
  import {
    mapGetters
  } from "vuex";
export default {
  name: "test",
  data() {
    return {
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
    SearchForm: SearchForm,
    DisplayTable: DisplayTable

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
