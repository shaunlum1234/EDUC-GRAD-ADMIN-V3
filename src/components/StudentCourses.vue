<template>
  <div class="container">
    <h1>Student Courses</h1>
    {{ courses }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StudentCourses",
  props: {
  },
  computed: {
    ...mapGetters({
      courses: "getStudentCourses"
    }),
  },
  data: function () {
    return{
      courseList: [],
    }
  },
  created() {
    //Check for any messages from routes
  }

};
</script>

<style></style>
