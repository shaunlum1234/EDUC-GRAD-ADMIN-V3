<template>
  <div>
        <DisplayTable v-bind:items="graduationSpecialPrograms" title="Special Programs" v-bind:fields="graduationSpecialProgramsFields" id="id" showFilter="true" isSpecialProgram="true">
        </DisplayTable>
        <!-- <div class="card-body" v-if="!selectedProgramId">
          <v-table
            :data="graduationSpecialPrograms"
            class="table table-sm table-hover table-striped align-middle"
          >
            <thead slot="head" class="">
              <v-th sortKey="specialProgramCode">Special Program Code</v-th>
              <v-th sortKey="specialProgramName">Special Program Name</v-th>
            </thead>
            <tbody slot="body" slot-scope="{ displayData }">
              <template v-for="row in displayData">
                <tr
                  :key="row.specialprogramCode"
                  v-on:click="selectSpecialGradRule(row.id)"
                  v-bind:class="{
                    'table-primary': selectedProgramId == row.specialprogramCode,
                  }"
                >
                  <td>{{ row.specialProgramCode }}</td>
                  <td>{{ row.specialProgramName }}</td>
                </tr>
              </template>
            </tbody>
          </v-table>
        </div> -->
        <!-- <div class="card-body" v-if="selectedProgramId">
          <button v-on:click="resetProgramId()" type="button" class="btn btn-light">Select another program</button>
          <GraduationSpecialProgramRules
            :key="selectedProgramId"
            :prop="selectedProgramId"
            v-if="selectedProgramId"
          >
          </GraduationSpecialProgramRules>
        </div>  -->
  </div>
</template>

<script>

import ProgramManagementService from "@/services/ProgramManagementService.js";
import DisplayTable from "@/components/DisplayTable";
import sharedMethods from '../sharedMethods'
import {
    mapGetters
} from "vuex";

export default {
  name: "GraduationSpecialProgram",
  props: {},
  computed: {
    ...mapGetters({
      token: "getToken",
      role: "getRoles", 
  })},
  components: {
   DisplayTable: DisplayTable,
  },
  data: function () {
    return {
      opened: [],
      //graduationSpecialProgramsFields:[],
      graduationSpecialPrograms:[],
      //selectedProgramCode: "",
      selectedProgramId: "",
      selectedId:'',
      graduationSpecialProgramsFields: [
          {
            key: 'programCode',
            label: 'Program code',
            sortable: true,
            sortDirection: 'desc',
            editable: true,
            class: 'w-1',
          },
          {
            key: 'specialProgramCode',
            label: 'Special program code',
            sortable: true,
            sortDirection: 'desc',
            editable: true,
            class: 'w-1',
          },
          {
            key: 'specialProgramName',
            label: 'Special program name',
            sortable: true,
            editable: true
          }
      ]
    };
  },
  created() {
    this.showNotification = sharedMethods.showNotification
    ProgramManagementService.getSpecialPrograms(this.token)
    .then((response) => {
      this.graduationSpecialPrograms = response.data;
    })
    .catch(() => {
      this.showNotification("danger", "There was an error with the web service.");
    });
  },
  methods: {
    onClickButton (id) {
      this.$emit('clicked', id)
    },
    selectSpecialGradRule(id) {
      this.selectedProgramId = id;
    },
    resetProgramId(){
      this.selectedProgramId = '';
    },
  },
};
</script>

<style>
.table th {
  border-bottom: 2px solid #38598a !important;
}
</style>
