<template>
  <div class="container">
    <h1>Student Courses</h1>
    {{ this.$route.params.studentcourses}}
  </div>
</template>

<script>
export default {
  name: "StudentCourses",
  props: {
    studentcourses: [],
  },
  data: function () {
    return{
      courseList: [],
    }
  },
  created() {
    //Check for any messages from routes
    this.courseList = this.$route.params.studentcourses;
    console.log(this.$route.params.studentcourses);
  }

};
</script>

<style></style>
