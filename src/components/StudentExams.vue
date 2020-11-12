<template>
<div class="container">
    <h1>Student Courses</h1>
    <v-table
      :data="courses"
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
        <v-th sortKey="completedCourseLetterGrade">Final %</v-th>
        <v-th sortKey="completedCoursePercentage">Final LG</v-th>
      </thead>
    </v-table>
</div>      
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StudentExams",
  props: {},
  computed: {
    ...mapGetters({
      exams: "getStudentExams",
    }),
  },
  data: function () {
    return {
      show: false,
      opened: [],
      student: [],
      examsList:[],
      filters: {
        name: { value: "", keys: ["courseCode"] },
      },
      pen: "",
      courseCode: "",
      courseName: "",
      courseLevel:"",
      sessionDate:"",
      gradReqMet: "",
      courseType: "",
      completedCourseSchoolPercentage: null,
      completedCourseExamPercentage: null,
      completedCourseFinalPercentage: null,
      completedCourseLetterGrade: "",
      interimPercent: null,
      interimLetterGrade: "",
      credits: null,
      creditsUsedForGrad: null,
      reqMetLiteracyNumeracy: "",
      wroteFlag: "",
      specialCase: " ",
      currentPage: 1,
      totalPages: 0,
      displayMessage: null,
      modalVisible: null,
      inputPenMissing: false,
    };
  },
  created() {
    //Check for any messages from routes
    if (this.exams) {
      this.examsList.push(this.exams);
      console.log("this.examsList");
      console.log(this.examsList);
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
    showMsgBoxOne(message) {
      this.$bvModal.msgBoxOk(message);
    },
    getCourseName: function (cid) {
      let result = "";
      this.courses.filter(function (n) {
        if (n.id === cid) {
          result = n.name;
          return result;
        }
      });
      return result;
    },
  },
};
</script>

<style></style>
