<template>
  <div>
    <ul>
      <li v-if="details.what"><strong>Run Type: </strong>{{details.what}}</li>
      <li v-if="details.who"><strong>Group: </strong>{{details.who}}</li>
      <li v-if="details.copies"><strong>Copies: </strong>{{details.copies}}</li>
      <li v-if="details.credential"><strong>Credential Type: </strong>{{details.credential}}</li>
      <ul>
        <li v-if="details.gradDate"><strong>Grad Date: </strong>{{details.gradDate}}</li>
        <!-- Grad Date -->
          <ul> 
            <li v-if="details.gradDateFrom"><strong>Grad Start Date: </strong>{{details.gradDateFrom}}</li>
            <li v-if="details.gradDateTo"><strong>Grad End Date: </strong>{{details.gradDateTo}}</li>
          </ul>
        <!-- End Grad Date  -->
        <li v-if="details.categoryCode"><strong>School Category: </strong>{{details.categoryCode}}</li>
        <li v-if="programs"><strong>Include Programs: </strong>{{programs}}</li>
        <li v-if="details.psiTransmissionMode"><strong>Transmission Mode: </strong>{{details.psiTransmissionMode}}</li>
        <li v-if="details.psiYear"><strong>PSI Year: </strong>{{details.psiYear}}</li>
        <li v-if="psi"><strong>Post Secondary Institutions: </strong>{{psi}}</li>
        <li v-if="blankCertificateDetails"><strong>Blank Certificate Details: </strong>{{blankCertificateDetails}}</li>
        <li v-if="blankTranscriptDetails"><strong>Blank Transcript Details: </strong>{{blankTranscriptDetails}}</li>
        <li v-if="schools"><strong>Include Schools: </strong>{{schools}}</li>
        <li v-if="students"><strong>Include Students: </strong>{{students}}</li>
        <li v-if="districts"><strong>Include Districts: </strong>{{districts}}</li>
      </ul> 
      <li v-if="details.where"><strong>Where: </strong>{{details.where}}</li>
    </ul>
    <br>
    ---------------------------------------------
    <br>
    {{items}}
  </div>
</template>
<script>

export default {
  components: {
  },
  data: function () {
    return {
      details:'', 
      students:[],
      schools:[],
      districts:[],
      programs:[],
      blankTranscriptDetails:[],
      blankCertificateDetails:[],
      psi:[],
    }
  },
  mounted(){
  },
  created() {
    this.details = this.items.details
    this.students = this.items.students
    this.schools = this.items.schools
    this.districts = this.items.districts
    this.programs = this.items.programs
    this.blankTranscriptDetails = this.items.blankTranscriptDetails
    this.blankCertificateDetails = this.items.blankCertificateDetails
    this.psi = this.items.psi
  },
  methods: {

  },
  props: 
    [
        "items",
    ]
  ,  
  computed: {
   
  },
};

</script>
<style scoped></style>
