<template>
  <div>
    <h1>{{id}}</h1>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import sharedMethods from '../sharedMethods'
export default {
  name: "batchJobSearch",
  components: {

  },
  data() {
    return {
      id: "",
    };
  },

  computed: {
    ...mapGetters({
      token: "getToken",
    }),
  },
  created() {
    this.showNotification = sharedMethods.showNotification;
    const batchJobId = this.$route.params.batchJobId;
    this.loadBatchJob(batchJobId)
  },
  methods: {
    loadBatchJob(JobId) {
      this.id = JobId;      
    } 
  },
}
</script>

<style scoped>

</style>