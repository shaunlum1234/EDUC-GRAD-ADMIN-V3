<template>
  <div class="">
    <b-spinner v-if="!graduationSpecialProgramRules && !graduationSpecialProgramRules.length" label="Loading"
      >Loading</b-spinner
    >
    <div v-if="!graduationSpecialProgramRules && !graduationSpecialProgramRules.length"><h2>Loading</h2></div>
   <DisplayTable v-bind:items="graduationSpecialProgramRules" v-bind:fields="graduationSpecialProgramRulesFields" title="Program" id="programCode"
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
            key: 'requirementType',
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
            key: 'requirementDesc',
            label: 'Requirement Description',
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