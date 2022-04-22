<template>
  <div class="certification-dogwoods pb-2">
    <b-card
      header="Student Certificates/Dogwoods"
      no-body            
      >
      <b-card-text class="py-4">
        <div v-if="certificates">
          <div v-for="(certificate, index) in certificates" :key="index" class="px-3 w-100 float-left">        
            <a @click="downloadPDF(certificate.certificate,'application/pdf')" href="#"  class="pdf-link float-left ">{{certificate.gradCertificateTypeLabel}} (PDF)</a> 
            <span class="float-left pr-3">
              <strong>Status:</strong> {{certificate.documentStatusLabel}} 
              <strong>Last Updated:</strong> {{certificate.createdTimestamp |formatTime}}
              <strong>Distributed:</strong> {{certificate.distributionDate |formatTime}}
            </span>               
          </div>
        </div>
      </b-card-text>
    </b-card> 
  </div> 
</template>

<script>
import { mapGetters } from "vuex";
import sharedMethods from '../sharedMethods';

export default {
  name: "CertificationDogwoods",
  props: {},
  computed: {
    ...mapGetters({
      certificates: "getStudentCertificates"
    })
  },
  methods: {
    downloadPDF: function (data, mimeType) {
      sharedMethods.base64ToPdfAndOpenWindow(data,mimeType)
    },
  }
}

</script>

<style scoped>
.card-body {
border-bottom: 1px solid #ccc;
}
.card {
  margin-bottom: 10px;
}

.card-header {
  font-weight: 700;
}
</style>
