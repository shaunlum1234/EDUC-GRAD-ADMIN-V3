<template>
<div>
  <h1>Rule {{selectedRule}} ({{ruleName}})</h1>
  Program <router-link :to="'/admin-graduation-programs/program/' + this.$route.params.programCode">{{this.$route.params.programCode}}</router-link>


          <DisplayTable v-bind:items="graduationProgramRuleCourses" title="Program" v-bind:fields="fields" id="courseName"
           showFilter=true>
          </DisplayTable>


</div>
</template>

<script>
//import GradeService from "@/services/GradeService.js";
import AssessmentService from "@/services/AssessmentService.js";
import CourseService from "@/services/CourseService.js";
import DisplayTable from "@/components/DisplayTable";
import {
    mapGetters
} from "vuex";
export default {
  name: "GraduationProgramCourses",
  props: {   
  },
  components: {
        DisplayTable: DisplayTable,
  },
  computed: {...mapGetters({
    token: "getToken", 
  })},
  data: function () {
    return {
      opened: [],
      selectedRule:"",
      category: "",
      ruleName:"",
      graduationProgramRuleCourses:[],
      fields:[],
      courseFields: [
      {
            key: 'courseCode',
            label: 'Course',
            sortable: true,
            sortDirection: 'desc',
          },
          {
            key: 'courseLevel',
            label: 'Course Level',
            sortable: true,
            editable: true,
          },
          {
            key: 'courseName',
            label: 'Course Name',
            sortable: true,
            editable: true,
          }
        ],
      assessmentFields: [
      {
            key: 'assessmentCode',
            label: 'Assessment Code',
            sortable: true,
            sortDirection: 'desc',
          },
          {
            key: 'assessmentName',
            label: 'Assessment Name',
            sortable: true,
            editable: true,
          }
        ],        
    };
  },
  created() {
    //console.log("RULE" + this.$route.params.rule)
    this.selectedRule = this.$route.params.rule;
    this.category= this.$route.params.category;
    this.ruleName= this.$route.params.ruleName;
    if(this.$route.params.category == "A"){
      AssessmentService.getRuleCourseRequirements(this.$route.params.rule, this.token)
        .then((response) => {
          //console.log(response);
          this.fields = this.assessmentFields;
          this.graduationProgramRuleCourses = response.data;
      });
    }
    if(this.$route.params.category == "C"){
      CourseService.getRuleCourseRequirements(this.$route.params.rule, this.token)
        .then((response) => {
          //console.log(response);
          this.fields = this.courseFields;
          this.graduationProgramRuleCourses = response.data;
      });
    }  
    
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
