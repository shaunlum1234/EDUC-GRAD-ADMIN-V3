<template>
  <div>
    <!-- <div v-if="!isHidden"> -->
        <b-spinner v-if="!graduationPrograms.length" label="Loading"
          >Loading</b-spinner
        >
    <div class="card-body" v-if="!selectedProgramCode">

          <DisplayTable v-bind:items="graduationPrograms" title="Program" v-bind:fields="graduationProgramsFields" id="programCode"
            v-bind:role="role" :slots="templates" create="createProgram" delete="deleteProgram" update="updateProgram">
          </DisplayTable>
        
           
          <!-- <DisplayTable title="Program" v-bind:items="graduationPrograms" v-bind:fields="graduationProgramsFields" id="programCode"
                 create="createProgramCode" delete="deleteProgramCode"
                update="updateProgramCode" :slots="templates">
                <template slot="program" slot-scope="data">
                  {{ data.tbl.item.programCode }} dsrinks cofsssfee
                </template>
          </DisplayTable> -->

          
          <!-- <v-table
            :data="graduationPrograms"
            class="table table-sm table-hover table-striped align-middle"
          >
            <thead slot="head" class="">
              <v-th sortKey="programCode">Program Code</v-th>
              <v-th sortKey="programName">Program Name</v-th>
            </thead>
            <tbody slot="body" slot-scope="{ displayData }">
              <template v-for="row in displayData">
                <tr
                  :key="row.programCode"
                  v-on:click="selectGradRule(row.programCode)"
                  v-bind:class="{
                    'table-primary': selectedProgramCode == row.programCode,
                  }"
                >
                  <td>
                    {{ row.programCode }}
                  </td>
                  <td>{{ row.programName }}</td>
                </tr>
              </template>
            </tbody>
          </v-table> -->
        </div>
        <div class="card-body" v-if="selectedProgramCode">
          <b-button v-on:click="resetProgramCode()" type="button" class="btn btn-primary">Select another program</b-button>
          <GraduationProgramRules
            :key="selectedProgramCode"
            :prop="selectedProgramCode"
            v-if="selectedProgramCode"
          ></GraduationProgramRules>
        </div> 
      </div>

</template>

<script>
import ProgramManagementService from "@/services/ProgramManagementService.js";
import GraduationProgramRules from "@/components/GraduationProgramRules";
import DisplayTable from "@/components/DisplayTable";
import {
    mapGetters
} from "vuex";
export default {
  name: "GraduationPrograms",
  components: {
    GraduationProgramRules: GraduationProgramRules,
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
      templates: [
        {
          name: "program",
          field: "programCode"
        },
        {
          name: "lastName",
          field: "last_name"
        }
      ],
      graduationPrograms: [],
      graduationProgramsFields: [{
            key: 'more', 
            label: 'More'
          },
          {
            key: 'programCode',
            label: 'Program Code',
            sortable: true,
            sortDirection: 'desc',
            class: 'w-1',
            editable: true
          },
          {
            key: 'programName',
            label: 'Program Name',
            sortable: true,
            
            editable: true
          },
            {
            key: 'createdBy',
            label: 'Created By',
            sortable: true,
            
            editable: true
          },
          
          {
            key: 'actions',
            class: 'w-1',
            label: 'Edit'
          },
          {
            key: 'delete',
            class: 'w-1',
            label: 'Delete'
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
