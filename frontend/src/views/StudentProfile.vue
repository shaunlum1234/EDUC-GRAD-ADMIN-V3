<template>
  <div class="student-profile">
    <div class="row m-0 py-3">
      <StudentInformation></StudentInformation>
      <div class="col-12 px-3">
        <div class="float-right grad-actions" v-if="allowRunGradAlgorithm">
          <b-spinner v-if="tabLoading" class="px-1 my-2"></b-spinner>
          <b-dropdown
            :disabled="tabLoading || !hasGradStatus"
            v-b-tooltip.hover.left
            id="actions"
            right
            :text="smallScreen ? '' : 'Transcripts & TVRs'"
            class="m-md-2 float-right admin-gear-w-text"
          >
            <b-dropdown-item
              :disabled="studentGradStatus.studentStatus === 'MER'"
              v-on:click="projectedGradStatusWithFinalMarks"
              >Preview Final Marks</b-dropdown-item
            >
            <b-dropdown-item
              :disabled="studentGradStatus.studentStatus === 'MER'"
              v-on:click="projectedGradStatusWithFinalAndReg"
              >Update TVR</b-dropdown-item
            >
            <b-dropdown-item
              :disabled="
                studentGradStatus.recalculateGradStatus !== 'Y' ||
                studentGradStatus.studentStatus === 'MER' ||
                (!!studentGradStatus.programCompletionDate &&
                  studentGradStatus.program !== 'SCCP')
              "
              v-on:click="graduateStudent"
              >Update Grad Status</b-dropdown-item
            >
            <b-dropdown-item
              :disabled="
                studentGradStatus.studentStatus === 'MER' ||
                !studentGradStatus.programCompletionDate
              "
              v-on:click="updateStudentReports"
              >Update Transcript</b-dropdown-item
            >
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item
              :disabled="
                studentGradStatus.studentStatus === 'MER' ||
                !studentGradStatus.programCompletionDate
              "
              v-b-modal.ungraduate-student-modal
              >Undo Completion</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
    </div>
    <div class="row m-0">
      <div class="col-12 px-0">
        <div>
          <b-card no-body class="p-0">
            <b-tabs :pills="smallScreen" v-model="selectedTab" card>
              <b-tab title="GRAD" class="grad-tab gradstatus-tabs py-4">
                <div class="mb-2 mx-1 row">
                  <div class="col-12 col-lg-4 col-md-5 m-0 p-0">
                    <b-button
                      class="mr-2 my-1"
                      v-on:click="gradTab = 'gradStatus'"
                      size="sm"
                      :variant="
                        gradTab == 'gradStatus'
                          ? 'primary'
                          : 'outline-secondary'
                      "
                      >GRAD Status</b-button
                    >
                    <b-button
                      class="mx-0 my-1"
                      :disabled="!gradCourses"
                      v-on:click="gradTab = 'gradCourses'"
                      size="sm"
                      :variant="
                        gradTab == 'gradCourses'
                          ? 'primary'
                          : 'outline-secondary'
                      "
                      >Requirement Details</b-button
                    >
                  </div>
                  <div class="pr-0 col-12 col-lg-8 col-md-7 text-right">
                    <strong>Updated:</strong>
                    {{ studentGradStatus.updateDate | formatTime }} by
                    {{ studentGradStatus.updateUser }}
                  </div>
                </div>
                <b-card-text>
                  <!-- <GRADRequirementDetails v-if="gradTab == 'gradCourses'">
                    <div v-if="studentGradStatus.studentGradData">
                      <b-alert
                        variant="info"
                        v-if="studentGradStatus.studentGradData.gradMessage"
                        :show="!studentGradStatus.recalculateGradStatus"
                        >{{
                          studentGradStatus.studentGradData.gradMessage
                        }}</b-alert
                      >
                    </div>
                  </GRADRequirementDetails> -->
                  <b-overlay
                    :show="tabLoading"
                    rounded="sm"
                    no-wrap
                  ></b-overlay>
                </b-card-text>
              </b-tab>
              <b-tab
                v-if="courses != 'not loaded'"
                :title="'Courses (' + courses.length + ')'"
                class="py-3 px-0 m-1"
              >
                <b-card-text>
                  <StudentCourses></StudentCourses>
                  <b-overlay :show="tabLoading" rounded="sm" no-wrap>
                  </b-overlay>
                </b-card-text>
              </b-tab>

              <b-tab
                v-if="assessments != 'not loaded'"
                :title="'Assessments (' + assessments.length + ')'"
                class="py-3 px-0 m-1"
              >
                <b-card-text>
                  <StudentAssessments />
                  <b-overlay
                    :show="tabLoading"
                    rounded="sm"
                    no-wrap
                  ></b-overlay>
                </b-card-text>
              </b-tab>

              <b-tab
                v-if="exams != 'not loaded'"
                :title="'Exams Details (' + exams.length + ')'"
                class="py-3 px-0 m-1"
              >
                <b-card-text>
                  <StudentExams />
                  <b-overlay
                    :show="tabLoading"
                    rounded="sm"
                    no-wrap
                  ></b-overlay>
                </b-card-text>
              </b-tab>

              <b-tab
                v-if="optionalPrograms != 'not loaded'"
                :title="'Optional Programs (' + optionalPrograms.length + ')'"
                class="py-3 px-0 m-1"
              >
                <b-card-text>
                  <StudentOptionalPrograms></StudentOptionalPrograms>
                  <b-overlay
                    :show="tabLoading"
                    rounded="sm"
                    no-wrap
                  ></b-overlay>
                </b-card-text>
              </b-tab>

              <b-tab
                v-if="
                  this.courses == 'not loaded' ||
                  this.assessments == 'not loaded'
                "
                title="Loading ..."
                class="tab-loading py-3 px-0 m-1"
              >
                <b-card-text class="text-center"
                  >Loading Student Courses and Assesments</b-card-text
                >
              </b-tab>

              <b-tab
                :title="'Audit History'"
                class="audit-history-tabs py-3 px-0 m-1"
              >
                <b-card-text>
                  <div class="ml-3">
                    <b-button
                      class="mr-2 my-1"
                      v-on:click="auditTab = 'studentAudit'"
                      size="sm"
                      :variant="
                        auditTab == 'studentAudit'
                          ? 'primary'
                          : 'outline-secondary'
                      "
                      >Student Audit</b-button
                    >
                    <b-button
                      class="mr-2 my-1"
                      v-on:click="auditTab = 'notes'"
                      size="sm"
                      :variant="
                        auditTab == 'notes' ? 'primary' : 'outline-secondary'
                      "
                      >Notes ({{ studentNotes.length }})</b-button
                    >
                    <b-button
                      class="mr-2 my-1"
                      v-on:click="auditTab = 'undoCompletionReasons'"
                      size="sm"
                      :variant="
                        auditTab == 'undoCompletionReasons'
                          ? 'primary'
                          : 'outline-secondary'
                      "
                      >Undo Completion Reasons ({{
                        studentUngradReasons.length
                      }})</b-button
                    >
                  </div>
                  <StudentAuditHistory v-if="auditTab == 'studentAudit'" />
                  <StudentNotes v-else-if="auditTab == 'notes'" />
                  <div
                    v-else-if="auditTab == 'undoCompletionReasons'"
                    class="pb-3 px-3"
                  >
                    <p v-if="studentUngradReasons.length === 0">
                      Student has no undo completion reasons to show
                    </p>
                    <DisplayTable
                      v-else
                      striped
                      :items="studentUngradReasons"
                      :fields="[
                        {
                          key: 'createDate',
                          label: 'Undo Completion Date',
                          class: 'px-0 py-2 w-15',
                        },
                        {
                          key: 'undoCompletionReasonCode',
                          label: 'Code',
                          class: 'px-0 py-2 w-10',
                        },
                        {
                          key: 'undoCompletionReasonDescription',
                          label: 'Reason',
                          class: 'px-0 py-2 w-80',
                        },
                        {
                          key: 'createUser',
                          label: 'User',
                          class: 'px-0 py-2 w-80',
                        },
                      ]"
                    >
                      <template #cell(createDate)="row">
                        {{ row.value | formatTime }}
                      </template>
                    </DisplayTable>
                  </div>
                  <b-overlay
                    :show="tabLoading"
                    rounded="sm"
                    no-wrap
                  ></b-overlay>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sharedMethods from "../sharedMethods";
import AssessmentService from "@/services/AssessmentService.js";
import GraduationReportService from "@/services/GraduationReportService.js";
import CourseService from "@/services/CourseService.js";
import StudentService from "@/services/StudentService.js";
import GraduationService from "@/services/GraduationService.js";
import GRADRequirementDetails from "@/components/StudentProfile/GRADRequirementDetails.vue";
import StudentInformation from "@/components/StudentProfile/StudentInformation.vue";
import StudentCourses from "@/components/StudentProfile/StudentCourses.vue";
import StudentAssessments from "@/components/StudentProfile/StudentAssessments.vue";
import StudentExams from "@/components/StudentProfile/StudentExams.vue";
import StudentGraduationStatus from "@/components/StudentProfile/StudentGraduationStatus.vue";
import StudentOptionalPrograms from "@/components/StudentProfile/StudentOptionalPrograms.vue";
import StudentAuditHistory from "@/components/StudentProfile/AuditHistory/StudentAuditHistory.vue";
import StudentNotes from "@/components/StudentProfile/AuditHistory/StudentNotes.vue";
import DisplayTable from "@/components/DisplayTable.vue";

import { useStudentStore } from "../store/modules/student";
import { useAppStore } from "../store/modules/app";
import { useAccessStore } from "../store/modules/access";
import { mapState, mapActions } from "pinia";

export default {
  name: "studentProfile",
  setup() {
    const studentStore = useStudentStore();
    const appStore = useAppStore();
    const accessStore = useAccessStore();
    return { appStore, studentStore, accessStore };
  },
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
    StudentInformation: StudentInformation,
    StudentCourses: StudentCourses,
    GRADRequirementDetails: GRADRequirementDetails,
    StudentAssessments: StudentAssessments,
    StudentExams: StudentExams,
    StudentGraduationStatus: StudentGraduationStatus,
    StudentOptionalPrograms: StudentOptionalPrograms,
    StudentAuditHistory: StudentAuditHistory,
    StudentNotes: StudentNotes,
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
      studentUngradReasonSelected: "",
      studentUngradReasonDescription: "",
      confirmStudentUndoCompletion: false,
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
    ...mapState(useAccessStore, {
      allowUpdateGradStatus: "allowUpdateGradStatus",
      allowRunGradAlgorithm: "allowRunGradAlgorithm",
    }),
    ...mapState(useAppStore, {
      ungradReasons: "ungradReasons",
    }),
    ...mapState(useStudentStore, {
      profile: "getStudentProfile",
      courses: "getStudentCourses",
      assessments: "getStudentAssessments",
      exams: "getStudentExams",
      studentHasCourses: "studentHasCourses",
      gradInfo: "getStudentGraduationCreationAndUpdate",
      hasGradStatus: "studentHasGradStatus",
      studentGradStatus: "getStudentGradStatus",
      studentId: "getStudentId",
      studentPen: "getStudentPen",
      studentInfo: "getStudentProfile",
      studentNotes: "getStudentNotes",
      optionalPrograms: "getStudentOptionalPrograms",
      studentUngradReasons: "getStudentUngradReasons",
      gradCourses: "gradStatusCourses",
      studentHistory: "getStudentAuditHistory",
      optionalProgramHistory: "getStudentOptionalProgramAuditHistory",
      quickSearchPen: "getQuickSearchPen",
    }),
    ...mapState(useAppStore, {
      ungradReasons: "ungradReasons",
    }),
    userUndoCompletionReasonChange() {
      return this.studentUngradReasonSelected;
    },
  },
  watch: {
    userUndoCompletionReasonChange: function () {
      this.confirmStudentUndoCompletion = false; //clear confirm if they change options
    },
  },
  mounted() {
    this.$root.$on("studentProfile", () => {
      this.getStudentReportsAndCertificates(this.studentId, this.pen);
    });
    this.$root.$on("refreshStudentGraduationOptionalPrograms", () => {
      this.loadStudentOptionalPrograms(this.studentId);
    });
    this.$root.$on("refreshStudentHistory", () => {
      this.loadStudentHistory(this.studentId);
      this.loadStudentOptionalProgramHistory(this.studentId);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  beforeRouteUpdate(to, from, next) {
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
    ...mapActions(useStudentStore, [
      "setStudentCertificates",
      "setStudentReports",
      "setStudentTranscripts",
      "setStudentXmlReport",
      "setStudentGradStatus",
      "setStudentGradStatus",
      "setStudentProfile",
      "setStudentAssessments",
      "setStudentGradStatus",
      "setStudentGradStatusOptionalPrograms",
      "setStudentCourses",
      "setStudentExams",
      "setStudentNotes",
      "setStudentUngradReasons",
      "setStudentAuditHistory",
      "setStudentCareerPrograms",
      "setStudentUngradReasons",
      "setStudentGradStatus",
      "setStudentOptionalProgramsAuditHistory",
    ]),
    ungraduateStudent() {
      this.tabLoading = true;
      this.confirmStudentUndoCompletion = "";
      let ungradCode = this.studentUngradReasonSelected;
      let ungradDesc = this.studentUngradReasonDescription;
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
              this.setStudentUngradReasons(response.data);
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
              this.setStudentGradStatus(response.data);
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
    resetUndoCompletionValues() {
      this.confirmStudentUndoCompletion = false;
      this.studentUngradReasonSelected = "";
      this.studentUngradReasonDescription = "";
    },
    getStudentReportsAndCertificates(id, pen) {
      GraduationReportService.getStudentCertificates(id)
        .then((response) => {
          this.setStudentCertificates(response.data);
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
          this.setStudentReports(response.data);
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
          this.setStudentTranscripts(response.data);
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
          this.setStudentXmlReport(response.data);
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
          this.setStudentGradStatus(res.data);
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
              this.setStudentGradStatus(res.data);
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
      this.$store.commit("student/unsetStudent");
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
      // this.loadGraduationStatus(studentIdFromURL);
      this.loadStudentOptionalPrograms(studentIdFromURL);
      // this.loadCareerPrograms(studentIdFromURL);
      this.loadStudentCourses();
      this.loadStudentExamDetails();
      this.loadStudentNotes(studentIdFromURL);
      // this.getStudentReportsAndCertificates(studentIdFromURL, this.pen);
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
          this.setStudentProfile(data);
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
          this.setStudentAssessments(response.data);
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
          this.setStudentGradStatus(response.data);
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
          this.setStudentGradStatusOptionalPrograms(response.data);
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
          this.setStudentCareerPrograms(response.data);
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
    loadStudentCourses() {
      CourseService.getStudentCourseAchievements(this.pen)
        .then((response) => {
          this.setStudentCourses(response.data);
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
          this.setStudentExams(response.data);
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
          this.setStudentNotes(response.data);
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
          this.setStudentUngradReasons(response.data);
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
          this.setStudentAuditHistory(response.data);
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
          this.setStudentOptionalProgramsAuditHistory(response.data);
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
