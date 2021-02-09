<template>
  <div class="home">
    <div class="container">
      <div class="alert alert-danger" role="alert" v-if="noPen">
        Please enter a valid Personal Education Number (PEN)
      </div>

      <h1>Student search</h1>
      <p>
        Enter a Personal Education Number (PEN) to retrieve a student’s graduation and achievement data.
      </p>

      <div class="form-group">
        <strong
          ><label for="StudentPen">Personal Education Number:</label></strong
        >
        <input v-model="inputPen" class="form-control" id="StudentPen" />
      </div>
      <div class="btn-group find">
        <button v-on:click="search" class="btn btn-primary" id="find">
          Find Student
        </button>
      </div>
      <div v-if="student" class="card" style="width: 100%;">
        <div class="card-body">
          <h2 class="card-title">Student {{ selectedPen }}</h2>
          <h3 class="card-subtitle mb-2 text-muted">
            {{ legalMiddleName }} {{ legalLastName }}, {{ legalFirstName }}
          </h3>
          <ul>
            <li>Date of Birth: {{ dob }}</li>
            <li>School: {{ school }}</li>
            <li>Grade: {{ gradeCode }}</li>
            <li>Graduation Program: {{ graduationProgram }}</li>
          </ul>
        </div>
      </div>
      <br />
      <div v-if="student" class="card" style="width: 100%;">
        <div class="card-body">
          <h2 class="card-title">Graduation Status</h2>
          <ul>
            <li>
              Graduation Status: <strong>{{ gradMessages[1] }}</strong>
            </li>
            <li>Last Update Status: {{ statusData }}</li>
          </ul>

          <div class="btn-group">
            <button
              type="submit"
              v-on:click="refresh"
              class="btn btn-bcgold my-2 my-sm-0"
              id="find"
            >
              Refresh
            </button>
          </div>

          <br />
          <br />
          <h3>Graduation Requirements</h3>
          <!-- Accordion -->
          <div class="accordion" id="graduationReqAccordion">
            <div class="card">
              <div class="card-header alert alert-success" id="item1Header">
                <h5 class="mb-0 requirements-met">
                  <button
                    class="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#expandable1"
                    aria-expanded="false"
                    aria-controls="expandable1"
                  >
                    Requirements met: {{ requirementsMet.length }}
                  </button>
                </h5>
              </div>
              <div
                id="expandable1"
                class="collapse"
                aria-labelledby="item1Header"
                data-parent="#graduationReqAccordion"
              >
                <div class="card-body">
                  <ul>
                    <li v-for="rm in requirementsMet" :key="rm.message">
                      {{ rm }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion" id="graduationReqAccordion2">
            <div class="card">
              <div class="card-header alert alert-danger" id="item2Header">
                <h5 class="mb-0 requirements-not-met">
                  <button
                    class="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#expandable2"
                    aria-expanded="false"
                    aria-controls="expandable1"
                  >
                    Requirements not met: {{ requirementsNotMet.length }}
                  </button>
                </h5>
              </div>
              <div
                id="expandable2"
                class="collapse"
                aria-labelledby="item2Header"
                data-parent="#graduationReqAccordion2"
              >
                <div class="card-body">
                  <ul>
                    <li v-for="rnm in requirementsNotMet" :key="rnm.message">
                      {{ rnm }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <br />

          <router-link to="/course-achievements"
            ><button class="btn btn-primary" id="find">
              All Course Achievements
            </button></router-link
          >
        </div>
      </div>
      <br />
      <div v-if="student" class="card" style="width: 100%;">
        <div class="card-body">
          <h2 class="card-title">Graduation Reports</h2>
          <div class="mt-3">
            <ul>
              <li>
                <a v-on:click="StudentAchievementReport" href="#" class=""
                  >Student Achievement Report (PDF)</a
                >
              </li>
              <li>Student Transcript Report</li>
            </ul>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { store } from "@/store.js";
import GraduationStatusService from "@/services/GraduationStatusService.js";
export default {
  name: "home",
  data() {
    return {
      student: false,
      noPen: false,
      inputPen: "",
      selectedPen: "",
      studentGradData: [],
      pen: "",
      legalFirstName: "",
      legalMiddleName: "",
      legalLastName: "",
      graduationProgram: "",
      school: "",
      dob: "",
      sexCode: "",
      genderCode: "",
      dataSourceCode: "",
      usualFirstName: "",
      usualMiddleName: "",
      usualLastName: "",
      email: "",
      deceasedDate: "",
      gradeCode: "",
      citizenship: "",
      address: "",
      statusDate: "",
      gradMessages: [],
      requirementsMet: [],
      requirementsNotMet: [],
    };
  },
  created() {
    if (store.currentPen != null) {
      GraduationStatusService.getGraduationStatus(store.currentPen, localStorage.getItem('jwt'))
        .then((response) => {
          this.inputPen = store.currentPen;
          this.selectedPen = this.inputPen;
          this.student = true;
          this.noPen = false;
          this.studentGradData = response.data;
          this.studentGradData = JSON.parse(
            this.studentGradData.studentGradData
          );
          this.legalFirstName = this.studentGradData.legalFirstName;
          this.legalMiddleName = this.studentGradData.legalMiddleName;
          this.legalLastName = this.studentGradData.legalLastName;
          this.graduationProgram = this.studentGradData.graduationProgram;
          this.school = this.studentGradData.school;
          this.dob = this.studentGradData.dob;
          this.sexCode = this.studentGradData.sexCode;
          this.genderCode = this.studentGradData.genderCode;
          this.dataSourceCode = this.studentGradData.dataSourceCode;
          this.usualFirstName = this.studentGradData.usualFirstName;
          this.usualMiddleName = this.studentGradData.usualMiddleName;
          this.usualLastName = this.studentGradData.usualLastName;
          this.email = this.studentGradData.email;
          this.deceasedDate = this.studentGradData.deceasedDate;
          this.gradeCode = this.studentGradData.gradeCode;
          this.citizenship = this.studentGradData.citizenship;
          this.address = this.studentGradData.address;
          this.gradMessages = this.studentGradData.gradMessages;
          this.requirementsMet = this.studentGradData.requirementsMet;
          this.requirementsNotMet = this.studentGradData.requirementsNotMet;
          this.statusData = response.data.statusDate;
          this.transcriptReport = response.transcriptReport;
        })
        .catch((error) => {
          this.student = false;
          this.noPen = true;
        });
    }
  },
  methods: {
    StudentAchievementReport: function() {
      GraduationStatusService.getAchievementReport(this.inputPen)
        .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], { type: "application/pdf" });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch((error) => {
          //console.log('There was an error:' + error.response);
        });
    },
    search: function() {
      GraduationStatusService.getGraduationStatus(this.inputPen, localStorage.getItem('jwt'))
        .then((response) => {
          store.currentPen = this.inputPen;
          this.selectedPen = this.inputPen;
          this.noPen = false;
          if (this.inputPen != " ") {
            this.student = true;
          }
          this.studentGradData = response.data;
          this.studentGradData = JSON.parse(
            this.studentGradData.studentGradData
          );
          this.legalFirstName = this.studentGradData.legalFirstName;
          this.legalMiddleName = this.studentGradData.legalMiddleName;
          this.legalLastName = this.studentGradData.legalLastName;
          this.graduationProgram = this.studentGradData.graduationProgram;
          this.school = this.studentGradData.school;
          this.dob = this.studentGradData.dob;
          this.sexCode = this.studentGradData.sexCode;
          this.genderCode = this.studentGradData.genderCode;
          this.dataSourceCode = this.studentGradData.dataSourceCode;
          this.usualFirstName = this.studentGradData.usualFirstName;
          this.usualMiddleName = this.studentGradData.usualMiddleName;
          this.usualLastName = this.studentGradData.usualLastName;
          this.email = this.studentGradData.email;
          this.deceasedDate = this.studentGradData.deceasedDate;
          this.gradeCode = this.studentGradData.gradeCode;
          this.citizenship = this.studentGradData.citizenship;
          this.address = this.studentGradData.address;
          this.gradMessages = this.studentGradData.gradMessages;
          this.requirementsMet = this.studentGradData.requirementsMet;
          this.requirementsNotMet = this.studentGradData.requirementsNotMet;
          this.statusData = response.data.statusDate;
          this.achievementReport = response.achievementReport;
          this.transcriptReport = response.transcriptReport;
        })
        
        .catch((error) => {
          this.student = false;
          this.noPen = true;
          // eslint-disable-next-line no-unused-vars
          console.log('There was an error:' + error.response);
        });
    },
    refresh: function() {
      GraduationStatusService.refreshGraduationStatus(this.inputPen)
        .then((response) => {
          this.studentGradData = response.data;
          this.studentGradData = JSON.parse(
            this.studentGradData.studentGradData
          );
          this.legalFirstName = this.studentGradData.legalFirstName;
          this.legalMiddleName = this.studentGradData.legalMiddleName;
          this.legalLastName = this.studentGradData.legalLastName;
          this.graduationProgram = this.studentGradData.graduationProgram;
          this.school = this.studentGradData.school;
          this.dob = this.studentGradData.dob;
          this.sexCode = this.studentGradData.sexCode;
          this.genderCode = this.studentGradData.genderCode;
          this.dataSourceCode = this.studentGradData.dataSourceCode;
          this.usualFirstName = this.studentGradData.usualFirstName;
          this.usualMiddleName = this.studentGradData.usualMiddleName;
          this.usualLastName = this.studentGradData.usualLastName;
          this.email = this.studentGradData.email;
          this.deceasedDate = this.studentGradData.deceasedDate;
          this.gradeCode = this.studentGradData.gradeCode;
          this.citizenship = this.studentGradData.citizenship;
          this.address = this.studentGradData.address;
          this.gradMessages = this.studentGradData.gradMessages;
          this.requirementsMet = this.studentGradData.requirementsMet;
          this.requirementsNotMet = this.studentGradData.requirementsNotMet;
          this.statusData = response.data.statusDate;
          this.achievementReport = response.achievementReport;
          this.transcriptReport = response.transcriptReport;
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          this.student = false;
          this.noPen = true;
          //console.log('There was an error:' + error.response);
        });
    },
  },
  components: {},
};
</script>
<style scoped>
.alert,
.card,
.btn.btn-primary {
  position: inherit;
}
h6 {
  font-size: 1.5rem;
}
.find {
  padding-bottom: 1rem;
}
</style>
