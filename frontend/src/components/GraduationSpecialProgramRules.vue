<template>
  <div class="">
      <DisplayTable v-bind:items="graduationSpecialProgramRules" v-bind:fields="graduationSpecialProgramRulesFields" title="Program" id="programCode"
        showFilter=true>
          <template #cell(ruleCode)="row">
            <b-btn variant='outline primary' style="color:#666" size="xs" @click="row.toggleDetails">
            <router-link :to="{ name: 'programRuleCourses', params: { isSpecialProgram:true, programCode: row.item.programCode, category: row.item.ruleCategory,  rule: row.item.ruleCode, ruleName: row.item.requirementName}}">{{row.item.ruleCode}}</router-link>
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
            key: 'programCode',
            label: 'Program Code',
            sortable: true,
            sortDirection: 'desc',
            editable: true,
            class: '',
          },
          {
            key: 'specialProgramCode',
            label: 'Special Program Code',
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
            key: 'ruleCategory',
            label: 'Rule Category',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'requirementName',
            label: 'Requirement Name',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'requiredCredits',
            label: 'Required Credits',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'notMetDesc',
            label: 'Not Met Description',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'requirementTypeDesc',
            label: 'Requirement Type',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'requiredLevel',
            label: 'Required Level',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'languageOfInstruction',
            label: 'Language',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'isActive',
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