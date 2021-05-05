<template>
  <div>
    <SiteMessage v-bind:message="this.displayMessage" v-if="displayMessage"></SiteMessage>
    <!-- Button trigger modal -->
    <div class="row m-0 float-right">
      
      <div class="row col-md-1 col-12 px-0 ">
        <!-- <b-button v-on:click="closeRecord" variant="primary" size="sm" class="col-6 col-md-12 close-record">
          Close
        </b-button> -->
        <b-dropdown variant="outline-primary" id="dropdown-1" class="col-6 col-md-12 translate-middle close-record" size="sm"
          text="Record details">
          <div v-if="hasGradStatus">
            <b-dropdown-item disabled class="no-underline">Created by: {{ gradInfo.createdBy }}</b-dropdown-item>
            <b-dropdown-item disabled>Created: {{ gradInfo.createdTimestamp }}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item disabled>Updated by: {{ gradInfo.updatedBy }}</b-dropdown-item>
            <b-dropdown-item disabled>Updated: {{ gradInfo.updatedTimestamp }}</b-dropdown-item>
          </div>
          <div v-if="!hasGradStatus" class="">
            This student has no graduation record details.
          </div>
        </b-dropdown>
      </div>
    </div>
    <div class="row m-0 py-3">    
      <div class="col-md-11">     
          <table v-if="!smallScreen" class="profile-name">
            <tr>
              <td class="align-top profile-name-header"><label>PEN</label></td>
              <td class="align-top profile-name-header"><label>Legal surname</label></td>
              <td class="align-top profile-name-header"><label>Legal given</label></td>
              <td class="align-top profile-name-header"><label>Legal middle</label></td>
              <td class="align-top profile-name-header"><label>Birthdate (yyyy-mm-dd)</label></td>
            </tr>
            <tr>
              <td class="align-top profile-name-data" v-if="studentFullName.pen"><strong><p class="profile-info">{{ studentFullName.pen }}</p></strong></td>
              <td class="align-top profile-name-data" v-if="studentFullName.legalLastName"><p class="profile-info">{{ studentFullName.legalLastName }}</p></td>
              <td class="align-top profile-name-data" v-if="studentFullName.legalFirstName"><p class="profile-info">{{ studentFullName.legalFirstName }}</p></td>
              <td class="align-top profile-name-data" v-if="studentFullName.legalMiddleNames"><p class="profile-info">{{ studentFullName.legalMiddleNames }}</p></td>
              <td class="align-top profile-name-data" v-if="!studentFullName.legalMiddleNames"><p class="profile-info"> </p></td>
              <td class="align-top profile-name-data" v-if="studentInfo.dob"><p class="profile-info">{{ studentInfo.dob }}</p></td>
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
            <div v-if="studentInfo.dob" class="p-0 profile-name-data">
              <label>Birthdate(yyyy-mm-dd)</label>
              <h2 class="px-0">{{ studentInfo.dob }}</h2>
            </div>
          </div>
      </div>
     
    </div>
    <div class="row m-0">
      <div class="col-12 px-0">
        <div>
          <b-card no-body class="py-0" v-if="studentHasCourses || studentHasAssessments">
            <b-tabs :pills="smallScreen" card>
                <b-tab title="Graduation Status" class="py-3 px-0 m-1">
                  <b-card-text>
                    
                    <StudentGraduationStatus></StudentGraduationStatus>
                  </b-card-text>
                </b-tab>
      
         <b-tab title="French-Immersion" v-if="studentHasCourses" class="py-3 px-0 m-1">
                  <b-card-text v-if="studentHasCourses">
                      FI	<h2>2018 Graduation Program French Immersion</h2>	2019/06

                      <table data-v-343f71db="" role="table" aria-busy="false" aria-colcount="2" class="table b-table" id="__BVID__155"><!----><!----><thead role="rowgroup" class=""><!----><tr role="row" class=""><th role="columnheader" scope="col" aria-colindex="1" class=""><div>Rule</div></th><th role="columnheader" scope="col" aria-colindex="2" class=""><div>Description</div></th></tr></thead><tbody role="rowgroup"><!----><tr role="row" class=""><td aria-colindex="1" role="cell" class="">200</td><td aria-colindex="2" role="cell" class="">Français langue seconde-immersion 12 - French Immersion </td></tr><tr role="row" class=""><td aria-colindex="1" role="cell" class="">201</td><td aria-colindex="2" role="cell" class="">Français langue seconde-immersion 11 - French Immersion </td></tr><tr role="row" class=""><td aria-colindex="1" role="cell" class="">202</td><td aria-colindex="2" role="cell" class="">Français langue seconde-immersion 10 - French Immersion </td></tr><tr role="row" class=""><td aria-colindex="1" role="cell" class="">204</td><td aria-colindex="2" role="cell" class="">12 Other French credits - French Immersion</td></tr><tr role="row" class=""><td aria-colindex="1" role="cell" class="">205</td><td aria-colindex="2" role="cell" class="">4 Gr 11 or 12 Other French credits - French Immersion</td></tr><!----><!----></tbody><!----></table>
                  </b-card-text>
                </b-tab>



      
                <b-tab title="Courses" v-if="studentHasCourses" class="py-3 px-0 m-1">
                  <b-card-text v-if="studentHasCourses">
                    <StudentCourses></StudentCourses>
                  </b-card-text>
                </b-tab>
                <b-tab title="Assessments" v-if="studentHasAssessments" class="py-3 px-0 m-1">
                  <b-card-text>
                    <StudentAssessments />
                  </b-card-text>
                </b-tab>
                <b-tab title="Notes" v-if="studentHasNotes" class="py-3 px-0 m-1">
                  <b-card-text>
                    <StudentNotes></StudentNotes>
                  </b-card-text>
                </b-tab>
                <b-tab v-if="
                this.courses == 'not loaded' ||
  
                  this.assessments == 'not loaded'
              " title="Loading ..." class="tab-loading py-3 px-0 m-1">
                  <b-card-text class="text-center">Loading Student Courses and Assesments</b-card-text>
                </b-tab>

            </b-tabs>
          </b-card>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import GraduationCommonService from "@/services/GraduationCommonService.js";
  import CourseAchievementService from "@/services/CourseAchievementService.js";
  import StudentService from "@/services/StudentService.js";
  import StudentAssessmentService from "@/services/StudentAssessmentService.js"
  import GraduationStatusService from "@/services/GraduationStatusService.js"
  import SiteMessage from "@/components/SiteMessage";
  import StudentCourses from "@/components/StudentCourses";
  import StudentAssessments from "@/components/StudentAssessments";
  import StudentNotes from "@/components/StudentNotes";
  import StudentGraduationStatus from "@/components/StudentGraduationStatus";


  import {
    mapGetters
  } from "vuex";
  export default {
    name: "studentProfile",
    beforeCreate() {
      //this.closeRecord();
    },
    created() {
      const penFromURL = this.$route.params.pen;
      const studentIdFromURL = this.$route.params.studentId;
      this.loadStudent(penFromURL, studentIdFromURL);
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
      StudentAssessments: StudentAssessments,
      StudentNotes:StudentNotes,
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
        assessments: "getStudentAssessments",
        studentHasCourses: "studentHasCourses",
        studentHasAssessments: "studentHasAssessments",
        studentHasNotes: "studentHasNotes",
        gradInfo: "getStudentGraduationCreationAndUpdate",
        hasGradStatus: "studentHasGradStatus",
        studentGradStatus: "getStudentGradStatus",
        token: "getToken",
        studentId: "getStudentId",
        studentInfo: "getStudentProfile",
      }),
    },
    
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      closeRecord: function () {
        this.$store.commit("unsetStudent");
        // this.$router.push({
        //   name: "student-search"
        // });
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
      loadStudent(pen, studentIdFromURL) {
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

        StudentAssessmentService.getStudentAssessment(pen, this.token).then((response) => {
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

        // StudentExamsService.getStudentExams(pen, this.token).then((response) => {
        //   this.$store.dispatch('setStudentExams', response.data);
        // }).catch((error) => {
        //   if(error.response.status){
        //     this.$bvToast.toast("ERROR " + error.response.statusText, {
        //       title: "ERROR" + error.response.status,
        //       variant: 'danger',
        //       noAutoHide: true,
        //     });
        //   }
        // });
        
        GraduationStatusService.getGraduationStatus(studentIdFromURL, this.token).then(
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
        GraduationStatusService.getGraduationStatusSpecialPrograms(studentIdFromURL, this.token).then(
          (response) => {
                
            console.log(response.data[0]);
                
            this.$store.dispatch("setStudentGradStatusSpecialPrograms", response.data);
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

        GraduationCommonService.getStudentNotes(pen, this.token).then(
          (response) => {           
            this.$store.dispatch("setStudentNotes", response.data);
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