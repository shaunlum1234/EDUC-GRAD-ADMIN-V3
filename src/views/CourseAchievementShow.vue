<template>
  <div class="container">
    <h2>Edit {{achievement.courseAchievementId}}</h2>
    <form @submit="formSubmit">
      <div class="form-group">
        <label for="pen">PEN:</label>
        <input type="text" class="form-control" v-model="achievement.pen" :placeholder="achievement.pen" id="pen">
      </div>
      <div class="form-group">
        <label for="sessionDate">Session Date:</label>
        <input type="text" class="form-control" v-model="achievement.sessionDate" :placeholder="achievement.sessionDate" id="sessionDate">
      </div>
      <div class="form-group">
        <label for="finalPercent">Final Percent:</label>
        <input type="text" class="form-control" v-model="achievement.finalPercent"  :placeholder="achievement.finalPercent" id="finalPercent">
      </div>
      <div class="form-group">
        <label for="interimPercent">Interim Percent:</label>
        <input type="text" class="form-control" v-model="achievement.interimPercent"  :placeholder="achievement.interimPercent" id="interimPercent">
      </div>
      <div class="form-group">
        <label for="finalLetterGrade">Final Letter Grade:</label>
        <input type="text" class="form-control" v-model="achievement.finalLetterGrade"  :placeholder="achievement.finalLetterGrade" id="finalLetterGrade">
      </div>
      <div class="form-group">
        <label for="credits">Credits:</label>
        <input type="text" class="form-control" v-model="achievement.credits"  :placeholder="achievement.credits" id="credits">
      </div>
      <div class="form-group">
        <label for="courseId">Course ID:</label>
        <input type="text" class="form-control" v-model="achievement.courseId"  :placeholder="achievement.courseId" id="courseId">
      </div>
      <div class="form-group">
        <label for="courseType">Course Type:</label>
        <input type="text" class="form-control" v-model="achievement.courseType"  :placeholder="achievement.courseType" id="courseType">
      </div>
      <div class="form-group">
        <label for="interimLetterGrade">Interim Letter Grade:</label>
        <input type="text" class="form-control" v-model="achievement.interimLetterGrade"  :placeholder="achievement.interimLetterGrade" id="interimLetterGrade">
      </div>
      <div class="btn-group">
        <router-link class="nav-item nav-link" to="/course-achievements">Cancel</router-link>
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
    </form>  
    <!-- <p><pre>data: {{$data}}</pre></p> -->
  </div>

</template>

<script>
import CourseAchievementService from '@/services/CourseAchievementService.js'
export default {
  props: ["id"],
  data() {
    return {
      achievement: [],
      output: ''
    }
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;
  
      var id = currentObj.achievement.courseAchievementId;
      CourseAchievementService.editStudentCourseAchievement(id, {
        "pen": currentObj.achievement.pen,
        "sessionDate": currentObj.achievement.sessionDate,
        "finalPercent": currentObj.achievement.finalPercent,
        "interimPercent": currentObj.achievement.interimPercent,
        "finalLetterGrade": currentObj.achievement.finalLetterGrade,
        "credits": currentObj.achievement.credits,
        "courseId": currentObj.achievement.courseId,
        "courseType": currentObj.achievement.courseType,
        "interimLetterGrade": currentObj.achievement.interimLetterGrade
      }).then(function (response) {
        
            if (response.status === 200 ){
              currentObj.$router.push({name: 'course-achievement-list', params:{ message: 'Successfully updated Course Achievement ID:' + currentObj.achievement.courseAchievementId + " for Student: " + currentObj.achievement.pen}});        
            }
      })
      .catch(function (error) {
          currentObj.output = error;
      });
    }

  },
  created() {

    CourseAchievementService.getCourseAchievement(this.id)
      .then((response) => {
        this.achievement = response.data
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:', error.response)
      })
  }
};
</script>

<style scoped>
.location {
      margin-bottom: 0;
    }
    .location > .icon {
      margin-left: 10px;
    }
    .achievement-header > .title {
      margin: 0;
    }
    .list-group {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .list-group > .list-item {
      padding: 1em 0;
      border-bottom: solid 1px #e5e5e5;
    }
</style>
