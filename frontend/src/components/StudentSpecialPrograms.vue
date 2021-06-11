<template>
  <div>
    <div class="table-responsive">
      
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
    
      specialProgramsfields: [
        { key: "specialProgramCode", label: "Code", class: "text-center"},
        { key: "specialProgramName", label: "Special program" },
        { key: "specialProgramCompletionDate", label: "Date" },
        { key: "studentSpecialProgramData.specialRequirementsMet", label: "Requirements Met" },
        { key: "studentSpecialProgramData.specialNonGradReasons", label: "Requirements Not Met" },
      ],
      
    };
  },
  created() {
  },
  methods: {
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
