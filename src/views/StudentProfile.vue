<template>
  <div>
    <SiteMessage
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>
    <!-- Button trigger modal -->

    <div class="row p-3 m-0">
        <div class="col-9">
          <h1 class="profile-name">
            {{ studentFullName }}
            
          </h1>
          <StudentInfo />
        </div>
        <div class="col-3">
          <button v-on:click="closeRecord" class="btn btn-primary">
            <i class="far fa-times-circle"></i> Close record
          </button>
                 {{gradInfo}}
      
          <ul class="my-2 list-unstyled">
            <li class="pb-1">Created by:</li>
            <li class="pb-1">Created:</li>
            <li class="pb-1">Updated by:</li>
            <li>Updated:</li>
          </ul>
        </div>
      </div>

    <div class="row col-12 p-3 m-0">
      

      <div class="col-4" v-if="!smallScreen">
        <StudentGraduationStatus />
      </div>
      <div class="col-8 px-0">
      <div>
        <b-card class="py-1">
          <b-tabs>
            <transition name="fade">
              <b-tab
                v-if="smallScreen"
                title="Graduation Status"
                class="py-3 px-0 m-1" 
                ref="studentCoursesTab"
              >
                <b-card-text><StudentGraduationStatus /></b-card-text>
              </b-tab>
            </transition>            
            <transition name="fade">
              <b-tab
                v-if="studentHasCourses"
                title="Courses"
                class="py-3 px-0 m-1"
              >
                <b-card-text><StudentCourses /></b-card-text>
              </b-tab>
            </transition>
            <transition name="fade">
              <b-tab
                title="Assessments"
                v-if="studentHasAssessments"
                class="py-3 px-0 m-1"
              >
                <b-card-text><StudentAssessments /></b-card-text>
              </b-tab>
            </transition>
            <b-tab
              title="Exams"
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
              <b-card-text class="text-center">Loading Student Courses, Exams and Assesments</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
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
import StudentGraduationStatus from "@/components/StudentGraduationStatus";
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
    StudentGraduationStatus: StudentGraduationStatus,
  },
  data() {
    return {
      show: false,
      opened: [],
      displayMessage: null,
      smallScreen: false,
      token: "hey",
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
      gradInfo: "getStudentGraduationCreationAndUpdate"
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
.student-info{
  margin: 10px 0px;
  float:left;
}
.card{
  border-radius: 0px !important;
}
header.card-header button{
  border-radius: 0px !important;
}

</style>
