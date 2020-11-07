<template>
  <div>
    <SiteMessage
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>
    <!-- Button trigger modal -->

    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-sm-12">
          <h1>Student Profile</h1>
          <div>
              <h2>Student information</h2>
              {{ studentInfo }}

          </div>
          <div>
              <h2>Courses</h2>
              <StudentCourses :studentcourses="this.studentCourses"/>
          </div>          
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
// import CourseService from "@/services/CourseService.js";
import StudentService from "@/services/StudentService.js";

import CourseAchievementService from "@/services/CourseAchievementService.js";
import SiteMessage from "@/components/SiteMessage";
import StudentCourses from "@/components/StudentCourses";
//import StudentInfo from "@/components/StudentInfo.js";
//import { store } from "@/store.js";
export default {
  props: ["studentPen"],
  components: {
    SiteMessage: SiteMessage,
    StudentCourses: StudentCourses,
    
  },
  data() {
    return {
      show: false,
      opened: [],
      studentCourses: [],
      studentAseessments: [],
      studentInfo: [],
      displayMessage: null,
    };
  },
  created() {
    
      //Load student Data into studentInfo:
      let studentPen = this.$route.params.studentPen;
      try {
        StudentService.getStudentByPen(studentPen).then((response) => {
          this.studentInfo = response.data;
        });
      } catch (error) {
        console.log("Error with webservice");
      }
      //Load Course Data into studentCourses:
      let currentObj = this;
      CourseAchievementService.getStudentCourseAchievements(studentPen)
        .then((response) => {
          console.log(response);

          currentObj.studentCourses = response;
        })

 

    //display message to select a student
  },
  methods: {
  }
};
</script>

<style scoped></style>
