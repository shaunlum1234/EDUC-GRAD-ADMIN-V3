<template>
  <div>
  <DisplayTable v-bind:items="algorithmRules" title="Program" v-bind:fields="algorithmRulesFields" id="specialCase" showFilter="true"
        v-bind:role="role">
    </DisplayTable>
  </div>
</template>

<script>
import {
  mapGetters
} from "vuex";
import DisplayTable from "@/components/DisplayTable";
import GraduationCommonService from "@/services/GraduationCommonService.js";


export default {
  name: 'AlgorithmRules',
  components: {
    DisplayTable: DisplayTable,
  },
  created() {
     GraduationCommonService.getAlgorithmRules(this.token)
      .then((response) => {
        console.log(response);  
        this.algorithmRules = response.data;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:' + error.response);
      });
  },
  data: function() {
    return {
      algorithmRules: [],
      algorithmRulesFields: [
        {
          key: 'specialCase',
          label: 'Special Case',
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
          label: 'Pass Flag',
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
