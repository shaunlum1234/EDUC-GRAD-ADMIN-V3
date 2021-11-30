<template>
  <div>
  <DisplayTable
    title="Program Certificate Transcripts"
    v-bind:items="programCertificateTranscripts"
    v-bind:fields="programCertificateTranscriptsFields"
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
  name: 'ProgramCertificateTranscripts',
  components: {
    DisplayTable: DisplayTable,
  },
  created() {
    GraduationCommonService.getProgramCertificateTranscripts(this.token)
    .then((response) => {
    
      this.programCertificateTranscripts = response.data;
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
      programCertificateTranscripts: [],
      programCertificateTranscriptsFields: [
        {
          key: "graduationProgramCode",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
          class: "w-15"
        },
        {
          key: "schoolCategoryCode",
          label: "Category Code",
          sortable: true,
        },
        {
          key: "certificateTypeCode",
          label: "Certificate Type Code",
          sortable: true,
        },
        {
          key: "transcriptTypeCode",
          label: "Transcript Type Code",
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
