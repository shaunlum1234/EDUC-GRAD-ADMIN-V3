<template>
  <div class="student-profile">
    <SiteMessage v-bind:message="this.displayMessage" v-if="displayMessage"></SiteMessage>
    <!-- Button trigger modal -->
    <div class="row m-0 py-3">    
      <div class="px-0">     
          <table v-if="!smallScreen" class="profile-name">
            <tr>
              <td></td>
              <td class="align-top profile-name-header"><label>PEN</label></td>
              <td class="align-top profile-name-header"><label>Legal surname</label></td>
              <td class="align-top profile-name-header"><label>Legal given</label></td>
              <td class="align-top profile-name-header"><label>Legal middle</label></td>
              <td class="align-top profile-name-header"><label>Birthdate (yyyy-mm-dd)</label></td>
            </tr>
            <tr>
              <td>
                <b-button  v-b-toggle.student-accordion variant="link" v-on:click="moreStudentInfo = !moreStudentInfo">
                  <i class='fas fa-lg fa-caret-down'></i>
                </b-button>
              </td>
              <td class="align-top profile-name-data px-0" v-if="studentFullName.pen"><strong><p class="profile-info">{{ studentFullName.pen }}</p></strong></td>
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
      <div class="col-12 px-3">
        <b-collapse id="student-accordion" class="">
          <b-card no-body class="border-0">
            
              <table class="table table-sm table-striped">
                  <tbody>
                    <tr>
                      <td class="px-2"><strong>Usual surname:</strong> {{studentInfo.usualLastName}}</td>
                      <td class="px-2"><strong>Usual given:</strong> {{studentInfo.usualFirstName}} </td>
                      <td class="px-2"><strong>Usual middle:</strong> {{studentInfo.usualMiddleNames}} </td>
                    </tr>
                    <tr>
                      <td class="px-2"><strong>Sex:</strong> {{studentInfo.sexCode}}</td>
                      <td class="px-2"><strong>Gender:</strong> {{studentInfo.genderCode}}</td>
                      <td class="px-2"><strong>True student ID:</strong> {{studentInfo.trueStudentID}}</td>
                    </tr>
                    <tr>
                      <td class="px-2"><strong>Local ID:</strong> {{studentInfo.localID}}</td>
                      <td class="px-2"><strong>Email:</strong> {{ studentInfo.email}}</td>
                      <td class="px-2"><strong>Postal code:</strong> {{studentInfo.postalCode}}</td>
                    </tr>
                    <tr>
                      <td class="px-2"><strong>Mincode (PEN):</strong> {{studentInfo.mincode}}</td>
                      <td class="px-2"><strong>PEN Status Code:</strong> {{studentInfo.statusCode}}</td>
                      <td class="px-2"><strong>PEN Grade Code:</strong> {{studentInfo.gradeCode}}</td>
                    </tr>
                    <tr>
                      <td class="px-2"><strong>Deceased date:</strong> {{studentInfo.deceasedDate}}</td>
                    </tr>
                  </tbody>
              </table>
          </b-card>
        </b-collapse>
        
                    <b-dropdown  v-b-tooltip.hover.left :title="'Last Run: ' + studentGradStatus.updatedTimestamp + ' by ' +studentGradStatus.updatedBy" id="actions" size="sm" right text="Run graduation algorithm" class="m-md-2 float-right">
                      <b-dropdown-item v-on:click="graduateStudent">Graduate Student</b-dropdown-item>
                      <b-dropdown-item v-on:click="updatedProjectedGradStatus" >Project Graduation</b-dropdown-item>
                      <b-dropdown-item v-b-modal.projectedGradStatusWithRegistrations>Project Graduation with registrations</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item active>Active action</b-dropdown-item>
                      <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                      
                    </b-dropdown>
      </div>
      
    </div>
    <div class="row m-0">
      <div class="col-12 px-0">
        <div>
          <b-card no-body class="p-0" >
            <b-tabs :pills="smallScreen" v-model="selectedTab" card>
                <b-tab title="GRAD" class="gradstatus-tabs py-4">
                    <!-- <a v-on:click="gradTab ='gradStatus'" :class="gradTab == 'gradStatus'? 'link-active':''" href="#">GRAD Status</a> |
                    <a  :class="gradTab == 'gradCourses'? 'link-active':''" href="#">Requirement Details</a> -->
                  <div class="mb-2">
                    <!-- <a href="#" v-on:click="updatedProjectedGradStatus">Update</a> -->
                    <b-button class="mx-2" v-on:click="gradTab ='gradStatus'" size="sm" :variant="gradTab == 'gradStatus'? 'primary':'outline-secondary'">GRAD Status</b-button>
                    <b-button class="mr-2" v-on:click="gradTab ='gradCourses'" size="sm" :variant="gradTab == 'gradCourses'? 'primary':'outline-secondary'">Requirement Details</b-button>

                  </div>   
                  <b-card-text>
                    <div style=" position: absolute; right: 52px; z-index: 5; padding: 20px 5px;">
                      <a v-if="gradTab =='gradStatus'" v-on:click="gradTab ='gradCourses'">Requirement Details <i class="fas fa-expand-arrows-alt"></i></a></div>
                      <b-overlay :show="gradStatusLoading" rounded="sm">
                        <StudentGraduationStatus v-if="gradTab=='gradStatus'"></StudentGraduationStatus>
                        <GRADRequirementDetails v-if="gradTab=='gradCourses'"></GRADRequirementDetails>
                      </b-overlay>
                  </b-card-text>
                </b-tab>
                <b-tab :title="'Courses ('  + courses.length + ')'"  class="py-3 px-0 m-1">
                  <b-card-text>
                    <StudentCourses></StudentCourses>
                  </b-card-text>
                </b-tab>
                <b-tab :title="'Assessments ('  + assessments.length + ')'"  class="py-3 px-0 m-1">
                  <b-card-text>
                    <StudentAssessments />
                  </b-card-text>
                </b-tab>
                <b-tab :title="'Optional Programs ('  + specialPrograms.length + ')'"  class="py-3 px-0 m-1">
                  <b-card-text>
                    <StudentSpecialPrograms></StudentSpecialPrograms>
                  </b-card-text>
                </b-tab>                                   
                <b-tab :title="'Notes ('  + studentNotes.length + ')'" class="py-3 px-0 m-1">
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
    <div>
      <!-- Projected Grad Status Modal -->
      <b-modal size="xl" ref="projectedGradStatusWithRegistrations" title="Projected Grad Status with Registrations
" centered>

        <b-card-group deck>
            <b-card
              header="Requirements Met"
            >
              <b-card-text><b-table small :items="this.projectedGradStatus.requirementsMet"></b-table></b-card-text>
            </b-card>
            <b-card
              header="Nongrad Requirements"
            >
              <b-card-text> <b-table small :items="this.projectedGradStatus.nonGradReasons"></b-table></b-card-text>
            </b-card>

      
          </b-card-group>

        
      </b-modal>
      <b-modal ref="projectedGradStatus" centered title="Projected Grad Status">
          

        
      </b-modal>
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
  import GRADRequirementDetails from "@/components/GRADRequirementDetails";
  import StudentCourses from "@/components/StudentCourses";
  import StudentAssessments from "@/components/StudentAssessments";
  import StudentNotes from "@/components/StudentNotes";
  import StudentGraduationStatus from "@/components/StudentGraduationStatus";
  import StudentSpecialPrograms from "@/components/StudentSpecialPrograms";
  import GraduationService from "@/services/GraduationService.js"


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
      GRADRequirementDetails: GRADRequirementDetails,
      StudentAssessments: StudentAssessments,
      StudentNotes:StudentNotes,
      StudentGraduationStatus: StudentGraduationStatus,
      StudentSpecialPrograms: StudentSpecialPrograms,
    },
    props: {
      pen: {
        type: String,
      }
    },
    data() {
      return { 
        selectedTab: 0,
        projectedGradStatus: [],
        projectedGradStatusWithRegistrations: [],
        gradStatusLoading: false,
        gradTab:"gradStatus",
        show: false,
        opened: [],
        displayMessage: null,
        smallScreen: false,
        window: {
          width: 0,
          height: 0
        },
        courseViewMode: "showAllCourses",
        moreStudentInfo: false,
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
        studentNotes: "getStudentNotes",
        specialPrograms: "getStudentSpecialPrograms",
      
      }),
    },
    
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      run(){
      },
      graduateStudent(){
        this.selectedTab = 0;
        this.gradStatusLoading = true; 
        GraduationService.projectedGradFinalMarks(this.studentId, this.token) .then((response) => {
            console.log(response.data);
            this.gradStatusLoading = false; 
        }).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });

        
      },
      updatedProjectedGradStatus(){

        GraduationService.projectedGradFinalMarks(this.studentId, this.token) .then((response) => {
          
          this.projectedGradStatus = response.data;
          this.projectedGradStatus = JSON.parse(this.projectedGradStatus.graduationStatus.studentGradData);
         console.log(this.projectedGradStatus);
         this.$refs['projectedGradStatusWithRegistrations'].show();
        }).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });
      },
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
  .profile-info button{
    font-size: 29px;
    box-shadow: none !important;
    padding:0px;
    color: #313132
  }
  .profile-info button.btn.btn-link:focus{
    border: none !important;
  
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
  .link-active{
    text-decoration: none;
    border-bottom: 3px solid black;
  }
</style>