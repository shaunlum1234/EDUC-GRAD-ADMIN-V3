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
            <!-- {{ studentInfo }} -->
            <div class="card" style="width: 100%">
              <div class="card-body">
                <h2 class="card-title">{{ studentInfo.pen }}</h2>
                <h3 class="card-subtitle mb-2 text-muted">
                  {{ studentInfo.studSurname }}, {{ studentInfo.studGiven }}
                  {{ studentInfo.studMiddle }}
                </h3>
                <ul>
                  <li>
                    <strong>Graduation Program: </strong>{{ studentInfo.gradRequirementYear }}
                  </li>
                  <li>
                    <strong>Grade: </strong>{{ studentInfo.studentGrade }}
                  </li>
                  <li>
                    <strong>Date of Birth:</strong> {{ studentInfo.studBirth }}
                  </li>
                  <li><strong>Sex:</strong> {{ studentInfo.studSex }}</li>
                  <li>
                    <strong>Status: </strong>{{ studentInfo.studentStatus }}
                  </li>
                  <li>
                    <strong>Archived:</strong> {{ studentInfo.archiveFlag }}
                  </li>
                  <li><strong>School: </strong>{{ studentInfo.schoolName }}</li>
                  <li>
                    <strong>Student Address:</strong><br />
                    {{ studentInfo.address1 }} {{ studentInfo.address2 }}<br />
                    {{ studentInfo.city }}, {{ studentInfo.provinceCode }}
                    {{ studentInfo.provinceName }}<br />
                    {{ studentInfo.postalCode }}, {{ studentInfo.countryCode }}
                    {{ studentInfo.countryName }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2>Courses</h2>
            {{ studentCourses }}
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
    CourseAchievementService.getStudentCourseAchievements(studentPen).then(
      (response) => {
        console.log(response.data);
        this.studentCourses = response.data;
      }
    );

    // CourseAchievementService.getStudentCourseAchievements(this.student.pen)
    //   .then((response) => {
    //     this.achievements = response.data;
    //     //console.log('current student achievements: ' + this.achievements);
    //   })
    //   .catch((error) =>{
    //     console.log(error);
    //   });

    //display message to select a student
  },
  methods: {
  }
};
</script>

<style scoped></style>
