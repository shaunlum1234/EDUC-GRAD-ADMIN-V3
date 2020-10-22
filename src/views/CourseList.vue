<template>
  <div>
    <SiteMessage v-bind:message=this.displayMessage v-if="displayMessage"></SiteMessage>
  
  <!-- Modal -->
  <div class="modal fade" id="addCourseModal" tabindex="-1" role="dialog" aria-labelledby="addCourseModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="addCourseModalLabel">Add Course</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          <form @submit="formSubmit">
            <div class="modal-body">
              <div class="add-course">
              
                <form @submit="formSubmit">
                  <strong>Course Name:</strong>
                  <input type="text" class="form-control" v-model="courseName">
                  <strong>Course Code:</strong>
                  <textarea class="form-control" v-model="courseCode"></textarea>
                  <strong>Course Grade Level:</strong>
                  <input type="text" class="form-control" v-model="courseGradeLevel">
                  <strong>Credits:</strong>
                  <input type="number" class="form-control" v-model="credits">
                  <strong>Language:</strong>
                  <input type="text" class="form-control" v-model="language">
                  <strong>Course Start Date:</strong>
                  <input type="text" class="form-control" v-model="courseStartDate">
                  <small class="form-text text-muted">"01-Jul.-2018"</small>

                  <strong>Course End Date:</strong>
                  <input type="text" class="form-control" v-model="courseEndDate">
                  <small class="form-text text-muted">"01-Jul.-2018"</small>

                  <strong>Program Code:</strong>
                  <input type="text" class="form-control" v-model="programCode">
                  <strong>Requirement Code:</strong>
                  <input type="text" class="form-control" v-model="requirementCode">
                </form>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button class="btn btn-success btn-primary">Add</button>
            </div>
          </form>
      </div>
    </div>
  </div>
      <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <h1>Course Listing</h1>
    <div class="search-input">
      <input class="form-control" v-model="filters.name.value" placeholder="Search for a Course by Name"/>
    </div>
    <v-table
        :data="courses"
        :filters="filters"
        :currentPage.sync="currentPage"
        :pageSize="10"
        @totalPagesChanged="totalPages = $event"
         class="table table-responsive table-striped table-hover table-md text-center align-middle">
          <thead slot="head">
              <v-th sortKey="courseName">Course Name</v-th>
              <v-th sortKey="courseCode">Course Code</v-th>
              <v-th sortKey="courseGradeLevel">Course Grade Level</v-th>
              <v-th sortKey="credits">credits</v-th>
              <v-th sortKey="language">language</v-th>
              <v-th sortKey="courseStartDate">Course Start Date</v-th>
              <v-th sortKey="courseEndDate">Course End Date</v-th>
              <v-th sortKey="courseProgramCode">Program Code</v-th>
              <v-th sortKey="requirementCode">Requirement Code</v-th>
              <th><button type="button" class="add-course-button btn btn-primary" data-toggle="modal" data-target="#addCourseModal">Add Course
</button></th>
          
           
          </thead>
          <tbody slot="body" slot-scope="{displayData}">
              <tr v-for="row in displayData" :key="row.courseName">
                <td>{{row.courseName}}</td>
                <td>{{row.courseCode}}</td>
                <td>{{row.courseGradeLevel}}</td>
                <td>{{row.credits}}</td>
                <td>{{row.language}}</td>
                <td>{{row.courseStartDate}}</td>
                <td>{{row.courseEndDate}}</td>
                <td>{{row.courseProgramCode}}</td>
                <td><a href="#" v-on:click="showProgramRule(''+ row.requirementCode)">{{row.requirementCode}}</a></td>
                <td><router-link class="course-link" :to="{ name: 'course-show', params: { id: row.courseId} }"><button class="btn btn-primary active">EDIT</button></router-link></td>
              </tr>

          </tbody>
    </v-table>
     <smart-pagination
        :currentPage.sync="currentPage"
        :totalPages="totalPages"
      />
    
  </div>


</template>

<script>
import CourseService from '@/services/CourseService.js';
import ProgramRuleService from '@/services/ProgramRuleService.js';
import SiteMessage from '@/components/SiteMessage';
export default {
  components: {
    'SiteMessage': SiteMessage
  },
  name: 'BasicFiltering',
  data() {
    return {
      programRule:'',
      courses: [],
      courseName: '',
      courseCode: '',
      courseGradeLevel:'',
      credits:0,
      language:'',
      courseStartDate:'',
      courseEndDate:'',
      programCode:'',
      requirementCode:'',
      output: '',
      filters: {
        name: { value: '', keys: ['courseName'] }
      },
      currentPage: 1,
      totalPages: 0,
      displayMessage: null
    };
  },
  created() {
     //Check for any messages from routes
    this.displayMessage = this.$route.params.message;

    CourseService.getCourses()
      .then((response) => {
        this.courses = response.data;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
         //console.log('There was an error:' + error.response);
      }); 
  },
  methods: {
    showProgramRule(id) {
      let currentObj = this;
      currentObj.programRule = ProgramRuleService.getProgramRule(parseInt(id))
      .then((response) => {
        let responseText = "PROGRAM CODE: " + id + "\n" + JSON.stringify(response.data.requirementName, null, 4);
        let notmet = JSON.stringify(response.data.notMetDescription, null, 4);
        let programCode = JSON.stringify(response.data.programCode, null, 4);
        responseText = responseText + "\n" + notmet + "\n" + programCode;
        alert(responseText);
      })
        // eslint-disable-next-line no-unused-vars
      .catch((error) => {
          //console.log('There was an error:' + error.response);
      }); 
      
    },
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;
      CourseService.addCourse({
          "courseName": this.courseName,
          "courseCode": this.courseCode,
          "courseGradeLevel": this.courseGradeLevel,
          "credits": this.credits,
          "language": null,
          "courseStartDate": this.courseStartDate,
          "courseEndDate": this.courseEndDate,
          "programCode": this.programCode,
          "requirementCode": this.requirementCode
      },{ useCredentails: false })
      .then(function (response) {
          CourseService.getCourses()
          .then((response) => {
            currentObj.courses = response.data;
            currentObj.displayMessage = "You have successfully added a Course";
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            //console.log('There was an error:' + error.response);
          });
          currentObj.output = response.data;
      })
      .catch(function (error) {
          currentObj.output = error;
      });
    }
  }
};
</script>

<style scoped>
.add-course-button{
  float:right;
}
.search-input{
  float:right;
  width:300px;

}
.container h1{
  width: 400px; 
  float:left; 
}
</style>