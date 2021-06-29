<template>
  <div>
    <div class="table-responsive">
          <div v-if="!specialPrograms" class="container">
            This student does not have any special programs.
          </div>
          <DisplayTable v-if="specialPrograms" :items="specialPrograms" :fields="specialProgramsfields" showFilter="true" title="Special Programs">
            <template #cell(studentSpecialProgramData.specialNonGradReasons)="row">
              
                {{row.item.studentSpecialProgramData.specialNonGradReasons === undefined ? row.item.studentSpecialProgramData.specialNonGradReasons : 'All requirements have been met'}}
            </template>    
            <template #cell(studentSpecialProgramData.specialRequirementsMet)="row">
            
                <ul v-if="row.item.studentSpecialProgramData.specialRequirementsMet">
                  <li v-for="requirement in row.item.studentSpecialProgramData.specialRequirementsMet" :key="requirement.rule">
                    
                    {{requirement.rule}} {{requirement.description}}
                  </li>
                </ul>
                <ul v-else>
                    <li>No Requirements have been met</li>
                </ul>
            </template>                      
          </DisplayTable>

          <DisplayTable v-if="specialPrograms" :items="specialPrograms" :fields="specialProgramsfields" showFilter="true" title="Special Programs">
            <template #cell(studentSpecialProgramData.specialNonGradReasons)="row">
              {{row.item.studentSpecialProgramData}}
                {{row.item.studentSpecialProgramData.specialNonGradReasons === undefined ? row.item.studentSpecialProgramData.specialNonGradReasons : 'All requirements have been met'}}
            </template>    
            <template #cell(specialProgramName)="row">
              
               {{row.item.specialProgramName}} ({{row.item.specialProgramCode}}) <br> {{row.item.specialProgramCompletionDate}}
            </template>   
            <template #cell(studentSpecialProgramData.specialRequirementsMet)="row">
              <b-card>
                <b-text>
                  {{row.item.studentSpecialProgramData.specialStudentCourses.studentCourseList}}
                  <b-table :items="row.item.studentSpecialProgramData.specialStudentCourses.studentCourseList" :fields="fields" filter=null :filter-function="filterGradReqCourses" thead-class="d-none" >
                    <template #cell(gradReqMetDetail)="row2">
                        <strong>{{row2.item.gradReqMetDetail}}</strong><br/>
                        ({{row2.item.courseName}})
                    </template>
                  </b-table>
                </b-text>
              </b-card>
                <ul v-if="row.item.studentSpecialProgramData.specialRequirementsMet">
                  <li v-for="requirement in row.item.studentSpecialProgramData.specialRequirementsMet" :key="requirement.rule">
                    
                    {{requirement.rule}} {{requirement.description}}
                  </li>
                </ul>
                <ul v-else>
                    <li>No Requirements have been met</li>
                </ul>
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
  props: {},
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
        { key: "studentSpecialProgramData.specialRequirementsMet", label: "Requirements Met" },
        { key: "studentSpecialProgramData.specialNonGradReasons", label: "Requirements Not Met" },
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
