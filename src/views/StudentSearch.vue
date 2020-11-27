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

          <!-- Pen Input -->
          <div class="search">
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
          
            <b-spinner
              v-for="variant in variants"
              :variant="variant"
              :key="variant"
              v-show="searchLoading"
              class="loading-spinner"
            ></b-spinner>
          
        </div>
        
          <!-- advanced Search -->
        <a v-on:click="showAdvancedSearch">Advanced Search</a>
        <div v-if="showAdvancedSearchForm" class="advanced-search-form row col-12">
            <div class="advanced-search-field">
              <label>First Name</label>
              <input
                v-model="advancedSearchInput.firstName"
                placeholder="John"
                v-on:keyup="keyHandler"
              />
            </div>
            <div class="advanced-search-field">
            <label>Last Name</label>
            <input
              v-model="advancedSearchInput.lastName"
              placeholder="Smith"
              v-on:keyup="keyHandler"
            />
            </div>
            <div class="advanced-search-field">
            <label>BirthDate</label>
            <input
              placeholder="MM/DD/YYYY"
              v-on:keyup=" keyHandler"
            />   
            </div>                     
            <div class="advanced-search-field">
            <label>School</label>
            <input
              placeholder="12345678"
              v-on:keyup="keyHandler"
            />    
            </div>     
            <div class="advanced-search-button">               
            <button @click="findStudentsByAdvancedSearch" class="btn btn-primary">Search</button>
            <button @click="clearInput" class="btn btn-primary">Reset</button>
            </div>
            
            
        </div>
        <div class="search-results-message"><strong><span v-if="message">{{ message }}</span></strong></div>
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
        <v-th sortKey="gradRequirementYear">Grad Program</v-th>
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
      variants: ["success"],
      searchLoading: false,
      showAdvancedSearchForm: false,
      advancedSearchInput: {
        firstName: "",
        lastName: "",
        birthDate: ""
      }
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
          this.$store.dispatch("setStudentCourses", response.data);
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

          StudentService.getStudentByPen(this.penInput)
            .then((response) => {
              if (response.data) {
                this.searchLoading = false;
                this.studentSearchResults.push(response.data);
                this.message = "1 Student found";
              }
            })
            .catch(() => {
              this.searchLoading = false;
              this.message = "Student not found";
            });

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
            .catch(() => {
              this.searchLoading = false;
              this.message = "Student not found";
            });
        } catch (error) {
          this.message = error;
        }
      }
    },
    findStudentsByAdvancedSearch: function() {
      this.message = "";
      if (!this.isEmpty(this.advancedSearchInput)) {
        this.searchLoading = true;
        this.studentSearchResults = [];
        try {
          StudentService.getStudentsByAdvancedSearch(this.advancedSearchInput)
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
      }else{
        this.message = "Enter at least one field to search."
      }
    },
    showAdvancedSearch: function(){
      this.showAdvancedSearchForm = true;
    },
    selectStudent: function(student) {
      this.selectedPen = student.pen;
      this.$store.commit("setStudentProfile", student);
      this.$router.push({ name: "student-profile" });
    },
    clearStudent: function() {},
    clearInput: function() {
      this.penInput = "";
      this.advancedSearchInput= {
        firstName: "",
        lastName: "",
        birthDate: ""
      }

    },
    isEmpty(obj) {
      let isEmpty = true;
      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if(obj[key] != ""){
              isEmpty = false;
            }
          }
      }
      return isEmpty;
    }
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
.pen-search{
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
.advanced-search{
  float:left;
  clear:both;
}
.advanced-search-form{
  margin-top: 40px;
  border: 1px solid #ccc;
  padding:20px;
}
.advanced-search-field{
  padding-right: 10px;
}
.advanced-search-field label{
  float:left;
  clear:both;
  
}
.advanced-search-field input{
  float:left;
  clear:both;
}
.advanced-search-button{
  margin-top: 15px;
}
</style>
