<template>
  <div>
    <h1>Course Search</h1>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Course Search" active>
            <b-card-text>
              <input v-model="courseCode" placeholder="Course Code: BI">
              <input type="submit" @click="getAllCourses">
              <!-- <input type="submit" @click="searchCourseByCourseCode"> -->

              <table v-if="courses" class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Level</th>
                    <th>Course Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Work Experience</th>
                    <th>Generic Course Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="course in courses" :key="course.courseName">
                    <td>{{course.courseCode}}</td>
                    <td>{{course.courseLevel}}</td>
                    <td>{{course.courseName}}</td>
                    <td>{{course.startDate}}</td>
                    <td>{{course.endDate}}</td>
                    <td>{{course.workExpFlag}}</td>
                    <td>{{course.genericCourseType}}</td>
                  </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-tab>
          <b-tab title="Course Requirements">
            <b-card-text>
              Course Requirements
            </b-card-text>
          </b-tab>
          <b-tab title="Course Restrictions">
            <b-card-text>
              Course Requirements
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

  </div>
</template>

<script>
  import CourseService from '@/services/CourseService.js';
  export default {
    name: "courses",
    components: {

    },
    data() {
      return {
        courses: {},
        courseCode: "",
        show: false,
        displayMessage: null,
      };
    },
    computed: {

    },
    created() {
      this.getAllCourses();
    },
    methods: {
      searchCourseByCourseCode() {
        CourseService.getCourses(this.courseCode, localStorage.getItem('jwt'))
          .then((response) => {
            this.courses = response.data;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            //console.log('There was an error:' + error.response);
          });
      },
      getAllCourses() {
        CourseService.getAllCourses(localStorage.getItem('jwt'))
          .then((response) => {
            this.courses = response.data;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            //console.log('There was an error:' + error.response);
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