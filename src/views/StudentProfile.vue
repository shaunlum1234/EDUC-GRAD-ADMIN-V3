<template>
  <div>
    <SiteMessage
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>
    <!-- Button trigger modal -->
    <div class="row p-3 m-0 ">
        <div class="col-md-10 col-12">
          <h1 class="profile-name">
            {{ studentFullName }}
          </h1>
          <StudentInfo />
        </div>
        <div class="col-md-2 col-12">
          <div class="row px-0">
            <b-button v-on:click="closeRecord" variant="primary" size="sm" class="col-6 close-record">
              <i class="far fa-times-circle"></i> Close
            </b-button>
            <b-dropdown variant="outline-primary" id="dropdown-1" class="col-6 close-record" size="sm"  text="Record details" >
              <b-dropdown-item disabled class="no-underline">Created by: {{ gradInfo.createdBy }}</b-dropdown-item>
              <b-dropdown-item disabled>Created: {{ gradInfo.createdTimestamp }}</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item disabled>Updated by: {{ gradInfo.updatedBy }}</b-dropdown-item>
              <b-dropdown-item disabled>Updated: {{ gradInfo.updatedTimestamp }}</b-dropdown-item>
            </b-dropdown>
          </div>

        </div>
      </div>

    <div class="row col-12 p-3 m-0">
      

      <div class="col-4" v-if="!smallScreen">
        <StudentGraduationStatus />
      </div>
      <div class="col-md-12 col-lg-8 px-0">
      <div>
        <b-card class="py-1">
          <b-tabs>
            <transition name="fade">
              <b-tab
                v-if="smallScreen"
                title="Graduation Status"
                class="py-3 px-0 m-1 " 
                ref="studentCoursesTab"
              >
                <b-card-text><StudentGraduationStatus /></b-card-text>
              </b-tab>
            </transition>            
            <transition name="fade">
              <b-tab
                title="Courses"
                class="py-3 px-0 m-1"
              >
                <b-card-text v-if="!studentHasCourses">Loading Student Courses <b-spinner variant="success" label="Spinning"></b-spinner></b-card-text>
                <b-card-text v-if="studentHasCourses"><StudentCourses /></b-card-text>
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
import CourseAchievementService from "@/services/CourseAchievementService.js";
import StudentService from "@/services/StudentService.js";
import StudentExamsService from "@/services/StudentExamsService.js";
import AssessmentService from "@/services/AssessmentService.js"
import GraduationStatusService from "@/services/GraduationStatusService.js"
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
  props:{
    pen:{
      type:String,
    }
  },
  data() {
    return {
      show: false,
      opened: [],
      displayMessage: null,
      smallScreen: false,
      token: "no token",
      window: {
        width: 0,
        height: 0
      }
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
      const penFromURL = this.$route.params.pen;
      console.log("PEM FRP< URL" + penFromURL);
      this.loadStudent( penFromURL);
 
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
    if(this.window.width < 960){
      this.smallScreen = true;
    }
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    
  },
   destroyed() {
        window.removeEventListener('resize', this.handleResize);
   },
  methods: {
    closeRecord: function() {
      this.$store.commit("unsetStudent");
      this.$router.push({ name: "student-search" });
    },
    handleResize() {
      
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      console.log("resize" + this.window.width  + " " + this.window.height + this.smallScreen) ;
      if(this.window.width < 992){
        //md
        this.smallScreen = true;
      }else{
        this.smallScreen = false;
      }
    },

    loadStudent(pen) {
      StudentService.getStudentByPen(pen,localStorage.getItem('jwt')).then((response) => {
        this.$store.dispatch('setStudentProfile', response.data);
      });

      AssessmentService.getStudentAssessment(pen,localStorage.getItem('jwt')).then((response) => {
          this.$store.dispatch('setStudentAssessments', response.data);
      });

      StudentExamsService.getStudentExams(pen,localStorage.getItem('jwt')).then((response) => {
        this.$store.dispatch('setStudentExams', response.data);
      })

      CourseAchievementService.getStudentCourseAchievements(pen, localStorage.getItem('jwt')).then(
        (response) => {
          this.$store.dispatch("setStudentCourses", response.data);
        }
      );
       GraduationStatusService.getGraduationStatus(pen, localStorage.getItem('jwt')).then(
        (response) => {
          this.$store.dispatch("setStudentGradStatus", response.data);
        }
      );
    }

   

    
  },
};
</script>

<style scoped>
.close-record {
  float: right;
  width: 125px;
  text-align:center;
}
.close-record .dropdown-menu.show{
    left: -120px !important;
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
.no-underline {
  text-decoration: none;
}

</style>
