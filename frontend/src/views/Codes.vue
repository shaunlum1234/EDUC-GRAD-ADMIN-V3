<template>
  <div>
    <h1>Codes</h1>
    <div class="codes">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Career Programs" active>
            <b-card-text v-if="careerPrograms">
              <DisplayTable
                title="Career Programs"
                v-bind:items="careerPrograms"
                v-bind:fields="careerProgramFields"
                id="code"
                showFilter="true"
              >
                <template #cell(effectiveDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
                <template #cell(expiryDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
              </DisplayTable>
            </b-card-text>
          </b-tab>
          <b-tab title="Certificate Types" active>
            <b-card-text v-if="certificateTypes">
              <DisplayTable
                title="Certificate Types"
                v-bind:items="certificateTypes"
                v-bind:fields="certificateTypesFields"
                id="code"
                showFilter="true"
              >
                <template #cell(effectiveDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
                <template #cell(expiryDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
              </DisplayTable>
            </b-card-text>
          </b-tab>   
          <b-tab title="Report Types" active>
            <b-card-text v-if="reportTypes">
              <DisplayTable
                title="Report Types"
                v-bind:items="reportTypes"
                v-bind:fields="reportTypesFields"
                id="code"
                showFilter="true"
              >
                <template #cell(effectiveDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
                <template #cell(expiryDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
              </DisplayTable>
            </b-card-text>
          </b-tab>          
          <b-tab title="Requirement Types" active>
            <b-card-text v-if="requirementTypes">
              <DisplayTable
                title="Requirement Types"
                v-bind:items="requirementTypes"
                v-bind:fields="requirementTypesFields"
                id="code"
                showFilter="true"
              >
                <template #cell(effectiveDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
                <template #cell(expiryDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
              </DisplayTable>
            </b-card-text>
          </b-tab>                        
          <b-tab title="Student Status Codes" active>
            <b-card-text v-if="studentStatusCodes">
              <DisplayTable
                title="Report Types"
                v-bind:items="studentStatusCodes"
                v-bind:fields="studentStatusCodesFields"
                id="code"
                showFilter="true"
              >
                <template #cell(effectiveDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
                <template #cell(expiryDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
              </DisplayTable>
            </b-card-text>
          </b-tab>      
          <b-tab title="Ungrad Reasons" active>
            <b-card-text v-if="ungradReasons">
              <DisplayTable
                title="Report Types"
                v-bind:items="ungradReasons"
                v-bind:fields="ungradReasonsFields"
                id="code"
                showFilter="true"
              >
                <template #cell(effectiveDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
                <template #cell(expiryDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>              
              </DisplayTable>
            </b-card-text>
          </b-tab>  
                        
          <!-- <b-tab title="Assessment requirements">
            <b-card-text v-if="assessmentRequirements">
              <DisplayTable
                title="Assessment requirements"
                v-bind:items="assessmentRequirements"
                v-bind:fields="assessmentRequirementsFields"
                id="assessmentCode"
                showFilter="true"
              >
              </DisplayTable>
            </b-card-text>
          </b-tab> -->
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CodeService from "@/services/CodeService.js";
import DisplayTable from "@/components/DisplayTable.vue";
export default {
  name: "codes",
  components: {
    DisplayTable: DisplayTable,
  },
  data() {
    return {
      certificateTypes: [],
      certificateTypesFields: [
        {
          key: "code",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
          class: "w-15"
        },
        {
          key: "label",
          label: "Label",
          sortable: true,
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
        },
        {
          key: "effectiveDate",
          label: "Effective Date",
          sortable: true,
        },
        {
          key: "expiryDate",
          label: "Expiry Date",
          sortable: true,
        }
      ],  
      reportTypes: [],
      reportTypesFields: [
         {
          key: "code",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
          class: "w-15"
        },
        {
          key: "label",
          label: "Label",
          sortable: true,
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
        },
        {
          key: "effectiveDate",
          label: "Effective Date",
          sortable: true,
        },
        {
          key: "expiryDate",
          label: "Expiry Date",
          sortable: true,
        }
      ],  
      requirementTypes: [],
      requirementTypesFields: [
        {
          key: "reqTypeCode",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
          class: "w-15"
        },
        {
          key: "label",
          label: "Label",
          sortable: true,
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
        },
        {
          key: "effectiveDate",
          label: "Effective Date",
          sortable: true,
        },
        {
          key: "expiryDate",
          label: "Expiry Date",
          sortable: true,
        }
      ],
      studentStatusCodes: [],
      studentStatusCodesFields: [
        {
          key: "code",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
          class: "w-15"
        },
{
          key: "label",
          label: "Label",
          sortable: true,
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
        },
        {
          key: "effectiveDate",
          label: "Effective Date",
          sortable: true,
        },
        {
          key: "expiryDate",
          label: "Expiry Date",
          sortable: true,
        }
      ],    
      ungradReasons: [],
      ungradReasonsFields: [
        {
          key: "code",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "label",
          label: "Program",
          sortable: true,
        },
      ],                
      careerPrograms: [],
      careerProgramFields: [
        {
          key: "code",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
          class: "w-15"
        },
        {
          key: "description",
          label: "Program",
          sortable: true,
        },
        {
          key: "startDate",
          label: "Start Date",
          sortable: true,
        },
        {
          key: "endDate",
          label: "End Date",
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
    this.getCareerPrograms();
    this.getCertificateTypes();
    this.getRequirementTypes();
    this.getReportTypes();
    this.getStudentStatusCodes();
    this.getUngradReasons();
    
  },
  methods: {
    getCareerPrograms() {
      CodeService.getCareerPrograms(this.token)
        .then((response) => {
          this.careerPrograms = response.data;
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
     getCertificateTypes() {
      CodeService.getCertificateTypes(this.token)
        .then((response) => {
        
          this.certificateTypes = response.data;
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
    getReportTypes() {
      CodeService.getReportTypes(this.token)
        .then((response) => {
          this.reportTypes = response.data;
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
    getRequirementTypes() {
      CodeService.getRequirementTypes(this.token)
        .then((response) => {
        
          this.requirementTypes = response.data;
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
    getStudentStatusCodes() {
      CodeService.getStudentStatusCodes(this.token)
        .then((response) => {
        
          this.studentStatusCodes = response.data;
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
    getUngradReasons() {
      CodeService.getUngradReasons(this.token)
        .then((response) => {
        
          this.ungradReasons = response.data;
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
