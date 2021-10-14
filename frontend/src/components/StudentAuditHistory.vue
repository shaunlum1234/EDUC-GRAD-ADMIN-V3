<template>
  <div>
     <b-table bordered :items="changeHistory"  title="auditHistory" :fields="fields">
         <template #cell(studentGrade)="row">
             
             <div v-for="(value, name ) in row.item" :key="name.historyID">
                 {{value.path}}
                 <br>
                <div v-if="value.path !== 'createDate' && value['path'] !== 'updateDate'">
                
                  CHANGE  {{value['lhs']? value['lhs'] :"______" }} -> {{value['rhs']}}
                </div>
                
                <hr>
    
                <br/>
             </div>       
         </template>
     </b-table>
     <!-- <div v-for="(value, name) in changeHistory" :key="name.historyID">
        {{ name }}: {{ value }}
     </div> -->
     <!-- <div>{{changeHistory}}</div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { DeepDiff } from 'deep-diff';
// import _ from 'lodash';
import StudentAuditHistoryService from "@/services/StudentAuditHistoryService.js";
// import DisplayTable from "@/components/DisplayTable.vue";
export default {
  name: "StudentAuditHistory",
  components: {
    // DisplayTable: DisplayTable,
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
            key: "activityCode",
            label: "Activity",
            sortable: true,
            sortDirection: "desc"
            },
            {
            key: "updateDate",
            label: "Update Date",
            sortable: true,
            sortDirection: "desc"
            },
            {
            key: "createUser",
            label: "User",
            sortable: true,
            sortDirection: "desc"
            },
            {
            key: "studentGrade",
            label: "Changes",
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
                    x.push({"user" : this.studentHistory[i].createUser});
                    console.log(x);
                    this.changeHistory.splice(i,1,x)
                    
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
