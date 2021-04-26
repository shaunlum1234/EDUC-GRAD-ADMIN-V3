<template>
  <div class="">
    <b-spinner v-if="!graduationSpecialProgramRules && !graduationSpecialProgramRules.length" label="Loading"
      >Loading</b-spinner
    >
    <div v-if="!graduationSpecialProgramRules && !graduationSpecialProgramRules.length"><h2>Loading</h2></div>
   <DisplayTable v-bind:items="graduationSpecialProgramRules" title="Program" id="programCode"
             showFilter=true></DisplayTable>
    
    
  </div>
</template>

<script>

import ProgramManagementService from "@/services/ProgramManagementService.js";
import DisplayTable from "@/components/DisplayTable";
import {
    mapGetters
} from "vuex";
export default {
  name: "GraduationSpecialProgramRules",
  props: {},
  computed: {...mapGetters({
      token: "getToken"
  })},
  components:{
     DisplayTable: DisplayTable,
  },
  data: function () {
    return {
      opened: [],
      graduationSpecialProgramRules:[],
    };
  },
  created() {

    ProgramManagementService.getSpecialProgramRules(this.$route.params.programCode,this.$route.params.specialProgramCode, this.token)
      .then((response) => {
        this.graduationSpecialProgramRules = response.data;
        //('Graduation Special Program Rules: ' + this.graduationSpecialProgramRules);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log('There was an error:' + error.response);
    });
  },
  methods: {
  },
};
</script>

<style>
.table th {
  border-bottom: 2px solid #38598a !important;
}
</style>