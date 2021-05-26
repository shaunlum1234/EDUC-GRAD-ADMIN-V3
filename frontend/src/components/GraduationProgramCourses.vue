<template>
  <div>
    <h3>Rule {{ selectedRule }} ({{ ruleName }})</h3>

    <div v-if="graduationProgramRuleCourses == 'not applicable'">
      Not applicable
    </div>
    
    <div v-else>
      <DisplayTable
        v-bind:items="graduationProgramRuleCourses"
        title="Program"
        v-bind:fields="fields"
        id="courseName"
        showFilter="true"
      >
      </DisplayTable>
    </div>
  </div>
</template>

<script>
//import GradeService from "@/services/GradeService.js";
import AssessmentService from "@/services/AssessmentService.js";
import CourseService from "@/services/CourseService.js";
import DisplayTable from "@/components/DisplayTable";
import { mapGetters } from "vuex";
export default {
  name: "GraduationProgramCourses",
  props: {},
  components: {
    DisplayTable: DisplayTable,
  },
  computed: {
    ...mapGetters({
      token: "getToken",
    }),
  },
  data: function () {
    return {
      opened: [],
      selectedRule: "",
      category: "",
      ruleName: "",
      isSpecialProgram: "",
      graduationProgramRuleCourses: [],
      fields: [],
      courseFields: [
        {
          key: "courseCode",
          label: "Course",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "courseLevel",
          label: "Course level",
          sortable: true,
          editable: true,
        },
        {
          key: "courseName",
          label: "Course name",
          sortable: true,
          editable: true,
        },
      ],
      assessmentFields: [
        {
          key: "assessmentCode",
          label: "Assessment code",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "assessmentName",
          label: "Assessment name",
          sortable: true,
          editable: true,
        },
      ],
    };
  },
  created() {
    //console.log("RULE" + this.$route.params.rule)
    this.selectedRule = this.$route.params.rule;
    this.category = this.$route.params.category;
    this.ruleName = this.$route.params.ruleName;
    this.isSpecialProgram = this.$route.params.isSpecialProgram;
    if (this.$route.params.category == "A") {
      AssessmentService.getRuleCourseRequirements(
        this.$route.params.rule,
        this.token
      ).then((response) => {
        this.fields = this.assessmentFields;
        this.graduationProgramRuleCourses = response.data;

        if (!this.graduationProgramRuleCourses.length) {
          this.graduationProgramRuleCourses = "not applicable";
        }
      });
    }
    if (this.$route.params.category == "C") {
      CourseService.getRuleCourseRequirements(
        this.$route.params.rule,
        this.token
      ).then((response) => {
        this.fields = this.courseFields;
        this.graduationProgramRuleCourses = response.data;
  
        if (!this.graduationProgramRuleCourses.length) {
          this.graduationProgramRuleCourses = "not applicable";
        }
      });
    }
  },
  methods: {},
};
</script>

<style>
.table th {
  border-bottom: 2px solid #38598a !important;
}
</style>
