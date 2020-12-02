<template>
  <div class="container">
    <div style="width: 40%; float:left">
        
        <div v-if="studentGradStatus.gradProgram"><strong>Grad Program</strong> {{ studentGradStatus.gradProgram }}</div>
        <div v-if="studentGradStatus.gradProgramAtGraduation"><strong>Grad Program at Graduation</strong> {{ studentGradStatus.gradProgramAtGraduation }}</div>

        <div v-if="studentGradStatus.graduationDate"><strong>Graduation Date</strong> {{ studentGradStatus.graduationDate }}</div>
        <div v-if="studentGradStatus.gpa"><strong>GPA {{ studentGradStatus.gpa }}</strong></div>
        
        <div v-if="studentGradStatus.sccpGraduationDate">
          <strong>School Completion Certificate Program (SCCP) Graduation Date</strong>{{ studentGradStatus.sccpGraduationDate }}
        </div>


        <div v-if="studentGradStatus.schoolAtGrad"><strong>School at Graduation</strong>{{ studentGradStatus.schoolAtGrad }}</div>
        
        <div v-if="studentGradStatus.studentGradeAtGraduation"><strong>Grade at Graduation</strong>{{ studentGradStatus.studentGradeAtGraduation }}</div>
        
        <h4>Programs</h4>
        <div v-if="studentGradStatus.honoursFlag"><strong>HONORS</strong>{{ studentGradStatus.honoursFlag }}</div>
        <div v-if="studentGradStatus.certificateType1"><strong>Certificate (Type 1)</strong>{{ studentGradStatus.certificateType1 }}</div>
        <div v-if="studentGradStatus.certificateType1Datev">{{ studentGradStatus.certificateType1Datev }}</div>

        <div v-if="studentGradStatus.certificateType2"><strong>Certificate (Type 2)</strong> {{ studentGradStatus.certificateType2 }}</div>
        <div v-if="studentGradStatus.certificateType2Date">{{ studentGradStatus.certificateType2Date }}</div>

        <div v-if="studentGradStatus.frenchProgramParticipation"><strong>French Programs</strong> {{ studentGradStatus.frenchProgramParticipation }}</div>
        <div v-if="studentGradStatus.advancePlacementParticipation"><strong>AP</strong> {{ studentGradStatus.advancePlacementParticipation }}</div>
        <div v-if="studentGradStatus.careerProgramParticipation"><strong>Career Program</strong> {{ studentGradStatus.careerProgramParticipation }}</div>
       
       
       <h4>Status</h4>
        <div v-if="studentGradStatus.recalculateFlag"><strong>Recalculate Flag</strong>{{ studentGradStatus.recalculateFlag }}</div>
        <div v-if="studentGradStatus.dualDogwoodEligibility"><strong>Dual Dogwood</strong>{{ studentGradStatus.dualDogwoodEligibility }}</div>
        <div v-if="studentGradStatus.ibParticipationFlag"><strong>IB</strong>{{ studentGradStatus.ibParticipationFlag }}</div>
        <div v-if="studentGradStatus.transcriptDate"><strong>Transcript Date</strong>{{ studentGradStatus.transcriptDate }}</div>
        <div v-if="studentGradStatus.createdBy"><strong>Created By</strong>{{ studentGradStatus.createdBy }}</div>
        <div v-if="studentGradStatus.createdTimestamp"><strong>Created Timestamp</strong>{{ studentGradStatus.createdTimestamp }}</div>
        <div v-if="studentGradStatus.updatedBy"><strong>Updated By</strong>{{ studentGradStatus.updatedBy }}</div>
        <div v-if="studentGradStatus.updatedTimestamp"><strong>Updated</strong> ({{ studentGradStatus.updatedTimestamp }})</div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StudentGraduationStatus",
  computed: {
    ...mapGetters({
      studentGradStatus: "getStudentGradStatus",
    }),
  },
  created() {},
};
</script>

<style></style>
