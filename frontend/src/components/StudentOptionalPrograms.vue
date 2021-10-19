<template>
  <div>
    <div class="table-responsive">
      <div v-if="!specialPrograms" class="container">
        This student does not have any special programs.
      </div>
      <DisplayTable v-if="specialPrograms" :items="specialPrograms" :striped=false :fields="specialProgramsfields" showFilter="true" title="Optional Programs">
        <template #cell(optionalNonGradReasons)="row">
          {{row.item.studentSpecialProgramData}}
          <ul v-if="!row.item.studentSpecialProgramData.optionalNonGradReasons" id="specialNonGradReasons">
            <li v-for="optionalNonGradReasons in row.item.studentSpecialProgramData.optionalNonGradReasons" :key="optionalNonGradReasons.rule">
              <strong>{{ optionalNonGradReasons.rule }} - {{ optionalNonGradReasons.description }}</strong>
            </li>
          </ul>
          <span v-if="row.item.studentSpecialProgramData.optionalNonGradReasons">All requirements have been met</span>
          
        </template>    
        <template #cell(specialProgramName)="row">
            {{row.item.specialProgramName}} ({{row.item.specialProgramCode}}) <br> {{row.item.specialProgramCompletionDate}}
        </template>   
        <template #cell(optionalReqMet)="row">  
          <div v-if="
                    row.item.studentSpecialProgramData &&
                    (row.item.studentSpecialProgramData.optionalNonGradReasons && row.item.studentSpecialProgramData.optionalNonGradReasons.length == 0 && 
                    row.item.studentSpecialProgramData.optionalRequirementsMet && row.item.studentSpecialProgramData.optionalRequirementsMet.length == 0)
                    ">n/a</div>            
          <b-table :bordered=false small :items="row.item.studentSpecialProgramData.optionalStudentCourses.studentCourseList" :fields="fields" filter=null :filter-function="filterGradReqCourses" thead-class="d-none" >
            <template #cell(gradReqMetDetail)="row2">
                <ul class="m-0 p-0">
                  <li ><strong>{{row2.item.gradReqMetDetail}}</strong><br/>
                    {{row2.item.courseCode}} {{row2.item.courseLevel}} - {{row2.item.sessionDate}} ({{row2.item.courseName}} )
                  </li>
                </ul>
            </template>
          </b-table>
          <b-table :bordered=false small :items="row.item.studentSpecialProgramData.optionalStudentAssessments.studentAssessmentList" :fields="fields" filter=null :filter-function="filterGradReqCourses" thead-class="d-none" >
            <template #cell(gradReqMetDetail)="row2">
                <ul class="m-0 p-0">
                  <li ><strong>{{row2.item.gradReqMetDetail}}</strong><br/>
                    {{row2.item.assessmentCode}} - {{row2.item.sessionDate}} ({{row2.item.assessmentName}})
                  </li>
                </ul>
            </template>
          </b-table>          
        </template> 
        <template #cell(more)="row">            
          <b-btn
            v-if="row.item.specialProgramName == '2018 Graduation Program Career Program' || row.item.specialProgramName == 'Adult Career Program'"
            variant="outline primary"
            style="color: #666"
            size="sm"
            @click="row.toggleDetails"
            class="more-button"
          >
            <i class="fas fa-sm fa-caret-down"></i>
          </b-btn>
        </template>
        <template #row-details="row">   
          <b-card class="px-0">
            <strong>Career Programs</strong><hr/>
            <ul id="student-career-programs">
              <li v-for="item in careerPrograms" :key="item.careerProgramName">
                {{ item.careerProgramName }} ({{ item.careerProgramCode }})
              </li>
            </ul>
          </b-card>
        </template>                                 
      </DisplayTable>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DisplayTable from "@/components/DisplayTable.vue";
export default {
  name: "GRADRequirementDetails",
  components: {
    DisplayTable: DisplayTable,
  },

  computed: {
    ...mapGetters({
      specialPrograms: "getStudentSpecialPrograms",
      careerPrograms: "getStudentCareerPrograms"
    }),
  },
  data: function () {
    return {
      fields: [
        { key: "gradReqMetDetail", label: "Grad Requirement Met", class: "text-left"}
      ],
      specialProgramsfields: [
        { key: "more", label: "" },
        { key: "specialProgramName", label: "Optional Program" },
        { key: "optionalReqMet", label: "Requirements Met" },
        { key: "optionalNonGradReasons", label: "Requirements Not Met" },
      ],
      careerProgramsFields: [
        { key: "careerProgramCode", label: "" },
        { key: "careerProgramName", label: "" },
      ],      
      
    };
  },
  created() {
  },
  methods: {
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
