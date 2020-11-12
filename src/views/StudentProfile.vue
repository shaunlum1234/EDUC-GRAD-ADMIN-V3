<template>
  <div>
    <SiteMessage
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>
    <!-- Button trigger modal -->

    <div class="container">
      <h1>
        {{ studentFullName }}
        <button v-on:click="closeRecord" class="btn btn-primary close-record">
          Close Student Record
        </button>
      </h1>

      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Student Profile" class="py-3 px-0 m-1">
              <b-card-text><StudentInfo /></b-card-text>
            </b-tab>
            <b-tab title="Student Courses" class="py-3 px-0 m-1">
              <b-card-text><StudentCourses /></b-card-text>
            </b-tab>
            <b-tab title="Student Exams">
              <b-card-text><StudentExams /></b-card-text>
              {{ exams }}
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// import CourseService from "@/services/CourseService.js";
import SiteMessage from "@/components/SiteMessage";
import StudentCourses from "@/components/StudentCourses";
import StudentInfo from "@/components/StudentInfo";
import { mapGetters } from "vuex";
//import { store } from "@/store.js";
export default {
  name: "studentProfile",
  components: {
    SiteMessage: SiteMessage,
    StudentCourses: StudentCourses,
    StudentInfo: StudentInfo,
  },
  data() {
    return {
      show: false,
      opened: [],
      studentCourses: [],
      studentAssessments: [],
      studentExams: [],
      studentInfo: [],
      displayMessage: null,
    };
  },
  computed: {
    ...mapGetters({
      profile: "getStudentProfile",
      courses: "getStudentCourses",
      studentFullName: "getStudentFullName",
      exams: "getStudentExams",
    }),
  },
  created() {
    //Load student Data into studentInfo:
  },
  methods: {
    closeRecord: function() {
      this.$store.commit("unsetStudent");
      this.$router.push({ name: "student-search" });
    },
  },
};
</script>

<style scoped>
.close-record {
  float: right;
}
</style>
