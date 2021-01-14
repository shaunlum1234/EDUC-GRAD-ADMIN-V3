<template>
  <div>
    
    {{studentGradStatus}}
        <div class="accordion col-12 px-0 mx-0" role="tablist">
          <b-card no-body class="col-12 px-0 mx-0">
            <b-card-header header-tag="header" class="col-12 px-0 mx-0" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="info" class="text-left"><i class="fas fa-info-circle primary"></i> Student graduation information</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text> 
                  <div class="row">
                    <div class="col-12 graduation-status-content"><div>
                      <!-- Student Graduation Status -->
                      <div class="col-12 header">Graduation status</div>
                      <ul>
                        <li v-if="studentGradStatus.gradProgram"><strong>Program:</strong> {{ studentGradStatus.gradProgram }}</li>
                        <li v-if="studentGradStatus.gradProgramAtGraduation"><strong>Program at graduation:</strong> {{ studentGradStatus.gradProgramAtGraduation }}</li>

                        <li v-if="studentGradStatus.graduationDate"><strong>Graduation date:</strong> {{ studentGradStatus.graduationDate }}</li>
                        <li v-if="studentGradStatus.gpa"><strong>GPA:</strong> {{ studentGradStatus.gpa }}</li>
                        
                        <li v-if="studentGradStatus.sccpGraduationDate">
                          <strong>School Completion Certificate Program (SCCP) graduation date:</strong>{{ studentGradStatus.sccpGraduationDate }}
                        </li>
                        <li v-if="studentGradStatus.schoolAtGrad"><strong>School at graduation:</strong>{{ studentGradStatus.schoolAtGrad }}</li>
                        <li v-if="studentGradStatus.studentGradeAtGraduation"><strong>Grade at graduation:</strong>{{ studentGradStatus.studentGradeAtGraduation }}</li>
                      </ul>
                     
                      <!-- Student Certifications and Diplomas -->
                      <div class="col-12 header">Certification/Dogwoods</div>
                      <ul>
                        <li v-if="studentGradStatus.certificateType1"><strong>Certificate (Type 1):</strong> {{ studentGradStatus.certificateType1 }}</li>
                        <li v-if="studentGradStatus.certificateType1Datev"><strong>(Type 1) date:</strong> {{ studentGradStatus.certificateType1Datev }}</li>
                        <li v-if="studentGradStatus.certificateType2"><strong>Certificate (Type 2):</strong> {{ studentGradStatus.certificateType2 }}</li>
                        <li v-if="studentGradStatus.certificateType2Date"><strong>(Type 2) date:</strong> {{ studentGradStatus.certificateType2Date }}</li>
                        <li v-if="studentGradStatus.dualDogwoodEligibility"><strong>Dual Dogwood</strong>{{ studentGradStatus.dualDogwoodEligibility }}</li>
                        <li v-if="studentGradStatus.transcriptDate"><strong>Transcript date:</strong>    {{ studentGradStatus.transcriptDate }}</li>
                        <li v-if="studentGradStatus.createdBy"><strong>Created by:</strong> {{ studentGradStatus.createdBy }}</li>
                        <li v-if="studentGradStatus.createdTimestamp"><strong>Created:</strong> {{ studentGradStatus.createdTimestamp }}</li>
                        <li v-if="studentGradStatus.updatedBy"><strong>Updated by:</strong> {{ studentGradStatus.updatedBy }}</li>
                        <li v-if="studentGradStatus.updatedTimestamp"><strong>Updated:</strong> {{ studentGradStatus.updatedTimestamp }}</li>
                      </ul>
                       <!-- Programs -->
                      <div class="col-12 header">Programs</div>
                      <ul>
                        <li v-if="studentGradStatus.honoursFlag"><strong>Honours:</strong> {{ studentGradStatus.honoursFlag }}</li>
                        <li v-if="studentGradStatus.frenchProgramParticipation"><strong>Program cadre:</strong> {{ studentGradStatus.frenchProgramParticipation }}</li>
                        <li v-if="studentGradStatus.advancePlacementParticipation"><strong>Advance Placement:</strong> {{ studentGradStatus.advancePlacementParticipation }}</li>
                        <li v-if="studentGradStatus.careerProgramParticipation"><strong>Career program:</strong> {{ studentGradStatus.careerProgramParticipation }}</li>
                        <li v-if="studentGradStatus.recalculateFlag"><strong>Recalculate flag</strong>{{ studentGradStatus.recalculateFlag }}</li>
                        <li v-if="studentGradStatus.ibParticipationFlag"><strong>IB:</strong> {{ studentGradStatus.ibParticipationFlag }}</li>
                      </ul>
                      <div class="col-12 header">Graduation reports</div>
                      <div class="col-12">Last updated: March 10, 2020 <button class="float-right primary btn-primary ml-3"><i class="fas fa-sync"></i> Update</button></div>
                      <div class="col-12">
                      <ul>
                        <li class=""><a href="#">Student Acheivement Report (PDF)</a></li>
                        <li class=""><a href="#">Student Transcript Report (PDF)</a></li>
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
            <b-card-header header-tag="header" class="col-12 px-0 mx-0" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="info" class="text-left"><i class="fas fa-times-circle text-danger"></i> Requirements not met (5)</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <ul class="non-grad-reasons">
                    <li><i class="fas fa-times-circle text-danger"></i> Fewer than 16 Grade 12 credits</li>
                    <li><i class="fas fa-times-circle text-danger"></i> No Social Studies 11 or 12</li>
                    <li><i class="fas fa-times-circle text-danger"></i> No Mathematics 11 or 12</li>
                    <li><i class="fas fa-times-circle text-danger"></i> No Science 11 or 12</li>
                    <li><i class="fas fa-times-circle text-danger"></i> No Literacy 12 Assessment</li>
                  </ul>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="col-12 px-0 mx-0">
            <b-card-header header-tag="header" class="col-12 px-0 mx-0" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="info" class="text-left"><i class="fas fa-check-circle text-success"></i> Requirements met (6)</b-button>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <ul class="requirements-met">
                    <li><i class="fas fa-check-circle text-success"></i> Language Arts 10</li>
                    <li><i class="fas fa-check-circle text-success"></i> Social Studies 10</li>
                    <li><i class="fas fa-check-circle text-success"></i> Language Arts 11</li>
                    <li><i class="fas fa-check-circle text-success"></i> Mathematics 10</li>
                    <li><i class="fas fa-check-circle text-success"></i> Numeracy 10 Assessment</li>
                    <li><i class="fas fa-check-circle text-success"></i> Literacy 10 Assessment</li>
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
export default {
  name: "StudentGraduationStatus",
  computed: {
    ...mapGetters({
      studentGradStatus: "getStudentGradStatus",
    }),
  },
  created() {},
};
</script>

<style>
.graduation-status-content .header{
  border-bottom: 1px solid #ccc;
  font-weight:bold;
  color: #517195;
  margin: 10px 0px;
}
ul.requirements-met, ul.non-grad-reasons{
  list-style: none;
}
.card-header{
  padding: 0px !important;
}
.card-header > button{
  border-radius: 0px !important;
}

</style>
