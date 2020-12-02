<template>
  <div class="container">
    <div style="float:left">
        
        <div v-if="studentGradStatus.gradProgram"><strong>Grad Program</strong> {{ studentGradStatus.gradProgram }}</div>
        <div v-if="studentGradStatus.gradProgramAtGraduation"><strong>Grad Program at Graduation</strong> {{ studentGradStatus.gradProgramAtGraduation }}</div>

        <div v-if="studentGradStatus.graduationDate"><strong>Graduation Date</strong> {{ studentGradStatus.graduationDate }}</div>
        <div v-if="studentGradStatus.gpa"><strong>GPA {{ studentGradStatus.gpa }}</strong></div>
        
        <div v-if="studentGradStatus.sccpGraduationDate">
          <strong>School Completion Certificate Program (SCCP) Graduation Date</strong>{{ studentGradStatus.sccpGraduationDate }}
        </div>


        <div v-if="studentGradStatus.schoolAtGrad"><strong>School at Graduation</strong>{{ studentGradStatus.schoolAtGrad }}</div>
        
        <div v-if="studentGradStatus.studentGradeAtGraduation"><strong>Grade at Graduation</strong>{{ studentGradStatus.studentGradeAtGraduation }}</div>
        
        <h4>Programs</h4>
        <div v-if="studentGradStatus.honoursFlag"><strong>HONORS</strong>{{ studentGradStatus.honoursFlag }}</div>
        <div v-if="studentGradStatus.certificateType1"><strong>Certificate (Type 1)</strong>{{ studentGradStatus.certificateType1 }}</div>
        <div v-if="studentGradStatus.certificateType1Datev">{{ studentGradStatus.certificateType1Datev }}</div>

        <div v-if="studentGradStatus.certificateType2"><strong>Certificate (Type 2)</strong> {{ studentGradStatus.certificateType2 }}</div>
        <div v-if="studentGradStatus.certificateType2Date">{{ studentGradStatus.certificateType2Date }}</div>

        <div v-if="studentGradStatus.frenchProgramParticipation"><strong>French Programs</strong> {{ studentGradStatus.frenchProgramParticipation }}</div>
        <div v-if="studentGradStatus.advancePlacementParticipation"><strong>AP</strong> {{ studentGradStatus.advancePlacementParticipation }}</div>
        <div v-if="studentGradStatus.careerProgramParticipation"><strong>Career Program</strong> {{ studentGradStatus.careerProgramParticipation }}</div>
       
       
       <h4>Status</h4>
        <div v-if="studentGradStatus.recalculateFlag"><strong>Recalculate Flag</strong>{{ studentGradStatus.recalculateFlag }}</div>
        <div v-if="studentGradStatus.dualDogwoodEligibility"><strong>Dual Dogwood</strong>{{ studentGradStatus.dualDogwoodEligibility }}</div>
        <div v-if="studentGradStatus.ibParticipationFlag"><strong>IB</strong>{{ studentGradStatus.ibParticipationFlag }}</div>
        <div v-if="studentGradStatus.transcriptDate"><strong>Transcript Date</strong>{{ studentGradStatus.transcriptDate }}</div>
        <div v-if="studentGradStatus.createdBy"><strong>Created By</strong>{{ studentGradStatus.createdBy }}</div>
        <div v-if="studentGradStatus.createdTimestamp"><strong>Created Timestamp</strong>{{ studentGradStatus.createdTimestamp }}</div>
        <div v-if="studentGradStatus.updatedBy"><strong>Updated By</strong>{{ studentGradStatus.updatedBy }}</div>
        <div v-if="studentGradStatus.updatedTimestamp"><strong>Updated</strong> ({{ studentGradStatus.updatedTimestamp }})</div>
      </div>
        <div class="accordion col-12 px-0 mx-0" role="tablist">
          <b-card no-body class="col-12 px-0 mx-0">
            <b-card-header header-tag="header" class="col-12 px-0 mx-0" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="info">Graduation Status</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text> 
                  <div class="row">
                    <div class="col-12 row">Last updated: March 10, 2020 <button class="primary btn-primary ml-3"><i class="fa-refresh"></i> Update</button></div>
                    <div class="col-12 row"><a href="#">Download Transcript</a></div>
                  </div>
                </b-card-text>
                
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="col-12 px-0 mx-0">
            <b-card-header header-tag="header" class="col-12 px-0 mx-0" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="info">Requirements Missing</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <ul>
                    <li>IB ENGLISH LANGUAGE / LITERATURE A (HL) </li>
                    <li>ENGLISH RIDER LEVEL 2	</li>
                  </ul>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="col-12 px-0 mx-0">
            <b-card-header header-tag="header" class="col-12 px-0 mx-0" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="info">Requirements Met</b-button>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <ul>
                    <li>Math 12 </li>
                    <li>ENGLISH 12	</li>
                    <li>English 11 </li>
                    <li>Math 11	</li>
                    <li>Math 12 </li>
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

<style></style>
