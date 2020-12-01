<template>
  <div class="container">

    <h2>Graduation Status</h2>
        <div v-if="studentGradStatus.gradProgram"><strong>Grad Program</strong> {{ studentGradStatus.gradProgram }}</div>
        <div>Graduation Date {{ studentGradStatus.graduationDate }}</div>
        <div>SCCP Graduation Date{{ studentGradStatus.sccpGraduationDate }}</div>
        <div>School at Graduation{{ studentGradStatus.schoolAtGrad }}</div>
        <div>Grad Program at Graduation {{ studentGradStatus.gradProgramAtGraduation }}</div>
        <div>Grade at Graduation{{ studentGradStatus.studentGradeAtGraduation }}</div>
        <div>GPA {{ studentGradStatus.gpa }}</div>
        <div>HONORS{{ studentGradStatus.honoursFlag }}</div>
        <div>Certificate (Type 1){{ studentGradStatus.certificateType1 }}</div>
        <div>{{ studentGradStatus.certificateType1Datev }}</div>

        <div>Certificate (Type 2) {{ studentGradStatus.certificateType2 }}</div>
        <div>{{ studentGradStatus.certificateType2Date }}</div>

        <div>French Programs {{ studentGradStatus.frenchProgramParticipation }}</div>
        <div>AP {{ studentGradStatus.advancePlacementParticipation }}</div>
        <div>Career Program {{ studentGradStatus.careerProgramParticipation }}</div>
        <div>{{ studentGradStatus.recalculateFlag }}</div>
        <div>{{ studentGradStatus.dualDogwoodEligibility }}</div>
        <div>{{ studentGradStatus.ibParticipationFlag }}</div>
        <div>{{ studentGradStatus.transcriptDate }}</div>
        <div>{{ studentGradStatus.createdBy }}</div>
        <div>{{ studentGradStatus.createdTimestamp }}</div>
        <div>{{ studentGradStatus.updatedBy }}</div>
        <div>Updated ({{ studentGradStatus.updatedTimestamp }})</div>
        
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
