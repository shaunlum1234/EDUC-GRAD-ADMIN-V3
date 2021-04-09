<template>
    <div>
      <div class="student-info">
          <div><strong>Birthdate:</strong> {{ studentInfo.dob }}</div>
          <!-- <div><strong>Gender:</strong> {{ studentInfo.studSex }}</div> -->
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
