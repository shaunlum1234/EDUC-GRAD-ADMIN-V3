<template>
  <div>
    <!-- <div v-if="!isHidden"> -->
        <b-spinner v-if="!graduationPrograms.length" label="Loading"
          >Loading</b-spinner
        >
        
        
        <div v-if="!selectedProgramCode">

          <DisplayTable v-bind:items="graduationPrograms" title="Program" v-bind:fields="graduationProgramsFields" id="programCode"
            v-bind:role="role">
              <template #cell(programCode)="data">
                <router-link :to="'/admin-graduation-programs/program/' + data.item.programCode ">{{ data.item.programCode }}</router-link>
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
      graduationPrograms: [],
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
          class: 'w-15',
        },
        {
          key: 'programName',
          label: 'Program Name',
          sortable: true,
          editable: true,
          class: 'w-85',
        }
      ],
      selectedProgramCode: "",
      selectedProgramId: "",
    };
  },
  created() {
    
    ProgramManagementService.getGraduationPrograms(this.token)
      .then((response) => {
        this.graduationPrograms = response.data;
      })
      .catch(() => {});
      
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
