<template>
  <div>
    <h1>Courses</h1>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Course Search" active>
            <b-card-text>
              <div class="row col-12">
                <b-input class="col-10 my-2" v-model="courseCode" placeholder="Course Code: BI" />
                <b-button class="col-2 my-2" @click="getAllCourses">Search</b-button>
              </div>
              <DisplayTable title="Courses" v-bind:items="courses" v-bind:fields="courseFields" id="courseCode"
                v-bind:role="role"></DisplayTable>
            </b-card-text>
          </b-tab>
          <b-tab title="Course Restrictons">
            <b-card-text>
              <DisplayTable title="Course Restriction" v-bind:items="courseRestrictions"
                v-bind:fields="courseRestrictionFields" id="courseRestrictionId"
                create="createCourseRestriction" delete="deleteCourseRestriction" update="updateCourseRestriction">
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
        courses: {},
        courseRestrictions: [],
        courseFields: [{
            key: 'more',
            label: 'More'
          },
          {
            key: 'courseCode',
            label: 'Course Code',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'courseName',
            label: 'Course Name',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'startDate',
            label: 'Start Date',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'endDate',
            label: 'End Date',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'workExpFlag',
            label: 'Start Date',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'genericCourseType',
            label: 'End Date',
            sortable: true,
            class: 'text-center'
          },

        ],
        courseRestrictionFields: [{
            key: 'more',
            label: 'More'
          },
          {
            key: 'mainCourse',
            label: 'Course',
            sortable: true,
            class: 'text-center',
            editable: true
          },
          {
            key: 'restrictedCourse',
            label: 'Restricted Course',
            sortable: true,
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'restrictedCourseLevel',
            label: 'Course Level',
            sortable: true,
            class: 'text-center',
            editable: true
          },
          {
            key: 'restrictionStartDate',
            label: 'Start Date',
            sortable: true,
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'restrictionEndDate',
            label: 'End Date',
            sortable: true,
            class: 'text-center',
            editable: true
          },
          {
            key: 'actions',
            label: 'Edit'
          },
          {
            key: 'delete',
            label: 'Delete'
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
      this.getAllCourseRestrictions();
    },
    methods: {
      searchCourseByCourseCode() {
        CourseService.getCourses(this.courseCode, this.token)
          .then((response) => {
            this.courses = response.data;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            console.log('There was an error:' + error.response);
          });
      },
      getAllCourses() {
        CourseService.getAllCourses(this.token)
          .then((response) => {
            this.courses = response.data;
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
            console.log(error.response.status);
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
</style>
