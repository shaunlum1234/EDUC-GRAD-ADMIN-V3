<template>
  <div class="batch-processing-view">
    <h1>Batch Processing</h1>
    <div>
      <ul>
        <li>Disable a submit buttons</li>
        <li>reactive fields</li>
        <li>required fields</li>
        <li>Date Rage date fields to and from validations</li>
        <li>type in date fields and auto format</li>
        <li>default fields and autofill fields</li>
        <li>add multiple schools/students and validate</li>
        <li>validate students based on response</li>
      </ul>
    </div>
    <strong>FORM VALUES:</strong><br/>
     {{runType}}
    <div>
      <label class="font-weight-bold">Run Type</label>
      <b-form-select
        id="inline-form-select-type"
        class="mb-2 mr-sm-2 mb-sm-0"
        :options="batchTypes"
        value-field="code"
        text-field="label"
        v-model="runType"
      >
      </b-form-select>
      <div v-if="runType=='DISTRUNUSER'">
        <DistrunForm></DistrunForm>
      </div>
      
      
    </div>
  </div>
</template>
<script>
  import BatchProcessingService from "@/services/BatchProcessingService.js";
  import DistrunForm from "@/components/Batch/DistrunForm.vue";
  import { mapGetters } from "vuex";

  export default {
    components:{
       DistrunForm: DistrunForm,
    },
    data() {
      return {
        batchTypes: [],
        runType: "",
      }
    },
    created(){
      BatchProcessingService.getBatchJobTypes()
      .then((response) => {
        this.batchTypes = response.data;
      })
      // eslint-disable-next-line
      .catch((error) => {
        this.$bvToast.toast("ERROR " + error.response.statusText, {
          title: "ERROR" + error.response.status,
          variant: "danger",
          noAutoHide: true,
        });
      });
    },
    methods: {

    }
  }
</script>