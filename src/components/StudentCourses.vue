<template>
  <div class="table-responsive">

    <b-spinner v-if="!courses.length" label="Loading">Loading</b-spinner>
    <v-table
      :data="courses"
      :filters="filters"
      class="table table-sm table-hover table-striped align-middle"
    >
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
        <v-th sortKey="interimLetterGrade">Interim LG</v-th>
        <v-th sortKey="completedCourseLetterGrade">Final %</v-th>
        <v-th sortKey="completedCoursePercentage">Final LG</v-th>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <template v-for="row in displayData">
          <tr
            :key="row.courseAchievementId"
            @click="toggle(row.courseCode + row.courseLevel)"
            :class="{ opened: opened.includes(row.courseCode) }"
            :ref="createRef(row.pen,row.courseCode,row.courseLevel,row.sessionDate)"
          >
            <!--td><td><a href="#" v-b-tooltip.hover v-bind:title="row.courseName">{{ row.courseCode }}</a></td-->
            <td>{{ row.courseCode }}</td>
            <td>{{ row.courseLevel }}</td>
            <td>{{ row.sessionDate }}</td>
            <td>{{ row.courseName }}</td>
            <td>{{ row.courseEquivChal }}</td>
            <td>{{ row.credits }}</td>
            <td>{{ row.interimPercent }} %</td>
            <td>{{ row.interimLetterGrade }}</td>
            <td>{{ row.completedCoursePercentage }}%</td>
            <td>{{ row.completedCourseLetterGrade }}</td>
          </tr>
        </template>
      </tbody>
    </v-table>



           <button @click="displayRef('140341157BI11')">
                 Click to see the input ref
            </button>
            <button @click="displayAllRefs()">
                 Click to see the input ref
            </button>
  </div>
</template>
     
<script>
import { mapGetters } from "vuex";
export default {
  name: "StudentCourses",
  props: {},
  computed: {
    ...mapGetters({
      courses: "getStudentCourses",
    }),
  },
  data: function() {
    return {
      show: false,
      opened: [],
      message: "",
      achievements: [],
      InputCourse: "",
      student: [],
      InputPen: "",
      filters: {
        name: { value: "", keys: ["courseCode"] },
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
    };
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
    createRef(pen, code, level,sessionDate){
      return pen.trim() + code.trim() + level.trim()+sessionDate.trim();

    },
    displayRef(ref) {
          this.$refs[ref][0].classList.add('highlight'); // <= accessing the dynamic ref
    },
    displayAllRefs() {
            console.log(this.$refs)
        }
    }

};
</script>

<style>
.table th, .table td{
  border-top: none !important;
}
.table th svg{
  display:none !important;
}
.highlight{
  background:aliceblue !important;
}
</style>
