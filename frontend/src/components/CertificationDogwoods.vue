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
              <strong>Last Updated:</strong> {{certificate.createdTimestamp }}
              <strong>Distributed:</strong> {{certificate.distributionDate |formatTime}}
            </span>               
          </div>
        </div>
      </b-card-text>
    </b-card> 
  </div> 
</template>

<script>

export default {
  name: "CertificationDogwoods",
  props: {
    certificates: []
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
