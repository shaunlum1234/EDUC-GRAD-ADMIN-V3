<template>
  <div>
    <!-- <div v-if="!isHidden"> -->
    <div class='card mb-2'>
    <div class='card-body'>
    <b-spinner v-if="!graduationPrograms.length" label="Loading"
      >Loading</b-spinner
    >
    <v-table
      :data="graduationPrograms"
      class="table table-sm table-hover table-striped align-middle"
    >
      <thead slot="head" class="">
        <v-th sortKey="programCode">Program Code</v-th>
        <v-th sortKey="programName">Program Name</v-th>
        <v-th sortKey="programType">Program Type</v-th>
        <!-- <v-th sortKey="programStartDate">Program Start Date</v-th>
        <v-th sortKey="programEndDate">Program End Date</v-th> -->
      </thead>
      <!-- @click="toggle(row.programCode + row.programType)" -->
      <!-- :class="{ opened: opened.includes(row.programCode) }" -->
      <tbody slot="body" slot-scope="{ displayData }">
        <template v-for="row in displayData">
          <tr
            :key="row.programCode"
            v-on:click="selectGradSet(row.programCode)"
            v-bind:class="{'table-primary': (selectedProgramCode == row.programCode)}"
          >
            <td>
              {{ row.programCode }}
            </td>
            <td>{{ row.programName }}</td>
            <td>{{ row.programType }}</td>
            <!-- <td>{{ row.programStartDate }}</td>
            <td>{{ row.programEndDate }}</td> -->
          </tr>
        </template>
      </tbody>
    </v-table>


  
    <GraduationProgramSets :key="selectedProgramCode" :prop="selectedProgramCode" v-if="selectedProgramCode" ></GraduationProgramSets>
    </div>  
    </div>
    <!-- </div> -->
    
  </div>
</template>

<script>
import ProgramManagementService from "@/services/ProgramManagementService.js";
import GraduationProgramSets from '@/components/GraduationProgramSets';

export default {
  name: "GraduationPrograms",
  components: {
   'GraduationProgramSets': GraduationProgramSets
  },
  props: {
    //selectedProgramCode:String
  },
  //  watch: {
  //   selectedProgramCode: function(newVal){
  //     console.log(newVal);
  //       this.$parent.selectedProgramCode = newVal   // or this.openPopup(newVal) is this suits
  //   }
  // },
  computed: {},
  data: function () {
    return {
      show: false,
      isHidden: false,
      opened: [],
      graduationPrograms:[],
      selectedProgramCode:""
    };
  },
  created() {
    ProgramManagementService.getGraduationPrograms(localStorage.getItem('jwt'))
      .then((response) => {
        this.graduationPrograms = response.data;
        //console.log(this.graduationPrograms);
      })
      .catch(() => {

      });
  },
  methods: {
    selectGradSet(programCode){
      // this.isHidden = true
      this.selectedProgramCode = programCode;
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
