<template>
  <div class="batch-processing-view">
    <h1>Batch Processing</h1>

    <b-card>
      <b-tabs>
        <b-tab :title="'Batch Runs (' + batchRuns.length + ')'" active>
          <b-card-text class="p-2">
            <BatchRuns></BatchRuns>
          </b-card-text>
        </b-tab>
        <b-tab title="Scheduled" active>
          <b-card-text class="row">
            <ScheduledBatchRuns></ScheduledBatchRuns>
          </b-card-text>
        </b-tab>
        <b-tab :title="'Routines (' + batchRoutines.length + ')'">
          <b-card-text class="p-2">
            <BatchRoutines></BatchRoutines>
          </b-card-text>
        </b-tab>

        <b-tab title="New Batch Request">
          <b-card-text class="py-2 m-0">
            <div>
              <b-card-group deck>
                <b-card header="GRAD Updates" header-tag="header">
                  <b-card-text>
                    <b-table
                      striped
                      hover
                      :items="batchRunGradTypes"
                      :fields="batchFields"
                      :show-header="false"
                    >
                      <template #cell(description)="row">
                        <strong>{{ row.item.label }}</strong>
                        <hr />

                        {{ row.item.description }}
                      </template>
                      <template #cell(newrequest)="row">
                        <b-btn @click="newBatchRequest(row.item.code)"
                          >+</b-btn
                        ></template
                      >
                    </b-table>
                  </b-card-text>
                </b-card>
                <b-card
                  header="Distribution Runs"
                  header-tag="header"
                  footer-tag="footer"
                >
                  <b-card-text>
                    <div>
                      <b-table
                        striped
                        hover
                        :items="batchRunTypes"
                        :fields="batchFields"
                        :show-header="false"
                      >
                        <template #cell(description)="row">
                          <strong>{{ row.item.label }}</strong>
                          <hr />

                          {{ row.item.description }}
                        </template>
                        <template #cell(newrequest)="row">
                          <b-btn @click="newBatchRequest(row.item.code)"
                            >+</b-btn
                          ></template
                        >
                      </b-table>
                    </div>
                  </b-card-text>
                </b-card>
                <b-card header="PSI" header-tag="header">
                  <b-card-text>
                    <div>
                      <b-table
                        striped
                        hover
                        :items="batchRunArchiveDatabaseTypes"
                        :fields="batchFields"
                        :show-header="false"
                      >
                        <template #cell(description)="row">
                          <strong>{{ row.item.label }}</strong>
                          <hr />

                          {{ row.item.description }}
                        </template>
                        <template #cell(newrequest)="row">
                          <b-btn @click="newBatchRequest(row.item.code)"
                            >+</b-btn
                          ></template
                        >
                      </b-table>
                    </div>
                  </b-card-text>
                </b-card>
              </b-card-group>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Administration">
          <b-card-text class="py-2 m-0">
            <div>
              <b-card-group deck>
                <b-card header="Year End" header-tag="header">
                  <b-card-text>
                    <b-table
                      striped
                      hover
                      :items="adminRunTypes"
                      :fields="batchFields"
                      :show-header="false"
                    >
                      <template #cell(description)="row">
                        <strong>{{ row.item.label }}</strong>
                        <hr />

                        {{ row.item.description }}
                      </template>
                      <template #cell(newrequest)="row">
                        <b-btn @click="newBatchRequest(row.item.code)"
                          >+</b-btn
                        ></template
                      >
                    </b-table>
                  </b-card-text>
                </b-card>
                <b-card
                  header="Utilities"
                  header-tag="header"
                  footer-tag="footer"
                >
                  <b-card-text>
                    <div>
                      <b-table
                        striped
                        hover
                        :items="utilitiesRunTypes"
                        :fields="batchFields"
                        :show-header="false"
                      >
                        <template #cell(description)="row">
                          <strong>{{ row.item.label }}</strong>
                          <hr />

                          {{ row.item.description }}
                        </template>
                        <template #cell(newrequest)="row">
                          <b-btn @click="newBatchRequest(row.item.code)"
                            >+</b-btn
                          ></template
                        >
                      </b-table>
                    </div>
                  </b-card-text>
                </b-card>
              </b-card-group>
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
    <div>
      <!-- Modal Dialogs -->

      <b-modal ref="newBatchRequestModal" size="xl" title="New Batch Request">
        dsdsds
        <div class="pt-1 d-block">
          <div v-if="runType == 'DISTRUNUSER'">
            <DistrunForm v-model:schools="schools"></DistrunForm>
          </div>
          <div v-if="runType == 'DISTRUN_YE'">
            <DistrunFormYearEnd
              v-model:districts="schools"
            ></DistrunFormYearEnd>
          </div>
          <div v-if="runType == 'REGALG'">
            <GRADForm v-model:schools="schools"></GRADForm>
          </div>
          <div v-if="runType == 'TVRRUN'">
            <GRADForm v-model:schools="schools"></GRADForm>
          </div>
          <div v-if="runType == 'PSIRUN'">
            <PSIRUNForm v-model:schools="schools"></PSIRUNForm>
          </div>
        </div>
        <div class="d-block">
          <div v-if="runType == 'DISTRUNUSER'"></div>
          <div class="runSchedule">
            <b-form-group
              class="font-weight-bold mt-3"
              label="Batch Run"
              v-slot="{ ariaDescribedby }"
            >
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
import DistrunFormYearEnd from "@/components/Batch/Forms/DistrunFormYearEnd.vue";
import BatchRuns from "@/components/Batch/BatchRuns.vue";
import GRADForm from "@/components/Batch/Forms/GRADForm.vue";
import PSIRUN from "@/components/Batch/Forms/PSIRun.vue";
import ScheduledBatchRuns from "@/components/Batch/ScheduledBatchRuns.vue";
import BatchRoutines from "@/components/Batch/BatchRoutines.vue";
import DisplayTable from "@/components/DisplayTable.vue";
import { useVuelidate } from "@vuelidate/core";
import { isProxy, toRaw } from "vue";
import { useBatchProcessingStore } from "../store/modules/batchprocessing";
import { mapState } from "pinia";

export default {
  components: {
    DistrunForm: DistrunForm,
    PSIRUNForm: PSIRUN,
    GRADForm: GRADForm,
    DistrunFormYearEnd: DistrunFormYearEnd,
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
      batchFields: [
        {
          key: "description",
          label: "",
          sortable: true,
        },
        {
          key: "newrequest",
          label: "",
          sortable: true,
        },
      ],
      batchRunGradTypes: [
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2021-12-13T20:30:09.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2021-12-13T20:30:09.000+00:00",
          code: "REGALG",
          label: "Graduation Algorithm",
          description:
            "The Batch Algorithm Run  will determine if a student has met all of their program requirements; update their GRAD record and create the appropriate Transcript and Certificate(s). This run also updates the Graduation and Non-Graduation school reports.",
          displayOrder: 10,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2021-12-13T20:30:09.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2021-12-13T20:30:09.000+00:00",
          code: "TVRRUN",
          label: "Transcript Verification Report",
          description:
            "The Batch Transcript Verification Report (TVR) Run updates student individual TVRs as PDF reports which are a summary of a students' GRAD status including the students' courses and assessments, program requirements met, non-grad reasons and graduation status. This run also updates the school Projected Non-Grad Summary Report.",
          displayOrder: 20,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
      ],
      batchRunArchiveDatabaseTypes: [
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-08-05T21:23:56.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-08-05T21:23:56.000+00:00",
          code: "PSIRUN",
          label: "PSI Run FTP / Paper",
          description:
            "The batch PSI student transcript process  supports the printing of student transcript reports to PSIs via paper printed through BC Mail or through a secure FTP process which supplies data files to the PSI.",
          displayOrder: 40,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
      ],
      adminRunTypes: [
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-11-26T00:53:27.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-11-26T00:53:27.000+00:00",
          code: "ARCHIVE_PROCESS",
          label: "Archive Process",
          description:
            "A Year-End Distribution Run that sends printed certificate and transcript packages (including distribution reports) to districts and schools. Includes students with new program completions where a certificate has not yet been distributed and students with updated transcripts after a previous completion.",
          displayOrder: 50,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-11-26T00:53:27.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-11-26T00:53:27.000+00:00",
          code: "EDW_DOWNLOADS",
          label: "EDW Downloads",
          description:
            "A Supplemental Year-End Distribution Run that sends printed certificate and transcript packages (including distribution reports) to schools only. Includes students with new program completions where a certificate has not yet been distributed and students with updated transcripts after a previous completion.",
          displayOrder: 70,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-11-26T00:53:27.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-11-26T00:53:27.000+00:00",
          code: "Purge/Rollover/Delete School Reports",
          label: "PURGE_ROLLOVER_DELETE_SCHOOL_REPORTS",
          description:
            "A Non-Graduate Transcript Distribution Run sends transcript packages (including distribution reports) to districts and schools for any current students in Grade 12 or AD who were on a graduation program but did not graduate.",
          displayOrder: 80,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-04-05T16:26:11.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-04-05T16:26:11.000+00:00",
          code: "Challenges Report",
          label: "CHALLENGES_REPORT",
          description:
            "A Credentials Distribution Run that sends printed certificate and transcript packages (including distribution reports) to schools only. Includes students with new program completions where a certificate has not yet been distributed.",
          displayOrder: 60,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
      ],
      utilitiesRunTypes: [
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-11-26T00:53:27.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-11-26T00:53:27.000+00:00",
          code: "ADOPT_STUDENT",
          label: "Adopt Student",
          description:
            "A Year-End Distribution Run that sends printed certificate and transcript packages (including distribution reports) to districts and schools. Includes students with new program completions where a certificate has not yet been distributed and students with updated transcripts after a previous completion.",
          displayOrder: 50,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-11-26T00:53:27.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-11-26T00:53:27.000+00:00",
          code: "MERGE_DEMERGE_STUDENT_DATA",
          label: "Merge/Demerge Student Data",
          description:
            "A Supplemental Year-End Distribution Run that sends printed certificate and transcript packages (including distribution reports) to schools only. Includes students with new program completions where a certificate has not yet been distributed and students with updated transcripts after a previous completion.",
          displayOrder: 70,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-11-26T00:53:27.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-11-26T00:53:27.000+00:00",
          code: "TRANSFER_STUDENT_ASSESSMENT_DATA",
          label: "Transfer Student Course/Assessment Data",
          description:
            "A Non-Graduate Transcript Distribution Run sends transcript packages (including distribution reports) to districts and schools for any current students in Grade 12 or AD who were on a graduation program but did not graduate.",
          displayOrder: 80,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
      ],
      batchRunTypes: [
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-11-26T00:53:27.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-11-26T00:53:27.000+00:00",
          code: "DISTRUN_YE",
          label: "Year-End Credentials and Transcript Distribution Run",
          description:
            "A Year-End Distribution Run that sends printed certificate and transcript packages (including distribution reports) to districts and schools. Includes students with new program completions where a certificate has not yet been distributed and students with updated transcripts after a previous completion.",
          displayOrder: 50,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-11-26T00:53:27.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-11-26T00:53:27.000+00:00",
          code: "DISTRUN_SUPP",
          label: "Supplemental Credentials and Transcript Distribution Run",
          description:
            "A Supplemental Year-End Distribution Run that sends printed certificate and transcript packages (including distribution reports) to schools only. Includes students with new program completions where a certificate has not yet been distributed and students with updated transcripts after a previous completion.",
          displayOrder: 70,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-11-26T00:53:27.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-11-26T00:53:27.000+00:00",
          code: "NONGRADRUN",
          label: "Non-Graduate Transcript Distribution Run",
          description:
            "A Non-Graduate Transcript Distribution Run sends transcript packages (including distribution reports) to districts and schools for any current students in Grade 12 or AD who were on a graduation program but did not graduate.",
          displayOrder: 80,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-04-05T16:26:11.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-04-05T16:26:11.000+00:00",
          code: "DISTRUN",
          label: "Credentials and Transcript Distribution Run",
          description:
            "A Credentials Distribution Run that sends printed certificate and transcript packages (including distribution reports) to schools only. Includes students with new program completions where a certificate has not yet been distributed.",
          displayOrder: 60,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
        {
          createUser: "API_GRAD_BATCH",
          createDate: "2022-04-05T16:26:12.000+00:00",
          updateUser: "API_GRAD_BATCH",
          updateDate: "2022-04-05T16:26:12.000+00:00",
          code: "DISTRUNUSER",
          label: "User Request Distribution Run",
          description:
            "The User Batch Distribution Run (re)distributes transcripts and/or certificates based on the User selection criteria.",
          displayOrder: 30,
          effectiveDate: "2021-09-27T07:00:00.000+00:00",
          expiryDate: null,
        },
      ],
    };
  },
  computed: {
    ...mapState(useBatchProcessingStore, {
      batchRuns: "getBatchRuns",
      batchRoutines: "getBatchRoutines",
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
      } else if (this.runType == "DISTRUN_YE") {
        console.log("RUNNING DISTRUN YEAREND" + this.cronTime);
        if (this.cronTime) {
          console.log("Scheduled" + this.cronTime);
        }
        if (isProxy(this.districts)) {
          this.districts = toRaw(this.districts);
        }
        console.log(this.districts);
        this.hideBatchRequestModal();
      }
    },
    newBatchRequest(runType) {
      this.runType = runType;
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
