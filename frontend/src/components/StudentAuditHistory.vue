<template>
  <div class="container">
  {{auditOptionalProgramsHistory}}
    <div class="col-12" v-for="(value, index) in changeHistory.slice().reverse()" :key="value.historyID">
      <div class="row col-12 py-2" :header="studentHistory[index+1].historyID">
        <div class="col-4 border-bottom">
          Edited by <strong>{{studentHistory[index+1].activityCode}}</strong> on<br/>
          {{studentHistory[index+1].createDate || formatTime}}
        </div>
        <div class="float-left col-8 border-bottom">
                <div class="float-right w-25">
                  <b-button v-b-toggle="'collapse-'+ studentHistory[index+1].historyID" variant="primary">View</b-button>
                </div>
          <div v-for="v in value" :key="v.historyID" class="">
            <div class="" v-if="v.pathTo != 'updateDate' 
              && v.pathTo != 'createDate' 
              && v.pathTo != 'historyID'
              && v.pathTo != 'studentGradData'
              && v.pathTo != 'activityCode'
              && v.pathTo != 'recalculateGradStatus'
              ">
              <div class="w-25 float-left"> <strong>{{v.pathTo | formatSetenceCase}}</strong>:</div>
              <div class="w-50 float-left"> {{v.lhs==null?"blank":v.lhs}} <i class="fas fa-arrow-right"></i> {{v.rhs == null?"blank":v.rhs}}</div>
        
              <div class="w-100 float-left">
                <b-collapse :id="'collapse-' + studentHistory[index+1].historyID" class="mt-2">
                  <pre>{{JSON.stringify(studentHistory[index+1], null, '\t')}}</pre>
                </b-collapse>
              </div>
            </div>  
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { DeepDiff } from 'deep-diff';
import sharedMethods from '../sharedMethods';
import StudentAuditHistoryService from "@/services/StudentAuditHistoryService.js";

export default {
  name: "StudentAuditHistory",
  components: {

  },
  props: {},
  computed: {
    ...mapGetters({
        studentId: "getStudentId",
        token: "getToken",
        auditHistory: 'getStudentAuditHistory',
        auditOptionalProgramsHistory: 'getStudentOptionalProgramAuditHistory'
    }),
  },
  data: function () {
    return {
        studentHistory: "",
        studentHistoryChangeCount:"",
        optionalProgramHistory:"",
        optionalProgramHistoryChangeCount:"",
        isEdit:false,
        isDelete:false,
        isAdd:false,
        changeHistory:[],
        optionalProgramChangeHistory:[],
        testHistory:[],
         fields: [
            {
            key: "change",
            label: "Change",
            sortable: true,
            sortDirection: "desc"
            },
            {
            key: "createDate",
            label: "Create date",
            sortable: true,
            sortDirection: "desc"
            },

        ]
    };
  },
  created() {
    const studentIdFromURL = this.$route.params.studentId;
    this.showNotification = sharedMethods.showNotification
    this.loadStudentHistory(studentIdFromURL);
    this.loadStudentOptionalProgramHistory(studentIdFromURL);
  },
  methods: {
    loadStudentHistory(studentIdFromURL){
        StudentAuditHistoryService.getStudentHistory(studentIdFromURL, this.token).then(
            (response) => {
              this.studentHistory = response.data;
              this.studentHistoryChangeCount = this.studentHistory.length
              for (let i = 0; i < this.studentHistoryChangeCount - 1; i++) {
                  var x = DeepDiff(this.studentHistory[i], this.studentHistory[i + 1]);
                  this.changeHistory.splice(i,1,x)     
              }
              for (let j = 0; j < this.changeHistory.length ; j++) {  
                  for (let k = 0; k < this.changeHistory[j].length; k++) { 
                      this.changeHistory[j][k].pathTo = this.changeHistory[j][k].path[0]
                  }                 
              }
            }    
        ).catch((error) => {
          this.showNotification("danger", "There was an error with the web service: " + error);
        });
    },
    loadStudentOptionalProgramHistory(studentIdFromURL){
      StudentAuditHistoryService.getStudentOptionalProgramHistory(studentIdFromURL, this.token).then(
        (response) => {
            this.optionalProgramHistory = response.data;  
            this.optionalProgramHistoryChangeCount = this.optionalProgramHistory.length; 
            for (let i = 0; i < this.optionalProgramHistoryChangeCount - 1; i++) {
                  var x = DeepDiff(this.optionalProgramHistory[i], this.optionalProgramHistory[i + 1]);
                  this.optionalProgramChangeHistory.splice(i,1,x)     
            } 
            console.log(this.optionalProgramChangeHistory)      
        }
      ).catch((error) => {
        this.showNotification("danger", "There was an error with the web service: " + error);
      });
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

</style>
