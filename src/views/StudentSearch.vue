<template>
  <div class="studentlist container">
    <h1>Student Graduation Status</h1>
    <p>
      Enter a Personal Education Number (PEN) to retrieve the student’s course
      achievements.
    </p>

    <div class="">
      <form v-on:submit.prevent>
        <div class="form-group">
          <!-- Search Criteria -->
          <div class="dropdown float-left">
            <button
              class="btn btn-secondary dropdown-toggle search-student-dropdown"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Search By
            </button>
            <div class="dropdown-menu search-student-dropdown" aria-labelledby="dropdownMenuButton">
              <div
                class="dropdown-item"
                v-show="!showPenInputBox"
                v-on:click="showPenInput"
              >
                Pen
              </div>
              <div
                class="dropdown-item"
                v-show="!showSurnameInput"
                v-on:click="showsurnameInput"
              >
                Surname
              </div>
            </div>
          </div>
          <!-- Pen Input -->
          <div v-show="showPenInputBox" class="search">
            <input
              v-model="penInput"
              placeholder="Student PEN"
              class="pen-search"
              v-on:keyup="keyHandler"
            /><button v-if="!searchLoading" v-on:click="findStudentByPen" class="btn btn-primary">
              <i class="fas fa-search"></i> Find Student by PEN
            </button>
            <button v-if="searchLoading" class="btn btn-success">
              <i class="fas fa-search"></i> Find Student by PEN
            </button>
          </div>

          <!-- Surname Input -->
          <div v-show="showSurnameInput" class="search">
            <input
              v-model="surnameInput"
              placeholder="Student Surname"
              class="surname-search"
              v-on:keyup="keyHandler"
            /><button v-if="!searchLoading" v-on:click="findStudentBySurname" class="btn btn-primary">
              <i class="fas fa-search"></i> Find Student by Surname
            </button>
            <button v-if="searchLoading" class="btn btn-success">
              <i class="fas fa-search"></i> Find Student by Surname
            </button>

          </div>
            <b-spinner
              v-for="variant in variants"
              :variant="variant"
              :key="variant"
              v-show="searchLoading"
              class="loading-spinner"
            ></b-spinner>
          <div class="search-results-message"><strong><span v-if="message">{{ message }}</span></strong></div>

        </div>
  
      </form>
      <p class="sample-pens">
        Samples:
        <ul>
          <li>140341157 (Exams and Assessment)</li>
          <li>130129323 (Exams and Assessment)</li>
          <li>101696920 (Exams Only)</li>
        </ul>
      </p>

    </div>
    <transition name="fade">
    <v-table
      :data="studentSearchResults"
      class="table table-sm table-hover table-striped align-middle"
      v-if="studentSearchResults.length"
    >
      <thead slot="head" class="">
        <v-th sortKey="pen">Pen</v-th>
        <v-th sortKey="studSurname">Surname</v-th>
        <v-th sortKey="studGiven">First Name</v-th>
        <v-th sortKey="studMiddle">Middle</v-th>
        <v-th sortKey="studBirth">Birthdate</v-th>
        <v-th sortKey="studGender">Gender</v-th>
        <v-th sortKey="studentGrade">Grade</v-th>
        <v-th sortKey="mincode_grad">School</v-th>
        <v-th sortKey="schoolName">School Name</v-th>
        <v-th sortKey="gradRequirementYear">Grad Year</v-th>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <template v-for="row in displayData">
          <tr :key="row.pen">
            <td>
              <a href="#" v-on:click="selectStudent(row)">{{ row.pen }}</a>
            </td>
            <td>{{ row.studSurname }}</td>
            <td>{{ row.studGiven }}</td>
            <td>{{ row.studMiddle }}</td>
            <td>{{ row.studBirth }}</td>
            <td>{{ row.studSex }}</td>
            <td>{{ row.studentGrade }}</td>
            <td>{{ row.mincode_grad }}</td>
            <td>{{ row.schoolName }}</td>
            <td>{{ row.gradRequirementYear }}</td>            
          </tr>
        </template>
      </tbody>
    </v-table>
    </transition>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import CourseAchievementService from "@/services/CourseAchievementService.js";
import StudentService from "@/services/StudentService.js";
import StudentExamsService from "@/services/StudentExamsService.js";
import AssessmentService from "@/services/AssessmentService.js"
export default {
  name: "studentSearch",
  data() {
    return {
      studentSearchResults: [],
      searchResultMessage: "",
      message: "",
      penInput: "",
      selectedPen: "",
      showPenInputBox: true,
      surnameInput: "",
      showSurnameInput: false,
      variants: ["success"],
      searchLoading: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    next(this.loadStudent(this.selectedPen));
  },
  components: {},
  computed: {
    ...mapGetters({
      profile: "getStudentProfile",
      courses: "getStudentCourses",
      exams: "getStudentExams",
    }),
  },

  methods: {
    loadStudent(pen) {
      console.log("loadingStudent");
      console.log(pen);

      AssessmentService.getStudentAssessment(pen).then((response) => {
          // this.$store.commit('setStudentExams',response.data);
          this.$store.dispatch('setStudentAssessments', response.data);
      });

      StudentExamsService.getStudentExams(pen).then((response) => {
        // this.$store.commit('setStudentExams',response.data);
        this.$store.dispatch('setStudentExams', response.data);
      })

      CourseAchievementService.getStudentCourseAchievements(pen).then(
        (response) => {
          console.log(response.data);
          this.$store.dispatch("setStudentCourses", response.data);
          console.log(response.data);
        }
      );

      //let currentObj = this;
      //currentObj.$router.push({name: 'student-profile'});
    },
    keyHandler: function(e) {
      if (e.keyCode === 13) {
        //enter key pressed
        this.studentSearchResults = [];
        if (this.penInput) {
          this.findStudentByPen();
        } else if (this.surnameInput) {
          this.findStudentBySurname();
        }
      }
    },
    findStudentByPen: function() {
      if (this.penInput) {
        this.message ="";
        this.searchLoading = true;
        this.studentSearchResults = [];
        try {
          StudentService.getStudentByPen(this.penInput)
            .then((response) => {
              console.log(response);
              if (response.data) {
                this.searchLoading = false;
                this.studentSearchResults.push(response.data);
                this.message = "1 Student found";
              }
            })
            .catch((err) => {
              this.searchLoading = false;
              this.message = "Student not found";
              console.log(err);
            });
        } catch (error) {
          console.log("Error with webservice");
        }
      }
    },
    findStudentBySurname: function() {
      this.message = "";
      if (this.surnameInput) {
        this.searchLoading = true;
        this.studentSearchResults = [];
        try {
          StudentService.getStudentBySurname(this.surnameInput)
            .then((response) => {
              this.searchLoading = false;
              this.studentSearchResults = response.data;
              this.message = this.studentSearchResults.length + " student(s) found"
            })
            .catch((err) => {
              this.searchLoading = false;
              this.message = "Student not found";
              
            
              console.log(err);
            });
        } catch (error) {
          console.log("Error with webservice");
        }
      }
    },
    selectStudent: function(student) {
      this.selectedPen = student.pen;
      this.$store.commit("setStudentProfile", student);
      console.log("selectingStudent" + student.pen);
      this.$router.push({ name: "student-profile" });
    },
    clearStudent: function() {},
    clearInput: function() {
      this.penInput = "";
      this.surnameInput = "";
    },
    showPenInput: function() {
      if (!this.showPenInputBox) {
        this.showPenInputBox = !this.showPenInputBox;
        this.showSurnameInput = false;
        this.clearInput();
      }
    },
    showsurnameInput: function() {
      if (!this.showPenSurnameBox) {
        this.showSurnameInput = !this.showSurnameInput;
        this.showPenInputBox = false;
        this.clearInput();
      }
    },
  },
};
</script>
<style scoped>
.alert,
.card,
.btn.btn-primary {
  position: inherit;
  margin-right: 10px;
}
.pen-search, .surname-search {
  width: 400px;
  margin-right: 9px;
  padding: 5px;
  float: left;
}
h6 {
  font-size: 1.5rem;
}
.loading-spinner{
  float:left;
  margin-left: 10px;
}
.table-hover tbody tr:hover{
  background: #96c0e6;
}
.search{
  float:left;
}
.sample-pens{
  float:left;
  clear:both;
  margin-top: 15px;
}
.search-student-dropdown{
  border-radius: 0px;
}
.search-results-message{
    float: left;
    clear: both;
    margin-top: 5px;
}
.fade-enter-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.table th{
  border-bottom: 2px solid #5475a7;
}
</style>
