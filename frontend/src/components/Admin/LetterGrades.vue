<template>
  <div>
    <DisplayTable v-bind:items="letterGrades.gradLetterGradeList" title="Letter Grade" v-bind:fields="letterGradesFields" id="letterGrade" showFilter="true"
        v-bind:role="role">
    </DisplayTable>
  </div>
</template>

<script>
import {
  mapGetters
} from "vuex";
import DisplayTable from "@/components/DisplayTable";
import ProgramManagementService from "@/services/ProgramManagementService.js";
export default {
  name: 'LetterGrades',
  components: {
    DisplayTable: DisplayTable,
  },  
  created() {
     ProgramManagementService.getLetterGrades(this.token)
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
      letterGradesFields: [
        {
          key: 'letterGrade',
          label: 'Letter grade',
          sortable: true,
          sortDirection: 'desc',
          class:'w-15'
        },
        {
          key: 'gpaMarkValue',
          label: 'GPA mark value',
          sortable: true,
          class:'w-15'
        },
        {
          key: 'passFlag',
          label: 'Pass',
          sortable: true,
          class:'w-70'
        }
      ],
    };
  },
  computed: {
    ...mapGetters({  
      token: "getToken",
      role: "getRoles"
    }),
  },
  methods: {
  },
};
</script>

<style>
.table th, .table td{
  border-top: none !important;

}</style>
