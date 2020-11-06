<template>
  <div>
    <div v-show="inputPenMissing">
      <div class="alert alert-dismissible alert-success">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <div class="message">
          <strong
            >"Please select a student on the
            <router-link class="student-list" :to="{ name: 'student-list' }"
              ><a href="#">Student Page</a></router-link
            >
          </strong>
        </div>
      </div>
    </div>
    <SiteMessage
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>
    <!-- Button trigger modal -->

    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-sm-12">
          <h1>Student Course Achievement</h1>
        </div>
        <div class="search-input col-lg-5 col-sm-12">
          <input
            class="form-control"
            v-model="filters.name.value"
            placeholder="Filter by course code"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 student-pen-display">
          <!-- {{ currentStudent }} -->
          <h3 v-if="currentStudent">
            <strong>{{ this.currentStudent.studSurname }}</strong
            >,
            {{ this.currentStudent.studGiven }}
            {{ this.currentStudent.studMiddle }}
            (PEN: {{ this.currentStudent.pen }})
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CourseService from "@/services/CourseService.js";
import CourseAchievementService from "@/services/CourseAchievementService.js";
import SiteMessage from "@/components/SiteMessage";
//import { store } from "@/store.js";
export default {
  props: ["currentStudent"],
  components: {
    SiteMessage: SiteMessage,
  },
  name: "BasicFiltering",
  data() {
    return {
      show: false,
      opened: [],
      achievements: [],
      InputCourse: "",
      student: [],
      courses: [],
      InputPen: "",
      filters: {
        name: { value: "", keys: ["courseCode"] },
      },
      pen: "",
      sessionDate: "",
      finalPercent: "",
      interimPercent: "",
      finalLetterGrade: "",
      credits: "",
      courseId: "",
      courseType: "",
      interimLetterGrade: "",
      currentPage: 1,
      totalPages: 0,
      displayMessage: null,
      modalVisible: null,
      inputPenMissing: false,
    };
  },
  created() {
    this.displayMessage = this.$route.params.message;
    this.student = this.currentStudent;
    if (this.student) {
      this.pen = this.student.pen;
    }
    if (this.student) {
      CourseAchievementService.getStudentCourseAchievements(this.student.pen)
        .then((response) => {
          this.achievements = response.data;
          //console.log('current student achievements: ' + this.achievements);
          this.courses = this.achievements.map((item) => {
            return {
              id: item.courseCode,
              name: item.courseCode,
            };
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {});
      //replace the course ids with names from the courses array
      // CourseService.getCourses()
      //   .then((response) => {
      //     let data = response.data;
      //     this.courses = data.map((item) => {
      //       return {
      //         id: item.courseId,
      //         name: item.courseName,
      //       };
      //     });
      //   })
      // eslint-disable-next-line no-unused-vars
      // .catch((error) => {});
    } else {
      this.inputPenMissing = true;
    }

    //display message to select a student
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;

      CourseAchievementService.addStudentCourseAchievement({
        pen: this.pen,
        sessionDate: this.sessionDate,
        finalPercent: parseInt(this.finalPercent),
        interimPercent: parseInt(this.interimPercent),
        finalLetterGrade: this.finalLetterGrade,
        credits: parseInt(this.credits),
        courseId: this.courseId,
        courseType: this.courseType,
        interimLetterGrade: this.interimLetterGrade,
      })
        .then(function(response) {
          CourseAchievementService.getCourseAchievements()
            .then((response) => {
              currentObj.achievements = response.data;
              currentObj.displayMessage =
                "You have successfully added a Course Achievement";
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
              //console.log("There was an error:" + error.response);
            });
          currentObj.output = response.data;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(function(error) {
          currentObj.output = error;
        });
    },
  },
};
</script>

<style scoped></style>
