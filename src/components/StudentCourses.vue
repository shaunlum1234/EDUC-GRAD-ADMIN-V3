<template>
  <div>
    <div class="table-responsive">
      
      <div v-if="gradStatusPendingUpdates.length">
        <b-card-group deck >
          <b-card v-bind:header="'Student Record Changes - Last Updated ' + studentGradStatus.updatedTimestamp" header-tag="header" footer-tag="footer">
            <b-card-text>
              <p>{{gradStatusPendingUpdates.length}} changes are not updated in this students graduation status. Run the Graduation Algorithm to update.</p>
              <table>
                <tr v-for="item in gradStatusPendingUpdates" :key="item.message">
                  <td ><i class="fas fa-plus-square"></i> <span class="pl-2">{{ item }}</span></td>
                </tr>
                <tr><td><i class="fas fa-pen-square"></i> CHEMISTRY 12 - UPDATED</td></tr>
                <tr><td><i class="fas fa-minus-square"></i> COMPUTER SCIENCE 11 - DELETED</td></tr>
              </table>



            </b-card-text>
            <b-button v-on:click="updateGraduationStatus(studentPen)" class="float-right btn-primary btn-sm">
              <i class="fas fa-sync"></i> Update Graduation Status
            </b-button>
          </b-card>
        </b-card-group>
      </div>


      <b-spinner v-if="!courses.length" label="Loading">Loading</b-spinner>
      <v-table :data="courses" :filters="filters" class="table table-sm table-hover table-striped align-middle">
        <thead slot="head" class="">
          <v-th sortKey="courseCode">Code</v-th>
          <v-th sortKey="courseLevel">Level</v-th>
          <v-th sortKey="sessionDate">Session</v-th>
          <!-- not sure -->
          <v-th sortKey="courseName">Name</v-th>
          <!-- not sure -->
          <v-th sortKey="courseEquivChal">Equiv, Chal</v-th>
          <v-th sortKey="credits">Credits</v-th>
          <v-th sortKey="interimPercent">Interim %</v-th>
          <v-th sortKey="completedCourseLetterGrade">Final %</v-th>
          <v-th sortKey="programCode">Program Code</v-th>
        </thead>
        <tbody slot="body" slot-scope="{ displayData }">
          <template v-for="row in displayData">
            <tr :key="row.courseAchievementId" @click="toggle(row.courseCode + row.courseLevel)"
              :class="{ opened: opened.includes(row.courseCode) }"
              :ref="createRef(row.pen,row.courseCode,row.courseLevel,row.sessionDate)">
              <!--td><td><a href="#" v-b-tooltip.hover v-bind:title="row.courseName">{{ row.courseCode }}</a></td-->
              <td>{{ row.courseCode }}</td>
              <td>{{ row.courseLevel }}</td>
              <td>{{ row.sessionDate }}</td>
              <td>{{ row.courseName }}</td>
              <td>{{ row.courseEquivChal }}</td>
              <td>{{ row.credits }}</td>
              <td>{{ row.interimPercent }}% <br>{{ row.interimLetterGrade }}</td>
              <td>{{ row.completedCoursePercentage }}% <br>{{ row.completedCourseLetterGrade }}</td>
              <td>{{ row.gradReqMet}}</td>
            </tr>
          </template>
        </tbody>
      </v-table>
      <div class="row">
        <div class="col-6" v-if="hasGradStatus">
          <h1>GRAD STATUS COURSES</h1>
          <ul id="courses-list">
            <li v-for="course in gradStatusCourses" :key="course.courseName + course.sessionDate">
              {{ course.courseCode }}
              {{ course.courseLevel }}
              {{ course.sessionDate }}
              <strong>({{ course.gradReqMet }})</strong>
            </li>
          </ul>
          {{gradStatusCourses}}

        </div>
        <div class="col-6">
          <h1>COURSES</h1>
          <ul id="courses-list">
            <li v-for="course in courses" :key="course.courseName + course.sessionDate">
              {{ course.courseCode }}
              {{ course.courseLevel }}
              {{ course.sessionDate }}

            </li>
          </ul>
          {{courses}}
        </div>



      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "StudentCourses",
    props: {},
    computed: {
      ...mapGetters({
        courses: "getStudentCourses",
        gradStatusCourses: "gradStatusCourses",
        studentGradStatus: "getStudentGradStatus",
        hasGradStatus: "studentHasGradStatus",
      }),
    },
    data: function () {
      return {
        fields: [
          "courseCode",
          "courseCode",
          "courseLevel",
          "sessionDate",
          "courseName",
          "courseEquivChal",
          "credits",
          "interimLetterGrade",
          "completedCoursePercentage",
          "completedCourseLetterGrade",
        ],

        gradStatusPendingUpdates: [],
        show: false,
        opened: [],
        message: "",
        achievements: [],
        InputCourse: "",
        student: [],
        InputPen: "",
        filters: {
          name: {
            value: "",
            keys: ["courseCode"]
          },
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
        count: 0,
      };
    },
    created() {
      let i = 0;
      let j = 0;
      if(this.hasGradStatus){
        for (i = 0; i < this.courses.length; i++) {
          this.courses[i].gradReqMet = this.getProgramCode(this.courses[i]);
        }
        //check for deleted courses
        for (i = 0; i < this.gradStatusCourses.length; i++) {
          let courseDeleted = true;
          for (j = 0; j < this.courses.length; j++) {
           
            if(this.courses[j].courseCode+this.courses[j].courseLevel+this.courses[j].sessionDate+this.courses[j].pen
            ==this.gradStatusCourses[i].courseCode+this.gradStatusCourses[i].courseLevel+this.gradStatusCourses[i].sessionDate+this.gradStatusCourses[i].pen)
            {
              courseDeleted=false;
              break;
            }
           
          }
           if(courseDeleted){
              this.gradStatusPendingUpdates.push(this.gradStatusCourses[i].courseName + "REMOVED");
            }
          
        }
      }

      


    },
    methods: {
      toggle(id) {
        const index = this.opened.indexOf(id);
        if (index > -1) {
          this.opened.splice(index, 1);
        } else {
          this.opened.push(id);
        }
      },
      // getCoursePrimaryKey(course){
      //   console.log("getting primary key" + course)

      // },
      // Returns true if course1 == course2. Comparison is based on editiable fields defined
      compareCourses(course1, course2) {
        this.fields.forEach(function (field) {
          if (course1[field] != course2[field]) {
            return false;
          }
        });
        return true;


      },
      getProgramCode(course) {
        var result = this.gradStatusCourses.filter(
          function (gradStatusCourse) {
            return gradStatusCourse.pen +
              gradStatusCourse.courseCode +
              gradStatusCourse.courseLevel +
              gradStatusCourse.sessionDate == course.pen + course.courseCode + course.courseLevel + course
              .sessionDate;
          }
        );
        if (!result.length) {
          console.log("TBD - New Course Added")
          this.gradStatusPendingUpdates.push(course.courseName + " ADDED");
          return "TBD - New Course Added";
        } else if (result[0].gradReqMet) {
          if (!this.compareCourses(result[0], course)) {

            //Course has been monified and not updated in the Grad Status Course List
            //this.gradStatusPendingUpdates.push("world");
            this.gradStatusPendingUpdates.push(course.courseName + "UPDATED");
            return "TBD - Modified"
          } else {
            console.log("found");
            return result[0].gradReqMet;
          }
        } else {
          console.log("not a Grad requirement");
          return "---";
        }



        //this.$refs[ref][0].classList.add('highlight'); 








        //console.log("COURSE ACHIVEMENTS: " + course);
        //return "TBD";
      },
      createRef(pen, code, level, sessionDate) {
        return pen.trim() + code.trim() + level.trim() + sessionDate.trim();
      }

    }
  }
</script>

<style>
  .table th,
  .table td {
    border-top: none !important;
  }

  .table th svg {
    display: none !important;
  }

  .highlight {
    background: aliceblue !important;
  }
</style>