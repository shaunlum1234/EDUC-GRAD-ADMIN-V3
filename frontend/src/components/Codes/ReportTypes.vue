<template>
  <div>
    <DisplayTable
      title="Report Types"
      v-bind:items="reportTypes"
      v-bind:fields="reportTypesFields"
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
import GraduationCommonService from "@/services/GraduationCommonService.js";


export default {
  name: 'ReportTypes',
  components: {
    DisplayTable: DisplayTable,
  },
  created() {
      GraduationCommonService.getReportTypes(this.token)
        .then((response) => {
          this.reportTypes = response.data;
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
      reportTypes: [],
      reportTypesFields: [
         {
          key: "code",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
          class: "w-15"
        },
        {
          key: "label",
          label: "Label",
          sortable: true,
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
        },
        {
          key: "effectiveDate",
          label: "Effective Date",
          sortable: true,
        },
        {
          key: "expiryDate",
          label: "Expiry Date",
          sortable: true,
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
