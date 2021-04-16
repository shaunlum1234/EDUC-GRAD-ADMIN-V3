<template>
  <div>
    <SiteMessage v-bind:message="this.displayMessage" v-if="displayMessage"></SiteMessage>
    <!-- Button trigger modal -->
    <div class="row p-3 m-0">
      <div class="col-md-11 col-12">
          
          <table v-if="!smallScreen" class="profile-name">
            <tr>
              <td class="align-top profile-name-header"><label>PEN</label></td>
              <td class="align-top profile-name-header"><label>Legal surname</label></td>
              <td class="align-top profile-name-header"><label>Legal given</label></td>
              <td class="align-top profile-name-header"><label>Legal middle</label></td>
            </tr>
            <tr>
              <td class="align-top profile-name-data" v-if="studentFullName.pen"><strong><p class="profile-info">{{ studentFullName.pen }}</p></strong></td>
              <td class="align-top profile-name-data" v-if="studentFullName.legalLastName"><p class="profile-info">{{ studentFullName.legalLastName }}</p></td>
              <td class="align-top profile-name-data" v-if="studentFullName.legalFirstName"><p class="profile-info">{{ studentFullName.legalFirstName }}</p></td>
              <td class="align-top profile-name-data" v-if="studentFullName.legalMiddleNames"><p class="profile-info">{{ studentFullName.legalMiddleNames }}</p></td>
            </tr>
          </table>
          <div v-if="smallScreen" class="profile-name">
            <div v-if="studentFullName.pen" class="p-0 profile-name-data">
              <label>PEN</label>
              <h2 class="px-0">{{ studentFullName.pen }}</h2>
            </div>
            <div v-if="studentFullName.legalLastName" class="p-0 profile-name-data">
              <label>Legal surname</label>
              <h2 class="px-0">{{ studentFullName.legalLastName }}</h2>
            </div>
            <div v-if="studentFullName.legalFirstName" class="p-0 profile-name-data">
              <label>Legal given</label>
              <h2 class="px-0">{{ studentFullName.legalFirstName }}</h2>
              
            </div>
            <div v-if="studentFullName.legalMiddleNames" class="p-0 profile-name-data">
              <label>Legal middle</label>
              <h2 class="px-0">{{ studentFullName.legalMiddleNames }}</h2>
            </div>
          </div>

        
        <StudentInfo />
      </div>
      <div class="col-md-1 col-12">
        <div class="row px-0">
          <b-button v-on:click="closeRecord" variant="primary" size="sm" class="col-6 col-md-12 close-record">
            Close
          </b-button>
          <!-- <b-dropdown variant="outline-primary" id="dropdown-1" class="col-6 col-md-12 px-0 close-record" size="sm"
            text="Record details">
            <div v-if="hasGradStatus">
              <b-dropdown-item disabled class="no-underline">Created by: {{ gradInfo.createdBy }}</b-dropdown-item>
              <b-dropdown-item disabled>Created: {{ gradInfo.createdTimestamp }}</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item disabled>Updated by: {{ gradInfo.updatedBy }}</b-dropdown-item>
              <b-dropdown-item disabled>Updated: {{ gradInfo.updatedTimestamp }}</b-dropdown-item>
            </div>
            <div v-if="!hasGradStatus" class="p-3">
              This student has no graduation record details.
            </div>
          </b-dropdown> -->
        </div>

      </div>
    </div>
    <div class="row col-12 p-3 m-0">
      <div class="col-4" v-if="!smallScreen">
        <StudentGraduationStatus />
      </div>
      <div class="col-md-12 col-lg-8 px-0">
        <div>
          <b-card class="py-1" v-if="studentHasCourses || studentHasAssessments || studentHasExams">
            <b-tabs :pills="smallScreen">
                <b-tab v-if="smallScreen" title="Graduation Status" class="py-3 px-0 m-1 " ref="studentCoursesTab">
                  <b-card-text>
                    
                    <StudentGraduationStatus></StudentGraduationStatus>
                  </b-card-text>
                </b-tab>
      
                <b-tab title="Courses" v-if="studentHasCourses" class="py-3 px-0 m-1">
                  <b-card-text v-if="studentHasCourses">
                    <StudentCourses></StudentCourses>
                  </b-card-text>
                </b-tab>
                
                <!-- <b-tab v-if="studentHasCourses" title="Requirements Met" class="py-3 px-0 m-1">
                  <b-card-text v-if="studentHasCourses">
                    
                      <h2>Course Requirements Met</h2>
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>Course Code</th>
                            <th>Course Level</th>
                            <th>Course Name</th>
                            <th>Session Date</th>
                            <th>Grad Req Met</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-for="(course,i) in studentGradStatus.studentGradData.studentCourses.studentCourseList">
                            <tr v-if="course.gradReqMet" :key="i">
                              <td scope="row">{{ course.courseCode }}</td>
                              <td scope="row">{{ course.courseLevel}}</td>
                              <td scope="row">{{ course.courseName }}</td>
                              <td scope="row">{{ course.sessionDate}}</td>
                              <td scope="row">{{ course.gradReqMet}}</td>
                            </tr>
                          </template>
                        </tbody>
                      </table>

                   

                  </b-card-text>
                </b-tab> -->
 
                <b-tab title="Assessments" v-if="studentHasAssessments" class="py-3 px-0 m-1">
                  <b-card-text>
                    <StudentAssessments />
                  </b-card-text>
                </b-tab>
                <b-tab title="Exams" v-if="studentHasExams" class="py-3 px-0 m-1">
                  <b-card-text>
                    <StudentExams />
                  </b-card-text>
                </b-tab>
                <b-tab v-if="
                this.courses == 'not loaded' ||
                  this.exams == 'not loaded' ||
                  this.assessments == 'not loaded'
              " title="Loading ..." class="tab-loading py-3 px-0 m-1">
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

  import {
    mapGetters
  } from "vuex";
  export default {
    name: "studentProfile",
    created() {
      const penFromURL = this.$route.params.pen;
      this.loadStudent(penFromURL);
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (this.window.width < 960) {
        this.smallScreen = true;
      }
      window.addEventListener('resize', this.handleResize);
      this.handleResize();

    },
    components: {
      SiteMessage: SiteMessage,
      StudentCourses: StudentCourses,
      StudentInfo: StudentInfo,
      StudentExams: StudentExams,
      StudentAssessments: StudentAssessments,
      StudentGraduationStatus: StudentGraduationStatus,
    },
    props: {
      pen: {
        type: String,
      }
    },
    data() {
      return {
        show: false,
        opened: [],
        displayMessage: null,
        smallScreen: false,
        window: {
          width: 0,
          height: 0
        },
        courseViewMode: "showAllCourses",
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
        gradInfo: "getStudentGraduationCreationAndUpdate",
        hasGradStatus: "studentHasGradStatus",
        studentGradStatus: "getStudentGradStatus",
        token: "getToken"
      }),
    },
    
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      closeRecord: function () {
        this.$store.commit("unsetStudent");
        this.$router.push({
          name: "student-search"
        });
      },
      handleResize() {

        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        if (this.window.width < 992) {
          //md
          this.smallScreen = true;
        } else {
          this.smallScreen = false;
        }
      },
      loadStudent(pen) {
        StudentService.getStudentByPen(pen, this.token).then((response) => {
          this.$store.dispatch('setStudentProfile', response.data);
        }).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });

        AssessmentService.getStudentAssessment(pen, this.token).then((response) => {
          this.$store.dispatch('setStudentAssessments', response.data);
        }).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });

        StudentExamsService.getStudentExams(pen, this.token).then((response) => {
          this.$store.dispatch('setStudentExams', response.data);
        }).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });

        GraduationStatusService.getGraduationStatus(pen, this.token).then(
          (response) => {
            this.$store.dispatch("setStudentGradStatus", response.data);
          }
        ).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });
        CourseAchievementService.getStudentCourseAchievements(pen, this.token).then(
          (response) => {
            
            this.$store.dispatch("setStudentCourses", response.data);
          }
        ).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });
      },





    },
  };
</script>

<style scoped>
  .profile-info{
    font-size: 29px;

  }
  
  .close-record {
    float: right;
    text-align: center;
  }

  .close-record .dropdown-menu.show {
    left: -120px !important;
  }

  .tab-loading {
    color: green !important;
  }

  .student-info {
    margin: 10px 0px;
    float: left;
  }

  .card {
    border-radius: 0px !important;
  }

  header.card-header button {
    border-radius: 0px !important;
  }

  .no-underline {
    text-decoration: none;
  }
  .profile-name-data{
    word-break: break-all;
    max-width:400px;
  }
  .profile-name label {
    font-size: 11px;
    float: left;
    clear: both;
    padding: 5px 0;
    margin-bottom: 0px;
    width: 100%;
    color: #036;
    border-bottom: 1px dotted #ccc;
  }
  .profile-name td {
      padding: 0px 10px
  }

  #filter-dropdown {
    position: absolute;
    right: 0;
    top: 0;
  }

</style>