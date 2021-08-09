<template>
  <div>
    <div class="table-responsive">
          <div v-if="!specialPrograms" class="container">
            This student does not have any special programs.
          </div>
          <div v-if="showOptionalProgramTab=='Add Optional Program'" class="add-optional-program-form">
            Program Name<b-input></b-input>
            Add Course <b-input></b-input>
            <b-input></b-input>
            <input type="submit">
            
            
          </div>
          <b-table v-if="specialPrograms && showOptionalProgramTab != 'Add Optional Program'" :items="specialPrograms" :fields="specialProgramsfields" showFilter="true" filter=null :filter-function="filterOptionalProgram" title="Special Programs">
            <template #cell(optionalNonGradReasons)="row">
              <!-- {{row.item.studentSpecialProgramData}} -->
                  <ul v-if="row.item.studentSpecialProgramData.optionalNonGradReasons !== undefined" id="specialNonGradReasons">
                    <li v-for="optionalNonGradReasons in row.item.studentSpecialProgramData.optionalNonGradReasons" :key="optionalNonGradReasons.rule">
                      <strong>{{ optionalNonGradReasons.rule }} - {{ optionalNonGradReasons.description }}</strong>
                    </li>
                  </ul>
                  <span v-if="row.item.studentSpecialProgramData.optionalNonGradReasons === undefined">All requirements have been met</span>
            </template>    
            <template #cell(specialProgramName)="row">
               {{row.item.specialProgramName}} ({{row.item.specialProgramCode}}) <br> {{row.item.specialProgramCompletionDate}}
            </template>   
            <template #cell(optionalReqMet)="row">              
                   <b-table :bordered=false small :items="row.item.studentSpecialProgramData.optionalStudentCourses.studentCourseList" :fields="fields" filter=null :filter-function="filterGradReqCourses" thead-class="d-none" >
                    <template #cell(gradReqMetDetail)="row2">
              
                       <ul class="m-0 p-0"><li ><strong>{{row2.item.gradReqMetDetail}}</strong><br/>
                        {{row2.item.courseCode}} {{row2.item.courseLevel}} - {{row2.item.sessionDate}} ({{row2.item.courseName}} )</li></ul>
                    </template>
                  </b-table>
                  <!-- <b-table :bordered=false small :items="row.item.studentSpecialProgramData.specialStudentAssessments.studentAssessmentList" :fields="fields" filter=null :filter-function="filterGradReqCourses" thead-class="d-none" >
                    <template #cell(gradReqMetDetail)="row2">
                       <ul class="m-0 p-0"><li ><strong>{{row2.item.gradReqMetDetail}}</strong><br/>
                        {{row2.item.assessmentCode}} - {{row2.item.sessionDate}} ({{row2.item.assessmentName}})</li></ul>
                    </template>
                  </b-table> -->
        
               
            </template>                      
          </b-table>


    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GRADRequirementDetails",
  components: {
  },
  props: {
    showOptionalProgramTab: String
  },
  computed: {
    ...mapGetters({
      specialPrograms: "getStudentSpecialPrograms",
    }),
  },
  data: function () {
    return {
      fields: [
        { key: "gradReqMetDetail", label: "Grad Requirement Met", class: "text-left"}
      ],
      specialProgramsfields: [
        { key: "specialProgramName", label: "Special program" },
        { key: "optionalReqMet", label: "Requirements Met" },
        { key: "optionalNonGradReasons", label: "Requirements Not Met" },
      ],
      
    };
  },
  created() {
  },
  methods: {
    filterOptionalProgram(row){
      if(row.specialProgramName == this.showOptionalProgramTab || this.showOptionalProgramTab == "All"){
        return true;
      }else{
        return false;
      }
    },
    filterGradReqCourses(row) {
      if (row.gradReqMet.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    toggle(id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    },
    createRef(pen, code, level, sessionDate) {
      return pen.trim() + code.trim() + level.trim() + sessionDate.trim();
    },
  },
};
</script>

<style scoped>
.table th,
.table td {
  border-top: none !important;
}

.table th svg {
  display: none !important;
}

.highlight {
  background: aliceblue !important;
}
.card-header {
  font-weight: 700 !important;
}
.gradReqsMet span + span::before{
    content: ", "

}

</style>
