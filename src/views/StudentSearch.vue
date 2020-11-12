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
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Search By
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
          <div v-show="showPenInputBox">
            <input
              v-model="penInput"
              placeholder="Student PEN"
              class="pen-search"
              v-on:keyup="keyHandler"
            /><button v-on:click="findStudentByPen" class="btn btn-primary">
              Find Student by PEN
            </button>
          </div>

          <!-- Surname Input -->
          <div v-show="showSurnameInput">
            <input
              v-model="surnameInput"
              placeholder="Student Surname"
              class="pen-search"
              v-on:keyup="keyHandler"
            /><button v-on:click="findStudentBySurname" class="btn btn-primary">
              Find Student by Surname
            </button>
          </div>
          <span v-if="message">{{ message }}</span>

        </div>
      </form>
      <p>Samples: 101696920</p>
      <div class="text-center mb-3 d-flex justify-content-between">
        <b-spinner
          v-for="variant in variants"
          :variant="variant"
          :key="variant"
          v-show="searchLoading"
        ></b-spinner>
      </div>

      
      </div>
      
      <v-table
        :data="studentSearchResults"
        class="table table-sm table-hover table-striped text-center align-middle"
        v-if="studentSearchResults"
      >
        <thead slot="head" class="thead-dark">
          <v-th sortKey="pen">Pen</v-th>
          <v-th sortKey="studSurname">Surname</v-th>
          <v-th sortKey="studGiven">First Name</v-th>
          <v-th sortKey="studMiddle">Middle</v-th>
          <v-th sortKey="studBirth">Birthdate</v-th>
          <v-th sortKey="address1">Address</v-th>
          <v-th sortKey="postalCode">Postal %</v-th>
          <v-th sortKey="provinceCode">Province</v-th>
        </thead>
        <tbody slot="body" slot-scope="{ displayData }">
          <template v-for="row in displayData">
            <tr :key="row.pen">
              <td>
                <a href="#" v-on:click="selectStudent(row.pen)">{{
                  row.pen
                }}</a>
              </td>
              <td>{{ row.studSurname }}</td>
              <td>{{ row.studGiven }}</td>
              <td>{{ row.studMiddle }}</td>
              <td>{{ row.studBirth }}</td>
              <td>{{ row.address1 }}</td>
              <td>{{ row.postalCode }} %</td>
              <td>{{ row.provinceCode }}</td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import CourseAchievementService from "@/services/CourseAchievementService.js";
import StudentService from "@/services/StudentService.js";
import StudentExamsService from "@/services/StudentExamsService.js";
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
      variants: ["primary"],
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

      StudentService.getStudentByPen(pen).then((response) => {
        if (response.data) {
          this.$store.dispatch("setStudentProfile", response.data);
        }
      });
*/
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
      this.message = "";
      if (e.keyCode === 13) {
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
        this.searchLoading = true;
        this.studentSearchResults = [];
        try {
          StudentService.getStudentByPen(this.penInput)
            .then((response) => {
              console.log(response);
              if (response.data) {
                this.searchLoading = false;
                this.studentSearchResults.push(response.data);
              }
            })
            .catch((err) => {
              this.searchLoading = false;
              this.message = "PEN not found";
              console.log(err);
            });
        } catch (error) {
          console.log("Error with webservice");
        }
      }
    },
    findStudentBySurname: function() {
      if (this.surnameInput) {
        this.searchLoading = true;
        this.studentSearchResults = [];
        try {
          StudentService.getStudentBySurname(this.surnameInput)
            .then((response) => {
              this.searchLoading = false;
              this.studentSearchResults = response.data;
            })
            .catch((err) => {
              this.message = "Surname not found";
              console.log(err);
            });
        } catch (error) {
          console.log("Error with webservice");
        }
      }
    },
    selectStudent: function(pen) {
      this.selectedPen = pen;
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
.pen-search {
  width: 400px;
  margin-right: 9px;
  padding: 5px;
}
h6 {
  font-size: 1.5rem;
}
</style>
