<template>
  <div>
    <DisplayTable v-bind:items="graduationOptionalPrograms" title="Optional Programs" v-bind:fields="graduationOptionalProgramsFields" id="id" showFilter="true" isSpecialProgram="true"></DisplayTable>
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
      //graduationOptionalProgramsFields:[],
      graduationOptionalPrograms:[],
      //selectedProgramCode: "",
      selectedProgramId: "",
      selectedId:'',
      graduationOptionalProgramsFields: [
          {
            key: 'graduationProgramCode',
            label: 'Program code',
            sortable: true,
            sortDirection: 'desc',
            editable: true,
            class: 'w-1',
          },
          {
            key: 'optProgramCode',
            label: 'Optional program code',
            sortable: true,
            sortDirection: 'desc',
            editable: true,
            class: 'w-1',
          },
          {
            key: 'optionalProgramName',
            label: 'Optional program name',
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
      this.graduationOptionalPrograms = response.data;
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
