<template>
  <div>
    <b-card no-body class="col-12 px-0 mx-0" v-if="studentGradStatus != 'not loaded' && !hasGradStatus">

      <b-button block v-b-toggle.accordion-1 variant="primary" class="text-left">
        Graduation
        information</b-button>
      <b-card-body>
        <b-card-text>
          <div v-if="!hasGradStatus">
            {{studentFullName.legalFirstName }} found on the PEN database <strong>but does not have a GRAD system record</strong>
          </div>
        </b-card-text>
      </b-card-body>

    </b-card>
  
    <div class="accordion col-12 px-0 mx-0" role="tablist" v-if="hasGradStatus">
      <b-card no-body class="col-12 px-0 mx-0">

        <b-button block v-b-toggle.accordion-1 variant="info" class="text-left pt-4 gov-btn"> Student GRAD
          record</b-button>

        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <div class="row">
                <!-- <div class="col-12 px-0">
                  <div>
                    <button @click="projectGraduationStatus(studentPen)" class="w-50 float-left btn-primary btn-sm">
                      <i class="fas fa-eye"></i> Projected<br> Graduation Status
                    </button>

                    <b-modal id="modal-1" size="lg" >
                      <div v-if="showModal" class="row col-12">
                            PROJECTED GRAD STATUS
                      </div>
                    </b-modal>
                  </div>
                  <button v-on:click="updateGraduationStatus(studentPen)" class="float-right w-50 btn-primary btn-sm">
                    <i class="fas fa-sync"></i> Run Graduation<br>Algorithm
                  </button>
                </div> -->
                <div class="graduation-status-content col-12 px-0 mx-0">
                  <div>
                    <!-- Student Graduation Status -->
                    <div class="col-12 header">
                      <h2>Graduation status</h2>
                      <b-button-group v-if="this.role =='administrator'" class="gradstatus-actions float-right">
                        <div v-if="!showEdit">
                          
                          <!-- <b-btn class="edit" v-on:click="editGradStatus" size="sm" variant="primary">
                             Edit 
                          </b-btn> -->
                        </div>
                        <div v-if="showEdit">
                          <b-btn v-on:click="saveEditedGradStatus(studentPen)" size="sm" variant="primary">
                             Save 
                          </b-btn>
                          <b-btn v-on:click="cancelGradStatus"  size="sm" variant="outline-primary">
                            Cancel
                          </b-btn>
            
                        </div>
                      </b-button-group>
                    </div>

                    <ul>
                      <li v-if="!showEdit">
                        <strong>Program: </strong>
                        <span v-b-tooltip.hover title="Tooltip directive content">{{ studentGradStatus.program }}</span>
                      </li>
                      <li v-if="showEdit">
                        <strong>Program: </strong><b-input v-model='editedGradStatus.program'></b-input>      
                      </li>
                      
                      <li v-if="!showEdit">
                        <strong>Program completion date: </strong>
                        {{ studentGradStatus.programCompletionDate }}
                      </li>
                      <li v-if="showEdit">
                        <strong>Program completion date: </strong><b-input type="date" v-model='editedGradStatus.programCompletionDate'></b-input>      
                      </li>
                      <li>
                        <strong>Student status: </strong>
                        <span v-if="studentGradStatus.studentStatus">{{ studentGradStatus.studentStatus }}</span>
                      </li>
                      <li>
                        <strong>Student grade: </strong>
                        <span v-if="studentGradStatus.studentGrade">{{ studentGradStatus.studentGrade }}</span>
                      </li>
                      <li>
                          <strong>School of record: </strong>
                          <b-button v-if="studentGradStatus.schoolOfRecord" 
                            class="p-0"
                            id="popover-1" 
                            variant="link" 
                            @click="getSchoolInfo(studentGradStatus.schoolOfRecord)"> 
                            {{studentGradStatus.schoolOfRecord}}
                          </b-button>
                      </li>
                      
                      <li>
                        <strong>School at graduation: </strong>
                        <b-button v-if="studentGradStatus && studentGradStatus.schoolAtGrad" 
                          class="p-0"
                          id="popover-2"
                          variant="link" 
                          @click="getSchoolInfo(studentGradStatus.schoolAtGrad)"> 
                          {{studentGradStatus.schoolAtGrad}}
                        </b-button>
                        
                      </li>            
                      <b-popover   
                            :boundary-padding="50" 
                            delay=800
                            target="popover-1"  
                            title="School Information"
                            triggers="focus">
                            <table>
                              <tr>
                                <td><strong>District:</strong> {{schoolOfRecord.districtName}}</td>
                              </tr>
                              <tr>
                                <td><strong>School name:</strong> <br> {{schoolOfRecord.schoolName}}</td>
                              </tr> 
                               <tr>                        
                                <td><strong>Statu: </strong> {{schoolOfRecord.openFlag}}</td>
                              </tr>
                               <tr>                        
                                <td><strong>Independent type:</strong> {{schoolOfRecord.independentDesignation}}</td>
                              </tr>
                               <tr>                        
                                <td><strong>Independent affiliation:</strong> {{schoolOfRecord.independentAffiliation}}</td>
                              </tr>
                               <tr>                        
                                <td><strong>Transcript eligible:</strong> {{schoolOfRecord.transcriptEligibility}}</td>
                              </tr>
                              <tr>                        
                                <td><strong>Dogwood eligibility:</strong> {{schoolOfRecord.certificateEligibility}}</td>
                              </tr>
                             
                            </table>
                            <!-- <b-button class="px-1" @click="popClose">Close</b-button> -->
                          </b-popover> 
                          <b-popover 
                            :boundary-padding="50"
                            delay=800
                            target="popover-2"
                            title="School Information"
                            triggers="focus">
                            <table>
                              <tr>
                                <td><strong>District:</strong> {{SchoolAtGraduation.districtName}}</td>
                              </tr>
                              <tr>
                                <td><strong>School name:</strong> <br> {{SchoolAtGraduation.schoolName}}</td>
                              </tr> 
                               <tr>                        
                                <td><strong>Status:</strong> {{SchoolAtGraduation.openFlag}}</td>
                              </tr>
                               <tr>                        
                                <td><strong>Independent type:</strong> {{SchoolAtGraduation.independentDesignation}}</td>
                              </tr>
                               <tr>                        
                                <td><strong>Independent affiliation:</strong> {{SchoolAtGraduation.independentAffiliation}}</td>
                              </tr>
                               <tr>                        
                                <td><strong>Transcript eligible:</strong> {{SchoolAtGraduation.transcriptEligibility}}</td>
                              </tr>
                              <tr>                        
                                <td><strong>Dogwood eligibility:</strong> {{SchoolAtGraduation.certificateEligibility}}</td>
                              </tr>               
                            </table>
                          </b-popover> 
                      <li>
                        <strong>Honours:</strong>
                        <span v-if="studentGradStatus.honoursStanding"> {{ studentGradStatus.honoursStanding }}</span>
                      </li>
                      <li v-if="!showEdit">
                        <strong>GPA:</strong> <span v-if="studentGradStatus.gpa">{{ studentGradStatus.gpa }}</span>
                      </li>
                       <li v-if="showEdit">
                        <strong>GPA:</strong><b-input size="sm" max="4" pattern="^\d*(\.\d{0,4})?$" type="number" v-model='editedGradStatus.gpa'></b-input>      
                      </li>
                    </ul>
                      <!-- <li>
                        <strong>Program at graduation:</strong>
                        {{ studentGradStatus.gradProgramAtGraduation }}
                      </li> -->
                       <!-- <li v-if="showEdit">
                        <strong>Program at graduation:</strong><b-input v-model='editedGradStatus.gradProgramAtGraduation'></b-input>      
                      </li> -->
                      <!-- <li v-if="studentGradStatus.graduationDate">
                        <strong>Graduation Date:</strong>
                        {{ studentGradStatus.graduationDate }}
                      </li>
                      <li>
                        <strong>Credits used for Graduation:</strong>
                        {{ studentGradStatus.creditsUsedForGrad }}
                      </li>
                      <li v-if="studentGradStatus.sccpGraduationDate">
                        <strong>School Completion Certificate Program (SCCP)
                          Graduation Date:</strong>{{ studentGradStatus.sccpGraduationDate }}
                      </li>                 
                      <li v-if="studentGradStatus.studentGradeAtGraduation">
                        <strong>Grade at Graduation:</strong>{{ studentGradStatus.studentGradeAtGraduation }}
                      </li>
                     -->

                    <!-- Student Certifications and Diplomas -->
                    <!-- <div class="col-12 header">
                      <h2>Certification/Dogwoods</h2>
                    </div>
                    <ul>
                      <li v-if="studentGradStatus.certificateType1">
                        <strong>Certificate #1:</strong>
                        {{ studentGradStatus.certificateType1 }}
                        <br>
                        <span v-if="studentGradStatus.certificateType1Date">
                          <strong>Date obtained:</strong>
                          {{ studentGradStatus.certificateType1Date }}
                        </span>
                      </li>
                    </ul>
                    <ul>
                      <li v-if="studentGradStatus.certificateType2">
                        <strong>Certificate #2:</strong>
                        {{ studentGradStatus.certificateType2 }}
                        <br>
                        <span v-if="studentGradStatus.certificateType2Date">
                          <strong>Date obtained:</strong>
                          {{ studentGradStatus.certificateType2Date }}
                        </span>
                      </li>
                    </ul>
                    <ul>

                      <li v-if="studentGradStatus.dualDogwoodEligibility">
                        <strong>Dual Dogwood</strong>{{ studentGradStatus.dualDogwoodEligibility }}
                      </li>
                      <li v-if="studentGradStatus.transcriptDate">
                        <strong>Transcript Date:</strong>
                        {{ studentGradStatus.transcriptDate }}
                      </li>

                    </ul> -->
                    <!-- Programs -->
                    <!-- <div class="col-12 header">
                      <h2>Special programs</h2>

                    </div>
                    <ul>

                      <li v-if="studentGradStatus.frenchProgramParticipation">
                        <strong>Program Cadre:</strong>
                        {{ studentGradStatus.frenchProgramParticipation }}
                      </li>
                      <li v-if="studentGradStatus.advancePlacementParticipation">
                        <strong>AP:</strong>
                        {{ studentGradStatus.advancePlacementParticipation }}
                      </li>
                      <li v-if="studentGradStatus.careerProgramParticipation">
                        <strong>Career Program:</strong>
                        {{ studentGradStatus.careerProgramParticipation }}
                      </li>
                      <li v-if="studentGradStatus.recalculateFlag">
                        <strong>Recalculate Flag</strong>{{ studentGradStatus.recalculateFlag }}
                      </li>
                      <li v-if="studentGradStatus.ibParticipationFlag">
                        <strong>IB:</strong>
                        {{ studentGradStatus.ibParticipationFlag }}
                      </li>
                    </ul>
                    <div class="col-12 header">
                      <h2>Graduation reports</h2>
                    </div>
                    <div class="col-12">

                      <ul>
                        <li>
                          <a v-on:click="getStudentAchievementReportPDF" href="#" class="">Achievement Report (PDF)</a>
                        </li>
                        <li>
                          <a v-on:click="getStudentTranscriptPDF" href="#" class="">Transcript (PDF)</a>
                        </li>
                      </ul>
                    </div> -->

                  </div>
                </div>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <!-- GRAD REASONS FIX -->
      <b-card no-body class="col-12 px-0 mx-0" v-if="studentGradStatus.studentGradData">
        <b-button block v-b-toggle.accordion-2 variant="info" class="text-left gov-btn" v-if="!studentGradStatus.studentGradData.nonGradReasons"> Requirements not met (0)</b-button>
        <b-button block v-b-toggle.accordion-2 variant="info" class="text-left gov-btn" v-if="studentGradStatus.studentGradData.nonGradReasons"> Requirements not
          met ({{studentGradStatus.studentGradData.nonGradReasons.length}}) </b-button>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" v-if="!studentGradStatus.studentGradData.nonGradReasons">
          <b-card-body>
            <b-card-text>
              <ul>
                <li>All graduation requirements have been met</li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>

        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" v-if="studentGradStatus.studentGradData.nonGradReasons">
          <b-card-body>
            <b-card-text>
              <ul v-if="studentGradStatus.studentGradData.nonGradReasons && studentGradStatus.studentGradData.nonGradReasons.length" class="non-grad-reasons px-0">
                <li v-for="requirement in studentGradStatus.studentGradData.nonGradReasons" :key="requirement.rule">
                  {{ requirement.description }} (Rule
                  {{ requirement.rule }})
                </li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="col-12 px-0 mx-0" v-if="studentGradStatus.studentGradData">

        <b-button block v-b-toggle.accordion-3 variant="info" class="text-left gov-btn" v-if="studentGradStatus.studentGradData.requirementsMet"> Requirements met
          ({{studentGradStatus.studentGradData.requirementsMet.length}} )</b-button>

        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>


              <ul class="requirements-met px-0">
                <li v-for="requirement in studentGradStatus.studentGradData.requirementsMet" :key="requirement.rule">
                  <i class="fas fa-check-circle text-success"></i> <a href="#"
                    @click='getCourseCompletedProgramCode(requirement.rule,studentGradStatus.studentGradData.studentCourses.studentCourseList)'>{{ requirement.description }}
                    (Rule {{ requirement.rule }})</a>
                </li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>


    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import GraduationCommonService from "@/services/GraduationCommonService.js";
  import GraduationService from "@/services/GraduationService.js";
  import GraduationStatusService from "@/services/GraduationStatusService.js";
  import SchoolService from "@/services/SchoolService.js"
  export default {
    name: "StudentGraduationStatus",

    computed: {
      ...mapGetters({
        studentGradStatus: "getStudentGradStatus",
        hasGradStatus: "studentHasGradStatus",
        studentPen: "getStudentPen",
        studentFullName: "getStudentFullName",
        token: "getToken",
        role: "getRoles",
      }),
    },
    data() {
      return {
        dismissSecs: 3,
        dismissCountDown: 0,
        showModal: false,
        showTop: false,
        showEdit:false,
        show: false,
        projectedStudentGradStatus: [],
        updateStatus:[],
        schoolOfRecord:"",
        SchoolAtGraduation:"",
        programDropdownList: [],
        editedGradStatus: {
            createdBy:"",
            createdTimestamp: "",
            updatedBy: "",
            updatedTimestamp: "",
            pen: "",
            program: "TEST",
            programCompletionDate: null,
            gpa: "",
            honoursStanding: null,
            recalculateGradStatus: null,
            schoolOfRecord: "",
            studentGrade: ""
          }
      };
    },
    created() {
      this.programDropdownList = this.$store.dispatch("getGraduationPrograms");
    },
    methods: {
      makeToast(variant = null, bodyContent) {
        this.$bvToast.toast(bodyContent, {
          title: `Variant ${variant || 'default'}`,
          variant: variant,
          solid: true,
          autoHideDelay: 5000,
        })
      },
      editGradStatus() {

        this.showEdit = true;
       
        this.editedGradStatus.pen = this.studentGradStatus.pen;
        this.editedGradStatus.program = this.studentGradStatus.program;  
        this.editedGradStatus.gpa = this.studentGradStatus.gpa;  
        this.editedGradStatus.programCompletionDate = this.studentGradStatus.programCompletionDate
      },
      cancelGradStatus(){
        this.showEdit = false;
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      saveEditedGradStatus(pen) {
        GraduationStatusService.editGraduationStatus(pen, this.token, this.editedGradStatus)
          .then((response) => {
            this.updateStatus = response.data;
            this.studentGradStatus.program = this.editedGradStatus.program;
            this.studentGradStatus.gpa = this.editedGradStatus.gpa;
            this.showTop = !this.showTop
            this.showEdit=false;
            // this.dismissCountDown = this.dismissSecs
            this.makeToast('success', 'Grad Status Saved')
          }).catch((error) => {
          // eslint-disable-next-line
            this.makeToast('danger', 'There was an error: '+ error.response.data.messages[0].message);
          //console.log('There was an error:' + error.response);
        });
      },

      popClose() {
        this.show = false;
      },
      getSchoolInfo(mincode) {
        SchoolService.getSchoolInfo(mincode, this.token) .then((response) => {
          this.schoolOfRecord = response.data;
          this.SchoolAtGraduation = response.data;
        }).catch((error) => {
          // eslint-disable-next-line
          console.log('There was an error:' + error.response);
        });
      },
      projectGraduationStatus(id) {
      //  console.log( "PROJECTED" + this.projectedStudentGradStatus);
        GraduationStatusService.getGraduationStatus(id, this.token) .then((response) => {
            this.projectedStudentGradStatus = response.data;
            this.projectedStudentGradStatus.studentGradData = JSON.parse(this.projectedStudentGradStatus.studentGradData); 
            //console.log( "PROJECTED" + this.projectedStudentGradStatus);
            this.$bvModal.show("modal-1");
            this.showModal = true;
        }).catch((error) => {
          // eslint-disable-next-line
          console.log('There was an error:' + error.response);
        });
      },

      updateGraduationStatus: function (pen) {
        // eslint-disable-next-line no-use-before-define
        GraduationService.graduateStudent(pen, this.token).then((response) => {
          //console.log(response.data);
          this.$store.dispatch("setStudentGradStatus", response.data);
        }).catch((error) => {
          // eslint-disable-next-line
          console.log('There was an error:' + error.response);
        });
      },
      getStudentAchievementReportPDF: function () {
        GraduationCommonService.getAchievementReport(this.studentGradStatus.pen, this.token)
          .then((response) => {
            //Create a Blob from the PDF Stream
            const file = new Blob(
              [response.data], {
                type: 'application/pdf'
              });
            //Build a URL from the file
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
              window.navigator.msSaveOrOpenBlob(file);
            } else {
              const fileURL = URL.createObjectURL(file);
              window.open(fileURL); //Open the URL on new Window
            }
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            //console.log('There was an error:' + error.response);
          });
      },
      getStudentTranscriptPDF: function () {
      //  console.log("transcript");
        GraduationCommonService.getStudentTranscript(this.studentGradStatus.pen, this.token)
          .then((response) => {
            //Create a Blob from the PDF Stream
            const file = new Blob(
              [response.data], {
                type: 'application/pdf'
              });
            //Build a URL from the file
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
              window.navigator.msSaveOrOpenBlob(file);
            } else {
              const fileURL = URL.createObjectURL(file);
              window.open(fileURL); //Open the URL on new Window
            }
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            //console.log('There was an error:' + error.response);
          });
      },
    },
  };
</script>

<style scoped>
  .graduation-status-content .header {
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    color: #517195;
    margin: 10px 0px;
    background: #f2f2f2 !important;

  }

  .graduation-status-content .header h2 {
    font-size: 16px;
    margin: 0px !important;
    padding: 10px;
  }

  ul.requirements-met,
  ul.non-grad-reasons {
    list-style: none;
  }

  ul.requirements-met li,
  ul.non-grad-reasons li {
    border-bottom: 1px solid #ccc;
  }

  .card-header>button {
    border-radius: 0px !important;
  }

  .card-header {
    padding: 0px 0px !important;
  }
  .card-body{
    border-bottom: 1px solid #ccc;
  }
  .card {
    border-radius: 0px;
  }

  .accordion>.card .card-header {
    padding: 0px !important;
  }

  .btn {
    border-radius: 0px !important;
  }

  span.link {
    color: #1a5a96;
    text-decoration: underline;
    background-color: transparent;
  }

  span.link:hover {
    color: #0000f3;
    text-decoration: underline;
    cursor: pointer;
  }
  h5.modal-title{
    font-size: 30px !important;
  }
  .gradstatus-actions{
    margin-top:-35px;
  }
</style>

