<template>
  <div class="container">
    <b-spinner v-if="!graduationProgramSets.length" label="Loading"
      >Loading</b-spinner
    >
    <v-table
      :data="graduationProgramSets"
      class="table table-sm table-hover table-striped align-middle"
    >
      <thead slot="head" class="">
        <v-th sortKey="programSet">Program Set</v-th>
        <v-th sortKey="programSetName">Program Set Name</v-th>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <template v-for="row in displayData">
          <tr
            :key="row.programSet"
            @click="toggle(row.programSet + row.programSetName)"
            :class="{ opened: opened.includes(row.programSet) }"
          >
            <td>{{ row.programSet }}</td>
            <td>{{ row.programSetName }}</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import GraduationProgramsService from "@/services/GraduationProgramsService.js";
export default {
  name: "GraduationProgramSets",
  props: {},
  computed: {},
  data: function () {
    return {
      opened: [],
      graduationProgramSets:[],
    };
  },
  created() {
    GraduationProgramsService.getGraduationProgramSets(this.$parent.selectedProgramCode)
      .then((response) => {
        this.graduationProgramSets = response.data.gradProgramSetList;
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
