<template>
  <div class="container">
    <h1>Student Courses</h1>
    <v-table
      :data="achievements"
      :filters="filters"
      class="table table-sm table-hover table-striped text-center align-middle"
    >
      <thead slot="head" class="thead-dark">
        <v-th sortKey="courseCode">Code</v-th>
        <v-th sortKey="courseLevel">Level</v-th>
        <v-th sortKey="sessionDate">Session</v-th>
        <!-- not sure -->
        <v-th sortKey="courseName">Name</v-th>
        <!-- not sure -->
        <v-th sortKey="courseEquivChal">Equiv, Chal</v-th>
        <v-th sortKey="credits">Credits</v-th>
        <v-th sortKey="interimPercent">Interim %</v-th>
        <v-th sortKey="interimLetterGrade">Interim LG</v-th>
        <v-th sortKey="completedCourseLetterGrade">Final %</v-th>
        <v-th sortKey="completedCoursePercentage">Final LG</v-th>
      </thead
    </v-table>
    >
  </div>
</template>

<script>
export default {
  name: "StudentCourses",
};
</script>

<style></style>
