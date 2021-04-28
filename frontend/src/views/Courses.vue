<template>
  <div>
    <h1>Courses</h1>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Course" active>
            <b-card-text>
              <DisplayTable title="Courses" v-bind:items="courses" v-bind:fields="courseFields" id="courseCode" showFilter="true" pagination="true"
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
                v-bind:fields="courseRestrictionFields" id="courseRestrictionId" showFilter="true" pagination="true"
               >
              </DisplayTable>
            </b-card-text>
          </b-tab>
          <b-tab title="Course requirements">
            <b-card-text>
              <DisplayTable title="Course requirements" v-bind:items="courseRequirements"
                v-bind:fields="courseRequirementFields" id="courseRestrictionId" showFilter="true" pagination="true"
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
        courses: [],
        courseRequirements: [],
        courseRestrictions: [],
        courseFields: [
          {
            key: 'coRegID',
            label: 'COREG ID',
            sortable: true,
            sortDirection: 'desc'
          },
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
            label: 'Course Code',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'courseLevel',
            label: 'Course Level',
            sortable: true,
            class: 'text-left',
            editable: true
          },          
          {
            key: 'courseName',
            label: 'Course Name',
            sortable: true,
            class: 'text-left',
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'ruleCode',
            label: 'Rule#',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'requirementName',
            label: 'Requirement Name',
            sortable: true,
            class: 'text-left',
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'requirementProgram',
            label: 'Requirement Program',
            sortable: true,
            class: 'text-left',
            editable: true
          }
        ],
        courseCode: "",
        show: false,
        displayMessage: null,
      };
    },
    computed: {
      ...mapGetters({
        token: "getToken",
        role: "getRoles"
      }),
    },
    created() {
      this.getAllCourses();
      this.getAllCourseRequirements();
      this.getAllCourseRestrictions();
    },
    methods: {
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
</style>
