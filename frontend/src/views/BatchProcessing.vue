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
    <div></div>
    <strong>FORM VALUES:</strong><br />
    {{ runType }}
    <div>
      <label class="font-weight-bold">Run Type</label>
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

      <!-- Modal Dialogs -->

      <b-modal ref="newBatchRequestModal" title="New Batch Request">
        {{ batchRunTime }}ss
        {{ batchRunCustomDate }}
        {{ batchRunCustomTime }}
        {{ batchRunSchedule }}
        <div class="d-block text-center">
          <div v-if="runType == 'DISTRUNUSER'">
            <DistrunForm></DistrunForm>
          </div>
        </div>
        <div class="d-block text-center">
          <div v-if="runType == 'DISTRUNUSER'"></div>
          {{ batchRunTime }}
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
                  v-model="batchRunTime"
                  :aria-describedby="ariaDescribedby"
                  name="schedule-options"
                  value="N"
                  >Tonight at 6:30PM</b-form-radio
                >
                <b-form-radio
                  v-model="batchRunTime"
                  :aria-describedby="ariaDescribedby"
                  name="schedule-options"
                  value="W"
                  >Weekend Batch - Saturday 12:00PM</b-form-radio
                >
                <b-form-radio
                  v-model="batchRunTime"
                  :aria-describedby="ariaDescribedby"
                  name="schedule-options"
                  value="M"
                  >Tomorrow at 6:30AM</b-form-radio
                >
                <b-form-radio
                  v-model="batchRunTime"
                  :aria-describedby="ariaDescribedby"
                  name="schedule-options"
                  value="Custom"
                  >Custom</b-form-radio
                >
                <div class="pl-4" v-if="batchRunTime == 'Custom'">
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
          <b>Run:</b>
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button
            v-if="batchRunSchedule == 'Run Now'"
            size="sm"
            variant="success"
            @click="runBatchRequest()"
            >Run Now</b-button
          >
          <b-button
            v-if="batchRunSchedule == 'Run Later'"
            size="sm"
            variant="success"
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
import { mapGetters } from "vuex";

export default {
  components: {
    DistrunForm: DistrunForm,
  },
  data() {
    return {
      batchTypes: [],
      runType: "",
      scheduleBatch: "",
      cronTime: "",
      batchRunTime: "Run Now",
      batchRunCustomDate: "",
      batchRunCustomTime: "",
      batchRunSchedule: "",
    };
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
    runBatchRequest() {
      if (scheduleBatch) {
        console.log("Batch Scheduled for " + scheduleBatch);
        if (runType == "DISTRUN") {
          console.log("RUNNING DISTRUN");
        }
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
      this.scheduleBatch = "";
      this.runType = "";
      this.cronTime = "";
      this.batchRunTime = "Run Now";
      this.batchRunCustomDate = "";
      this.batchRunCustomTime = "";
      this.batchRunSchedule = "";
    },
  },
};
</script>
