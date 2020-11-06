<template>
  <div class="container">
    <h2>Edit {{course.courseName}}</h2>
    <form @submit="formSubmit">
      <div class="form-group">
        <label for="CourseName">Course Name:</label>
        <input type="text" class="form-control" v-model="course.courseName" :placeholder="course.courseName" id="CourseName">
      </div>
      <div class="form-group">
        <label for="CourseCode">Course Code:</label>
        <input type="text" class="form-control" v-model="course.courseCode" :placeholder="course.courseCode" id="CourseCode">
      </div>
      <div class="form-group">
        <label for="courseGradeLevel">Course Grade Level:</label>
        <input type="text" class="form-control" v-model="course.courseGradeLevel"  :placeholder="course.courseGradeLevel" id="courseGradeLevel">
      </div>
      <div class="form-group">
        <label for="credits">Credits:</label>
        <input type="text" class="form-control" v-model="course.credits"  :placeholder="course.credits" id="credits">
      </div>
      <div class="form-group">
        <label for="language">Language:</label>
        <input type="text" class="form-control" v-model="course.language"  :placeholder="course.language" id="language">
      </div>
      <div class="form-group">
        <label for="courseStartDate">Course Start Date:</label>
        <input type="text" onfocus="(this.type='date')" onblur="(this.type='text')" class="form-control" v-model="course.courseStartDate"  :placeholder="course.courseStartDate" id="courseStartDate">
      </div>
      <div class="form-group">
        <label for="courseEndDate">Course End Date:</label>
        <input type="text" onfocus="(this.type='date')" onblur="(this.type='text')" class="form-control" v-model="course.courseEndDate"  :placeholder="course.courseEndDate" id="courseEndDate">
      </div>
      <div class="form-group">
        <label for="programCode">Program Code:</label>
        <input type="text" class="form-control" v-model="course.programCode"  :placeholder="course.programCode" id="programCode">
      </div>
      <div class="form-group">
        <label for="requirementCode">Requirement Code:</label>
        <input type="text" class="form-control" v-model="course.requirementCode"  :placeholder="course.requirementCode" id="requirementCode">
      </div>
      <div class="btn-group">
        <router-link class="nav-item nav-link" to="/courses">Cancel</router-link>
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
    </form>  
  </div>

</template>

<script>

import CourseService from '@/services/CourseService.js'
export default {
  props: ["id"],
  data() {
    return {
      course: [],
      name: '',
      description: '',
      output: ''
    }
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;
      var id = currentObj.course.courseId;//window.location.pathname.split("/").pop();
     
      CourseService.editCourse(id, {
        "courseName": currentObj.course.courseName,
        "courseCode": currentObj.course.courseCode,
        "courseGradeLevel": currentObj.course.courseGradeLevel,
        "credits": currentObj.course.credits,
        "language": null,
        "courseStartDate": currentObj.course.courseStartDate,
        "courseEndDate": currentObj.course.courseEndDate,
        "programCode": currentObj.course.programCode,
        "requirementCode": currentObj.course.requirementCode
      }).then(function (response) {
        
            if (response.status === 200 ){
              currentObj.$router.push({name: 'course-list', params:{ message: 'Successfully updated Course: ' + currentObj.course.courseName}});  
            }
      })
      .catch(function (error) {
          currentObj.output = error;
      });
    }
  },
  created() {
    CourseService.getCourse(this.id)
      .then((response) => {
        this.course = response.data
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
         //console.log('There was an error:', error.response)
      })
  }
};
</script>
<style scoped>
  .btn-group{
    float: right;
    border-radius: 5px;
  }

  .action-btn{
    margin-left: 19px;
  }
</style>

