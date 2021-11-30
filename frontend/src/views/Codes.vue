<template>
  <div>
    <h1>Codes</h1>
    <div class="codes">
<b-card title="Program Management" no-body>
    <b-card-header header-tag="nav" class="px-3">
      <b-nav card-header tabs >
        <b-nav-item to="/codes/career-programs" :active="tab === 1" @click="tab = 1">Career Programs</b-nav-item>
         <b-nav-item-dropdown
            id="credentials-dropdown"
            text="Credentials"
            ref="credentials-dropdown"
            toggle-class="nav-link-credentials"
            left            
          >
            <b-nav-item to="/codes/certificates-types" :active="tab === 2" @click="tab = 2; closeDropdown('credentials-dropdown')">Certificate Types</b-nav-item>
            <b-nav-item to="/codes/transcript-types" :active="tab === 2" @click="tab = 2; closeDropdown('credentials-dropdown')">Transcript Types</b-nav-item>
            <b-nav-item to="/codes/program-certificate-transcript" :active="tab === 2" @click="tab = 3; closeDropdown('credentials-dropdown')">Program Certificate Transcript</b-nav-item>
            <b-nav-item to="/codes/digital-signatures" :active="tab === 2" @click="tab = 2; closeDropdown('credentials-dropdown')">Digital Signature</b-nav-item>
            <b-nav-item to="/codes/signature-blocks" :active="tab === 2" @click="tab = 2; closeDropdown('credentials-dropdown')">Signature Block</b-nav-item>
            
        </b-nav-item-dropdown>
        <b-nav-item to="/codes/report-types" :active="tab === 3" @click="tab = 3">Reports</b-nav-item>
        <b-nav-item to="/codes/requirement-types" :active="tab === 4" @click="tab = 4">Requirements</b-nav-item>
        <b-nav-item to="/codes/student-status-codes" :active="tab === 5" @click="tab = 5">Student Status Codes</b-nav-item>
        <b-nav-item to="/codes/ungrad-reasons" :active="tab === 6" @click="tab = 6">Ungrad Reasons</b-nav-item>
      </b-nav>
    </b-card-header>
     <b-card-body >
      <b-card-text>
        <router-view v-bind:key="$route.fullPath"></router-view>
      </b-card-text>
    </b-card-body>
    </b-card>    

      <!-- <b-card no-body>
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
                  {{ row.item.expiryDate | formatSimpleDate }}
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
                  {{ row.item.expiryDate | formatSimpleDate }}
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
                  {{ row.item.expiryDate | formatSimpleDate }}
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
                  {{ row.item.expiryDate | formatSimpleDate }}
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
                  {{ row.item.expiryDate | formatSimpleDate }}
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
                id=""
                showFilter="true"
              >
                <template #cell(effectiveDate)="row">
                  {{ row.item.effectiveDate | formatSimpleDate }}
                </template>
                <template #cell(expiryDate)="row">
                  {{ row.item.expiryDate | formatSimpleDate }}
                </template>              
              </DisplayTable>
            </b-card-text>
          </b-tab>  
          <<b-tab title="Signatures">
            <b-card-text v-if="reportSignatures">
              <DisplayTable
                title="Report Types"
                v-bind:items="reportSignatures"
                v-bind:fields="reportSignaturesFields"
                showFilter="true"
                id="signatureId"
              >         
              <template #cell(signatureContent)="row">
                      <b-card header="School District 0XX: MR/MRS/MS SMITH" class="overflow-hidden">
                            <b-row no-gutters>
                              <b-col md="6">
                                <b-card-img v-if="!url" :src="'data:image/png;base64, ' + row.item.signatureContent"></b-card-img>
                                <b-card-img v-if="url" :src="url"  alt="Principal Signature" class="rounded-0"></b-card-img>
             
                              </b-col>
                              <b-col md="6">
                                <b-card-body title="Update/Change Signature">
                                  <b-card-text>
                                    <b-form-file @change="onFileChange"  v-model="file" class="mt-3" plain></b-form-file>
                                      <div class="updateImage mt-3" v-if="url" @click="updateSignature"> 
                                        <button class="btn btn-success" v-if="updateSignature">Update</button>
                                        <button @click="clearInput" class="btn btn-outline-primary mx-2">Cancel</button>
                                      </div>
                                  </b-card-text>
                                </b-card-body>
                              </b-col>
                            </b-row>
                          </b-card>

                </template>
              </DisplayTable>
            </b-card-text>
          </b-tab>          
           
        </b-tabs>
      </b-card> -->
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import GraduationCommonService from "@/services/GraduationCommonService.js";
import StudentService from "@/services/StudentService.js";
import ProgramManagementService from "@/services/ProgramManagementService.js";

export default {
  name: "codes",
  components: {
  },
  data() {
    return {
      url: null,
      file: [],
      tab: 1,
      
      certificateTypes: [],
      reportSignatures: [],
      reportSignaturesFields: [
        {
          key: "signatureContent",
          label: "Signture",
          sortable: true,
        },
        {
          key: "updatedTimestamp",
          label: "Last Updated",
          sortable: true,
        },        
        {
          key: "gradReportSignatureCode",
          label: "Filename",
          sortable: true,
        }        
      ],      
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
          label: "Effective date",
          sortable: true,
        },
        {
          key: "expiryDate",
          label: "Expiry date",
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
    closeDropdown(dropdown){
      this.$refs[dropdown].visible=false
    },
    updateSignature(){
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },    
    getCareerPrograms() {
      ProgramManagementService.getCareerPrograms(this.token)
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
      GraduationCommonService.getCertificateTypes(this.token)
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
      GraduationCommonService.getReportTypes(this.token)
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
      ProgramManagementService.getRequirementTypes(this.token)
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
      StudentService.getStudentStatusCodes(this.token)
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
      StudentService.getUngradReasons(this.token)
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
    getReportSignatures(){

       GraduationCommonService.getReportSignatures(this.token)
        .then((response) => {
          this.reportSignatures = response.data;
        })
        // eslint-disable-next-line
        .catch((error) => {
          this.$bvToast.toast("ERROR " + error.response.statusText, {
            title: "ERROR" + error.response.status,
            variant: "danger",
            noAutoHide: true,
          });
        });

    }     
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
