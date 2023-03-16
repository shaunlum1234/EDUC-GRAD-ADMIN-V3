<template>
  <div class="batch-processing-view">
    <h1>Batch Processing</h1>

    <label class="font-weight-bold">New Request</label>
    <b-form-select
      id="inline-form-select-type"
      class="mb-2 mr-sm-2 mb-sm-0"
      :options="batchTypes"
      value-field="code"
      text-field="label"
      text="New Request"
      v-model="runType"
      variant="primary"
      @change="newBatchRequest"
    >
    </b-form-select>
    <b-card>
      <b-tabs>
        <b-tab :title="'Batch Runs (' + batchRuns.length + ')'" active>
          <b-card-text class="row">
            <BatchRuns></BatchRuns>
          </b-card-text>
        </b-tab>
        <b-tab :title="'Routines (' + batchRoutines.length + ')'" active>
          <b-card-text class="row">
            <BatchRoutines></BatchRoutines>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
    <!-- 
        <b-tab :title="'Scheduled ' + scheduledBatchRuns.length" active>
          <b-card-text class="row">
            <ScheduledBatchRuns></ScheduledBatchRuns>
          </b-card-text>
        </b-tab>
        <b-tab :title="'Routines ' + batchRoutines.length" active>
          <b-card-text class="row">
            <BatchRoutines></BatchRoutines>
          </b-card-text>
        </b-tab> </b-tabs
    ></b-card> -->
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
    <div>
      <!-- Modal Dialogs -->

      <b-modal ref="newBatchRequestModal" size="xl" title="New Batch Request">
        <div class="d-block">
          <div v-if="runType == 'DISTRUNUSER'">
            <DistrunForm v-model:schools="schools"></DistrunForm>
          </div>
          <div v-if="runType == 'DISTRUN_YE'">
            <!-- <DistrunFormYearEnd v-model:schools="schools"></DistrunFormYearEnd> -->
          </div>
          <div v-if="runType == 'REGALG'">
            <!-- <GRADForm v-model:schools="schools"></GRADForm> -->
          </div>
          <div v-if="runType == 'TVRRUN'">
            <!-- <GRADForm v-model:schools="schools"></GRADForm> -->
          </div>
          <div v-if="runType == 'PSIRUN'">
            <PSIRUNForm v-model:schools="schools"></PSIRUNForm>
          </div>
        </div>
        <div class="d-block">
          <div v-if="runType == 'DISTRUNUSER'"></div>
          <div class="runSchedule">
            <b-form-group label="Batch Run" v-slot="{ ariaDescribedby }">
              <b-form-radio-group v-model="batchRunSchedule">
                <b-form-radio
                  :aria-describedby="ariaDescribedby"
                  name="batch-runtime-options"
                  value="Run Now"
                  >Run Now</b-form-radio
                >
                <b-form-radio
                  :aria-describedby="ariaDescribedby"
                  name="batch-runtime-options"
                  value="Run Later"
                  >Run Later</b-form-radio
                >
              </b-form-radio-group>

              <b-form-group
                v-if="batchRunSchedule == 'Run Later'"
                label="Schedule"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-radio
                  v-model="cronTime"
                  :aria-describedby="ariaDescribedby"
                  name="schedule-options"
                  value="N"
                  >Tonight at 6:30PM</b-form-radio
                >
                <b-form-radio
                  v-model="cronTime"
                  :aria-describedby="ariaDescribedby"
                  name="schedule-options"
                  value="W"
                  >Weekend Batch - Saturday 12:00PM</b-form-radio
                >
                <b-form-radio
                  v-model="cronTime"
                  :aria-describedby="ariaDescribedby"
                  name="schedule-options"
                  value="M"
                  >Tomorrow at 6:30AM</b-form-radio
                >
                <b-form-radio
                  v-model="cronTime"
                  :aria-describedby="ariaDescribedby"
                  name="schedule-options"
                  value="Custom"
                  >Custom</b-form-radio
                >
                <div class="pl-4" v-if="cronTime == 'Custom'">
                  <!-- <label for="batch-datepicker">Choose a date:</label> -->

                  <b-form-datepicker
                    id="batch-datepicker"
                    v-model="batchRunCustomDate"
                    class="mb-2"
                  ></b-form-datepicker>
                  <b-form-timepicker
                    id="timepicker-buttons"
                    v-model="batchRunCustomTime"
                    now-button
                    reset-button
                    locale="en"
                  ></b-form-timepicker>
                </div>
              </b-form-group>
            </b-form-group>
          </div>
        </div>
        <template #modal-footer="{ ok, cancel, hide }">
          {{ schools }}
          <b>Run:</b>

          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button
            v-if="batchRunSchedule == 'Run Now'"
            size="sm"
            variant="success"
            :disabled="v$.$invalid"
            @click="runBatchRequest()"
            >Run Now</b-button
          >
          <b-button
            v-if="batchRunSchedule == 'Run Later'"
            size="sm"
            variant="success"
            :disabled="v$.$invalid"
            @click="runBatchRequest()"
            >Schedule</b-button
          >

          <b-button size="sm" variant="danger" @click="hideBatchRequestModal()">
            Cancel
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>
<script>
import BatchProcessingService from "@/services/BatchProcessingService.js";
import DistrunForm from "@/components/Batch/Forms/DistrunForm.vue";
//import DistrunFormYearEnd from "@/components/Batch/Forms/DistrunFormYearEnd.vue";
import BatchRuns from "@/components/Batch/BatchRuns.vue";
//import GRADForm from "@/components/Batch/Forms/GRADForm.vue";
import ScheduledBatchRuns from "@/components/Batch/ScheduledBatchRuns.vue";
import BatchRoutines from "@/components/Batch/BatchRoutines.vue";
import DisplayTable from "@/components/DisplayTable.vue";
import { useVuelidate } from "@vuelidate/core";
import { isProxy, toRaw } from "vue";
import sharedMethods from "../sharedMethods";
import { mapGetters } from "vuex";

export default {
  components: {
    DistrunForm: DistrunForm,
    //GRADForm: GRADForm,
    //DistrunFormYearEnd: DistrunFormYearEnd,
    DisplayTable: DisplayTable,
    BatchRoutines: BatchRoutines,
    BatchRuns: BatchRuns,
    ScheduledBatchRuns: ScheduledBatchRuns,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      batchTypes: [],
      runType: "",
      cronTime: "",
      batchRunCustomDate: "",
      batchRunCustomTime: "",

      batchRunSchedule: "Run Now",
      schools: [],
      batchRunData: [],
    };
  },
  computed: {
    ...mapGetters({
      batchRuns: "batchprocessing/getBatchRuns",
      batchScheduledRuns: "batchprocessing/getScheduledBatchJobs",
      batchRoutines: "batchprocessing/getBatchRoutines",
    }),
    // batchRunsCount() {
    //   console.log(this.batchRuns.length);
    //   return this.batchRuns.length > 0 ? batchRuns.length : 0;
    // },
    // scheduledBatchRunsCount() {
    //   return this.scheduledBatchRuns.length > 0 ? scheduledBatchRuns.length : 0;
    // },
    // batchRoutinesCount() {
    //   return this.batchRoutines.length > 0 ? batchRoutines.length : 0;
    // },
  },
  created() {
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
    async validateForm() {
      const result = await this.v$.$validate();
    },

    async runBatchRequest() {
      const result = await this.v$.$validate();
      if (!result) {
        console.log("INVALID");
        return;
      }
      console.log("VALID");
      console.log(this.runType);
      if (this.runType == "DISTRUNUSER") {
        console.log("RUNNING DISTRUN" + this.cronTime);
        if (this.cronTime) {
          console.log("Scheduled" + this.cronTime);
        }
        if (isProxy(this.schools)) {
          this.schools = toRaw(this.schools);
        }
        this.hideBatchRequestModal();
      }
    },
    newBatchRequest() {
      this.showBatchRequestModal();
    },
    showBatchRequestModal() {
      this.$refs["newBatchRequestModal"].show();
    },
    hideBatchRequestModal() {
      this.$refs["newBatchRequestModal"].hide();
      this.clearBatchRequest();
    },
    clearBatchRequest() {
      this.runType = "";
      this.cronTime = "";
      this.batchRunSchedule = "Run Now";
      this.batchRunCustomDate = "";
      this.batchRunCustomTime = "";
      this.batchRunSchedule = "";
    },
  },
  compatConfig: { MODE: 2 },
};
</script>
