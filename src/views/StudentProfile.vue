<template>
  <div>
    <SiteMessage
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>
    <!-- Button trigger modal -->

    <div class="container">

      <div>
        <b-card no-body>
          <b-tabs card>
            <!-- <b-tab title="Profile" active>
              <b-card-text><StudentInfo/></b-card-text>
            </b-tab> -->
            <b-tab title="Courses">
              <b-card-text><StudentCourses/></b-card-text>
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
//import StudentInfo from "@/components/StudentInfo";
import { mapGetters } from "vuex";
//import StudentInfo from "@/components/StudentInfo.js";
//import { store } from "@/store.js";
export default {
  components: {
    SiteMessage: SiteMessage,
    StudentCourses: StudentCourses,
    // StudentInfo: StudentInfo,
    
  },
  data() {
    return {
      show: false,
      opened: [],
      studentCourses: [],
      studentAssessments: [],
      studentInfo: [],
      displayMessage: null,
    };
  },
  computed: {
    ...mapGetters({
      profile: "getStudentProfile",
      courses: "getStudentCourses"
    }),
  },
  created() {
    //Load student Data into studentInfo:
  
  },
  methods: {
  }
};
</script>

<style scoped></style>
