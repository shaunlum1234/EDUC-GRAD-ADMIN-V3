<template>
  <div>
  <p>Special cases used for graduation</p>
  <table class="col-3 table table-striped table-bordered">
      <thead>
          <tr>
              <th>Created By</th>
              <th>Created Time</th>
              <th>Updated By</th>
              <th>Updated Timestamp</th>
              <th>Special Case</th>
              <th>Pass Flag</th>
              <th>Description</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="specialCase in specialCases" :key="specialCase.description">
              <td>{{specialCase.createdBy}}</td>
              <td>{{specialCase.createdTimestamp}}</td>
              <td>{{specialCase.updatedBy}}</td>
              <td>{{specialCase.updatedTimestamp}}</td>
              <td>{{specialCase.specialCase}}</td>
              <td>{{specialCase.passFlag}}</td>
              <td>{{specialCase.description}}</td>
              

          </tr>
      </tbody>
  </table>
  </div>
</template>

<script>
import ProgramManagementService from "@/services/ProgramManagementService.js";
export default {
  name: 'Special Cases',
  created() {
     ProgramManagementService.getSpecialCases(localStorage.getItem('jwt'))
      .then((response) => {
        this.specialCases = response.data;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:' + error.response);
      });
  },
  data: function() {
    return {
      specialCases: [],
    };
  },
  methods: {
  },
};
</script>

<style>
.table th, .table td{
  border-top: none !important;

}</style>
