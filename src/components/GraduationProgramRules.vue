<template>
  <div class="">
    <div class="card mb-2">
    <div class="card-body">
    <b-spinner v-if="!graduationProgramRules.length" label="Loading"
      >Loading</b-spinner
    >
    <div v-if="!graduationProgramRules.length"><h2>No Data please select another Program Set</h2></div>
    <v-table
      :data="graduationProgramRules"
      class="table table-sm table-hover table-striped align-middle"
    >
      <thead slot="head" class="">
        <v-th sortKey="ruleCode">Rule #</v-th>
        <v-th sortKey="requirementName">Requirement Name</v-th>
        <v-th sortKey="requiredCredits">Required Credits</v-th>
        <v-th sortKey="notMetDesc">Not Met Description</v-th>
        <v-th sortKey="requirementType">Requirement Type</v-th>
        <v-th sortKey="requiredLevel">Required Level</v-th>
        <v-th sortKey="languageOfInstruction">Language of Instruction</v-th>
        <v-th sortKey="requirementDesc">Description</v-th>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <template v-for="row in displayData">
          <tr
            :key="row.ruleCode"
            @click="toggle(row.ruleCode + row.requirementName)"
            :class="{ opened: opened.includes(row.ruleCode) }"
          >
            <td>{{ row.ruleCode }}</td>
            <td>{{ row.requirementName }}</td>
            <td>{{ row.requiredCredits }}</td>
            <td>{{ row.notMetDesc }}</td>
            <td>{{ row.requirementType }}</td>
            <td>{{ row.requiredLevel }}</td>
            <td>{{ row.languageOfInstruction }}</td>
            <td>{{ row.requirementDesc }}</td>
          </tr>
        </template>
      </tbody>
    </v-table>


    <table class="col-3 table table-striped table-bordered">
      <thead>
          <tr>
              <th>Letter Grade</th>
              <th>GPA Mark</th>
              <th>PASS FLAG</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="letterGrade in letterGrades.gradLetterGradeList" :key="letterGrade">
              <td>{{letterGrade.letterGrade}}</td>
              <td>{{letterGrade.gpaMarkValue}}</td>
              <td>{{letterGrade.passFlag}}</td>
          </tr>
      </tbody>
  </table>
  
   
    {{letterGrades}}

    </div>
    </div>  
  </div>
</template>

<script>
import GraduationProgramRuleService from "@/services/GraduationProgramRuleService.js";
import GradeService from "@/services/GradeService.js";
export default {
  name: "GraduationProgramRules",
  props: {
    selectedProgramCode: String,
    selectedProgramSet: String
  },
  computed: {},
  data: function () {
    return {
      opened: [],
      graduationProgramRules:[],
      letterGrades: {},
    };
  },
  created() {
    // console.log('PropA:' + this.propA)
    // console.log('PropA:' + this.propB)
    GraduationProgramRuleService.getProgramRule(this.selectedProgramCode, this.selectedProgramSet, localStorage.getItem('jwt'))
      .then((response) => {
        this.graduationProgramRules = response.data;
        // console.log(this.graduationProgramRules);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:' + error.response);
      });

      GradeService.getGrades(localStorage.getItem('jwt'))
      .then((response) => {
        this.letterGrades = response.data;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:' + error.response);
      });
  },
  methods: {
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
    },
    // getCourseName: function (cid) {
    //   let result = "";
    //   this.courses.filter(function (n) {
    //     if (n.id === cid) {
    //       result = n.name;
    //       return result;
    //     }
    //   });
    //   return result;
    // },
  },
};
</script>

<style>
.table th {
  border-bottom: 2px solid #38598a !important;
}
</style>
