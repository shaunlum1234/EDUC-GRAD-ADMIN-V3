<template>
  <div>
    <DisplayTable
      title="Career Programs"
      v-bind:items="careerPrograms"
      v-bind:fields="careerProgramFields"
      id="code"
      showFilter="true"
    >
      <template #cell(effectiveDate)="row">
        {{ row.item.effectiveDate | formatSimpleDate }}
      </template>
      <template #cell(expiryDate)="row">
        {{ row.item.expiryDate | formatSimpleDate }}
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
  name: 'CareerPrograms',
  components: {
    DisplayTable: DisplayTable,
  },
  created() {
      ProgramManagementService.getCareerPrograms(this.token)
        .then((response) => {
          this.careerPrograms = response.data;
        })
        // eslint-disable-next-line
        .catch((error) => {
          this.$bvToast.toast("ERROR " + error.response.statusText, {
            title: "ERROR" + error.response.status,
            variant: "danger",
            noAutoHide: true,
          });
        });
  },
  data: function() {
    return {
      careerPrograms: [],
      careerProgramFields: [
        {
          key: "code",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
          class: "w-15"
        },
        {
          key: "description",
          label: "Program",
          sortable: true,
        },
        {
          key: "startDate",
          label: "Start Date",
          sortable: true,
        },
        {
          key: "endDate",
          label: "End Date",
          sortable: true,
        },
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
