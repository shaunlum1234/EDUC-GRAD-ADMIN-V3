<template>

  <div>

    <DisplayTable v-bind:items="letterGrades" title="Letter Grade" v-bind:filterOn="toFilterItem"  v-bind:fields="letterGradesFields" id="letterGrade" showFilter="true"
        v-bind:role="role">
           <template #cell(expiryDate)="row">
          {{row.item.expiryDate|formatSimpleDate}}
        </template>
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
      toFilterItem:['grade','gpaMarkValue','passFlag','description'],
      letterGradesFields: [
        {
          key: 'grade',
          label: 'Letter grade',
          sortable: true,
          sortDirection: 'desc',
          class: 'text-center'
        },
        {
          key: 'gpaMarkValue',
          label: 'GPA mark value',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'passFlag',
          label: 'Pass',
          sortable: true,
          class: 'text-center'
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
        },    
        {
          key: "percentRangeLow",
          label: "Percentage Range Low",
          sortable: true,
          class: 'text-center'
        },    
        {
          key: "percentRangeHigh",
          label: "Percentage Range High",
          sortable: true,
          class: 'text-center'
        },    

        {
          key: "expiryDate",
          label: "Expiry Date",
          sortable: true,
        }, 
        {
          key: "label",
          label: "Note",
          sortable: true,
        }                               
      ]
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
