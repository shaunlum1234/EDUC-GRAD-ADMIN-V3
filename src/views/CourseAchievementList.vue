<template>
  <div>
    <div v-show="inputPenMissing">
      <div class="alert alert-dismissible alert-success">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <div class="message">
          <strong
            >"Please select a student on the
            <router-link class="student-list" :to="{ name: 'student-list' }"
              ><a href="#">Student Page</a></router-link
            >
           </strong
          >
        </div>
      </div>
    </div>
    <SiteMessage
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>
    <!-- Button trigger modal -->

    
      

    <div class="row">
      <div class="col-lg-7 col-sm-12">
        <h1>Student Course Achievement</h1>
      </div>
      <div class="search-input col-lg-5 col-sm-12">
        <input
          class="form-control"
          v-model="filters.name.value"
          placeholder="Filter by course code"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 student-pen-display">
        <!-- {{ currentStudent }} -->
        <h3 v-if="currentStudent">
          {{ this.currentStudent.studGiven }}
          {{ this.currentStudent.studMiddle }}
          {{ this.currentStudent.Surname }} (PEN: {{ this.currentStudent.pen }})
        </h3>
      </div>
    </div>

    <v-table
      :data="achievements"
      :filters="filters"
      class="table table-sm table-hover table-striped text-center align-middle"
    >
      <thead slot="head" class="thead-dark">
        <v-th sortKey="courseCode">Code</v-th>
        <v-th sortKey="courseLevel">Level</v-th>
        <v-th sortKey="sessionDate">Session</v-th>
        <!-- not sure -->
        <v-th sortKey="courseName">Name</v-th>
        <!-- not sure -->
        <v-th sortKey="courseEquivChal">Equiv, Chal</v-th>
        <v-th sortKey="credits">Credits</v-th>
        <v-th sortKey="interimPercent">Interim %</v-th>
        <v-th sortKey="interimLetterGrade">Interim LG</v-th>
        <v-th sortKey="completedCoursePercentage">Final LG</v-th>
        <v-th sortKey="completedCourseLetterGrade">Final %</v-th>   
        <v-th>-</v-th>       
        <!-- not sure -->
        <!-- <v-th sortKey="fineArtsAppliedSkillsReqt">Fine Arts/Applied Skills Reqt</v-th>
        <v-th sortKey="creditsUsedForGrad">Credits Used for Grad</v-th>
        <v-th sortKey="gradReqMet">Reqt Met</v-th>
        <v-th sortKey="gradName">Reqt Name</v-th>
        <v-th sortKey="relatedCourse">Related Course</v-th>
        <v-th sortKey="relatedLevel">Related Level</v-th>
        <v-th sortKey="courseDescription">Description</v-th> -->

        <!-- <th>
          <button
            type="button"
            class="add-course-achievement-button btn btn-primary"
            data-toggle="modal"
            data-target="#addCourseAchievementModal"
          >
            Add Course
          </button>
        </th> -->
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <template v-for="row in displayData">
              <tr :key="row.courseAchievementId" @click="toggle(row.courseCode+row.courseLevel)" :class="{ opened: opened.includes(row.courseCode) }">
         
            <td>{{ row.courseCode }}</td>
            <td>{{ row.courseLevel }}</td>
            <td>{{ row.sessionDate.replace(" 12:00:00 AM", "")}}</td>
            <td>{{ row.courseName }}</td>
            <td>{{ row.courseEquivChal }}</td>
            <td>{{ row.credits }}</td>
            <td>{{ row.interimPercent }} %</td>
            <td>{{ row.interimLetterGrade }}</td>
            <td>{{ row.completedCoursePercentage }}% </td>
            <td>{{ row.completedCourseLetterGrade }}</td>
            <td>
                <a href="#" @click="showMsgBoxOne(
                  'Related Course: ' + row.relatedCourse + '' +              
                  'Related Level: ' + row.relatedLevel + '<br>'
                  )">More
                </a>
            </td>
          </tr>
         
            <tr :key="row.courseAchievementId" v-if="opened.includes(row.courseCode+row.courseLevel)">
             <transition name="slide" :key="row.courseAchievementId">
              <td colspan="11">
                <div class="more-details">
                  Related Course: {{ row.relatedCourse }}<br>
                  Related Level: {{ row.relaedLevel }}<br>
                  Description: {{ row.relaedLevel }}<br><br>
                </div>
                <div class="more-details">
                  Fine Arts/Applied Skills Reqt: <br>
                  Credits Used for Grad: <br>
                  Reqt Met: <br><br>
                </div>
                <div class="edit-course-achivement">
                  <button class="btn btn-primary" href="#">Edit</button>
                </div>
              </td>
               </transition>
            </tr>
         
        </template>
      </tbody>
    </v-table>
  </div>
</template>

<script>
// import CourseService from "@/services/CourseService.js";
import CourseAchievementService from "@/services/CourseAchievementService.js";
import SiteMessage from "@/components/SiteMessage";
//import { store } from "@/store.js";
export default {
  props: ["currentStudent"],
  components: {
    SiteMessage: SiteMessage,
  },
  name: "BasicFiltering",
  data() {
    return {
      show: false,
      opened: [],
      achievements: [],
      InputCourse: "",
      student: [],
      courses: [],
      InputPen: "",
      filters: {
        name: { value: "", keys: ["courseCode"] },
      },
      pen: "",
      sessionDate: "",
      finalPercent: "",
      interimPercent: "",
      finalLetterGrade: "",
      credits: "",
      courseId: "",
      courseType: "",
      interimLetterGrade: "",
      currentPage: 1,
      totalPages: 0,
      displayMessage: null,
      modalVisible: null,
      inputPenMissing: false,
    };
  },
  created() {
    this.displayMessage = this.$route.params.message;
    this.student = this.currentStudent;
    if (this.student) {
      this.pen = this.student.pen;
    }
    if (this.student) {
      CourseAchievementService.getStudentCourseAchievements(this.student.pen)
        .then((response) => {
          this.achievements = response.data;
          this.courses = this.achievements.map((item) => {
            return {
              id: item.courseCode,
              name: item.courseCode,
            };
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {});
      //replace the course ids with names from the courses array
      // CourseService.getCourses()
      //   .then((response) => {
      //     let data = response.data;
      //     this.courses = data.map((item) => {
      //       return {
      //         id: item.courseId,
      //         name: item.courseName,
      //       };
      //     });
      //   })
        // eslint-disable-next-line no-unused-vars
        // .catch((error) => {});
    } else {
      this.inputPenMissing = true;
    }

    //display message to select a student
  },
  methods: {
    toggle(id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    },
     showMsgBoxOne(message) {
        this.$bvModal.msgBoxOk(message);
      },
    getCourseName: function(cid) {
      let result = "";
      this.courses.filter(function(n) {
        if (n.id === cid) {
          result = n.name;
          return result;
        }
      });
      return result;
    },
    clearSearch: function(){
      this.InputPen = "";
    },
    search: function() {
      CourseAchievementService.getStudentCourseAchievements(this.InputPen)
        .then((response) => {
          this.achievements = [response.data];
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {});
    },
    addButton: function() {
      if (this.modalVisible) {
        this.modalVisible = null;
      } else {
        this.modalVisible = true;
      }
    },
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;

      CourseAchievementService.addStudentCourseAchievement({
        pen: this.pen,
        sessionDate: this.sessionDate,
        finalPercent: parseInt(this.finalPercent),
        interimPercent: parseInt(this.interimPercent),
        finalLetterGrade: this.finalLetterGrade,
        credits: parseInt(this.credits),
        courseId: this.courseId,
        courseType: this.courseType,
        interimLetterGrade: this.interimLetterGrade,
      })
        .then(function(response) {
          CourseAchievementService.getCourseAchievements()
            .then((response) => {
              currentObj.achievements = response.data;
              currentObj.displayMessage =
                "You have successfully added a Course Achievement";
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
              //console.log("There was an error:" + error.response);
            });
          currentObj.output = response.data;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(function(error) {
          currentObj.output = error;
        });
    },
  },
};
</script>

<style scoped>
#search {
  display: none; /* will unhide when endpoint filter by pen is implemented */
}
.add-course-button {
  float: right;
}
.search-input {
  float: right;
  width: 300px;
}
.container h1 {
  width: 500px;
  float: left;
}
.student-pen-display {
  float: left;
  clear: both;
  width: 100%;
  position: relative;
}
.message {
  text-align: center;
  z-index: 1;
}
.table th,
.table td {
  padding: 0px 10px !important;
}
.slide {
    transition: all .3s ease;
    height: 30px;
    padding: 10px;
    background-color: #eee;
    overflow: hidden;
}
.slide.v-enter, .slide.v-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
}
.more-details{
    float: left;
    padding: 25px 50px 25px 0px;
    text-align: left;
}
.course-info{
  float:left;
}
.edit-course-achivement{
  float: right;
  padding: 20px;

}
.clear-search{
  float: right;
  text-align: right;
  width: 100%;
  padding-right: 15px;
}
</style>
