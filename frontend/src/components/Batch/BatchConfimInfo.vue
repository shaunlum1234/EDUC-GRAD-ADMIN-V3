<template>
  <div>
    <b-alert show variant="info" v-if="limitWarning"
      >There will be more than 250 records processed</b-alert
    >
    <ul>
      <li v-if="details.what"><strong>Run Type: </strong>{{ details.what }}</li>
      <li v-if="details.copies">
        <strong>Copies: </strong>{{ details.copies }}
      </li>
      <li v-if="details.who"><strong>Group: </strong>{{ details.who }}</li>
      <li v-if="details.credential">
        <strong>Credential Type: </strong>{{ details.credential }}
      </li>
      <ul>
        <li v-if="details.gradDate">
          <strong>Grad Date: </strong>{{ details.gradDate }}
        </li>
        <!-- Grad Date -->
        <ul>
          <li v-if="details.gradDateFrom">
            <strong>Grad Start Date: </strong>{{ details.gradDateFrom }}
          </li>
          <li v-if="details.gradDateTo">
            <strong>Grad End Date: </strong>{{ details.gradDateTo }}
          </li>
        </ul>
        <!-- End Grad Date  -->
        <li v-if="details.categoryCode">
          <strong>School Category: </strong>{{ details.categoryCode }}
        </li>
        <li v-if="details.psiTransmissionMode">
          <strong>Transmission Mode: </strong>{{ details.psiTransmissionMode }}
        </li>
        <li v-if="details.psiYear">
          <strong>PSI Year: </strong>{{ details.psiYear }}
        </li>
      </ul>
      <li v-if="details.where"><strong>Where: </strong>{{ details.where }}</li>
    </ul>
  </div>
</template>
<script>
import sharedMethods from "../../sharedMethods.js";
export default {
  components: {},
  data: function () {
    return {
      details: "",
      students: [],
      schools: [],
      districts: [],
      programs: [],
      blankTranscriptDetails: [],
      blankCertificateDetails: [],
      psi: [],
      limitWarning: false,
    };
  },
  mounted() {},
  created() {
    this.showNotification = sharedMethods.showNotification;
    this.details = this.items.details;
    this.students = this.items.students;
    this.schools = this.items.schools;
    this.districts = this.items.districts;
    this.programs = this.items.programs;
    this.blankTranscriptDetails = this.items.blankTranscriptDetails;
    this.blankCertificateDetails = this.items.blankCertificateDetails;
    this.psi = this.items.psi;
    this.convertBatchCodes();
    this.checkRunData();
  },
  methods: {
    convertBatchCodes() {
      for (let x in this.batchTypes) {
        if (this.details.what == this.batchTypes[x].code) {
          this.details.what = this.batchTypes[x].label;
        }
      }
    },
    checkRunData() {
      if (
        this.items.districts.length >= 1 ||
        this.items.schools.length >= 1 ||
        this.items.programs >= 1
      ) {
        this.limitWarning = true;
      } else {
        this.limitWarning = false;
      }
    },
  },
  props: ["items", "batchTypes"],
  computed: {},
};
</script>
<style scoped></style>
