<template>
  <div class="col-12 float-left p-0">
    <div v-if="adminDashboardLoading">LOADING</div>
    <DisplayTable
      title="Job/Runs"
      :items="batchRuns"
      v-bind:fields="batchRunsFields"
      id="id"
      :showFilter="false"
      pagination="true"
    >
      <template #cell(jobExecutionId)="row">
        <b-btn
          v-if="row.item.status == 'COMPLETED'"
          :id="'batch-job-id-btn' + row.item.jobExecutionId"
          variant="link"
          size="xs"
        >
          {{ row.item.jobExecutionId }}
        </b-btn>

        <b-btn v-else disabled variant="link" size="xs">
          {{ row.item.jobExecutionId }}
        </b-btn>
        <b-popover
          :target="'batch-job-id-btn' + row.item.jobExecutionId"
          triggers="focus"
          :ref="'popover-' + row.item.jobExecutionId"
          class="w-50"
        >
          <template #title>Batch Job #{{ row.item.jobExecutionId }}</template>
          <div class="row border-bottom">
            <div class="col-9"></div>
            <div class="col-3"></div>
          </div>
          <!-- view Batch Results -->
          <div class="row border-bottom p-2">
            <div class="col-12">
              <a
                href="#"
                :id="'batch-job-id-btn' + row.item.jobExecutionId"
                variant="link"
                size="xs"
                @click="setBatchId(row.item.jobExecutionId, 'batch')"
              >
                View Batch Results
              </a>
            </div>
          </div>
          <div
            class="row border-bottom p-2"
            v-if="row.item.jobType != 'DISTRUNUSER'"
          >
            <div class="col-10 p-2">
              Rerun this batch for <br />{{
                row.item.expectedStudentsProcessed != 0
                  ? row.item.expectedStudentsProcessed
                  : ""
              }}
              students
            </div>
            <div
              class="col-2 px-2 m-0"
              v-if="row.item.jobType != 'DISTRUNUSER'"
            >
              <b-btn
                :id="'batch-job-id-rerun-btn' + row.item.jobExecutionId"
                :disabled="
                  row.item.jobType != 'TVRRUN' && row.item.jobType != 'REGALG'
                "
                class="p-0 m-0 float-right"
                variant="link"
                size="xs"
                @click="rerunBatch(row.item.jobExecutionId)"
              >
                <img width="35" src="../../assets/images/play_icon.png" />
              </b-btn>
            </div>
          </div>
          <div
            class="row border-bottom p-2"
            v-if="
              row.item.jobType != 'DISTRUNUSER' &&
              row.item.failedStudentsProcessed != 0
            "
          >
            <div class="col-10 p-2">
              Rerun
              {{
                row.item.failedStudentsProcessed != 0
                  ? row.item.failedStudentsProcessed
                  : ""
              }}
              students with errors
            </div>
            <div class="col-2 px-2 m-0">
              <b-btn
                :disabled="
                  row.item.jobType != 'TVRRUN' &&
                  row.item.jobType != 'REGALG' &&
                  row.item.failedStudentsProcessed == 0
                "
                :id="'batch-job-id-error-rerun-btn' + row.item.jobExecutionId"
                class="p-0 m-0 float-right"
                variant="link"
                size="xs"
                @click="rerunBatchStudentErrors(row.item.jobExecutionId)"
              >
                <img width="35" src="../../assets/images/play_icon.png" />
              </b-btn>
            </div>
          </div>

          <div
            class="row p-2 border-bottom"
            v-if="row.item.jobType != 'DISTRUNUSER'"
          >
            <div class="col-10 p-2">Rerun school reports</div>
            <div class="col-2 px-2 m-0">
              <b-btn
                :disabled="
                  row.item.jobType != 'TVRRUN' && row.item.jobType != 'REGALG'
                "
                :id="
                  'batch-job-id-student-report-rerun-btn' +
                  row.item.jobExecutionId
                "
                class="p-0 m-0 float-right"
                variant="link"
                size="xs"
                @click="rerunBatchSchoolReports(row.item.jobExecutionId)"
              >
                <img width="35" src="../../assets/images/play_icon.png" />
              </b-btn>
            </div>
          </div>
          <b-card class="mt-3 p-0" title="Batch Job Parameters">
            <b-card-text>
              <pre v-if="row.item.jobParameters"
                >{{ JSON.stringify(row.item.jobParameters, null, "\t") }} </pre
              >
            </b-card-text>
          </b-card>
        </b-popover>
      </template>
      <template #cell(failedStudentsProcessed)="row">
        <b-btn
          v-if="row.item.failedStudentsProcessed != 0"
          variant="link"
          size="xs"
          @click="setBatchId(row.item.jobExecutionId, 'error')"
        >
          {{ row.item.failedStudentsProcessed }}
        </b-btn>
        <div v-if="row.item.failedStudentsProcessed == 0">
          {{ row.item.failedStudentsProcessed }}
        </div>
      </template>
    </DisplayTable>
    <!-- All batch results -->
    <div v-if="isBatchShowing" class="col-12 col-md-5 float-right pl-2 pr-0">
      <b-card
        bg-variant="light"
        :header="'Batch Job ' + this.adminSelectedBatchId"
        class="text-left mb-2"
      >
        <b-card-text>
          <BatchJobSearchResults
            :selectedBatchId="adminSelectedBatchId"
          ></BatchJobSearchResults>
          <b-btn
            variant="danger"
            size="xs"
            class="float-right"
            @click="isBatchShowing ^= true"
          >
            Close
          </b-btn>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>
<script>
import DisplayTable from "@/components/DisplayTable.vue";
import BatchJobSearchResults from "@/components/Batch/BatchJobSearchResults.vue";
import BatchProcessingService from "@/services/BatchProcessingService.js";
import { isProxy, toRaw } from "vue";
import { useBatchProcessingStore } from "../../store/modules/batchprocessing";
import { mapState, mapActions } from "pinia";
export default {
  components: {
    DisplayTable: DisplayTable,
    BatchJobSearchResults: BatchJobSearchResults,
  },
  data: function () {
    return {
      isBatchShowing: false,
      adminDashboardLoading: false,
      batchRunsFields: [
        {
          key: "jobExecutionId",
          label: "Job Execution ID",
          sortable: true,
          class: "text-left",
          editable: true,
        },
        {
          key: "jobType",
          label: "Batch Job Type Code",
          sortable: true,
          class: "text-left",
          editable: true,
        },
        {
          key: "triggerBy",
          label: "Batch Job Trigger",
          sortable: true,
          class: "text-left",
          editable: true,
        },
        {
          key: "updateUser",
          label: "Run By",
          sortable: true,
          class: "text-left",
          editable: true,
        },
        {
          key: "updateDate",
          label: "Update date",
          sortable: true,
          class: "text-left",
          editable: true,
          sortDirection: "desc",
          formatter: (value) => {
            let newValue = new Date(value);
            value = newValue.toLocaleString("en-CA", { timeZone: "PST" });
            return value;
          },
        },
      ],
    };
  },
  created() {
    this.getAdminDashboardData();
  },
  computed: {
    ...mapState(useBatchProcessingStore, {
      batchRuns: "getBatchRuns",
    }),
  },
  methods: {
    ...mapActions(useBatchProcessingStore, ["setBatchJobs"]),
    setBatchId(id, type) {
      if (type == "batch") {
        this.isBatchShowing = true;
        this.isErrorShowing = false;
        this.adminSelectedBatchId = id.toString();
        this.$refs["popover-" + id].$emit("close");
        // this.$emit(this.$refs["popover" + id]);
      }
      if (type == "error") {
        this.isBatchShowing = false;
        this.isErrorShowing = true;
        this.adminSelectedErrorId = id.toString();
      }
      // var element = this.$refs["top"];
      // var top = element.offsetTop;
      // window.scrollTo(0, top);
    },
    getAdminDashboardData() {
      this.adminDashboardLoading = true;
      BatchProcessingService.getDashboardInfo()
        .then((response) => {
          let batchRunData = response.data.batchInfoList;
          //parameters
          for (const [batch] in this.batchRunData) {
            batchRunData[batch].jobParameters = this.removeEmpty(
              JSON.parse(this.batchRunData[batch].jobParameters)
            );
          }
          this.setBatchJobs(batchRunData);
          //Expected
          this.adminDashboardLoading = false;
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          this.adminDashboardLoading = false;
          if (error.response && error.response.status) {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: "danger",
              noAutoHide: true,
            });
          }
        });
    },
    //TODO: Transfer to common method
    makeToast(message, variant) {
      this.$bvToast.toast(message, {
        title: message,
        variant: variant,
        noAutoHide: true,
      });
    },
  },
};
</script>
<style scoped>
input {
  border-radius: 0px;
}
</style>
