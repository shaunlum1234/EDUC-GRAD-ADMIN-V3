<template>
  <div>
      <b-card no-body class="col-12 px-0 mx-0" v-if="!hasGradStatus">
        
        <b-button
          block
          v-b-toggle.accordion-1
          variant="info"
          class="text-left"
          ><i class="fas fa-info-circle primary"></i> Student graduation
          information</b-button
        >
    
        <b-card-body >
            <b-card-text>
              <div v-if="!hasGradStatus">
                No graduation information available
                <button v-if="!studentGradStatus.programCompletionDate" v-on:click="updateGraduationStatus(studentPen)" class="float-left primary btn-primary" >
                    <i class="fas fa-sync"></i> This student does not have a Graduation Status
                </button>
              </div>
            </b-card-text>
        </b-card-body>

      </b-card>
   
    <div class="accordion col-12 px-0 mx-0" role="tablist" v-if="hasGradStatus">
      <b-card no-body class="col-12 px-0 mx-0" >
        
          <b-button
            block
            v-b-toggle.accordion-1
            variant="info"
            class="text-left pt-4"
            ><i class="fas fa-info-circle primary"></i> Student graduation
            information</b-button
          >
        
        <b-collapse
          id="accordion-1"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body >
            <b-card-text>
              <div class="row">
                <div class="graduation-status-content col-12 px-0 mx-0">           
                  <div >
                    <!-- Student Graduation Status -->
                    <div class="col-12 header">
                      <h2>Graduation status</h2></div>
                    <ul>
                      <li v-if="studentGradStatus.program">
                        <strong>Program:</strong>
                        {{ studentGradStatus.program }}
                      </li>
                      <li v-if="studentGradStatus.programCompletionDate">
                        <strong>Program Completion Date:</strong>
                        {{ studentGradStatus.programCompletionDate }}
                      </li>
                      <li v-if="studentGradStatus.gradProgramAtGraduation">
                        <strong>Program at graduation:</strong>
                        {{ studentGradStatus.gradProgramAtGraduation }}
                      </li>
                     <li v-if="studentGradStatus.schoolInfo">
                        <strong>School of Record:</strong>
                                <div class="p-2">
                         
                                  <span class="link" href="#" id="popover-button-sync" variant="primary"
                                  >{{studentGradStatus.schoolInfo.schoolName}} ({{studentGradStatus.schoolInfo.minCode}})
                                  </span>
                              </div>
                              <b-popover :show.sync="show" target="popover-button-sync" title="School Information">
                                 <p><strong>District:</strong> {{studentGradStatus.schoolInfo.districtName}}</p>
                                 <p><strong>Certificate Eligibility:</strong> {{studentGradStatus.schoolInfo.certificateEligibility}}</p>
                                 <p><strong>Independent:</strong> {{studentGradStatus.schoolInfo.independentDesignation}}</p>
                                 <p><strong>Mailer Type:</strong> {{studentGradStatus.schoolInfo.mailerType}}</p>
                                 <p><strong>Address:</strong> {{studentGradStatus.schoolInfo.address1}}</p>
                                 <p><strong>Postal:</strong> {{studentGradStatus.schoolInfo.postal}}</p>
                                 <b-button class="px-1" @click="popClose">Close</b-button>
                              </b-popover>
                      </li>
                       <li v-if="studentGradStatus.studentGrade">
                        <strong>Grade at graduation:</strong>
                        {{ studentGradStatus.studentGrade }}
                      </li>
                      
                      <li v-if="studentGradStatus.graduationDate">
                        <strong>Graduation Date:</strong>
                        {{ studentGradStatus.graduationDate }}
                      </li>
                      <li v-if="studentGradStatus.gpa">
                        <strong>GPA:</strong> {{ studentGradStatus.gpa }}
                      </li>
                      <li v-if="studentGradStatus.honoursFlag">
                        <strong>Honours:</strong>
                        {{ studentGradStatus.honoursFlag }}
                      </li>

                      <li v-if="studentGradStatus.sccpGraduationDate">
                        <strong
                          >School Completion Certificate Program (SCCP)
                          Graduation Date:</strong
                        >{{ studentGradStatus.sccpGraduationDate }}
                      </li>
                      <li v-if="studentGradStatus.schoolAtGrad">
                        <strong>School at Graduation:</strong
                        >{{ studentGradStatus.schoolAtGrad }}
                      </li>
                      <li v-if="studentGradStatus.studentGradeAtGraduation">
                        <strong>Grade at Graduation:</strong
                        >{{ studentGradStatus.studentGradeAtGraduation }}
                      </li>
                    </ul>

                    <!-- Student Certifications and Diplomas -->
                    <div class="col-12 header">
                      <h2>Certification/Dogwoods</h2></div>
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
                        <strong>Dual Dogwood</strong
                        >{{ studentGradStatus.dualDogwoodEligibility }}
                      </li>
                      <li v-if="studentGradStatus.transcriptDate">
                        <strong>Transcript Date:</strong>
                        {{ studentGradStatus.transcriptDate }}
                      </li>
                      
                    </ul>
                    <!-- Programs -->
                    <div class="col-12 header">
                      <h2>Special programs</h2>
                    
                    </div>
                    <ul>
                      
                      <li v-if="studentGradStatus.frenchProgramParticipation">
                        <strong>Program Cadre:</strong>
                        {{ studentGradStatus.frenchProgramParticipation }}
                      </li>
                      <li
                        v-if="studentGradStatus.advancePlacementParticipation"
                      >
                        <strong>AP:</strong>
                        {{ studentGradStatus.advancePlacementParticipation }}
                      </li>
                      <li v-if="studentGradStatus.careerProgramParticipation">
                        <strong>Career Program:</strong>
                        {{ studentGradStatus.careerProgramParticipation }}
                      </li>
                      <li v-if="studentGradStatus.recalculateFlag">
                        <strong>Recalculate Flag</strong
                        >{{ studentGradStatus.recalculateFlag }}
                      </li>
                      <li v-if="studentGradStatus.ibParticipationFlag">
                        <strong>IB:</strong>
                        {{ studentGradStatus.ibParticipationFlag }}
                      </li>
                    </ul>
                    <div class="col-12 header"><h2>Graduation reports</h2></div>
                    <div class="col-12">
                        <button v-on:click="updateGraduationStatus(studentPen)" class="float-right btn-primary btn-sm ml-3" >
                          <i class="fas fa-sync"></i> Update
                        </button>
                        <ul>
                          <li>
                        <a v-on:click="getStudentAchievementReportPDF" href="#" class=""
              >Achievement Report (PDF)</a>
                          </li>
                          <li>
                          <a v-on:click="getStudentTranscriptPDF" href="#" class=""
              >Transcript (PDF)</a>
                          </li>
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="col-12 px-0 mx-0">
        
          <b-button
            block
            v-b-toggle.accordion-2
            variant="info"
            class="text-left"
            ><i class="fas fa-times-circle text-danger"></i> Requirements not
            met (5)</b-button
          >
        
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <ul class="non-grad-reasons">
                <li>
                  <i class="fas fa-times-circle text-danger"></i> Fewer than 16
                  Grade 12 credits
                </li>
                <li>
                  <i class="fas fa-times-circle text-danger"></i> No Social
                  Studies 11 or 12
                </li>
                <li>
                  <i class="fas fa-times-circle text-danger"></i> No Mathematics
                  11 or 12
                </li>
                <li>
                  <i class="fas fa-times-circle text-danger"></i> No Science 11
                  or 12
                </li>
                <li>
                  <i class="fas fa-times-circle text-danger"></i> No Literacy 12
                  Assessment
                </li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="col-12 px-0 mx-0">
       
        <b-button
          block
          v-b-toggle.accordion-3
          variant="info"
          class="text-left"
          ><i class="fas fa-check-circle text-success"></i> Requirements met
          (6)</b-button
        >
        
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <ul class="requirements-met">
                <li>
                  <i class="fas fa-check-circle text-success"></i> Language Arts
                  10
                </li>
                <li>
                  <i class="fas fa-check-circle text-success"></i> Social
                  Studies 10
                </li>
                <li>
                  <i class="fas fa-check-circle text-success"></i> Language Arts
                  11
                </li>
                <li>
                  <i class="fas fa-check-circle text-success"></i> Mathematics
                  10
                </li>
                <li>
                  <i class="fas fa-check-circle text-success"></i> Numeracy 10
                  Assessment
                </li>
                <li>
                  <i class="fas fa-check-circle text-success"></i> Literacy 10
                  Assessment
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
import { mapGetters } from "vuex";
import GraduationCommonService from "@/services/GraduationCommonService.js";
import GraduationService from "@/services/GraduationService.js";

export default {
  name: "StudentGraduationStatus",

  computed: {
    ...mapGetters({
      studentGradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      studentPen: "getStudentPen",
      
      
      
    })
    
  },
  data() {
    return {
      show: false,
    };
  },
  created() {

  },
  methods: {
     popClose() {
        this.show = false;
      },
    updateGraduationStatus: function(pen){
      console.log("GRAD STATUS |" + pen 
      + " | "  + localStorage.getItem('jwt'));
      GraduationService.graduateStudent(pen, localStorage.getItem('jwt')).then((response) => {
        console.log(response.data);
        this.$store.dispatch("setStudentGradStatus", response.data);
      }).catch((error) => {
        console.log('There was an error:' + error.response);
      });  
    },
    getStudentAchievementReportPDF: function(){
      GraduationCommonService.getAchievementReport(this.studentGradStatus.pen, localStorage.getItem('jwt'))
      .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob(
          [response.data], 
          {type: 'application/pdf'});
          //Build a URL from the file
          if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
              window.navigator.msSaveOrOpenBlob(file);
          }else {
              const fileURL = URL.createObjectURL(file);
              window.open(fileURL); //Open the URL on new Window
          }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:' + error.response);
      });    
    },
    getStudentTranscriptPDF: function(){
      console.log("transcript");
      GraduationCommonService.getStudentTranscript(this.studentGradStatus.pen, localStorage.getItem('jwt'))
      .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob(
          [response.data], 
          {type: 'application/pdf'});
          //Build a URL from the file
          if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
              window.navigator.msSaveOrOpenBlob(file);
          }else {
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
.graduation-status-content .header h2{
  font-size: 16px;
  margin: 0px !important;
  padding:10px;
}
ul.requirements-met,
ul.non-grad-reasons {
  list-style: none;
}
.card-header > button {
  border-radius: 0px !important;
}
.card-header{
  padding: 0px 0px !important;
}
.card{
  border-radius: 0px;
}
.accordion >.card .card-header{
  padding: 0px !important;
}
.btn{
  border-radius:0px !important;
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

</style>
