<template>
  <div class="container">

      <b-card no-body header="Student Change History">
        <b-card-text class="p-3">
          <DisplayTable :items="studentHistory" :fields="studentChangeFields" showFilter=false title="Student Change History">
            <template #cell(more)="row">
              <b-btn
                variant="outline primary"
                style="color: #666"
                size="sm"
                @click="row.toggleDetails"
                class="more-button">
                <img v-show="!row.detailsShowing" src="../assets/images/icon-right.svg" width="9px" aria-hidden="true" alt=""/>
                <img v-show="row.detailsShowing" src="../assets/images/icon-down.svg" height="5px" aria-hidden="true" alt=""/>
              </b-btn>
            </template>

            <template #row-details="row">
              <b-card class="px-0 mt-0">
                <pre>
                Row: {{JSON.stringify(row, null, '\t')}}
                </pre>
                <p><strong>Changed By {{row.item.updateUser}} on {{row.item.updateDate | formatTime}}</strong></p>
                <pre>
                  {{JSON.stringify(row.item, null, '\t')}}
                </pre>
              </b-card>
            </template>

            <template #cell(createDate)="row">
              {{row.item.createDate | formatTime}}
            </template>

            <template #cell(program)="row">
              <strong v-if="studentChangeHighlight[row.index].program">
              {{row.item.program}}
              </strong>
              <div v-else>
                {{row.item.program}}
              </div>
            </template>

            <template #cell(programCompletionDate)="row">
              <strong v-if="studentChangeHighlight[row.index].programCompletionDate">
              {{row.item.programCompletionDate}}
              </strong>
              <div v-else>
                {{row.item.programCompletionDate}}
              </div>
            </template>

            <template #cell(studentStatus)="row">
              <strong v-if="studentChangeHighlight[row.index].studentStatus">
              {{row.item.studentStatus}}
              </strong>
              <div v-else>
                {{row.item.studentStatus}}
              </div>
            </template>

            <template #cell(studentGrade)="row">
              <strong v-if="studentChangeHighlight[row.index].studentGrade">
              {{row.item.studentGrade}}
              </strong>
              <div v-else>
                {{row.item.studentGrade}}
              </div>
            </template>

            <template #cell(schoolOfRecord)="row">
              <strong v-if="studentChangeHighlight[row.index].schoolOfRecord">
              {{row.item.schoolOfRecord}}
              </strong>
              <div v-else>
                {{row.item.schoolOfRecord}}
              </div>
            </template>

            <template #cell(schoolAtGrad)="row">
              <strong v-if="studentChangeHighlight[row.index].schoolAtGrad">
              {{row.item.schoolAtGrad}}
              </strong>
              <div v-else>
                {{row.item.schoolAtGrad}}
              </div>
            </template>

            <template #cell(consumerEducationRequirementMet)="row">
              <strong v-if="studentChangeHighlight[row.index].consumerEducationRequirementMet">
              {{row.item.consumerEducationRequirementMet}}
              </strong>
              <div v-else>
                {{row.item.consumerEducationRequirementMet}}
              </div>
            </template>

            <template #cell(honoursStanding)="row">
              <strong v-if="studentChangeHighlight[row.index].honoursStanding">
              {{row.item.honoursStanding}}
              </strong>
              <div v-else>
                {{row.item.honoursStanding}}
              </div>
            </template>

            <template #cell(gpa)="row">
              <strong v-if="studentChangeHighlight[row.index].gpa">
              {{row.item.gpa}}
              </strong>
              <div v-else>
                {{row.item.gpa}}
              </div>
            </template>

            <template #cell(recalculateProjectedGrad)="row">
              <strong v-if="studentChangeHighlight[row.index].recalculateProjectedGrad">
              {{row.item.recalculateProjectedGrad}}
              </strong>
              <div v-else>
                {{row.item.recalculateProjectedGrad}}
              </div>
            </template>

            <template #cell(recalculateGradStatus)="row">
              <strong v-if="studentChangeHighlight[row.index].recalculateGradStatus">
              {{row.item.recalculateGradStatus}}
              </strong>
              <div v-else>
                {{row.item.recalculateGradStatus}}
              </div>
            </template>

            <template #cell(batchId)="row">
              <strong v-if="studentChangeHighlight[row.index].batchId">
              {{row.item.batchId}}
              </strong>
              <div v-else>
                {{row.item.batchId}}
              </div>
            </template>
          </DisplayTable>
        </b-card-text>
      </b-card>

      <b-card no-body header="Optional Program Change History">
        <b-card-text class="p-3">
          <DisplayTable :items="optionalProgramHistory" :fields="optionalProgramChangeFields" showFilter=false title="Optional Program Change History">
            <template #cell(more)="row">
              <b-btn
                variant="outline primary"
                style="color: #666"
                size="sm"
                @click="row.toggleDetails"
                class="more-button">
                <img v-show="!row.detailsShowing" src="../assets/images/icon-right.svg" width="9px" aria-hidden="true" alt=""/>
                <img v-show="row.detailsShowing" src="../assets/images/icon-down.svg" height="5px" aria-hidden="true" alt=""/>
              </b-btn>
            </template>

            <template #row-details="row">
              <b-card class="px-0 mt-0">
                <p><strong>Changed By {{row.item.updateUser}} on {{row.item.updateDate | formatTime}}</strong></p>
                <pre>
                  {{JSON.stringify(row.item, null, '\t')}}
                </pre>
              </b-card>
            </template>

            <template #cell(createDate)="row">
              {{row.item.createDate | formatTime}}
            </template>

            <template #cell(programCode)="row">
              <strong v-if="optionalProgramChangeHighlight[row.index].programCode">
              {{row.item.programCode}}
              </strong>
              <div v-else>
                {{row.item.programCode}}
              </div>
            </template>
            
            <template #cell(optionalProgramCode)="row">
              <strong v-if="optionalProgramChangeHighlight[row.index].optionalProgramCode">
              {{row.item.optionalProgramCode}}
              </strong>
              <div v-else>
                {{row.item.optionalProgramCode}}
              </div>
            </template>
            
            <template #cell(optionalProgramName)="row">
              <strong v-if="optionalProgramChangeHighlight[row.index].optionalProgramCode">
              {{row.item.optionalProgramName}}
              </strong>
              <div v-else>
                {{row.item.optionalProgramName}}
              </div>
            </template>
            
            <template #cell(optionalProgramCompletionDate)="row">
              <strong v-if="optionalProgramChangeHighlight[row.index].optionalProgramCompletionDate">
              {{row.item.optionalProgramCompletionDate}}
              </strong>
              <div v-else>
                {{row.item.optionalProgramCompletionDate}}
              </div>
            </template>
            
          </DisplayTable>
        </b-card-text>
      </b-card>
    <!-- Student change history -->
      <div v-if="auditTab === 'studentHistory'">
      </div>

      <!-- Optional Program history -->

      <!-- <div v-if="auditTab === 'optionalProgramHistory'">
        <div class="col-12" v-for="(value, index) in optionalProgramChangeHistory.slice().reverse()" :key="value.historyID">
          <div class="row col-12 py-2" :header="optionalProgramHistory.slice().reverse()[index].historyID">
            <div class="col-4 border-bottom">
              <p><strong>Activity Code: </strong>{{optionalProgramHistory.slice().reverse()[index].activityCode}}</p>
              <p><strong>Update User: </strong>{{optionalProgramHistory.slice().reverse()[index].updateUser}}</p>
              <p><strong>Updated: </strong>{{optionalProgramHistory.slice().reverse()[index].createDate | formatTime}}</p>
            </div>
            <div class="float-left col-8 border-bottom">
              <div class="float-right w-25">
                <b-button v-b-toggle="'collapse-'+ optionalProgramHistory.slice().reverse()[index].historyId" variant="primary">View</b-button>
              </div>
              <div v-for="v in value" :key="v.historyId" class="">
                <div class="" v-if="v.pathTo != 'updateDate' 
                  && v.pathTo != 'createDate' 
                  && v.pathTo != 'historyId'
                  && v.pathTo != 'studentID'
                  && v.pathTo != 'studentOptionalProgramId'
                  && v.pathTo != 'optionalProgramID'
                  && v.pathTo != 'studentOptionalProgramData'
                  && v.pathTo != 'activityCode'
                  && v.pathTo != 'recalculateGradStatus'
                  && (v.kind != 'N' || v.rhs)
                  ">
                  <div class="w-25 float-left">
                    <strong>{{v.pathTo | formatSetenceCase}}</strong>:
                  </div>
                  <div class="w-50 float-left" v-if="v.kind != 'N'">
                    {{v.lhs==null?"blank":v.lhs}} <i class="fas fa-arrow-right" aria-hidden="true"></i> {{v.rhs == null?"blank":v.rhs}}
                  </div>
                  <div class="w-50 float-left"  v-else-if="v.rhs != null">
                    {{v.rhs}}
                  </div>
                  <div class="w-100 float-left"></div>
                </div>  
              </div> 
              <div class="w-100 float-left">
                <b-collapse :id="'collapse-' + optionalProgramHistory.slice().reverse()[index].historyId" class="mt-2">
                  <pre>{{JSON.stringify(optionalProgramHistory.slice().reverse()[index], null, '\t')}}</pre>
                </b-collapse>
              </div>
            </div>
          </div>
        </div>
      </div> -->


  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { DeepDiff } from 'deep-diff';
import sharedMethods from '../sharedMethods';
import DisplayTable from "@/components/DisplayTable.vue";

export default {
  name: "StudentAuditHistory",
  components: {
    DisplayTable: DisplayTable,
  },
  props: {},
  computed: {
    ...mapGetters({
        studentId: "getStudentId",
        studentHistory: 'getStudentAuditHistory',
        optionalProgramHistory: 'getStudentOptionalProgramAuditHistory',
        studentUngradReasons: "getStudentUngradReasons",
        studentNotes: "getStudentNotes",
    }),
  },
  data: function () {
    return {
        studentHistoryChangeCount:"",
        optionalProgramHistoryChangeCount:"",
        isEdit:false,
        isDelete:false,
        isAdd:false,
        changeHistory:[],
        optionalProgramChangeHistory:[],
        testHistory:[],
        studentChangeFields: [
          {
            key: "more",
            label: "",
          },
          {
            key: "createDate",
            label: "Date",
            sortable: true,
            sortDirection: "desc"
          },
          {
            key: "activityCode",
            label: "Change = LABEL from History Activity Code table",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "program",
            label: "Program",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "programCompletionDate",
            label: "Program Completion Date",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "studentStatus",
            label: "Status",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "studentGrade",
            label: "Grade",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "schoolOfRecord",
            label: "School of Record",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "schoolAtGrad",
            label: "School at Graduation",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "consumerEducationRequirementMet",
            label: "Consumer Ed",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "honoursStanding",
            label: "Honours",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "gpa",
            label: "GPA",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "recalculateProjectedGrad",
            label: "Recalc Projected Grad",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "recalculateGradStatus",
            label: "Recalc Grad",
            sortable: true,
            sortDirection: "asc"
          },
          {
            key: "batchId",
            label: "Batch ID",
            sortable: true,
            sortDirection: "asc"
          },
        ],
        studentChangeHighlight: [],
        optionalProgramChangeFields: [
          {
            key: "more",
            label: "",
          },
          {
            key: "createDate",
            label: "Date",
            sortable: true,
            sortDirection: "desc",
          },
          {
            key: "activityCode",
            label: "Change = LABEL from History Activity Code table",
            sortable: true,
            sortDirection: "desc",
          },
          {
            key: "programCode",
            label: "Program Code",
            sortable: true,
            sortDirection: "desc",
          },
          {
            key: "optionalProgramCode",
            label: "Optional Program Code",
            sortable: true,
            sortDirection: "desc",
          },
          {
            key: "optionalProgramName",
            label: "Optional Program Name",
            sortable: true,
            sortDirection: "desc",
          },
          {
            key: "optionalProgramCompletionDate",
            label: "Program Completion Date",
            sortable: true,
            sortDirection: "desc",
          },
        ],
        optionalProgramChangeHighlight: [],
        showNotes: false,
        showUngradReasons: false,
        showStudentAudit: true,
        auditTab: "studentHistory",
    };
  },
  mounted() {
    this.showNotification = sharedMethods.showNotification
    //this.studentChangeHighlight = this.highlightHistoryChanges(this.studentHistory, this.historyFields);
    this.highlightStudentHistoryChanges();
    this.highlightOptionalProgramHistoryChanges();
  },
  watch: {
    studentHistory: function () {
      //this.loadStudentHistory();
      this.highlightStudentHistoryChanges();
      //this.studentChangeHighlight = this.highlightHistoryChanges(this.studentHistory, this.historyFields);
    },
    optionalProgramHistory: function () {
      //this.loadStudentOptionalProgramHistory();
      this.highlightOptionalProgramHistoryChanges();
    }    
  },
  methods: {
    highlightHistoryChanges(historyArray, historyFields) {
      const changes = [];

      for (const [index, value] of historyArray.entries()) {
        // temp entry to build our change highlight
        let tempEntry = {};
        if (index > 0) {
          for (const field of historyFields) {
            tempEntry[field.key] = value[field.key] !== historyArray[index - 1][field.key];
          }
        }
        //this.studentChangeHighlight.push(tempEntry);
        changes.push(tempEntry);
      }

      return changes;
    },
    highlightStudentHistoryChanges(){
      // Option 2
      // reset studnet change highlight
      //this.studentChangeHighlight = [];
      const changes = [];

      for (const [index, value] of this.studentHistory.entries()) {
        // temp entry to build our change highlight
        let tempEntry = {};
        for (const field of this.studentChangeFields) {
          if (index > 0) {
            tempEntry[field.key] = value[field.key] !== this.studentHistory[index - 1][field.key];
          } else {
            tempEntry[field.key] = false;
          }
        }
        //this.studentChangeHighlight.push(tempEntry);
        changes.push(tempEntry);
      }

      this.studentChangeHighlight = changes;


      // Option 1
      //const tempChanges = [];

      // find changes
      // for (const [index, value] of studentHistory) {
      //   if (index > 0) {
      //     tempChanges.push(DeepDiff(value, studentHistory[index - 1]));
      //   }
      // }

      // for (change in tempChanges) {
      //   for (item of change) {

      //   }
      // }


    },
    highlightOptionalProgramHistoryChanges() {
      const changes = [];

      for (const [index, value] of this.optionalProgramHistory.entries()) {
        // temp entry to build our change highlight
        let tempEntry = {};
        if (index > 0) {
          for (const field of this.optionalProgramChangeFields) {
            tempEntry[field.key] = value[field.key] !== this.optionalProgramHistory[index - 1][field.key];
          }
        }
        //this.studentChangeHighlight.push(tempEntry);
        changes.push(tempEntry);
      }

      this.optionalProgramChangeHighlight = changes;
    },
    loadStudentHistory(){  
      
      this.studentHistoryChangeCount = this.studentHistory.length + 1
      // need temp variable to avoid triggering an infinite loop w/ watchers
      const tempHistory = this.studentHistory.slice();
      tempHistory.unshift({});
      // reset change history
      this.changeHistory = [];

      for (let i = 0; i < this.studentHistoryChangeCount - 1; i++) {
          let x = DeepDiff(tempHistory[i], tempHistory[i + 1]);
          this.changeHistory.push(x);  
      }
      for (let j = 0; j < this.changeHistory.length ; j++) {  
          for (let k = 0; k < this.changeHistory[j].length; k++) { 
              this.changeHistory[j][k].pathTo = this.changeHistory[j][k].path[0]
          }                 
      }  
    },
    loadStudentOptionalProgramHistory(){

      this.optionalProgramHistoryChangeCount = this.optionalProgramHistory.length + 1; 
      // need temp variable to avoid triggering an infinite loop w/ watchers
      const tempProgramHistory = this.optionalProgramHistory.slice();
      tempProgramHistory.unshift({});
      //reset optionalProgramChangeHistory
      this.optionalProgramChangeHistory = [];
      
      for (let i = 0; i < this.optionalProgramHistoryChangeCount - 1; i++) {
            let z = DeepDiff(tempProgramHistory[i], tempProgramHistory[i + 1]);
            this.optionalProgramChangeHistory.push(z);
      } 
      for (let j = 0; j < this.optionalProgramChangeHistory.length ; j++) {  
        for (let k = 0; k < this.optionalProgramChangeHistory[j].length; k++) { 
            this.optionalProgramChangeHistory[j][k].pathTo = this.optionalProgramChangeHistory[j][k].path[0]
        }                 
      }
    },   
  },
};
</script>

<style>
.table th,
.table td {
  border-top: none !important;
}

.table th svg {
  display: none !important;
}

.highlight {
  background: aliceblue !important;
}

.audit-history-tabs .card-header {
  font-weight: 700 !important;
}

.audit-history-tabs .card{
  margin-top:70px;
}

.card-body p strong {
  font-size: 87.5%;
}

</style>
