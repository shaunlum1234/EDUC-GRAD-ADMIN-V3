<template>
  <div class="studentlist container">
    <h1>Student Graduation Status</h1>
    <p>
      Enter a Personal Education Number (PEN) to retrieve the student’s course
      achievements.
    </p>
    {{ test }}
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
            /><button v-on:click="findStudentBySurname" class="btn btn-primary">
              Find Student by Surname
            </button>
          </div>
        </div>
      </form>
      <p>Samples: 101696920</p>
      {{profiles.pen}}
      <v-table
        :data="studentSearchResults"
        class="table table-sm table-hover table-striped text-center align-middle"
      >
        <thead slot="head" class="thead-dark">
          <v-th sortKey="">LOAD</v-th>
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
                <router-link :to="{ name: 'student-profile', params: { studentPen : row.pen }}"><button class="btn btn-primary">LOAD</button></router-link
                >
                  
              </td>
              <td>{{ row.pen }}</td>
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
import StudentService from "@/services/StudentService.js";
export default {
  name: "studentSearch",
  data() {
    return {
      studentSearchResults: [],
      searchResultMessage: "",
      penInput: "",
      showPenInputBox: true,
      surnameInput: "",
      showSurnameInput: false,
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      profiles: "getStudentProfile"
    }),
  },
  methods: {
    findStudentByPen: function() {
      if (this.penInput) {
        this.studentSearchResults = [];
        try {
          StudentService.getStudentByPen(this.penInput).then((response) => {
            if (response.data) {
              this.studentSearchResults.push(response.data);
              this.$store.commit('setStudentProfile',response.data);
            } else {
              this.searchResultMessage = "Pen " + this.penInput + " not found";
            }
          });
        } catch (error) {
          console.log("Error with webservice");
        }
      }
    },
    findStudentBySurname: function() {
      if (this.surnameInput) {
        this.studentSearchResults = [];
        try {
          StudentService.getStudentBySurname(this.surnameInput).then(
            (response) => {
              console.log(response.data);
              this.studentSearchResults = response.data;
            }
          );
        } catch (error) {
          console.log("Error with webservice");
        }
      }
    },
    selectStudent: function(pen) {
      console.log("selecting pen:" + pen);
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
