<template>
  <div class="container">
    <div v-if="!isHidden">
    <b-spinner v-if="!graduationPrograms.length" label="Loading"
      >Loading</b-spinner
    >
    <v-table
      :data="graduationPrograms"
      class="table table-sm table-hover table-striped align-middle"
    >
      <thead slot="head" class="">
        <v-th sortKey="programCode">Grad Program Code</v-th>
        <v-th sortKey="programName">Program Name</v-th>
        <v-th sortKey="programType">Program Type</v-th>
        <v-th sortKey="programStartDate">Program Start Date</v-th>
        <v-th sortKey="programEndDate">Program End Date</v-th>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <template v-for="row in displayData">
          <tr
            :key="row.programCode"
            @click="toggle(row.programCode + row.programType)"
            :class="{ opened: opened.includes(row.programCode) }"
          >
            <td>
              <a href="#" v-on:click="selectGradSet(row.programCode)">{{ row.programCode }}</a>
            </td>
            <td>{{ row.programName }}</td>
            <td>{{ row.programType }}</td>
            <td>{{ row.programStartDate }}</td>
            <td>{{ row.programEndDate }}</td>
          </tr>
        </template>
      </tbody>
    </v-table>
    </div>
    <GraduationProgramSets :prop="selectedProgramCode" v-if="selectedProgramCode"></GraduationProgramSets>
  </div>
</template>

<script>
import GraduationProgramsService from "@/services/GraduationProgramsService.js";
import GraduationProgramSets from '@/components/GraduationProgramSets';
export default {
  name: "GraduationPrograms",
   components: {
   'GraduationProgramSets': GraduationProgramSets
  },
  props: {
    //selectedProgramCode:String
  },
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
    GraduationProgramsService.getGraduationPrograms()
      .then((response) => {
        this.graduationPrograms = response.data;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:' + error.response);
      });
  },
  methods: {
    selectGradSet(programCode){
      this.isHidden = true
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
