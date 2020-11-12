<template>
  <div>
    <SiteMessage
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>
    <!-- Button trigger modal -->

    

    <div class="container">
      <!--h1>{{studentFullName}}</h1-->
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Student Profile">
              <b-card-text><StudentInfo /></b-card-text>
            </b-tab>
            <b-tab title="Student Courses">
              <b-card-text><StudentCourses v-if="courses.length"/></b-card-text>
            </b-tab>
            <b-tab title="Student Assessments">
              <!-- <b-card-text><StudentExams v-if="exams"/></b-card-text> -->
              {{assessments}}
            </b-tab>    
            <b-tab title="Student Exams">
              <b-card-text><StudentExams v-if="exams"/></b-card-text>
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
import StudentExams from "@/components/StudentExams";
import { mapGetters } from "vuex";
//import { store } from "@/store.js";
export default {
  name: "studentProfile",
  components: {
    SiteMessage: SiteMessage,
    StudentCourses: StudentCourses,
    StudentInfo: StudentInfo,
    StudentExams: StudentExams,
  },
  data() {
    return {
      show: false,
      opened: [],
      studentCourses: [],
      studentAssessments: [],
      studentExams:[],
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
      assessments: "getStudentAssessments"
    }),
  },
  created() {
    //Load student Data into studentInfo:
  
  },
  methods: {},
};
</script>

<style scoped></style>
