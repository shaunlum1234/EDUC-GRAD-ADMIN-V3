<template>
  <div>
    <h1>Assessments</h1>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Assessment search" active>
            <b-card-text>
              <div class="row col-12">
                <b-button
                  variant="primary"
                  class="m-2"
                  @click="getAllAssessment"
                  >Search
                </b-button>
              </div>
              <DisplayTable
                title="Assessments"
                v-bind:items="assessments"
                v-bind:fields="assessmentFields"
                id="assessmentCode"
                v-bind:role="role"
                showFilter="true"
              >
              </DisplayTable>
            </b-card-text>
          </b-tab>
          <b-tab title="Assessment requirements">
            <b-card-text>
              <DisplayTable
                title="Assessment requirements"
                v-bind:items="assessmentRequirements"
                v-bind:fields="assessmentRequirementsFields"
                id="assessmentCode"
                showFilter="true"
              >
              </DisplayTable>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AssessmentService from "@/services/AssessmentService.js";
import DisplayTable from "@/components/DisplayTable.vue";
export default {
  name: "assessments",
  components: {
    DisplayTable: DisplayTable,
  },
  data() {
    return {
      assessments: {},
      assessmentRequirements: {},
      assmtCode: "",
      assessmentFields: [
        {
          key: "assessmentCode",
          label: "Assessment code",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "assessmentName",
          label: "Assessment name",
          sortable: true,
          class: "text-center",
        },
        {
          key: "language",
          label: "Language",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "startDate",
          label: "Start date",
          sortable: true,
          class: "text-center",
        },
        {
          key: "endDate",
          label: "End date",
          sortable: true,
          class: "text-center",
        },
      ],

      assessmentRequirementsFields: [
        {
          key: "assessmentCode",
          label: "Assessment code",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "assessmentName",
          label: "Assessment name",
          sortable: true,
          class: "text-center",
        },
        {
          key: "ruleCode",
          label: "Rule#",
          sortable: true,
        },
        {
          key: "requirementName",
          label: "Requirement name",
          sortable: true,
          class: "text-center",
        },
        {
          key: "requirementProgram",
          label: "Requirement program",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      token: "getToken",
      role: "getRoles"
    }),
  },
  created() {
    this.getAllAssessment();
    this.getAllAssessmentReqs();
  },
  methods: {
    getAllAssessment() {
      AssessmentService.getAllAssesments(this.token)
        .then((response) => {
          this.assessments = response.data;
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
    getAllAssessmentReqs() {
      AssessmentService.getAllAssesmentRequirements(this.token)
        .then((response) => {
          this.assessmentRequirements = response.data;
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
  },
};
</script>

<style scoped>
.close-record {
  float: right;
}

.tab-loading {
  color: green !important;
}

.profile-name {
  padding-bottom: 10px;
}
</style>
