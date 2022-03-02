<template>
  <div>
    {{currentPage}}
      <DisplayTable title="Job/Runs" v-bind:items="batchData"
        v-bind:fields="batchDataFields" 
        id="id" 
        :showFilter=false 
        :pagination=false
      >
        <template #cell(pen)="row">
          <b-btn :id="'pen'+ row.item.pen" 
            variant='link' 
            size="xs" 
            @click="findStudentByPen(row.item.pen)
          ">   
            {{row.item.pen}}           
          </b-btn>
        </template>
      </DisplayTable>
      <b-pagination
        v-model="userSelectedPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import sharedMethods from '../sharedMethods';
import StudentService from "@/services/StudentService.js";
import DisplayTable from '@/components/DisplayTable.vue';
export default {
  name: "batchJobSearch",
  components: {
    DisplayTable: DisplayTable,
  },
  props: ['selectedBatchId']
  ,
  data() {
    return {
      batchData: [],
      perPage: 10,
      rows:0,
      currentPage:0,
      userSelectedPage:0,
      batchDataFields: [
        {
          key: 'pen',
          label: 'Pen',
          sortable: true,
          class: 'text-left',
          editable: true
        },  
        {
          key: 'legalFirstName',
          label: 'First Name',
          sortable: true,
          class: 'text-left',
          editable: true
        }, 
        {
          key: 'legalLastName',
          label: 'Last Name',
          sortable: true,
          class: 'text-left',
          editable: true
        }, 
        {
          key: 'schoolOfRecord',
          label: 'School of Record',
          sortable: true,
          class: 'text-left',
          editable: true
        }, 
      ],     
    };
  },

  computed: {
    ...mapGetters({
      token: "getToken",
    }),
    currentPageChange(){
      return this.userSelectedPage;
    },
  },
  created() {
    this.showNotification = sharedMethods.showNotification;   
  },
  watch: { 
    selectedBatchId: function() { 
      this.getAdminDashboardData(0);
    },
    currentPageChange:function(){  
      this.getAdminDashboardData(this.userSelectedPage);
    },
  },
  methods: {
    getAdminDashboardData(page){ 
      if(page){
        if(page > 0){
          page = page - 1;  
        }
      }    
      StudentService.getBatchHistory(this.selectedBatchId, page, this.token).then(
        (response) => {
            this.batchData = response.data.content;
            this.rows = response.data.totalElements;
          }
        ).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
      });
    },
    loadStudent: function (student) {
        this.selectedPen = student[0].pen;
        this.selectedId = student[0].studentID;
        let path = 'student-profile';
        var currentRoute =  this.$route.path.split("/").slice(1)[0];

        this.$router.push({
          path: `/student-profile/${this.selectedPen}/${this.selectedId}`
        });
        //Used for reloading if on the same Student Profile page  
        if(path == currentRoute){
          location.reload();
        }
    },
    findStudentByPen: function(pen) {
      if (pen) {
        StudentService.getStudentByPen(pen, this.token)
        .then((response) => {
          if (response.data) {
            this.loadStudent(response.data);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log('Batch Admin Load: ' + error);
          this.showNotification("danger", "Student cannot be found on the GRAD or PEN database");
        });
      }
    },
  },
}
</script>

<style scoped>

</style>