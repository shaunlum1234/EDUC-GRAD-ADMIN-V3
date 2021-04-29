<template>
  <div>
  <DisplayTable v-bind:items="specialCases" title="Program" v-bind:fields="specialCasesFields" id="specialCase" showFilter="true"
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
  name: 'SpecialCases',
  components: {
    DisplayTable: DisplayTable,
  },
  created() {
     ProgramManagementService.getSpecialCases(this.token)
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
      specialCasesFields: [
        {
          key: 'specialCase',
          label: 'Special case',
          sortable: true,
          sortDirection: 'desc',
          class:'w-15'
        },
        {
          key: 'description',
          label: 'Description',
          sortable: true,
          class:'w-15'
        },
        {
          key: 'passFlag',
          label: 'Pass',
          sortable: true,
          class:'w-70 text-left'
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
