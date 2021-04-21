<template>
<div>
  <h1>Rule {{selectedRule}}</h1>
  <div v-for="item in graduationProgramRuleCourses" :key="item.requirementName">
    {{item.ruleCode}}
    {{item.requirementName}}
    {{item.programCode}}
    {{item.specialProgramCode}}
  </div>

</div>
</template>

<script>
//import GradeService from "@/services/GradeService.js";
import ProgramManagementService from "@/services/ProgramManagementService.js";
import {
    mapGetters
} from "vuex";
export default {
  name: "GraduationProgramCourses",
  props: {    
  },
  components: {

  },


  
  computed: {...mapGetters({
    token: "getToken", 
  })},
  data: function () {
    return {
      opened: [],
      selectedRule:"",
      graduationProgramRuleCourses:[],
    };
  },
  created() {
    //console.log("RULE" + this.$route.params.rule)
    this.selectedRule = this.$route.params.rule
    ProgramManagementService.getGraduationProgramRuleCourses(this.$route.params.rule, this.token)
      .then((response) => {
        //console.log(response);
        this.graduationProgramRuleCourses = response.data;
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
