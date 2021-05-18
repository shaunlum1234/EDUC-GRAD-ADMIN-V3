<template>
  <div>
    <h1>Schools</h1>
    
                    <b-card no-body>
                      <b-tabs card>
                        <b-tab title="Mincode search" active>
                          <b-card-text>

                          <b-container class="p-3">
                            <b-row align-v="stretch" class="row-eq-height">
                              <b-col class="p-0">
                                <label class="col-6">Search by Mincode</label>
                              </b-col>
                              <b-col align-self="baseline">
                                <label class="w-100"></label>
                              
                              </b-col>
                            </b-row>
                            <b-row align-v="stretch" class="row-eq-height">
                              <b-col class="p-0">
                                <b-input v-model="mincode" id="schoolmincode" placeholder=""/>
                              </b-col>
                              <b-col align-self="baseline">
                                <b-button variant="primary" class="" type="submit" @click="searchSchoolByMincode"> Search </b-button>
                              </b-col>
                            </b-row>
                          </b-container> 
                          
                            <DisplayTable title="Mincode" v-bind:items="schools"
                              v-bind:fields="schoolFields" sortKey="schoolName" id="mincode" v-bind:showFilter=true pagination="true"
                            >
                              <template #cell(more)="row">
                                  <b-btn
                                    variant="outline primary"
                                    style="color: #666"
                                    size="sm"
                                    @click="row.toggleDetails"
                                    class="more-button"
                                  >
                                    <i class="fas fa-sm fa-caret-down"></i>
                                  </b-btn>
                                </template>
                                <template #row-details="row">
                                  <b-card class="px-0">
                                    <ul>        
                                        <li v-if="row.item.address1">
                                          <strong>Address:</strong> {{ row.item.address1 }}
                                        </li>
                                        <li v-if="row.item.city">
                                          <strong>City:</strong> {{ row.item.city }}
                                        </li>                
                                        <li v-if="row.item.provinceCode">
                                          <strong>Province Code:</strong> {{ row.item.provCode }}
                                        </li>                      
                                        <li v-if="row.item.provinceName">
                                          <strong>Province Name:</strong> {{ row.item.provinceName}}
                                        </li>
                                        <li v-if="row.item.countryCode">
                                          <strong>Country Code:</strong> {{ row.item.countryCode }}
                                        </li>
                                        <li v-if="row.item.postal">
                                          <strong>Postal Code:</strong> {{ row.item.postal }}
                                        </li>
                                        
                                    </ul>
                                  </b-card>
                                </template>
                            </DisplayTable>
                          </b-card-text>
                        </b-tab>
                        <b-tab title="Advanced Search" active>
                          <b-card-text>

                            <b-container class="p-3">
                              <b-row align-v="stretch" class="row-eq-height">
                                <b-col>
                                  <label class="col-6">Search by School Name</label>
                                </b-col>
                                <b-col align-self="baseline">
                                  <label class="w-100"></label>
                                </b-col>
                              </b-row>
                              <b-row align-v="stretch" class="row-eq-height">
                                <b-col>
                                  
                                  <b-input v-model="search.schoolName" placeholder="" id="mincode"/>
                                </b-col>
                                <b-col align-self="baseline">
                                  
                                  <b-button variant="primary" class="" type="submit" @click="advancedSchoolSearch"> Search </b-button>
                                </b-col>
                              </b-row>
                            </b-container> 

                            <DisplayTable title="Results" v-bind:items="schools"
                              v-bind:fields="schoolFields" sortKey="schoolName" id="mincode" v-bind:showFilter=true pagination="true"
                            >advancedSchoolSearch
                              <template #cell(more)="row">
                                  <b-btn
                                    variant="outline primary"
                                    style="color: #666"
                                    size="sm"
                                    @click="row.toggleDetails"
                                    class="more-button"
                                  >
                                    <i class="fas fa-sm fa-caret-down"></i>
                                  </b-btn>
                                </template>
                                <template #row-details="row">
                                  <b-card class="px-0">
                                    <ul>        
                                        <li v-if="row.item.address1">
                                          <strong>Address:</strong> {{ row.item.address1 }}
                                        </li>
                                        <li v-if="row.item.city">
                                          <strong>City:</strong> {{ row.item.city }}
                                        </li>                
                                        <li v-if="row.item.provinceCode">
                                          <strong>Province Code:</strong> {{ row.item.provCode }}
                                        </li>                      
                                        <li v-if="row.item.provinceName">
                                          <strong>Province Name:</strong> {{ row.item.provinceName}}
                                        </li>
                                        <li v-if="row.item.countryCode">
                                          <strong>Country Code:</strong> {{ row.item.countryCode }}
                                        </li>
                                        <li v-if="row.item.postal">
                                          <strong>Postal Code:</strong> {{ row.item.postal }}
                                        </li>
                                        
                                    </ul>
                                  </b-card>
                                </template>
                            </DisplayTable>
                          </b-card-text>
                        </b-tab>                        
                      </b-tabs>
                    </b-card>
              
  


  </div>
</template>

<script>
  import SchoolService from '@/services/SchoolService.js';
   import DisplayTable from '@/components/DisplayTable.vue';
    import {
    mapGetters
  } from "vuex";
  export default {
    name: "schools",
    components: {
      DisplayTable: DisplayTable,
    },
    data() {
      return {
        schools: {},
        schoolFields: [
          {
            key: 'more',
            label: '',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'minCode',
            label: 'Mincode',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'schoolName',
            label: 'School Name',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'districtName',
            label: 'District',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'openFlag',
            label: 'Open',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'Schl Org',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'Indep Type',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'independentAffiliation',
            label: 'Indep Affil',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'transcriptEligibility',
            label: 'Tran Elig',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'certificateEligibility',
            label: 'Cert Elig',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'Marks Display',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'Append Trans',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'signatureDistrict',
            label: 'Sig Distno',
            sortable: true,
            class: 'text-center'
          },
          {
            key: '',
            label: 'New School Code',
            sortable: true,
            class: 'text-center'
          },
        ],
        search: {
          schoolName: "",
        },
        mincode: "",
        show: false,
        displayMessage: null,
      };
    },
    computed: {
      ...mapGetters({
        token: "getToken"
      }),
    },
    created() {
      this.schools = {};
        SchoolService.searchSchoolByMincode("06161064", this.token).then((res) => {
          this.schools = res.data[0];
        }).catch((error) => {
          // eslint-disable-next-line
          console.log('There was an error searching School information to GRAD Status:' + error.response);
        });  
    },
    methods: {
      getAllSchools(){
        SchoolService.getAllSchools(this.token).then((res) => {
          this.schools = res.data;
        }).catch((error) => {

          // eslint-disable-next-line
          console.log('There was an error adding School information to GRAD Status:' + error.response);
        });  
      },

      searchSchoolByMincode(){
        this.schools = {};
        SchoolService.searchSchoolByMincode(this.mincode, this.token).then((res) => {
          this.schools = res.data;
        }).catch((error) => {
          // eslint-disable-next-line
          console.log('There was an error searching School information to GRAD Status:' + error.response);
        });  
      },
      advancedSchoolSearch(){
        this.schools = {};
        SchoolService.searchSchools(this.search, this.token).then((res) => {
          this.schools = res.data;
        }).catch((error) => {
          // eslint-disable-next-line
          console.log('There was an error searching School information to GRAD Status:' + error.response);
        });  
      }
    }
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