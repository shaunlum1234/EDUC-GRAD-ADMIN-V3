<template>
  <div class="">
      <DisplayTable v-bind:items="graduationSpecialProgramRules" v-bind:fields="graduationSpecialProgramRulesFields" title="Program" id="programCode"
        showFilter=true>
          <template #cell(ruleCode)="row">
            <b-btn variant='outline primary' style="color:#666" size="xs" @click="row.toggleDetails">
            <router-link :to="{ name: 'programRuleCourses', params: { isSpecialProgram:true, programCode: row.item.optionalProgramID, category: row.item.optionalProgramRequirementCode.requirementCategory,  rule: row.item.optionalProgramRequirementCode.optProReqCode, ruleName: row.item.optionalProgramRequirementCode.label}}">{{row.item.optionalProgramRequirementCode.optProReqCode}}</router-link>
          </b-btn>
        </template>
        </DisplayTable>
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
      graduationSpecialProgramRulesFields: [
          {
            key: 'optionalProgramID',
            label: 'Program code',
            sortable: true,
            sortDirection: 'desc',
            editable: true,
            class: '',
          },
          {
            key: 'optionalProgramRequirementID',
            label: 'Optional program code',
            sortable: true,
            sortDirection: 'desc',
            editable: true,
            class: '',
          },          
          {
            key: 'ruleCode',
            label: 'Rule #',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'optionalProgramRequirementCode.requirementCategory',
            label: 'Rule category',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'optionalProgramRequirementCode.label',
            label: 'Requirement name',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'optionalProgramRequirementCode.requiredCredits',
            label: 'Required credits',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'optionalProgramRequirementCode.notMetDesc',
            label: 'Not met description',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'optionalProgramRequirementCode.requirementTypeCode.description',
            label: 'Requirement type',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'optionalProgramRequirementCode.requiredLevel',
            label: 'Required level',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'optionalProgramRequirementCode.languageOfInstruction',
            label: 'Language',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'optionalProgramRequirementCode.activeRequirement',
            label: 'Active',
            sortable: true,
            editable: true,
            class: '',
          }
        ],
    };
  },
  created() {
    ProgramManagementService.getAllSpecialProgramRules(this.token)
      .then((response) => {
        this.graduationSpecialProgramRules = response.data;
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