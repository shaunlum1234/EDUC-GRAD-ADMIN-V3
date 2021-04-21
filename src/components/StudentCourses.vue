<template>
  <div>
    <div class="table-responsive">
      <DisplayTable :items="courses" :fields="fields" showFilter="yes">
        <template #thead-top="data">
          <b-tr class="table-row-header-group">
            <b-th colspan="1" class="table-header-group text-center"></b-th>
            <b-th colspan="3" class="table-header-group text-center">
              <div>Course</div></b-th
            >
            <b-th colspan="2" class="table-header-group text-center">
              <div>Interim</div>
            </b-th>
            <b-th colspan="2" class="table-header-group text-center"
              ><div>Final</div></b-th
            >
            <b-th colspan="1">Eq/</b-th>
            <b-th colspan="1"></b-th>
            <b-th colspan="1">Fa</b-th>
          </b-tr>
        </template>
        <template #cell(courseName)="row">
          <div class="d-flex flex-column text-md-left">
              <div class="">
                <b-button
                  :id="
                    'popover-button-event' +
                    row.item.courseCode +
                    row.item.courseLevel +
                    row.item.sessionDate
                  "
                  variant="link"
                  class="m-0 p-0 text-left"
                  >
                    {{row.item.courseName}}
                  </b-button
                >
              </div>
              <!-- triggers="hover focus" -->
              <b-popover
                :ref="'popover'+row.item.courseCode +
                  row.item.courseLevel + row.item.sessionDate"
                triggers="focus"
                :target="
                  'popover-button-event' +
                  row.item.courseCode +
                  row.item.courseLevel +
                  row.item.sessionDate
                "
                :title="row.item.courseName"
              >
                    <table>
                      <tr>
                        <td><strong>Code:</strong>  {{ row.item.courseDetails.courseCode }}</td>
                      </tr>
                      <tr>
                        <td><strong>Course Level:</strong> {{ row.item.courseDetails.courseLevel }}</td>
                      </tr>
                      <tr>                        
                        <td><strong>Course Name:</strong><br> {{ row.item.courseDetails.courseName }}</td>
                      </tr>
                      <tr>                        
                        <td><strong>Language:</strong> {{ row.item.courseDetails.language }}</td>
                      </tr>
                      <tr>                        
                        <td><strong>Start Date:</strong> {{ row.item.courseDetails.startDate}}</td>
                      </tr>
                      <tr>                        
                        <td><strong>Work Experience:</strong> {{ row.item.courseDetails.workExpFlag }}</td>
                      </tr>
                      <tr>                        
                        <td><strong>Generic Course Type:</strong> {{ row.item.courseDetails.genericCourseType }}</td>
                      </tr>
                    </table>
                 
              </b-popover>
            </div>
        </template>
        <template #cell(more)="row">
          <b-btn
            v-if="row.item.hasRelatedCourse == 'Y'"
            variant="outline primary"
            style="color: #666"
            size="sm"
            @click="row.toggleDetails"
            class="more-button"
          >
            <i class="fas fa-sm fa-caret-down"></i>
          </b-btn>
        </template>
        <template #row-details="row">
          <b-card class="px-0">
            <ul>
                <li v-if="row.item.relatedCourse">
                  <strong>Related Course:</strong> {{ row.item.relatedCourse }}
                </li>
                <li v-if="row.item.alternateCourseName">
                  <strong>Alternate Course Name:</strong> {{ row.item.alternateCourseName}}
                </li>
                <li v-if="row.item.bestSchoolPercent">
                  <strong>Best School Percent:</strong> {{ row.item.bestSchoolPercent }}
                </li>
                <li v-if="row.item.bestExamPercent">
                  <strong>Best Exam Percent:</strong> {{ row.item.bestExamPercent }}
                </li>
                <li v-if="row.item.metLitNumRequirement">
                  <strong>Assessment Equivalent:</strong> {{ row.item.metLitNumRequirement }}
                </li>
            </ul>
          </b-card>
        </template>
      </DisplayTable>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DisplayTable from "@/components/DisplayTable.vue";
export default {
  name: "StudentCourses",
  components: {
    DisplayTable: DisplayTable,
  },
  props: {},
  computed: {
    ...mapGetters({
      courses: "getStudentCourses",
      gradStatusCourses: "gradStatusCourses",
      studentGradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      hasGradStatusPendingUpdates: "getHasGradStatusPendingUpdates",
    }),
  },
  data: function () {
    return {
      fields: [
        { key: "more", label: "" },
        {
          key: "courseCode",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "courseLevel",
          label: "Lvl",
          sortable: true,
          class: "text-left",
        },
        {
          key: "sessionDate",
          label: "Session",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "interimPercent",
          label: "%",
          sortable: true,
          sortDirection: "desc",
          class: "text-md-right"
        },
        {
          key: "interimLetterGrade",
          label: "LG",
          sortable: true,
          sortDirection: "desc",
          class: "text-md-left"
        },
        { key: "completedCoursePercentage", label: "%",class: "text-md-right ",
          sortable: true,
          sortDirection: "desc", },
        { key: "completedCourseLetterGrade", label: "LG",class: "text-md-left",
          sortable: true,
          sortDirection: "desc", },
        {
          key: "equivOrChallenge",
          label: "Ch",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "credits",
          label: "Cred",
          sortable: true,
          class: "text-center",
        },
        {
          key: "fineArtsAppliedSkills",
          label: "As",
          sortable: true,
          class: "text-left",
        },
        {
          key: "courseName",
          label: "Course Name",
          sortable: true,
          class: "text-left",
        },
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
          keys: ["courseCode"],
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
    checkForPendingUpdates() {
      let i = 0;
      let j = 0;
      if (this.hasGradStatus) {
        for (i = 0; i < this.courses.length; i++) {
          this.courses[i].gradReqMet = this.getProgramCode(this.courses[i]);
        }
        //check for deleted courses
        for (i = 0; i < this.gradStatusCourses.length; i++) {
          let courseDeleted = true;
          for (j = 0; j < this.courses.length; j++) {
            if (
              this.courses[j].courseCode +
                this.courses[j].courseLevel +
                this.courses[j].sessionDate +
                this.courses[j].pen ==
              this.gradStatusCourses[i].courseCode +
                this.gradStatusCourses[i].courseLevel +
                this.gradStatusCourses[i].sessionDate +
                this.gradStatusCourses[i].pen
            ) {
              courseDeleted = false;
              break;
            }
          }
          if (courseDeleted) {
            this.gradStatusPendingUpdates.push(
              this.gradStatusCourses[i].courseName + "REMOVED"
            );
          }
        }
        if (this.gradStatusPendingUpdates.length) {
          this.$store.dispatch("setHasGradStatusPendingUpdates", true);
          //console.log(this.gradStatusPendingUpdates);
        } else {
          //console.log("NO CHANGES");
          this.$store.dispatch("setHasGradStatusPendingUpdates", false);
          //  console.log(this.gradStatusPendingUpdates);
        }
      }
    },
    compareCourses(course1, course2) {
      this.fields.forEach(function (field) {
        if (course1[field] != course2[field]) {
          return false;
        }
      });
      return true;
    },
    getProgramCode(course) {
      var result = this.gradStatusCourses.filter(function (gradStatusCourse) {
        return (
          gradStatusCourse.pen +
            gradStatusCourse.courseCode +
            gradStatusCourse.courseLevel +
            gradStatusCourse.sessionDate ==
          course.pen +
            course.courseCode +
            course.courseLevel +
            course.sessionDate
        );
      });
      if (!result.length) {
        this.gradStatusPendingUpdates.push(course.courseName + " ADDED");
        return "TBD - New Course Added";
      } else if (result[0].gradReqMet) {
        if (!this.compareCourses(result[0], course)) {
          //Course has been monified and not updated in the Grad Status Course List
          //this.gradStatusPendingUpdates.push("world");

          this.gradStatusPendingUpdates.push(course.courseName + "UPDATED");
          return "TBD - Modified";
        } else {
          return result[0].gradReqMet;
        }
      } else {
        return "---";
      }
    },
    createRef(pen, code, level, sessionDate) {
      return pen.trim() + code.trim() + level.trim() + sessionDate.trim();
    },
  },
};
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
