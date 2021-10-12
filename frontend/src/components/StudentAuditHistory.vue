<template>
  <div>
    {{changeHistory}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
        changeHistory:[]
    };
  },
  created() {
      const studentIdFromURL = this.$route.params.studentId;
      this.loadStudentHistory(studentIdFromURL);
      this.loadStudentOptionalProgramHistory(studentIdFromURL);
  },
  methods: {
    loadStudentHistory(studentIdFromURL){
        StudentAuditHistoryService.getStudentHistory(studentIdFromURL, this.token).then(
            (response) => {
                this.studentHistory = response.data;
                this.studentHistoryChangeCount = this.studentHistory.length
                for (let i = 0; i < this.studentHistoryChangeCount; i++) {
                    this.changeHistory += this.diff(this.studentHistory[i], this.studentHistory[i + 1])
                    
                }    
                console.log("Change history: "+ this.changeHistory)
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
                console.error(error.response);
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
