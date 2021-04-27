<template>
  <div>
    <!-- <div v-if="!isHidden"> -->
      
        <div v-if="!selectedProgramCode">

          <DisplayTable v-bind:items="graduationProgramRules" title="Program" v-bind:fields="graduationProgramsFields" id="programCode"
            v-bind:role="role" :slots="templates" showFilter=true pagination=true>

            <template #cell(ruleCode)="row">
                <b-btn variant='outline primary' style="color:#666" size="xs" @click="row.toggleDetails">

                <router-link :to="{ name: 'programRuleCourses', params: { programCode: row.item.programCode, category: row.item.ruleCategory,  rule: row.item.ruleCode, ruleName: row.item.requirementName  }}">{{row.item.ruleCode}}</router-link>
                 
                </b-btn>
              </template>
              <!-- <template #cell(ruleCode)="row">
                <b-btn variant='outline primary' style="color:#666" size="xs" @click="row.toggleDetails">
                  <a >{{row.item.ruleCode}}</a>
                </b-btn>
              </template>

              <template #row-details="row">
                <b-card>
                    <table>
                        <tr><td>CODE LVL</td></tr>
                        <tr><td>CODE LVL</td></tr>
                        <tr><td>CODE LVL</td></tr>
                        <tr><td>CODE LVL</td></tr>
                        <tr><td>CODE LVL</td></tr>
                    </table>
                </b-card>
              </template> -->


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
