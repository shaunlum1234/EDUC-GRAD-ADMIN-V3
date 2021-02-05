<template>
  <div>
  {{letterGrades}}
  </div>
</template>

<script>
import ProgramManagementService from "@/services/ProgramManagementService.js";
export default {
  name: 'Letter Grades',
  created() {
     ProgramManagementService.getLetterGrades(localStorage.getItem('jwt'))
      .then((response) => {
        this.letterGrades = response.data;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:' + error.response);
      });
  },
  data: function() {
    return {
      letterGrades: [],
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
