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
            <!-- {{studentInfo}} -->
              <table class="table table-sm table-striped">
                  <tbody>
                    <tr>
                      <td class="px-2"><strong>Usual surname:</strong> {{studentInfo.usualLastName}}</td>
                      <td class="px-2"><strong>Usual given:</strong> {{studentInfo.usualFirstName}} </td>
                      <td class="px-2"><strong>Usual middle:</strong> {{studentInfo.usualMiddleNames}} </td>
                    </tr>
                    <tr>
                      <td class="px-2"><strong>Gender:</strong> {{studentInfo.genderCode}}</td>
                      <td class="px-2"><strong>True student ID:</strong> {{studentInfo.trueStudentID}}</td>
                      <td class="px-2"><strong>Local ID:</strong> {{studentInfo.localID}}</td>
                    </tr>
                    <tr>     
                      <td class="px-2"><strong>PEN Status Code:</strong> {{studentInfo.statusCode}}</td>
                      <td class="px-2"><strong>Postal code:</strong> {{studentInfo.postalCode}}</td>
                      <td class="px-2" v-if="studentInfo.studentStatus == 'D'"><strong>Deceased date:</strong> {{studentInfo.deceasedDate}}</td>
                    </tr>              
                  </tbody>
              </table>
          </b-card>
        </b-collapse>
          <div class="float-right grad-actions">
            <b-spinner v-if="tabLoading" class="px-1 my-2" ></b-spinner> 
            <b-dropdown :disabled="tabLoading || !hasGradStatus" v-b-tooltip.hover.left id="actions" right :text="smallScreen?'':'Run Graduation Algorithm'" class="m-md-2 float-right admin-gear-w-text">
            <!-- <b-dropdown  :disabled="tabLoading || !hasGradStatus" v-b-tooltip.hover.left id="actions" right text="Run Graduation Algorithm" class="m-md-2 float-right admin-gear"> -->
              <b-dropdown-item v-on:click="graduateStudent" v-if="!studentGradStatus.programCompletionDate">Graduate Student</b-dropdown-item>
              <b-dropdown-item v-if="studentGradStatus.programCompletionDate" v-b-modal.ungraduate-student-modal>Ungraduate Student</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item v-on:click="projectedGradStatusWithFinalMarks">Projected final marks</b-dropdown-item>
              <b-dropdown-item v-on:click="projectedGradStatusWithFinalAndReg" >Projected final marks and registrations</b-dropdown-item>
                <b-dropdown-item v-on:click="updateStudentReports">Update Student Reports</b-dropdown-item>
            </b-dropdown>
          </div>
      </div>
      
    </div>
    <div class="row m-0">
      <div class="col-12 px-0">
        <div>
          <b-card no-body class="p-0" >
            <b-tabs :pills="smallScreen" v-model="selectedTab" card>
                <b-tab title="GRAD" class="grad-tab gradstatus-tabs py-4">
                  <div class="mb-2 row">
                    <div class="col-12 col-md-4 m-0 p-0">
                      <b-button class="mx-2" v-on:click="gradTab ='gradStatus'" size="sm" :variant="gradTab == 'gradStatus'? 'primary':'outline-secondary'">GRAD Status</b-button>
                      <b-button class="mr-2" v-on:click="gradTab ='gradCourses'" size="sm" :variant="gradTab == 'gradCourses'? 'primary':'outline-secondary'">Requirement Details</b-button>
                    </div>
                    <div class="col-12 col-md-8 text-right"><strong>Updated:</strong> {{ studentGradStatus.updateDate|formatTime }} by {{ studentGradStatus.updateUser }}</div>

                  </div>   
                  <b-card-text>
                    
                    <StudentGraduationStatus v-if="gradTab=='gradStatus'"></StudentGraduationStatus>
                    <GRADRequirementDetails v-if="gradTab=='gradCourses'">
                      <b-alert variant="info" :show="!studentGradStatus.recalculateGradStatus">{{studentGradStatus.studentGradData.gradMessage}}</b-alert>
                    </GRADRequirementDetails>
                    <b-overlay :show="tabLoading" rounded="sm" no-wrap></b-overlay>
                  </b-card-text>
                </b-tab>
                <b-tab v-if="courses != 'not loaded'" :title="'Courses ('  + courses.length + ')'"  class="py-3 px-0 m-1">
                  <b-card-text>
                    
                    <StudentCourses></StudentCourses>
                    <b-overlay :show="tabLoading" rounded="sm" no-wrap>
                    </b-overlay>
                  </b-card-text>
                </b-tab>
                <b-tab v-if="assessments != 'not loaded'"  :title="'Assessments ('  + assessments.length + ')'"  class="py-3 px-0 m-1">
                  <b-card-text>             
                    <StudentAssessments />
                    <b-overlay :show="tabLoading" rounded="sm" no-wrap></b-overlay>
                  </b-card-text>
                </b-tab>

                <!-- Exams Details tab v-if="exams != 'not loaded'"-->
                <b-tab v-if="exams != 'not loaded'"  :title="'Exams details ('  + exams.length + ')'"  class="py-3 px-0 m-1">
                  <b-card-text>               
                    <StudentExams />
                    <b-overlay :show="tabLoading" rounded="sm" no-wrap></b-overlay>
                  </b-card-text>
                </b-tab>

                <!-- <b-tab v-if="specialPrograms != 'not loaded'" :title="'Optional Programs ('  + specialPrograms.length + ')'"  class="optprog">
                  <template #title>
                      <b-dropdown id="optional-programs-dd" :text="'Optional Programs ('  + specialPrograms.length + ')'" class="p-0 m-0" variant="transparent">
                          <b-dropdown-item v-for="program in specialPrograms" :key="program.specialProgramName" @click="optionalProgramTab=program.specialProgramName">{{program.specialProgramName}}</b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                          <b-dropdown-item @click="optionalProgramTab='All'">All Optional Programs</b-dropdown-item>
                          <b-dropdown-item @click="optionalProgramTab='Add Optional Program'"><i class="fas fa-plus"></i> Add Optional Program</b-dropdown-item>
                      </b-dropdown>
                    </template>
                    <b-card-text>
                      
                      <StudentSpecialPrograms :showOptionalProgramTab="optionalProgramTab"></StudentSpecialPrograms>
                      <b-overlay :show="tabLoading" rounded="sm" no-wrap></b-overlay>
                    </b-card-text>
                </b-tab> -->

                <b-tab v-if="specialPrograms != 'not loaded'" :title="'Optional Programs ('  + specialPrograms.length + ')'"  class="py-3 px-0 m-1">
                  <b-card-text>
                    
                    <StudentOptionalPrograms></StudentOptionalPrograms>
                    <b-overlay :show="tabLoading" rounded="sm" no-wrap></b-overlay>
                  </b-card-text>
                </b-tab>                                   
               
                <b-tab v-if="
                this.courses == 'not loaded' ||
  
                  this.assessments == 'not loaded'
              " title="Loading ..." class="tab-loading py-3 px-0 m-1">
                  <b-card-text class="text-center">Loading Student Courses and Assesments</b-card-text>
                </b-tab>
                 
                <b-tab v-if="studentUngradReasons.length" :title="'Ungrad Reasons ('  + studentUngradReasons.length + ')'" class="py-3 px-3 m-1">
                  <b-card-text>
                    <b-table striped :items="studentUngradReasons" :fields='[{ key: "createDate",label: "Ungrad Date",class:"px-0 py-2 w-10"},{key: "ungradReasonCode",label: "Code",class:"px-0 py-2 w-10"},{key: "ungradReasonDescription",label: "Reason",class:"px-0 py-2 w-80"},{key: "createUser",label: "User",class:"px-0 py-2 w-80"}]'></b-table>
                  </b-card-text>
                </b-tab>                
                <b-tab :title="'Notes ('  + studentNotes.length + ')'" class="py-3 px-0 m-1">
                  <b-card-text>
                    <StudentNotes></StudentNotes>
                    <b-overlay :show="tabLoading" rounded="sm" no-wrap></b-overlay>
                  </b-card-text>
                </b-tab>
                <b-tab :title="'Audit history'" class="py-3 px-0 m-1">
                  <b-card-text>
                    <StudentAuditHistory></StudentAuditHistory>
                    <b-overlay :show="tabLoading" rounded="sm" no-wrap></b-overlay>
                  </b-card-text>
                </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
    <div>
 
      <!-- Projected Grad Status Modal -->
      <b-modal no-close-on-backdrop size="xl" ref="projectedGradStatusWithFinalMarks" title="Projected Grad Status with Final Marks
" centered>
            
            <b-alert variant="info" show>{{projectedGradStatus.gradMessage}}</b-alert>
            <b-card-group deck v-if="this.projectedGradStatus && this.projectedGradStatus.gradStatus">
            <b-card
              header="Requirements met"
            >
              <b-card-text>
                <b-table small :items="this.projectedGradStatus.requirementsMet" :fields='[{ key: "rule",label: "Rule",class:"px-0 py-2"},{key: "description",label: "Description",class:"px-0 py-2"}]'>
                    
                </b-table>
              </b-card-text>
            </b-card>
            <b-card
              header="Noncompletion reasons"
            >
              <div v-if="projectedGradStatus && projectedGradStatus.nonGradReasons">
                <b-card-text><b-table small :items="this.projectedGradStatus.nonGradReasons" ></b-table></b-card-text>
              </div>
              <div v-else>
                <b-card-text>All program requirements have been met</b-card-text>
              </div>
            </b-card>
          </b-card-group>
          <div v-if="this.projectedOptionalGradStatus">
            <div v-for="optionalProgram in this.projectedOptionalGradStatus" :key="optionalProgram.specialProgramCode">
            <h3 class="specialProgramName">{{ optionalProgram.specialProgramName }}</h3>
            <b-card-group deck >           
              <b-card
                header="Requirements met"
              >
                <b-card-text>
                  <b-table small 
                          :items="optionalProgram.studentSpecialProgramData.optionalRequirementsMet" 
                          :fields='[{ key: "rule",label: "Rule",class:"px-0 py-2"},{key: "description",label: "Description",class:"px-0 py-2"}]'
                  >               
                  </b-table>
                </b-card-text>
              </b-card>
              <b-card
                header="Requirements not met"
              >
                <div v-if="optionalProgram.studentSpecialProgramData.specialNonGradReasons">
                  <b-card-text>
                    <b-table small 
                            :items="optionalProgram.studentSpecialProgramData.specialNonGradReasons"
                    >
                    </b-table>
                  </b-card-text>
                </div>
                <div v-else>
                  <b-card-text>All requirements have been met</b-card-text>
                </div>
              </b-card>
            </b-card-group>
            </div>
          </div>
      </b-modal>
      <b-modal no-close-on-backdrop size="xl" ref="projectedGradStatusWithFinalAndReg" centered title="Projected Grad Status with Final Marks and Registrations">
            <b-alert variant="info" show>{{projectedGradStatus.gradMessage}}</b-alert>

            <b-card-group deck v-if="this.projectedGradStatus && this.projectedGradStatus.gradStatus">
            
            <b-card
              header="Requirements met"
            >
              <b-card-text>
                <b-table small :items="this.projectedGradStatus.requirementsMet" :fields='[{ key: "rule",label: "Rule",class:"px-0 py-2"},{key: "description",label: "Description",class:"px-0 py-2"}]'>
                  <template #cell(rule)="row">
                    <div v-if="row.item.projected" style="background-color:#eaf2fa; width:100% ">
                      {{row.item.rule}}
                    </div>
                    <div v-else>
                      {{row.item.rule}}
                    </div>
                  </template>
                  <template #cell(description)="row">
                    <div v-if="row.item.projected" style="background-color:#eaf2fa; width:100% ">
                      {{row.item.description}} (Projected)
                    </div>
                    <div v-else>
                      {{row.item.description}}
                    </div>
                  </template>
                </b-table>
              </b-card-text>
            </b-card>
            <!-- Original -->
            <b-card
              header="Noncompletion reasons"
            >
              <div v-if="projectedGradStatus && projectedGradStatus.nonGradReasons">
                <b-card-text><b-table small :items="this.projectedGradStatus.nonGradReasons"></b-table></b-card-text>
              </div>
              <div v-else>
                <b-card-text>All program requirements have been met</b-card-text>
              </div>
            </b-card>
          </b-card-group>
          <div v-if="this.projectedOptionalGradStatus">
            <div v-for="optionalProgram in this.projectedOptionalGradStatus" :key="optionalProgram.specialProgramCode">
            <h3 class="specialProgramName">{{ optionalProgram.specialProgramName }}</h3>
            <b-card-group deck >           
              <b-card
                header="Requirements met"
              >
                <b-card-text>
                  <b-table small 
                          :items="optionalProgram.studentSpecialProgramData.optionalRequirementsMet" 
                          :fields='[{ key: "rule",label: "Rule",class:"px-0 py-2"},{key: "description",label: "Description",class:"px-0 py-2"}]'
                  >               
                  </b-table>
                </b-card-text>
              </b-card>
              <b-card
                header="Requirements not met"
              >
                <div v-if="optionalProgram.studentSpecialProgramData.specialNonGradReasons">
                  <b-card-text>
                    <b-table small 
                            :items="optionalProgram.studentSpecialProgramData.specialNonGradReasons"
                    >
                    </b-table>
                  </b-card-text>
                </div>
                <div v-else>
                  <b-card-text>All requirements have been met</b-card-text>
                </div>
              </b-card>
            </b-card-group>
            </div>
          </div>    
      </b-modal>
      <div>
        <b-modal id="ungraduate-student-modal" title="Ungraduate Student">
          <p>Ungraduation Reason</p>
          <b-form-select v-model="ungradReasonSelected" :options="ungradReasons" value-field="code" text-field="label"></b-form-select>

          <template #modal-footer="{ok, cancel, hide}">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="outline-secondary" @click="cancel('resetUngraduateStudent')">
              Cancel
            </b-button>
            <!-- Button with custom close trigger value -->

            <b-button size="sm" variant="primary" @click="hide('ungraduate-student-modal'); ungraduateStudent()">
              Ungraduate Student
            </b-button>
          </template>
          <div v-if="ungradReasonSelected == 'OTH'" class="mt=3">
            <label class="pt-3">Description</label>
            <b-form-textarea v-model="ungradReasonDesc"></b-form-textarea>
          </div>
        </b-modal>
        
      </div>
    </div>


  </div>
</template>

<script>
  import AssessmentService from "@/services/AssessmentService.js"
  import GraduationCommonService from "@/services/GraduationCommonService.js";
  import CourseService from "@/services/CourseService.js";
  import StudentService from "@/services/StudentService.js";
  import GraduationService from "@/services/GraduationService.js"
  import StudentAuditHistoryService from "@/services/StudentAuditHistoryService.js";
  import SiteMessage from "@/components/SiteMessage";
  import GRADRequirementDetails from "@/components/GRADRequirementDetails";
  import StudentCourses from "@/components/StudentCourses";
  import StudentAssessments from "@/components/StudentAssessments";
  import StudentExams from "@/components/StudentExams";
  import StudentNotes from "@/components/StudentNotes";
  import StudentGraduationStatus from "@/components/StudentGraduationStatus";
  import StudentOptionalPrograms from "@/components/StudentOptionalPrograms";
  import StudentAuditHistory from "@/components/StudentAuditHistory";
  
  


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
      StudentExams: StudentExams,
      StudentNotes:StudentNotes,
      StudentGraduationStatus: StudentGraduationStatus,
      StudentOptionalPrograms: StudentOptionalPrograms,
      StudentAuditHistory: StudentAuditHistory

    },
    props: {
      pen: {
        type: String,
      }
    },
    data() {
      return { 
        optionalProgramTab: "",
        projectedOptionalGradStatus:"",
        nonGradReasons:"",
        projectedrequirementsMet:"",
        ungradReasonSelected: "",
        ungradReasonDesc: "",
        selectedTab: 0,
        projectedGradStatus: [],
        projectedGradStatusWithRegistrations: [],
        tabLoading: false,
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
        exams: "getStudentExams",
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
        ungradReasons: "getUngradReasons",      
        studentUngradReasons: "getStudentUngradReasons",
      }),
    },
    
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      run(){
      },
      ungraduateStudent(){
        this.tabLoading = true;
        let ungradCode = this.ungradReasonSelected;
        var ungradDesc = this.ungradReasonDesc;
        if(ungradCode != "OTH"){
          ungradDesc = this.ungradReasons.filter(function (reason){  
            return reason.code == ungradCode;
          });
          ungradDesc = ungradDesc[0].description;
        }
        StudentService.ungradStudent(
          this.studentId,
          ungradCode,
          ungradDesc,
          this.token
        )
          .then(() => {
            StudentService.getStudentUngradReasons(this.studentId, this.token).then(
              (response) => {           
                this.$store.dispatch("setStudentUngradReasons", response.data);
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
            StudentService.getGraduationStatus(this.studentId, this.token).then(
              (response) => {
                this.$store.dispatch("setStudentGradStatus", response.data);
                this.tabLoading= false;
              }
            ).catch((error) => {
              this.tabLoading = false;
              if(error.response.status){
                this.$bvToast.toast("ERROR " + error.response.statusText, {
                  title: "ERROR" + error.response.status,
                  variant: 'danger',
                  noAutoHide: true,
                });
              }
            });
            this.getStudentReportsAndCertificates(this.studentId);   
          })
          .catch((error) => {
            this.tabLoading= false;
            // eslint-disable-next-line
            console.log(error.response);
            this.showNotification(
              "danger",
              "There was an error: " + error.response.data.messages[0].message
            );
            

            //console.log('There was an error:' + error.response);
          });
      },
      resetUngraduateStudent(){
        this.ungradReasonSelected = "";
        this.ungradReasonDesc = "";
      },
      getStudentReportsAndCertificates(id){
        GraduationCommonService.getStudentCertificates(id, this.token).then(
          (response) => {          
            this.$store.dispatch("setStudentCertificates", response.data);
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
        GraduationCommonService.getStudentReports(id, this.token).then(
          (response) => {            
            this.$store.dispatch("setStudentReports", response.data);
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
      graduateStudent(){
        this.selectedTab = 0;
        this.tabLoading = true; 
        GraduationService.graduateStudent(this.studentId, this.token).then((response) => {
            if(response.data.graduationStudentRecord){
              // use when response is updated
              //this.$store.dispatch("setStudentGradStatus", response.data.graduationStatus);
                StudentService.getGraduationStatus(this.studentId, this.token).then(
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
                this.getStudentReportsAndCertificates(this.studentId);                                 
            }            
            this.tabLoading = false; 
        }).catch((error) => {
          this.tabLoading = false; 
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });
      },
      updateStudentReports(){
        this.selectedTab = 0;
        this.tabLoading = true; 
        GraduationService.updateStudentReports(this.studentId, this.token).then((response) => {
            if(response.data.graduationStatus){

                StudentService.getGraduationStatus(this.studentId, this.token).then(
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
                this.getStudentReportsAndCertificates(this.studentId);   
            }            
            this.tabLoading = false; 
        }).catch((error) => {
          this.tabLoading = false; 
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error, {
              title: "ERROR" + error.response.status.response,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });
      },      
      projectedGradStatusWithFinalMarks(){
        this.tabLoading = true; 
        GraduationService.projectedGradFinalMarks(this.studentId, this.token) .then((response) => {
          this.projectedGradStatus = JSON.parse(response.data.graduationStudentRecord.studentGradData);
          this.projectedOptionalGradStatus = response.data.studentOptionalProgram;
          for (let i = 0; i < this.projectedOptionalGradStatus.length; i++) {
            this.projectedOptionalGradStatus[i].studentSpecialProgramData = JSON.parse(this.projectedOptionalGradStatus[i].studentSpecialProgramData);
          } 
          this.$refs['projectedGradStatusWithFinalMarks'].show();
          this.tabLoading = false; 
        }).catch((error) => {
          this.tabLoading = false; 
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });
      },
      projectedGradStatusWithFinalAndReg() {
        this.nonGradReasons = this.studentGradStatus.studentGradData.nonGradReasons;
        this.tabLoading = true; 
        GraduationService.projectedGradStatusWithFinalAndReg(this.studentId, this.token) .then((response) => {
          this.projectedGradStatus = response.data;
          this.projectedGradStatus = JSON.parse(this.projectedGradStatus.graduationStudentRecord.studentGradData);
          this.projectedOptionalGradStatus = response.data.studentOptionalProgram;
          for (let i = 0; i < this.projectedOptionalGradStatus.length; i++) {
            this.projectedOptionalGradStatus[i].studentSpecialProgramData = JSON.parse(this.projectedOptionalGradStatus[i].studentSpecialProgramData);
          } 
          this.projectedrequirementsMet = this.projectedGradStatus.requirementsMet;
          this.$refs['projectedGradStatusWithFinalAndReg'].show();
          this.tabLoading = false; 
        }).catch((error) => {
          if(error.response.status){
            this.tabLoading = false; 
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
        
        StudentService.getGraduationStatus(studentIdFromURL, this.token).then(
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
        StudentService.getGraduationStatusSpecialPrograms(studentIdFromURL, this.token).then(
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
        StudentService.getStudentCareerPrograms(studentIdFromURL, this.token).then(
          (response) => {
            this.$store.dispatch("setStudentCareerPrograms", response.data);
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

        CourseService.getStudentCourseAchievements(pen, this.token).then(
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
        CourseService.getStudentExamDetails(pen, this.token).then(
          (response) => {           
            this.$store.dispatch("setStudentExams", response.data);
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
        StudentService.getStudentNotes(studentIdFromURL, this.token).then(
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

        this.getStudentReportsAndCertificates(studentIdFromURL);

        StudentService.getStudentUngradReasons(studentIdFromURL, this.token).then(
          (response) => {           
            this.$store.dispatch("setStudentUngradReasons", response.data);
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

        StudentAuditHistoryService.getStudentHistory(studentIdFromURL, this.token).then(
            (response) => {
              this.$store.dispatch("setStudentAuditHistory", response.data);
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
        StudentAuditHistoryService.getStudentOptionalProgramHistory(studentIdFromURL, this.token).then(
          (response) => {
            console.log("opt");
            console.log(response.data);
            this.$store.dispatch("setStudentOptionalProgramsAuditHistory", response.data);
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
    },
  };
</script>

<style scoped>
  .grad-actions{
    position: absolute;
    right: 0;
    top: -50px
  }
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
  .record-timestamp{
    position:absolute;
    right: 50px;
  }
  .specialProgramName{
    margin-top: 1rem;
  }
  
</style>