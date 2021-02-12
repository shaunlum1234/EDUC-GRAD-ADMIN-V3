<template>
<div>
  <div class="card mb-2">
    <div class="card-body">
    <b-spinner v-if="!GraduationSpecialPrograms.length" label="Loading"
      >Loading</b-spinner
    >
    <div v-if="!GraduationSpecialPrograms.length"> <h2>No data please select another Program Code</h2></div>
    <v-table
      :data="GraduationSpecialPrograms"
      class="table table-sm table-hover table-striped align-middle"
    >
      <thead slot="head" class="">
        <v-th sortKey="programRuleCode">Rule Code</v-th>
        <v-th sortKey="programRequirementName">Requirement Name</v-th>
        <v-th sortKey="programRequirementType">Requirement Type</v-th>
        <v-th sortKey="programRequirementCredits">Requirement Credits</v-th>
        <v-th sortKey="programNotMetDesc">Not Met Desc</v-th>
        <v-th sortKey="programRequiredLevel">Required Level</v-th>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <template v-for="row in displayData">
          <tr
            :key="row.id"
            v-on:click="onClickButton(row.id)"
            v-bind:class="{'table-primary': (selectedId == row.id)}"
          >
            <td>{{ row.ruleCode }}</td>
            <td>{{ row.requirementName }}</td>
            <td>{{ row.requirementTypeDesc }}</td>
            <td>{{ row.requiredCredits }}</td>
            <td>{{ row.notMetDesc }}</td>
            <td>{{ row.requiredLevel }}</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
  </div>
</div>
</template>

<script>

import ProgramManagementService from "@/services/ProgramManagementService.js";

export default {
  name: "GraduationSpecialProgram",
  props: {},
  computed: {},
  data: function () {
    return {
      opened: [],
      GraduationSpecialPrograms:[],
      parentSelectedProgramId:'',
      selectedId:''
    };
  },
  created() {

    this.parentSelectedProgramId = this.$parent.selectedProgramId
    
    ProgramManagementService.getSpecialProgram(this.$parent.selectedProgramId, localStorage.getItem('jwt'))
      .then((response) => {
        this.GraduationSpecialPrograms = response.data;
        console.log('getSpecialProgram response: ' + this.graduationProgramSets);
      })   
      .catch((error) => {
        console.log('There was an error:' + error.response);
    });
  },
  methods: {
    onClickButton (id) {
      this.$emit('clicked', id)
    },
    toggle(id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    },
    showMsgBoxOne(message) {
      this.$bvModal.msgBoxOk(message);
    }
  },
};
</script>

<style>
.table th {
  border-bottom: 2px solid #38598a !important;
}
</style>
