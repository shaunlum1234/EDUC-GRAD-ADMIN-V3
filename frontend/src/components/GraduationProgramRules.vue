<template>
  <div>
    <!-- <div v-if="!isHidden"> -->
        <div v-if="!selectedProgramCode">
          <DisplayTable v-bind:items="graduationProgramRules" title="Program" v-bind:fields="graduationProgramsFields" id="programCode"
            v-bind:role="role" :slots="templates" showFilter=true pagination=true>

            <template #cell(ruleCode)="row">
                <b-btn variant='outline primary' style="color:#666" size="xs" @click="row.toggleDetails">
                <router-link :to="{ name: 'programRuleCourses', params: { programCode: row.item.programRequirementCode.proReqCode, category: row.item.programRequirementCode.requirementCategory,  rule: row.item.programRequirementCode.proReqCode, ruleName: row.item.programRequirementCode.label  }}">{{row.item.programRequirementCode.proReqCode}}</router-link>
                </b-btn>
              </template>
          </DisplayTable>
        </div>
      
      <router-view v-bind:key="$route.fullPath"></router-view>
      </div>
      

</template>

<script>
import ProgramManagementService from "@/services/ProgramManagementService.js";
import DisplayTable from "@/components/DisplayTable";
import {
    mapGetters
} from "vuex";
export default {
  name: "GraduationPrograms",
  components: {
    DisplayTable: DisplayTable,
  },
  props: {},
  computed: {...mapGetters({
      token: "getToken",
      role: "getRoles", 
  })},
  data: function () {
    return {
      
      show: false,
      isHidden: false,
      opened: [],
      graduationProgramRules: [],
      templates: [
        {
          name: "programCode",
          field: "programCode"
        }
      ],
      graduationProgramsFields: [
      {
            key: 'graduationProgramCode',
            label: 'Program code',
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
            key: 'programRequirementCode.requirementCategory',
            label: 'Rule category',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'programRequirementCode.label',
            label: 'Requirement name',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'programRequirementCode.requiredCredits',
            label: 'Required credits',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'programRequirementCode.notMetDesc',
            label: 'Not met description',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'programRequirementCode.requirementTypeCode.label',
            label: 'Requirement type',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'programRequirementCode.requiredLevel',
            label: 'Required level',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'programRequirementCode.languageOfInstruction',
            label: 'Language',
            sortable: true,
            editable: true,
            class: '',
          },
          {
            key: 'programRequirementCode.activeRequirement',
            label: 'Active',
            sortable: true,
            editable: true,
            class: '',
          }
        ],
      selectedProgramCode: "",
      selectedProgramId: "",
    };
  },
  created() {
    
    ProgramManagementService.getProgramRules(this.token)
      .then((response) => {
        this.graduationProgramRules = response.data;
      })
      .catch((error) => {
         //eslint-disable-next-line
        console.log('There was an error:' + error.response);
      });
      
  },
  methods: {
    onClickChild(value) {
      this.selectedProgramId = value;
      //console.log("Program Id: " + value); // someValue
    },
    selectGradRule(programCode) {
      this.selectedProgramCode = programCode;
    },
    resetProgramCode(){
      this.selectedProgramCode = '';
    },
    getCourseName: function (cid) {
      let result = "";
      this.courses.filter(function (n) {
        if (n.id === cid) {
          result = n.name;
          return result;
        }
      });
      return result;
    },
  },
};
</script>

<style>
.table th {
  border-bottom: 2px solid #38598a !important;
}
</style>
