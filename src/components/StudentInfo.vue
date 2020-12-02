<template>
  <div class="container card">
    <div>
      <div style="float:left">
        <h1> {{ studentInfo.firstName}}{{studentInfo.lastName}} </h1>
            <div>
              <strong>Graduation Program: </strong
              >{{ studentInfo.gradRequirementYear }}
            </div>
            <div><strong>Grade: </strong>{{ studentInfo.studentGrade }}</div>
            <div><strong>Date of Birth:</strong> {{ studentInfo.studBirth }}</div>
            <div><strong>Sex:</strong> {{ studentInfo.studSex }}</div>
            <div><strong>Status: </strong>{{ studentInfo.studentStatus }}</div>
            <div><strong>Archived:</strong> {{ studentInfo.archiveFlag }}</div>
            <div><strong>School: </strong>{{ studentInfo.schoolName }}</div>
            <div>
              <strong>Student Address:</strong><br />
              {{ studentInfo.address1 }} {{ studentInfo.address2 }}<br />
              {{ studentInfo.city }}, {{ studentInfo.provinceCode }}
              {{ studentInfo.provinceName }}<br />
              {{ studentInfo.postalCode }}, {{ studentInfo.countryCode }}
              {{ studentInfo.countryName }}
            </div>
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

<style>
div{
  float: left;
  padding-right:10px;
}
</style>
