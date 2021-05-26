<template>
  <div>
    <h1>Courses</h1>
    <div>
      <b-card no-body>
        <b-tabs card>     
          <b-tab title="Course" active>
            <form v-on:submit.prevent>
              <div class="advanced-search-form">
              <div class="row my-3">
                <div class="advanced-search-field col-12 col-md-2">
                  <label >Course code</label>
                  <div href="#"
                    v-on:click="advancedSearchInput.courseCode.contains = !advancedSearchInput.courseCode.contains"
                    v-bind:class="{active: advancedSearchInput.courseCode.contains}"
                    class="wild-card-button"
                    v-b-tooltip.hover title="Course code starts with"
                  >
                    [.*]
                  </div>
                  <b-input class="form__input" v-model="advancedSearchInput.courseCode.value" placeholder=""
                    tabindex="1" />
                </div>
                <div class="advanced-search-field col-12 col-md-2">
                  <label >Course level</label>
                  <div href="#"
                    v-on:click="advancedSearchInput.courseLevel.contains = !advancedSearchInput.courseLevel.contains"
                    v-bind:class="{active: advancedSearchInput.courseLevel.contains}"
                    class="wild-card-button"
                    v-b-tooltip.hover title="Course level starts with"
                  >
                    [.*]
                  </div>
                  <b-input class="form__input" v-model="advancedSearchInput.courseLevel.value" placeholder=""
                    tabindex="2" />
                </div>
                <div class="advanced-search-field col-12 col-md-2">
                  <label >Course name</label>
                  <div href="#"
                    v-on:click="advancedSearchInput.courseName.contains = !advancedSearchInput.courseName.contains"
                    v-bind:class="{active: advancedSearchInput.courseName.contains}"
                    class="wild-card-button"
                    v-b-tooltip.hover title="Course name starts with"
                  >
                    [.*]
                  </div>
                  <b-input class="form__input" v-model="advancedSearchInput.courseName.value" placeholder=""
                    tabindex="3" />
                </div>
                <div class="advanced-search-field col-12 col-md-2">
                  <label >Language</label>
                  <div href="#"
                    v-on:click="advancedSearchInput.language.contains = !advancedSearchInput.language.contains"
                    v-bind:class="{active: advancedSearchInput.language.contains}"
                    class="wild-card-button"
                    v-b-tooltip.hover title="Language starts with"
                  >
                    [.*]
                  </div>
                  <b-input class="form__input" v-model="advancedSearchInput.language.value" placeholder=""
                    tabindex="4" />
                </div>
                <div class="advanced-search-field col-12 col-md-3">
                  <label for="datepicker-startDate"
                    >Start date</label
                  >
                  <b-input-group class="mb-3">
                    <b-form-input
                      id="datepicker-startDate"
                      v-model="advancedSearchInput.startDate.value"
                      type="date"
                      placeholder="YYYY-MM-DD"
                      max="9999-12-30"
                      :date-format-options="{ year: '4-digit'}"
                      autocomplete="off"
                      tabindex="5"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-form-datepicker
                        v-model="advancedSearchInput.startDate.value"
                        button-only     
                        right
                        locale="en-US"
                        aria-controls="datepicker-startDate"
                      ></b-form-datepicker>
                    </b-input-group-append>
                  </b-input-group>     
                </div>
              </div>
              <div class="row">                                
                <div class="advanced-search-button">
                  <button v-on:click="advanceCourseSearch" v-if="!advancedSearchLoading" class="btn btn-primary" tabindex="6">Search</button>
                  <button  class="btn btn-success" v-if="advancedSearchLoading" tabindex="6">Search</button>
                  <button  @click="clearInput" class="btn btn-outline-primary mx-2">Reset</button>                
                </div>   
              </div>
              <div v-if="totalResults > 0" class="row">
                <div class="search-results-message my-3 col-12 col-md-8"><strong>{{ totalResults }}</strong> course records found.</div>
              </div>   
              <div v-if="advancedSearchMessage" class="row">
                <div class="search-results-message my-5 col-12 col-md-8"><strong>{{ advancedSearchMessage }}</strong></div>
              </div>    
            </div>
          </form>
          <b-card-text >
            <DisplayTable title="Courses" v-bind:items="courses" v-bind:fields="courseFields" id="courseCode" :showFilter=false pagination="true"
              v-bind:role="role"></DisplayTable>
          </b-card-text>
          </b-tab>
          <b-tab title="Course restrictions">
            <b-card-text>
              <!-- <DisplayTable title="Course restriction" v-bind:items="courseRestrictions"
                v-bind:fields="courseRestrictionFields" id="courseRestrictionId"
                create="createCourseRestriction" delete="deleteCourseRestriction" update="updateCourseRestriction">
              </DisplayTable> -->
              <DisplayTable title="Course restrictions" v-bind:items="courseRestrictions"
                v-bind:fields="courseRestrictionFields" id="courseRestrictionId" :showFilter=true pagination="true"
               >
              </DisplayTable>
            </b-card-text>
          </b-tab>
          <b-tab title="Course requirements">
            <b-card-text>
              <DisplayTable title="Course requirements" v-bind:items="courseRequirements"
                v-bind:fields="courseRequirementFields" id="courseRestrictionId" :showFilter=true pagination="true"
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
  import sharedMethods from '../sharedMethods'
  import {
    mapGetters
  } from "vuex";
  import CourseService from '@/services/CourseService.js';
  import DisplayTable from '@/components/DisplayTable.vue';
  export default {
    name: "courses",
    components: {
      DisplayTable: DisplayTable
    },
    data() {
      return {
        advancedSearchLoading: false,
        advancedSearchMessage:"",
        courses: [],
        courseRequirements: [],
        courseRestrictions: [],
        totalResults:"",
        advancedSearchInput: {
          courseCode:{
            value:"",
            contains:false
          },
          courseLevel:{
            value:"",
            contains:false
          },
          courseName:{
            value:"",
            contains:false
          },
          language:{
            value:"",
            contains:false
          },
          startDate:{
            value:"",
            contains:false
          },
        },
        courseFields: [     
          {
            key: 'courseCode',
            label: 'Course code',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'courseLevel',
            label: 'Course Level',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'courseName',
            label: 'Course name',
            sortable: true,
          },
          {
            key: 'language',
            label: 'Language',
            sortable: true,
            class: 'text-center'
          },          
          {
            key: 'startDate',
            label: 'Course Start date',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'endDate',
            label: 'Course End date',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'coRegID',
            label: 'COREG ID',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'workExpFlag',
            label: 'Work Experience',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'genericCourseType',
            label: 'Generic Course Type',
            sortable: true,
            class: 'text-center'
          },

        ],
        courseRestrictionFields: [
          {
            key: 'mainCourse',
            label: 'Course Code Main',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'mainCourseLevel',
            label: 'Course Level Main',
            sortable: true,
            class: 'text-left',
            editable: true
          },          
          {
            key: 'restrictedCourse',
            label: 'Course Code Restricted',
            sortable: true,
            class: 'text-left',
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'restrictedCourseLevel',
            label: 'Course Level Restricted',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'restrictionStartDate',
            label: 'Restriction Start Date',
            sortable: true,
            class: 'text-left',
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'restrictionEndDate',
            label: 'Restriction End Date',
            sortable: true,
            class: 'text-left',
            editable: true
          }

        ],
        courseRequirementFields: [
          {
            key: 'courseCode',
            label: 'Course code',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'courseLevel',
            label: 'Course level',
            sortable: true,
            class: 'text-left',
            editable: true
          },          
          {
            key: 'courseName',
            label: 'Course name',
            sortable: true,
            class: 'text-left',
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'ruleCode',
            label: 'Rule #',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'requirementName',
            label: 'Requirement name',
            sortable: true,
            class: 'text-left',
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'requirementProgram',
            label: 'Requirement program',
            sortable: true,
            class: 'text-left',
            editable: true
          }
        ],
        courseCode: "",
        show: false,
        displayMessage: null,
        params:""
      };
    },
    computed: {
      
      ...mapGetters({
        token: "getToken",
        role: "getRoles"
      }),
    },
    created() {
      //this.getAllCourses();
      this.showNotification = sharedMethods.showNotification
      this.getAllCourseRequirements();
      this.getAllCourseRestrictions();
    },
    methods: {
      clearInput: function () {
        this.penInput = "";
        for (var key in this.advancedSearchInput) {
          if (this.advancedSearchInput.hasOwnProperty(key)) {
            this.advancedSearchInput[key].value = "";
            this.advancedSearchInput[key].contains = false;
          }
        }
      },
      advanceCourseSearch() {
        this.advancedSearchMessage = "";
        this.advancedSearchLoading = true;
        this.params = new URLSearchParams();
        this.courses = [];
        let isEmpty = true;
        for (var key in this.advancedSearchInput) {
          if (this.advancedSearchInput.hasOwnProperty(key)) {
            //console.log(obj[key])
            if (this.advancedSearchInput[key].value != "") {
              isEmpty = false;   
            }
              //add wildcard to mincode if at least 3 digits are included
          } //mincode
        }
        if(isEmpty){
          this.totalResults = ""
          this.advancedSearchLoading = false;
          this.advancedSearchMessage += "Enter at least one field to search."
        }else if(isEmpty == false){
          try {
            if(this.advancedSearchInput){
              if(this.advancedSearchInput.courseCode.value != ""){
                if(this.advancedSearchInput.courseCode.contains && !this.advancedSearchInput.courseCode.value.includes("*")) {            
                  this.params.append('courseCode', this.advancedSearchInput.courseCode.value + "*");  
                }else{
                  this.params.append('courseCode', this.advancedSearchInput.courseCode.value);
                }                 
              }
              if(this.advancedSearchInput.courseLevel.value != ""){
                if(this.advancedSearchInput.courseLevel.contains && !this.advancedSearchInput.courseLevel.value.includes("*")) {            
                  this.params.append('courseLevel', this.advancedSearchInput.courseLevel.value + "*");  
                }else{
                  this.params.append('courseLevel', this.advancedSearchInput.courseLevel.value);
                }                
              }
              if(this.advancedSearchInput.courseName.value != ""){
                if(this.advancedSearchInput.courseName.contains && !this.advancedSearchInput.courseName.value.includes("*")) {            
                  this.params.append('courseName', this.advancedSearchInput.courseName.value + "*");  
                }else{
                  this.params.append('courseName', this.advancedSearchInput.courseName.value);
                }   
              }
              if(this.advancedSearchInput.language.value != ""){
                if(this.advancedSearchInput.language.contains && !this.advancedSearchInput.language.value.includes("*")) {            
                  this.params.append('language', this.advancedSearchInput.language.value + "*");  
                }else{
                  this.params.append('language', this.advancedSearchInput.language.value);
                }   
              }
              if(this.advancedSearchInput.startDate.value != ""){
                this.params.append('startDate', this.advancedSearchInput.startDate.value);
              }
            }
            CourseService.getCoursesByAdvanceSearch(this.params,this.token)
            .then((response) => {
              this.advancedSearchLoading = false;
              this.courses = response.data;
              this.totalResults = this.courses.length;
              if(this.totalResults <= 0){
                this.advancedSearchMessage = "No courses found.";      
              }
            })   
            .catch((error) => {
              this.advancedSearchLoading = false;
              this.advancedSearchMessage = "No course record found.";
              // eslint-disable-next-line
              console.log('There was an error:' + error);
              //this.showNotification("danger", error.response.statusText);
            });
          } catch (error) {
            this.advancedSearchLoading = false;
            this.advancedSearchMessage = "Search Error" + error;
            //this.showNotification("danger", error);
          }   
        }   
      }, 
      searchCourseByCourseCode() {
        CourseService.getCourses(this.courseCode, this.token)
          .then((response) => {
            this.courses = response.data;
          })   
          .catch((error) => {
            // eslint-disable-next-line
            console.log('There was an error:' + error);
          });
      },
      getAllCourses() {
        CourseService.getAllCourses(this.token)
          .then((response) => {
            this.courses = response.data;
          })
          // eslint-disable-next-line
          .catch((error) => {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          });
      },
      getAllCourseRequirements() {
        CourseService.getCourseRequirements(this.token)
          .then((response) => {
            this.courseRequirements = response.data;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
          });
        });
      },
      getAllCourseRestrictions() {
        CourseService.getCourseRestrictions(this.token)
          .then((response) => {
            this.courseRestrictions = response.data;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
          });
        });
      },
      getAllCourseRestriction(mainCourseLevel, mainCourseCode) {
        CourseService.getCourseRestriction(mainCourseLevel, mainCourseCode, this.token)
          .then((response) => {
            this.courseRestrictions = response.data;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
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
  .table-filter{
    top: 0px !important
  }
  .advanced-search-form {
    background-color: #fff;
  }
  .wild-card-button:hover{
    cursor: pointer;

  }
  .wild-card-button {
    color: #DEE2EB;
    position: absolute;
    right: 21px;
    top: 40px;
    z-index: 10;
    text-decoration: none;
  
  }

  .wild-card-button:visited {
    color: #DEE2EB;
    text-decoration: none;
  }

  .wild-card-button.active {
    color: green
  }
  .search-results-message {
    float: left;
    clear: both; 
  }
  .advanced-search-button {
    
    padding-left: 15px;
  }
</style>
