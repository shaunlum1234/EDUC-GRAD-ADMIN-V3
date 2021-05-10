<template>
  <div class="p-2">

    
    <div class="row">
      <div class="col-12">
        <b-card  header="Graduation Information" class="col-12" no-body v-if="studentGradStatus != 'not loaded' && !hasGradStatus">
          <b-card-body>
            <b-card-text>
              <div v-if="!hasGradStatus">
                {{studentFullName.legalFirstName }} found on the PEN database <strong>but does not have a GRAD system record</strong>
              </div>
            </b-card-text>
          </b-card-body>
        </b-card>
      </div>
    </div>
    <div class="row">
      <!-- Left col -->
      <div class="col-12 pr-0 col-md-6 ">
          <div class="graduation-status">
          <b-card
            no-body
            header="GRAD Status"
          >
            <b-card-text>
              
                <b-button-group v-if="this.role =='administrator'" class="gradstatus-actions float-right">
                  <div v-if="!showEdit">
                    <b-link href="#" class="edit" v-on:click="editGradStatus" size="sm" variant="primary">
                        Edit 
                    </b-link>
                  </div>
                  <div v-if="showEdit">
                    <b-btn v-on:click="editGraduationStatus(studentId)" size="sm" variant="primary">
                        Save 
                    </b-btn>
                    <b-btn v-on:click="cancelGradStatus"  size="sm" variant="outline-primary">
                      Cancel
                    </b-btn>
      
                  </div>
                </b-button-group>


                
                <table class="table table-striped table-bordered table-hover table-sm">
                  <tbody>
                  <tr v-if="!showEdit">
                    <td><strong>Program: </strong></td>
                    <td><span v-b-tooltip.hover title="Program">{{ studentGradStatus.program }}</span></td>
                  </tr>
                  <tr v-if="showEdit">
                    <td ><strong>Program: </strong></td>
                    <td class="p-1"><b-form-select size="sm" v-model="editedGradStatus.program" :options="programOptions"></b-form-select></td>      
                  </tr>
                  <tr v-if="!showEdit">
                    <td><strong>Program completion date: </strong></td>
                    <td>{{ studentGradStatus.programCompletionDate }}</td>
                  </tr>
                  <tr v-if="showEdit">
                    <td><strong>Program completion 
                      date: </strong></td>
                      <td class="p-1"><b-input size="sm" type="date" max="9999-12-30" v-model='editedGradStatus.programCompletionDate'></b-input></td>      
                  </tr>
                  
                  <tr v-if="!showEdit">
                    <td><strong>Student status: </strong></td>
                    <td><span v-if="studentGradStatus.studentStatus">{{ studentGradStatus.studentStatusName}}</span></td>
                  </tr>                     
                  <tr v-if="showEdit">
                    <td><strong>Student status: </strong></td>
                    <td class="p-1"><b-form-select 
                        size="sm"
                        v-model="editedGradStatus.studentStatus"
                        :options="studentStatusOptions"
                      ></b-form-select>
                    </td>
                  </tr>
              
                  <tr v-if="!showEdit">
                    <td><strong>Student grade: </strong></td>
                    <td><span v-if="studentGradStatus.studentGrade">{{ studentGradStatus.studentGrade }}</span></td>
                  </tr>
                  <tr v-if="showEdit">
                      <td><strong>Student grade: </strong></td>
                      <td class="p-1"><b-form-select 
                        size="sm"
                        v-model="editedGradStatus.studentGrade"
                        :options="gradeOptions"
                      ></b-form-select>
                      </td>
                  </tr>
                  
                  <tr v-if="!showEdit">
                    <td><strong>School of record: </strong></td>
                    <td><b-button v-if="studentGradStatus.schoolOfRecord" 
                      class="p-0"
                      id="school-of-record-popover" 
                      variant="link" 
                      @click="getSchoolInfo(studentGradStatus.schoolOfRecord)"> 
                      {{studentGradStatus.schoolOfRecord}}
                    </b-button>
                    <b-popover   
                      :boundary-padding="50" 
                      delay=800
                      target="school-of-record-popover"  
                      title="School Information"
                      triggers="focus">
                      <table>
                        <tbody>
                        <tr>
                          <td><strong>District:</strong> {{schoolOfRecord.districtName}}</td>
                        </tr>
                        <tr>
                          <td><strong>School name:</strong> <br> {{schoolOfRecord.schoolName}}</td>
                        </tr> 
                          <tr>                        
                          <td><strong>Status: </strong> {{ schoolOfRecord.openFlag == 'Y' ? 'Open': 'Closed' }}</td>
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
                        </tbody>
                        
                      </table>
                      <!-- <b-button class="px-1" @click="popClose">Close</b-button> -->
                    </b-popover>                       
                    </td>
                  </tr>
                  <tr v-if="showEdit">
                      <td><strong>School of record:</strong></td>
                      <td class="p-1"><b-input size="sm" type="number" v-model='editedGradStatus.schoolOfRecord'></b-input></td>
                  </tr>
                  <tr>
                    <td><strong>School at graduation: </strong></td>
                    <td><b-button v-if="studentGradStatus && studentGradStatus.schoolAtGrad" 
                      class="p-0"
                      id="school-at-graduation-popover"
                      variant="link" 
                      @click="getSchoolInfo(studentGradStatus.schoolAtGrad)"> 
                      {{studentGradStatus.schoolAtGrad}}
                    </b-button>
                    <b-popover 
                      :boundary-padding="50"
                      delay=800
                      target="school-at-graduation-popover"
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
                          <td><strong>Status:</strong> {{SchoolAtGraduation.openFlag == 'Y' ? 'Open': 'Closed'}}</td>
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
                    </b-popover> </td>
                    </tr>            
                    <tr>
                      <td><strong>Honours:</strong></td>
                      <td><span v-if="studentGradStatus.honoursStanding"> {{ studentGradStatus.honoursStanding }}</span></td>
                    </tr>
                    <tr v-if="!showEdit">
                      <td><strong>GPA:</strong></td><td><span v-if="studentGradStatus.gpa">{{ studentGradStatus.gpa }}</span></td>
                    </tr>
                      <tr v-if="showEdit">
                      <td><strong>GPA:</strong></td>
                      <td class="p-1"><b-input size="sm" max="4" pattern="^\d*(\.\d{0,4})?$" type="number" v-model='editedGradStatus.gpa'></b-input></td>      
                    </tr>
                    <tr v-if="!showEdit">
                      <td><strong>Program at graduation:</strong></td>
                      <td>{{ studentGradStatus.gradProgramAtGraduation}}</td>
                    </tr>
                    <tr v-if="showEdit">
                      <td><strong>Program at graduation:</strong></td>
                      <td class="p-1"><b-input size="sm" v-model='editedGradStatus.gradProgramAtGraduation'></b-input></td>      
                    </tr>      
                    <tr v-if="studentGradStatus.studentGradeAtGraduation">
                      <td><strong>Grade at Graduation:</strong></td><td>{{ studentGradStatus.studentGradeAtGraduation }}</td>
                    </tr>
                    </tbody>
                  </table> 
                  <div v-if="showEdit" class="pl-3 pr-1 mb-3">
                    <strong>Note:</strong>
                    <b-form-textarea
                      id="textarea"
                      v-model="text"
                      rows="3"
                      max-rows="6"
                      
                    ></b-form-textarea>
                  </div>
                    
              </b-card-text>
            </b-card>
          </div> 

          <!-- CERTIFICATION DOGWOODS -->           
          <div class="certification-dogwoods">
            <b-card
              header="Certification/Dogwoods"
            >
              <ul>
                <strong>Certificate #1:</strong>
                <li v-if="studentGradStatus.certificateType1">
                  {{ studentGradStatus.certificateType1 }}
                </li>
                <li v-if="studentGradStatus.certificateType1Date">
                  <strong>Date obtained:</strong>
                  {{ studentGradStatus.certificateType1Date }}
                  
                </li>
              </ul>
            </b-card> 
          </div>  


          <!-- SPECIAL PROGRAMS --> 
          <div class="special-programs">
            
            <b-card
              header="Special Programs"
              no-body
            >
              <b-card-text class="p-3" v-if="specialPrograms[0] && specialPrograms[0].studentSpecialProgramData">
                <b-table :items="specialPrograms" :fields="specialProgramsfields" small striped>
                </b-table>
                <h3>Requirements Met</h3>
                <div v-if="specialPrograms[0].studentSpecialProgramData.specialRequirementsMet === null">No Requirements have been met</div>
                <b-table v-else :items="specialPrograms[0].studentSpecialProgramData.specialRequirementsMet">
                </b-table>
                
                <h3>Requirements Not Met</h3>
                <div v-if="specialPrograms[0].studentSpecialProgramData.specialNonGradReasons === null">All graduation requirements have been met</div>
                <b-table v-else :items="specialPrograms[0].studentSpecialProgramData.specialNonGradReasons">
                </b-table>
              </b-card-text>
            </b-card>
          </div>
          <!-- GRADUATION REPORTS -->
          <div class="graduation-reports">
            <b-card
              header="Graduation Reports"
            >
              <b-card-text>
                  <div>
                    <i class="fas fa-file"></i>
                    <a v-on:click="getStudentAchievementReportPDF" href="#" class="pl-3">Achievement Report (PDF)</a>
                   </div>
                  <div>
                    <i class="fas fa-file"></i>
                      <a v-on:click="getStudentTranscriptPDF" href="#" class="pl-3">Transcript (PDF)</a>
                  </div>
                 
              </b-card-text>
            </b-card>       
            
          </div>
      </div>
      <!-- Right Column -->
      <div class="col-12 pl-3 col-md-6 "> 

        <div class="requirements-met-and-not-met">
   
          <div class="requirements-met">
            <b-card
              header="Requirements Met"
              v-if="studentGradStatus.studentGradData"
              
              no-body
    
            >
              <b-card-text class="m-3">
                <b-table  
                  :items="studentGradRequirementCourses"
                  :fields="requirementsMetfields"
                  small
                  striped
                  
                  filter=null
                  :filter-function="filterGradReqCourses"
                  class="requirements-met">  
                </b-table>
                
              </b-card-text>
            </b-card>
           
          </div>

          
          <div class="requirements-not-met">
            <b-card
              header="Non Grad Reasons"
              class="w-100"
            >
              <b-card-text v-if="studentGradStatus.studentGradData">
               
                <div v-if="!studentGradStatus.studentGradData.nonGradReasons">
                  <ul>
                    <li>All graduation requirements have been met</li>
                  </ul>
                </div>
              
                <div v-if="studentGradStatus.studentGradData.nonGradReasons">
                  <ul v-if="studentGradStatus.studentGradData.nonGradReasons && studentGradStatus.studentGradData.nonGradReasons.length" class="non-grad-reasons px-0">
                    <li v-for="requirement in studentGradStatus.studentGradData.nonGradReasons" :key="requirement.rule">
                      {{ requirement.description }} (Rule
                      {{ requirement.rule }})
                    </li>
                  </ul>
                </div>
              </b-card-text>
            </b-card>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="graduation-maintenance">
        <b-card
            header="Graduation Maintenance"
            
          >
            <b-card-text v-if="studentGradStatus.studentGradData">
            <ul>
              <li>
                <a href="#" @click="projectGraduationStatus(studentPen)" class="">
                  <i class="fas fa-eye"></i> Projected<br> Graduation Status
                </a>
                <b-modal id="modal-1" size="lg" >
                  <div v-if="showModal" class="row col-12">
                        PROJECTED GRAD STATUS
                  </div>
                </b-modal>
              </li>
              <li>
                <a href="#" v-on:click="updateGraduationStatus(studentPen)" class="">
                  <i class="fas fa-sync"></i> Run Graduation<br>Algorithm
                </a>
              </li>
                
            </ul>
                  <div v-if="hasGradStatus">
           Created by: {{ studentGradStatus.createdBy }}
           Created: {{ studentGradStatus.createdTimestamp }}
            
            Updated by: {{ studentGradStatus.updatedBy }}
            Updated: {{ studentGradStatus.updatedTimestamp }}
          </div>
            </b-card-text>
          </b-card>
        </div>     
    </div>
    <div v-if="role == 'administrator'">
      <b-button v-b-toggle.collapse-1 variant="primary">DEBUG</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>

          <pre>{{ JSON.stringify(studentGradStatus, null, '\t') }}</pre>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GraduationCommonService from "@/services/GraduationCommonService.js";
import GraduationService from "@/services/GraduationService.js";
import GraduationStatusService from "@/services/GraduationStatusService.js";
import SchoolService from "@/services/SchoolService.js";
//import DisplayTable from '@/components/DisplayTable.vue';
export default {
  name: "StudentGraduationStatus",
  components: {},
  computed: {
    ...mapGetters({
      studentGradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      studentGradRequirementCourses: "gradStatusCourses",
      studentPen: "getStudentPen",
      studentFullName: "getStudentFullName",
      token: "getToken",
      role: "getRoles",
      specialPrograms: "getStudentSpecialPrograms",
      programOptions: "getProgramOptions",
      studentStatusOptions: "getStudentStatusOptions",
      studentId: "getStudentId",
    }),
  },
  data() {
    return {
      requirementsMetfields: [
        { key: "gradReqMetDetail", label: "Requirement Code" },
        { key: "courseName", label: "Course Name" },
        { key: "sessionDate", label: "Session" },
      ],
      requirementsNotMetfields: [
        { key: "gradReqMetDetail", label: "Requirement Code" },
        { key: "courseName", label: "Course Name" },
      ],
      specialProgramsfields: [
        { key: "specialProgramCode", label: "Code" },
        { key: "specialProgramName", label: "Special Program" },
        { key: "specialProgramCompletionDate", label: "Date" },
      ],
      dismissSecs: 3,
      dismissCountDown: 0,
      showModal: false,
      showTop: false,
      showEdit: false,
      show: false,
      projectedStudentGradStatus: [],
      updateStatus: [],
      schoolOfRecord: "",
      SchoolAtGraduation: "",
      programDropdownList: [],
      editedGradStatus: {},
      gradeOptions: [
        { text: "08", value: "8" },
        { text: "09", value: "9" },
        { text: "10", value: "10" },
        { text: "11", value: "11" },
        { text: "12", value: "12" },
        { text: "GA", value: "GA" },
        { text: "SU", value: "SU" },
        { text: "OT", value: "OT" },
        { text: "AD", value: "AD" },
        { text: "AN", value: "AN" },
      ],
    };
  },
  created() {
    this.programDropdownList = this.$store.dispatch("getGraduationPrograms");
  },
  methods: {
    getStudentStatus(code) {
      var i = 0;
      for (i = 0; i <= this.studentStatusOptions.length; i++) {
        if (this.studentStatusOptions[i].value == code) {
          return this.studentStatusOptions[i].text;
        }
      }
      return "";
    },
    filterGradReqCourses(row) {
      if (row.gradReqMet.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    showNotification(variant = null, bodyContent) {
      console.log(bodyContent);
      this.$bvToast.toast(bodyContent, {
        title: `${variant || "default"}`,
        variant: variant,
        solid: true,
        autoHideDelay: 5000,
      });
    },
    editGradStatus() {
      this.showEdit = true;

      this.editedGradStatus.programCompletionDate = new Date(
        this.studentGradStatus.programCompletionDate
      )
        .toISOString()
        .slice(0, 10);
      this.editedGradStatus.pen = this.studentGradStatus.pen;
      this.editedGradStatus.program = this.studentGradStatus.program;
      this.editedGradStatus.gpa = this.studentGradStatus.gpa;
      this.editedGradStatus.studentGrade = this.studentGradStatus.studentGrade;
      this.editedGradStatus.schoolOfRecord = this.studentGradStatus.schoolOfRecord;
      this.editedGradStatus.schoolAtGrad = this.studentGradStatus.schoolAtGrad;
      this.editedGradStatus.studentStatus = this.studentGradStatus.studentStatus;
      this.editedGradStatus.studentID = this.studentGradStatus.studentID;
    },
    cancelGradStatus() {
      this.showEdit = false;
    },
    editGraduationStatus(id) {
      console.log(this.editedGradStatus);
      GraduationStatusService.editGraduationStatus(
        id,
        this.token,
        this.editedGradStatus
      )
        .then((response) => {
          console.log(response.data);
          this.updateStatus = response.data;
          this.studentGradStatus.pen = response.data.pen;
          this.studentGradStatus.program = response.data.program;
          this.studentGradStatus.honoursStanding =
            response.data.honoursStanding;
          this.studentGradStatus.gpa = response.data.gpa;
          this.studentGradStatus.studentGrade = response.data.studentGrade;
          this.studentGradStatus.schoolOfRecord = response.data.schoolOfRecord;
          this.studentGradStatus.studentStatus = response.data.studentStatus;
          this.studentGradStatus.studentStatusName = this.getStudentStatus(
            response.data.studentStatus
          );
          this.studentGradStatus.schoolAtGrad = response.data.schoolAtGrad;

          this.showTop = !this.showTop;
          this.showEdit = false;

          this.showNotification("success", "Grad Status Saved");
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error.response);
          this.showNotification(
            "danger",
            "There was an error: " + error.response.data.messages[0].message
          );

          //console.log('There was an error:' + error.response);
        });
    },

    popClose() {
      this.show = false;
    },
    getSchoolInfo(mincode) {
      SchoolService.getSchoolInfo(mincode, this.token)
        .then((response) => {
          this.schoolOfRecord = response.data;
          this.SchoolAtGraduation = response.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log("There was an error:" + error.response);
        });
    },
    projectGraduationStatus(id) {
      //  console.log( "PROJECTED" + this.projectedStudentGradStatus);
      GraduationStatusService.getGraduationStatus(id, this.token)
        .then((response) => {
          this.projectedStudentGradStatus = response.data;
          this.projectedStudentGradStatus.studentGradData = JSON.parse(
            this.projectedStudentGradStatus.studentGradData
          );
          //console.log( "PROJECTED" + this.projectedStudentGradStatus);
          this.$bvModal.show("modal-1");
          this.showModal = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log("There was an error:" + error.response);
        });
    },

    updateGraduationStatus: function (pen) {
      // eslint-disable-next-line no-use-before-define
      GraduationService.graduateStudent(pen, this.token)
        .then((response) => {
          //console.log(response.data);
          this.$store.dispatch("setStudentGradStatus", response.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log("There was an error:" + error.response);
        });
    },
    getStudentAchievementReportPDF: function () {
      GraduationCommonService.getAchievementReport(
        this.studentGradStatus.pen,
        this.token
      )
        .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {
            type: "application/pdf",
          });
          //Build a URL from the file
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // IE
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
      GraduationCommonService.getStudentTranscript(
        this.studentGradStatus.pen,
        this.token
      )
        .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {
            type: "application/pdf",
          });
          //Build a URL from the file
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // IE
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
.graduation-status table tr td{
  padding-left:20px;
  vertical-align:middle;
  width: 50%;
  height:40px !important
}

ul.requirements-met,
ul.non-grad-reasons {
  list-style: none;
}

ul.requirements-met li,
ul.non-grad-reasons li {
  border-bottom: 1px solid #ccc;
}

.card-body {
  border-bottom: 1px solid #ccc;
}
.card {
  border-radius: 0px;
  margin-bottom: 10px;
}

.card-header {
  font-weight: 700;
  color: #036 !important;
  font-size: 20px;
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
h5.modal-title {
  font-size: 30px !important;
}
.gradstatus-actions {
  position: absolute;
  top: 10px;
  right: 10px;
}
.edit {
  padding: 10px;
}
</style>

