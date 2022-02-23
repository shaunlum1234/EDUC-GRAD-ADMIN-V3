<template>
  <div>
      <DisplayTable title="Job/Runs" v-bind:items="batchData"
        v-bind:fields="batchDataFields" id="id" :showFilter=false pagination="true"
      >
      </DisplayTable>
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
      batchDataFields: [
        {
          key: 'createUser',
          label: 'User',
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
    
  },
  created() {
    this.showNotification = sharedMethods.showNotification;   
  },
  watch: { 
    selectedBatchId: function() { 
      this.getAdminDashboardData();
    }
  },
  methods: {
    getAdminDashboardData(){
      StudentService.getBatchHistory(this.selectedBatchId, this.token).then(
        (response) => {
            this.batchData = response.data.content;
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
    }
  },
}
</script>

<style scoped>

</style>