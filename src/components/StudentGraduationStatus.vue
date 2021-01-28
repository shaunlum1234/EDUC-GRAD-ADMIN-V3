<template>
  <div>
    <div class="accordion col-12 px-0 mx-0" role="tablist">
      <b-card no-body class="col-12 px-0 mx-0">
        <b-card-header header-tag="header" class="card-header-title col-12 px-0 mx-0" role="tab">
          <b-button
            block
            v-b-toggle.accordion-1
            variant="info"
            class="text-left"
            ><i class="fas fa-info-circle primary"></i> Student graduation
            information</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-1"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <div class="row">
                <div class="col-12 graduation-status-content">

                  <!-- Hide Output {{studentGradStatus}}-->
                  <div v-if="studentGradStatus">
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
                      <li v-if="studentGradStatus.schoolOfRecord">
                        <strong>School of Record:</strong>
                        {{ studentGradStatus.schoolOfRecord }}
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
                      
                      <button v-if="!studentGradStatus.programCompletionDate" v-on:@click="updateGraduationStatus" class="float-right primary btn-primary ml-3" >
                        <i class="fas fa-sync"></i> Update
                      </button>
                      <a v-on:click="getStudentAchivementReportPDF" href="#" class=""
            >Student Achievement Report (PDF)</a
          >
                    </div>
                  </div>
                </div>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="col-12 px-0 mx-0">
        <b-card-header header-tag="header" class="card-header-title  col-12 px-0 mx-0" role="tab">
          <b-button
            block
            v-b-toggle.accordion-2
            variant="info"
            class="text-left"
            ><i class="fas fa-times-circle text-danger"></i> Requirements not
            met (5)</b-button
          >
        </b-card-header>
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
        <b-card-header header-tag="header" class="card-header-title col-12 px-0 mx-0" role="tab">
          <b-button
            block
            v-b-toggle.accordion-3
            variant="info"
            class="text-left"
            ><i class="fas fa-check-circle text-success"></i> Requirements met
            (6)</b-button
          >
        </b-card-header>
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
import GraduationStatusService from "@/services/GraduationStatusService.js";
export default {
  name: "StudentGraduationStatus",
  computed: {
    ...mapGetters({
      studentGradStatus: "getStudentGradStatus",
    }),
  },
  created() {},
  methods: {
    updateGraduationStatus: function(){
      GraduationStatusService
    },
    getStudentAchivementReportPDF: function(){
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
  },
};
</script>

<style scoped>
.graduation-status-content .header {
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  color: #517195;
  margin: 10px 0px;

}
ul.requirements-met,
ul.non-grad-reasons {
  list-style: none;
}
header {
  color:red;
}
.card-header > button {
  border-radius: 0px !important;
}
.accordion >.card .card-header{
  padding: 0px !important;
}

