<template>
  <div>
    <SiteMessage
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>
    <!-- Button trigger modal -->

    <div class="container">
      <h1 class="profile-name">
        {{ studentFullName }}
        <button v-on:click="closeRecord" class="btn btn-primary close-record">
          <i class="far fa-times-circle"></i> Close Student Record
        </button>
      </h1>
      <div>
        <b-card no-body>
          <b-tabs card>
            <transition name="fade">
              <b-tab title="Student Profile" class="py-3 px-0 m-1">
                <b-card-text><StudentInfo /></b-card-text>
              </b-tab>
            </transition>
            <transition name="fade">
              <b-tab
                v-if="studentHasCourses"
                title="Student Courses"
                class="py-3 px-0 m-1"
              >
                <b-card-text><StudentCourses /></b-card-text>
              </b-tab>
            </transition>
            <transition name="fade">
              <b-tab
                title="Student Assessments"
                v-if="studentHasAssessments"
                class="py-3 px-0 m-1"
              >
                <b-card-text><StudentAssessments /></b-card-text>
              </b-tab>
            </transition>
            <b-tab
              title="Student Exams"
              v-if="studentHasExams"
              class="py-3 px-0 m-1"
            >
              <b-card-text><StudentExams /></b-card-text>
            </b-tab>
            <b-tab
              v-if="
                this.courses == 'not loaded' ||
                  this.exams == 'not loaded' ||
                  this.assessments == 'not loaded'
              "
              title="Loading ..."
              class="tab-loading py-3 px-0 m-1"
            >
              <b-card-text>Loading student Exams and Assesments</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// import CourseService from "@/services/CourseService.js";
import SiteMessage from "@/components/SiteMessage";
import StudentCourses from "@/components/StudentCourses";
import StudentInfo from "@/components/StudentInfo";
import StudentExams from "@/components/StudentExams";
import StudentAssessments from "@/components/StudentAssessments";
import { mapGetters } from "vuex";
//import { store } from "@/store.js";
export default {
  name: "studentProfile",
  components: {
    SiteMessage: SiteMessage,
    StudentCourses: StudentCourses,
    StudentInfo: StudentInfo,
    StudentExams: StudentExams,
    StudentAssessments: StudentAssessments,
  },
  data() {
    return {
      show: false,
      opened: [],
      displayMessage: null,
    };
  },
  computed: {
    ...mapGetters({
      profile: "getStudentProfile",
      courses: "getStudentCourses",
      studentFullName: "getStudentFullName",
      exams: "getStudentExams",
      assessments: "getStudentAssessments",
      studentHasCourses: "studentHasCourses",
      studentHasAssessments: "studentHasAssessments",
      studentHasExams: "studentHasExams",

    }),
  },
  created() {
    //Load student Data into studentInfo:
  },
  methods: {
    closeRecord: function() {
      this.$store.commit("unsetStudent");
      this.$router.push({ name: "student-search" });
    },
  },
};
</script>

<style scoped>
.close-record {
  float: right;
}
.tab-loading {
  color: green !important;
}
.profile-name{
  padding-bottom: 10px;
}
</style>
