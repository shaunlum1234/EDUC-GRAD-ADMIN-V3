<template>
  <div>
  {{specialCases}}
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
