<template>
  <div class="container">
   <p>World</p>
  </div>
</template>

<script>
import GraduationProgramsService from '@/services/GraduationProgramsService.js';
export default {
  name: "GraduationPrograms",
  props: {},
  computed: {
    
  },
  data: function() {
    return {
      show: false,
      opened: [],
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
  created() {
    GraduationProgramsService.getGraduationPrograms()
      .then((response) => {
        this.courses = response.data;
        console.log(this.courses);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
         //console.log('There was an error:' + error.response);
    }); 
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
    getCourseName: function(cid) {
      let result = "";
      this.courses.filter(function(n) {
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

<style>
.table th {
  border-bottom: 2px solid #38598a !important;
}
</style>
