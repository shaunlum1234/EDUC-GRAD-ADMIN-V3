<template>
  <div class="student-profile"></div>
</template>

<script>
import sharedMethods from "../sharedMethods";
import AssessmentService from "@/services/AssessmentService.js";
import GraduationReportService from "@/services/GraduationReportService.js";
import CourseService from "@/services/CourseService.js";
import StudentService from "@/services/StudentService.js";
// import GraduationService from "@/services/GraduationService.js";
// import GRADRequirementDetails from "@/components/GRADRequirementDetails";
// import StudentInformation from "@/components/StudentInformation";
// import StudentCourses from "@/components/StudentCourses";
// import StudentAssessments from "@/components/StudentAssessments";
// import StudentExams from "@/components/StudentExams";
// import StudentGraduationStatus from "@/components/StudentGraduationStatus";
// import StudentOptionalPrograms from "@/components/StudentOptionalPrograms";
// import StudentAuditHistory from "@/components/StudentAuditHistory";
// import StudentNotes from "@/components/StudentNotes";
import DisplayTable from "@/components/DisplayTable.vue";

import { mapGetters } from "vuex";
export default {
  name: "studentProfile",
  created() {
    StudentService.getStudentPen(this.$route.params.studentId)
      .then((response) => {
        this.pen = response.data.pen;
        const studentIdFromURL = this.$route.params.studentId;
        this.loadStudent(studentIdFromURL);
      })
      .catch((error) => {
        if (error.response.status) {
          this.showNotification(
            "danger",
            "There was an error: " + error.response.status
          );
        }
      });
    this.showNotification = sharedMethods.showNotification;
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
    if (this.window.width < 768) {
      this.smallScreen = true;
    }
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  components: {
    // StudentInformation: StudentInformation,
    // StudentCourses: StudentCourses,
    // GRADRequirementDetails: GRADRequirementDetails,
    // StudentAssessments: StudentAssessments,
    // StudentExams: StudentExams,
    // StudentGraduationStatus: StudentGraduationStatus,
    // StudentOptionalPrograms: StudentOptionalPrograms,
    // StudentAuditHistory: StudentAuditHistory,
    // StudentNotes: StudentNotes,
    DisplayTable: DisplayTable,
  },
  props: {},
  data() {
    return {
      pen: "",
      optionalProgramTab: "",
      projectedOptionalGradStatus: "",
      nonGradReasons: "",
      projectedrequirementsMet: "",
      ungradReasonSelected: "",
      ungradReasonDesc: "",
      selectedTab: 0,
      projectedGradStatus: [],
      projectedGradStatusWithRegistrations: [],
      tabLoading: false,
      gradTab: "gradStatus",
      auditTab: "studentAudit",
      show: false,
      opened: [],
      displayMessage: null,
      smallScreen: false,
      window: {
        width: 0,
        height: 0,
      },
      courseViewMode: "showAllCourses",
      moreStudentInfo: false,
      noncompletionReasonsFields: [
        {
          key: "rule",
          label: "Rule",
          class: "pl-0 pr-2 py-2",
        },
        {
          key: "description",
          label: "Description",
          class: "px-0 py-2",
        },
        {
          key: "transcriptRule",
          label: "Transcript Rule",
          class: "py-2",
        },
      ],
      requirementsMetFields: [
        {
          key: "rule",
          label: "Rule",
          class: "px-0 py-2",
        },
        {
          key: "description",
          label: "Description",
          class: "px-0 py-2",
        },
        {
          key: "transcriptRule",
          label: "Transcript Rule",
          class: "py-2",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      profile: "getStudentProfile",
      courses: "getStudentCourses",
      assessments: "getStudentAssessments",
      exams: "getStudentExams",
      studentHasCourses: "studentHasCourses",
      studentHasAssessments: "studentHasAssessments",
      studentHasNotes: "studentHasNotes",
      gradInfo: "getStudentGraduationCreationAndUpdate",
      hasGradStatus: "studentHasGradStatus",
      studentGradStatus: "getStudentGradStatus",
      studentId: "getStudentId",
      studentPen: "getStudentPen",
      studentInfo: "getStudentProfile",
      studentNotes: "getStudentNotes",
      optionalPrograms: "getStudentOptionalPrograms",
      ungradReasons: "app/getUngradReasons",
      studentUngradReasons: "getStudentUngradReasons",
      gradCourses: "gradStatusCourses",
      studentHistory: "getStudentAuditHistory",
      optionalProgramHistory: "getStudentOptionalProgramAuditHistory",
      quickSearchPen: "getQuickSearchPen",
    }),
  },
  mounted() {
    // this.$root.$on("studentProfile", () => {
    //   this.getStudentReportsAndCertificates(this.studentId, this.pen);
    // });
    // this.$root.$on("refreshStudentGraduationOptionalPrograms", () => {
    //   this.loadStudentOptionalPrograms(this.studentId);
    // });
    // this.$root.$on("refreshStudentHistory", () => {
    //   this.loadStudentHistory(this.studentId);
    //   this.loadStudentOptionalProgramHistory(this.studentId);
    // });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    this.loadStudent(this.quickSearchPen);
    StudentService.getStudentPen(this.quickSearchPen)
      .then((response) => {
        this.pen = response.data.pen;
        this.loadStudent(this.quickSearchPen);
      })
      .catch((error) => {
        if (error.response.status) {
          this.showNotification(
            "danger",
            "There was an error: " + error.response.status
          );
        }
      });
    next();
  },
  methods: {
    ungraduateStudent() {
      this.tabLoading = true;
      let ungradCode = this.ungradReasonSelected;
      let ungradDesc = this.ungradReasonDesc;
      if (ungradCode != "OTH") {
        ungradDesc = this.ungradReasons.filter(function (reason) {
          return reason.code == ungradCode;
        });
        ungradDesc = ungradDesc[0].description;
      }
      StudentService.ungradStudent(this.studentId, ungradCode, ungradDesc)
        .then(() => {
          StudentService.getStudentUngradReasons(this.studentId)
            .then((response) => {
              this.$store.dispatch("setStudentUngradReasons", response.data);
            })
            .catch((error) => {
              if (error.response.status) {
                this.showNotification(
                  "danger",
                  "There was an error: " + error.response.status
                );
              }
            });
          StudentService.getGraduationStatus(this.studentId)
            .then((response) => {
              this.$store.dispatch("setStudentGradStatus", response.data);
              this.loadStudentHistory(this.studentId);
              this.loadStudentOptionalProgramHistory(this.studentId);
              this.loadStudentOptionalPrograms(this.studentId);
              this.tabLoading = false;
            })
            .catch((error) => {
              this.tabLoading = false;
              if (error.response.status) {
                this.$bvToast.toast("ERROR " + error.response.statusText, {
                  title: "ERROR" + error.response.status,
                  variant: "danger",
                  noAutoHide: true,
                });
              }
            });
          this.getStudentReportsAndCertificates(
            this.studentId,
            this.studentPen
          );
        })
        .catch((error) => {
          this.tabLoading = false;
          this.showNotification(
            "danger",
            "There was an error: " + error.response.data.messages[0].message
          );
        });
    },
    resetUngraduateStudent() {
      this.ungradReasonSelected = "";
      this.ungradReasonDesc = "";
    },
    getStudentReportsAndCertificates(id, pen) {
      GraduationReportService.getStudentCertificates(id)
        .then((response) => {
          this.$store.dispatch("setStudentCertificates", response.data);
        })
        .catch((error) => {
          if (error.response.data.code == "404") {
            // eslint-disable-next-line
            console.log(error);
          } else {
            if (error.response.status) {
              this.$bvToast.toast("ERROR " + error.response.statusText, {
                title: "ERROR" + error.response.status,
                variant: "danger",
                noAutoHide: true,
              });
            }
          }
        });
      GraduationReportService.getStudentReports(id)
        .then((response) => {
          this.$store.dispatch("setStudentReports", response.data);
        })
        .catch((error) => {
          if (error.response.data.code == "404") {
            // eslint-disable-next-line
            console.log(error);
          } else {
            if (error.response.status) {
              this.$bvToast.toast("ERROR " + error.response.statusText, {
                title: "ERROR" + error.response.status,
                variant: "danger",
                noAutoHide: true,
              });
            }
          }
        });
      GraduationReportService.getStudentTranscripts(id)
        .then((response) => {
          this.$store.dispatch("setStudentTranscripts", response.data);
        })
        .catch((error) => {
          if (error.response.data.code == "404") {
            // eslint-disable-next-line
            console.log(error);
          } else {
            if (error.response.status) {
              this.$bvToast.toast("ERROR " + error.response.statusText, {
                title: "Service ERROR" + error.response.status,
                variant: "danger",
                noAutoHide: true,
              });
            }
          }
        });
      GraduationReportService.getStudentXmlReport(pen)
        .then((response) => {
          this.$store.dispatch("setStudentXmlReport", response.data);
        })
        .catch((error) => {
          if (error.response.status == 404) {
            // eslint-disable-next-line
            console.log(error);
          } else {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "Service ERROR" + error.response.status,
              variant: "danger",
              noAutoHide: true,
            });
          }
        });
    },
    reloadGradStatus() {
      StudentService.getGraduationStatus(this.studentId)
        .then((res) => {
          this.$store.dispatch("setStudentGradStatus", res.data);
        })
        .catch((error) => {
          if (error.res.status) {
            this.$bvToast.toast("ERROR " + error.res.statusText, {
              title: "ERROR" + error.res.status,
              variant: "danger",
              noAutoHide: true,
            });
          }
        });
      this.getStudentReportsAndCertificates(this.studentId, this.studentPen);
      this.tabLoading = false;
    },
    graduateStudent() {
      this.selectedTab = 0;
      this.tabLoading = true;
      GraduationService.graduateStudent(this.studentId)
        .then(() => {
          this.loadStudent(this.studentId);
        })
        .catch((error) => {
          this.tabLoading = false;
          if (error.response.status) {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: "danger",
              noAutoHide: true,
            });
          }
        });
    },
    updateStudentReports() {
      this.selectedTab = 0;
      this.tabLoading = true;
      GraduationService.updateStudentReports(this.studentId)
        .then(() => {
          this.getStudentReportsAndCertificates(
            this.studentId,
            this.studentPen
          );
          StudentService.getGraduationStatus(this.studentId)
            .then((res) => {
              this.$store.dispatch("setStudentGradStatus", res.data);
              this.tabLoading = false;
            })
            .catch((error) => {
              if (error.res.status) {
                this.$bvToast.toast("ERROR " + error.res.statusText, {
                  title: "ERROR" + error.res.status,
                  variant: "danger",
                  noAutoHide: true,
                });
              }
            });
        })
        .catch((error) => {
          if (error.response.status) {
            this.$bvToast.toast("ERROR " + error, {
              title: "ERROR" + error.response.status.response,
              variant: "danger",
              noAutoHide: true,
            });
            this.tabLoading = false;
          }
        });
    },
    projectedGradStatusWithFinalMarks() {
      this.tabLoading = true;
      GraduationService.projectedGradFinalMarks(this.studentId)
        .then((response) => {
          this.projectedGradStatus = JSON.parse(
            response.data.graduationStudentRecord.studentGradData
          );
          this.projectedOptionalGradStatus =
            response.data.studentOptionalProgram;
          for (let projectedOptGradStatus of this.projectedOptionalGradStatus) {
            projectedOptGradStatus.studentOptionalProgramData = JSON.parse(
              projectedOptGradStatus.studentOptionalProgramData
            );
          }
          this.$refs["projectedGradStatusWithFinalMarks"].show();
          this.tabLoading = false;
          this.getStudentReportsAndCertificates(
            this.studentId,
            this.studentPen
          );
        })
        .catch((error) => {
          this.tabLoading = false;
          if (error.response.status) {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: "danger",
              noAutoHide: true,
            });
          }
        });
    },
    projectedGradStatusWithFinalAndReg() {
      this.nonGradReasons =
        this.studentGradStatus.studentGradData.nonGradReasons;
      this.tabLoading = true;
      GraduationService.projectedGradStatusWithFinalAndReg(this.studentId)
        .then((response) => {
          this.projectedGradStatusWithRegistrations = response.data;
          this.projectedGradStatusWithRegistrations = JSON.parse(
            this.projectedGradStatusWithRegistrations.graduationStudentRecord
              .studentGradData
          );
          this.projectedOptionalGradStatus =
            response.data.studentOptionalProgram;
          for (let projectedOptGradStatus of this.projectedOptionalGradStatus) {
            projectedOptGradStatus.studentOptionalProgramData = JSON.parse(
              projectedOptGradStatus.studentOptionalProgramData
            );
          }
          this.projectedrequirementsMet =
            this.projectedGradStatusWithRegistrations.requirementsMet;
          this.$refs["projectedGradStatusWithFinalAndReg"].show();
          this.tabLoading = false;
          this.getStudentReportsAndCertificates(
            this.studentId,
            this.studentPen
          );
        })
        .catch((error) => {
          if (error.response.status) {
            this.tabLoading = false;
            this.showNotification(
              "danger",
              "There was an error with the Graduation Service (projected Grad Status with Final and Reg): " +
                error.response.status
            );
          }
        });
    },
    closeRecord: function () {
      this.$store.commit("unsetStudent");
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (this.window.width < 992) {
        this.smallScreen = true;
      } else {
        this.smallScreen = false;
      }
    },
    loadStudent(studentIdFromURL) {
      this.loadStudentProfile();
      this.loadAssessments();
      this.loadGraduationStatus(studentIdFromURL);
      this.loadStudentOptionalPrograms(studentIdFromURL);
      this.loadCareerPrograms(studentIdFromURL);
      this.loadStudentCourseAchievements();
      this.loadStudentExamDetails();
      this.loadStudentNotes(studentIdFromURL);
      this.getStudentReportsAndCertificates(studentIdFromURL, this.pen);
      this.loadStudentUngradReasons(studentIdFromURL);
      this.loadStudentHistory(studentIdFromURL);
      this.loadStudentOptionalProgramHistory(studentIdFromURL);
      this.tabLoading = false;
    }, //loadStudent
    loadStudentProfile() {
      StudentService.getStudentByPen(this.pen)
        .then((response) => {
          let data = response.data;
          //get true PEN for MER students
          //TODO SF: change length check to valid PEN check? Or do we want a valid GUID check utility?
          if (data[0].trueStudentID && data[0].trueStudentID.length > 9) {
            StudentService.getStudentByID(data[0].trueStudentID)
              .then((response) => {
                data[0].trueStudentID = response.data.pen;
              })
              .catch((error) => {
                if (error.response.status) {
                  this.showNotification(
                    "danger",
                    "There was an error getting the Student Service (Getting the true student ID): " +
                      error.response.status
                  );
                }
              });
          }
          this.$store.dispatch("setStudentProfile", data);
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Student using PEN): " +
                error.response.status
            );
          }
        });
    },
    loadAssessments() {
      AssessmentService.getStudentAssessment(this.pen)
        .then((response) => {
          this.$store.dispatch("setStudentAssessments", response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Assessment Service: " +
                error.response.status
            );
          }
        });
    },
    loadGraduationStatus(studentIdFromURL) {
      StudentService.getGraduationStatus(studentIdFromURL)
        .then((response) => {
          this.$store.dispatch("setStudentGradStatus", response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Graduation Status): " +
                error.response.status
            );
          }
        });
    },
    loadStudentOptionalPrograms(studentIdFromURL) {
      StudentService.getGraduationStatusOptionalPrograms(studentIdFromURL)
        .then((response) => {
          this.$store.dispatch(
            "setStudentGradStatusOptionalPrograms",
            response.data
          );
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Graduation Status Optional Programs): " +
                error.response.status
            );
          }
        });
    },
    loadCareerPrograms(studentIdFromURL) {
      StudentService.getStudentCareerPrograms(studentIdFromURL)
        .then((response) => {
          this.$store.dispatch("setStudentCareerPrograms", response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Student Career Programs): " +
                error.response.status
            );
          }
        });
    },
    loadStudentCourseAchievements() {
      CourseService.getStudentCourseAchievements(this.pen)
        .then((response) => {
          this.$store.dispatch("setStudentCourses", response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Student Course Achievements): " +
                error.response.status
            );
          }
        });
    },
    loadStudentExamDetails() {
      CourseService.getStudentExamDetails(this.pen)
        .then((response) => {
          this.$store.dispatch("setStudentExams", response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Student Exam Details): " +
                error.response.status
            );
          }
        });
    },
    loadStudentNotes(studentIdFromURL) {
      StudentService.getStudentNotes(studentIdFromURL)
        .then((response) => {
          this.$store.dispatch("setStudentNotes", response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Student Notes): " +
                error.response.status
            );
          }
        });
    },
    loadStudentUngradReasons(studentIdFromURL) {
      StudentService.getStudentUngradReasons(studentIdFromURL)
        .then((response) => {
          this.$store.dispatch("setStudentUngradReasons", response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Undo Completion Reasons): " +
                error.response.status
            );
          }
        });
    },
    loadStudentHistory(studentIdFromURL) {
      StudentService.getStudentHistory(studentIdFromURL)
        .then((response) => {
          this.$store.dispatch("setStudentAuditHistory", response.data);
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Student History): " +
                error.response.status
            );
          }
        });
    },
    loadStudentOptionalProgramHistory(studentIdFromURL) {
      StudentService.getStudentOptionalProgramHistory(studentIdFromURL)
        .then((response) => {
          this.$store.dispatch(
            "setStudentOptionalProgramsAuditHistory",
            response.data
          );
        })
        .catch((error) => {
          if (error.response.status) {
            this.showNotification(
              "danger",
              "There was an error with the Student Service (getting the Student Optional Program History): " +
                error.response.status
            );
          }
        });
    },
  },
};
</script>

<style scoped>
.student-profile {
  padding-left: 25px;
  padding-right: 25px;
}
.grad-actions {
  position: absolute;
  right: 0;
  top: -100px;
}
.profile-info {
  font-size: 29px;
}
.profile-info button {
  font-size: 29px;
  box-shadow: none !important;
  padding: 0px;
  color: #313132;
}
.profile-info button.btn.btn-link:focus {
  border: none !important;
}
.close-record {
  float: right;
  text-align: center;
}

.close-record .dropdown-menu.show {
  left: -120px !important;
}

.tab-loading {
  color: green !important;
}

.student-info {
  margin: 10px 0px;
  float: left;
}

.card {
  border-radius: 0px !important;
}

header.card-header button {
  border-radius: 0px !important;
}

.no-underline {
  text-decoration: none;
}
.profile-name-data {
  word-break: break-all;
  max-width: 400px;
}
.profile-name label {
  font-size: 11px;
  float: left;
  clear: both;
  padding: 5px 0;
  margin-bottom: 0px;
  width: 100%;
  color: #036;
  border-bottom: 1px dotted #ccc;
}
.profile-name td {
  padding: 0px 10px;
}

#filter-dropdown {
  position: absolute;
  right: 0;
  top: 0;
}
.link-active {
  text-decoration: none;
  border-bottom: 3px solid black;
}
.record-timestamp {
  position: absolute;
  right: 50px;
}
.optionalProgramName {
  margin-top: 1rem;
}
</style>
