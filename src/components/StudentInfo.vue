<template>
    <div>
      <div style="float:left">
            <div>
              <strong>Graduation Program: </strong
              >{{ studentInfo.gradRequirementYear }}
            </div>
            <div><strong>Grade: </strong>{{ studentInfo.studentGrade }}</div>
            <div><strong>Date of Birth:</strong> {{ studentInfo.studBirth }}</div>
            <div><strong>Sex:</strong> {{ studentInfo.studSex }}</div>
            <!--div><strong>Status: </strong>{{ studentInfo.studentStatus }}</div-->
            <!--div><strong>Archived:</strong> {{ studentInfo.archiveFlag }}</div-->
            <div><strong>School: </strong>{{ studentInfo.schoolName }}</div>
            <div class="">
              <strong>Student Address:</strong>
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

<style>
div{
  float: left;
  padding-right:10px;
}
</style>
