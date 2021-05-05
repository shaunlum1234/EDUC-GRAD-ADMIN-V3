<template>
  <div>
    <h1>School search</h1>
      <!-- <b-container class="my-4">
        <b-row align-v="stretch" class="row-eq-height">
          <b-col>
            <label class="float-left" for="city">City</label>
            <b-input class="" v-model="search.schoolCode" placeholder="" id="mincode"/>
          </b-col>
          <b-col>
            <label class="float-left" for="city">City</label>
            <b-input class="" v-model="search.city" placeholder="" id="city"/>
          </b-col>
          <b-col>
            <label class="w-100" for="school name">School name</label>
            <b-input class="" v-model="search.schoolName" id="school name" placeholder=""/>
          </b-col>
          <b-col>
            <label class="w-100" for="district name">District name</label>
            <b-input class="" v-model="search.districtName" id="district name" placeholder=""/>
          </b-col>
          <b-col align-self="baseline">
            <label class="w-100 h-100">&nbsp;<br /></label>
            <b-button variant="primary" class="" type="submit" @click="searchSchools"> Search </b-button>
          </b-col>
        </b-row>
      </b-container> -->
  


 

              
              <!--<b-input class="float-left col-3 mx-1 my-3" v-model="search.city" placeholder="City"/>
              <b-input class="float-left col-3 mx-1 my-3" v-model="search.schoolName" placeholder="School name"/>
              <b-input class="float-left col-3 mx-1 my-3" v-model="search.districtName" placeholder="District name"/>
              <b-button variant="primary" class="float-left col-auto mx-1 my-3" type="submit" @click="searchSchools"> Search </b-button>-->
              <!-- <input type="submit" @click="searchCourseByCourseCode"> -->

                    <b-card no-body>
                      <b-tabs card>
                        <b-tab title="Schools" active>
                          <b-card-text>
                            <DisplayTable title="Schools" v-bind:items="schools"
                              v-bind:fields="schoolFields" id="mincode" v-bind:showFilter=true pagination="true"
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
          mincode:"",
          city:"",
          schoolName: "",
          districtName: "",
        },
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
      this.getAllSchools();
    },
    methods: {
      getAllSchools(){
        SchoolService.getAllSchools(this.token).then((res) => {
          this.schools = res.data;
        }).catch((error) => {

          // eslint-disable-next-line
          console.log('There was an error adding School information to Grad Status:' + error.response);
        });  
      },
      searchSchools(){
        this.schools = {};
        SchoolService.searchSchools(this.search, localStorage.getItem('jwt')).then((res) => {
          this.schools = res.data;
        }).catch((error) => {
          // eslint-disable-next-line
          console.log('There was an error adding School information to Grad Status:' + error.response);
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