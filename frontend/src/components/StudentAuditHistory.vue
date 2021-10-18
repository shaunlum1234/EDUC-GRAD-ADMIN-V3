<template>
  <div class="container">
    <div class="col-12" v-for="(value, index) in changeHistory.slice().reverse()" :key="value.historyID">
          <div class="row col-12 py-2" :header="studentHistory[index+1].historyID">
              <!-- {{studentHistory[index+1]}} -->
              <!-- <li>{{v.user}}</li> -->
              <div class="col-4 border-bottom">
                Edited by {{studentHistory[index+1].activityCode}} on
                {{studentHistory[index+1].createDate || formatTime}}
              </div>
              <div class="float-left col-8 border-bottom">
                <div v-for="v in value" :key="v.historyID" class="">
                    
                  <div class="" v-if="v.pathTo != 'updateDate' 
                      && v.pathTo != 'createDate' 
                      && v.pathTo != 'historyID'
                      && v.pathTo != 'studentGradData'
                      && v.pathTo != 'activityCode'
                      && v.pathTo != 'recalculateGradStatus'
                      ">
                      <div class="w-50 float-left"> <strong>{{v.pathTo | formatSetenceCase}}</strong>:</div>
                      <div class="w-50 float-left"> {{v.lhs==null?"_____":v.lhs}} <i class="fas fa-arrow-right"></i> {{v.rhs == null?"_____":v.rhs}}</div>
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
    }),
  },
  data: function () {
    return {
        studentHistory: "",
        studentHistoryChangeCount:"",
        OptionalProgramHistory:"",
        changeHistory:[],
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
      this.loadStudentHistory(studentIdFromURL);
    //   this.loadStudentOptionalProgramHistory(studentIdFromURL);
  },
  methods: {
    loadStudentHistory(studentIdFromURL){
        StudentAuditHistoryService.getStudentHistory(studentIdFromURL, this.token).then(
            (response) => {
                this.studentHistory = response.data;
                this.studentHistoryChangeCount = this.studentHistory.length
                for (let i = 0; i < this.studentHistoryChangeCount - 1; i++) {
                    // this.changeHistory.splice(i,1,this.diff(this.studentHistory[i], this.studentHistory[i + 1]))  
                    // this.changeHistory = DeepDiff(this.studentHistory[i], this.studentHistory[i + 1]); 
                    var x = DeepDiff(this.studentHistory[i], this.studentHistory[i + 1]);
                    // x.push({"user" : this.studentHistory[i].createUser});
                    // x.push({"createDate" : this.studentHistory[i].createDate});
                    // x.push({"path" : x[i].path[0]});
                    // console.log("Test")
                    // console.log(x[i].path[0]);
                    this.changeHistory.splice(i,1,x)     
                }
                for (let j = 0; j < this.changeHistory.length ; j++) {  
                    for (let k = 0; k < this.changeHistory[j].length; k++) { 
                        console.log('j') 
                        console.log(j) 
                        console.log('k') 
                        console.log(k)  
                        this.changeHistory[j][k].pathTo = this.changeHistory[j][k].path[0]
                    }
                    
                }
                // console.log(this.changeHistory)

            }
            
        ).catch((error) => {
                console.error(error);  
        });
    },
    loadStudentOptionalProgramHistory(studentIdFromURL){
        StudentAuditHistoryService.getStudentOptionalProgramHistory(studentIdFromURL, this.token).then(
            (response) => {
                this.OptionalProgramHistory = response.data;              
            }
        ).catch((error) => {
            
            if(error.response.status){
            // this.$bvToast.toast("ERROR " + error.response.statusText, {
            //     title: "ERROR" + error.response.status,
            //     variant: 'danger',
            //     noAutoHide: true,
            // });
                // console.error(error.response);
            }
        });
    },
    // getObjectDiff(obj1, obj2) {
    // const diff = Object.keys(obj1).reduce((result, key) => {
    //     if (!obj2.hasOwnProperty(key)) {
    //         result.push(key);
    //     } else if (_.isEqual(obj1[key], obj2[key])) {
    //         const resultKeyIndex = result.indexOf(key);
    //         result.splice(resultKeyIndex, 1);
    //     }
    //     return result;
    // }, Object.keys(obj2));

    // return diff;
    // }, 
    diff(obj1, obj2) {
    const result = {}; 
    if (Object.is(obj1, obj2)) {
        return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
        return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        if(obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
            result[key] = obj2[key];
        }
        if(typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
            const value = this.diff(obj1[key], obj2[key]);
            if (value !== undefined) {
                result[key] = value;
            }
        }
    });
    return result;
}
        
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
