<template>
    <div>
      <div class="student-info">
          <div>
            <strong>Program: </strong
            >{{ studentInfo.gradRequirementYear }}
          </div>
          <div><strong>Grade: </strong>{{ studentInfo.studentGrade }}</div>
          <div><strong>Birthdate:</strong> {{ studentInfo.studBirth }}</div>
          <div><strong>Gender:</strong> {{ studentInfo.studSex }}</div>
          <!--div><strong>Status: </strong>{{ studentInfo.studentStatus }}</div-->
          <!--div><strong>Archived:</strong> {{ studentInfo.archiveFlag }}</div-->
          <div><strong>School: </strong>{{ studentInfo.schoolName }}</div>
          <div class="">
            <strong>Student address:</strong>
            {{ studentInfo.address1 }} {{ studentInfo.address2 }}
            {{ studentInfo.city }}, {{ studentInfo.provinceCode }}
            {{ studentInfo.provinceName }}
            {{ studentInfo.postalCode }}, {{ studentInfo.countryCode }}
            {{ studentInfo.countryName }}
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StudentInfo",
  computed: {
    ...mapGetters({
      studentInfo: "getStudentProfile",
    }),
  },
  created() {},
};
</script>

<style scoped>
.student-info div {
  float: left;
  padding-right:10px;
}
.student-info {
  float:left;
  margin: 10px 0px 20px 0px;
}
</style>
