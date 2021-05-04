<template>
    <div>
      <div class="student-note">
          <!-- <div v-for="studentNote in studentNotes" :key="studentNote.id">
            <b-card
              title="Notes"
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                <p>{{studentNote.note}}</p>
                <ul>
                  <li>{{studentNote.createdBy}}</li>
                  <li>{{studentNote.createdTimestamp}}</li>
                </ul>
              </b-card-text>
            </b-card>
          </div> -->
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GraduationCommonService from "@/components/GraduationCommonService.js";
export default {
  name: "Notes",
  computed: {
    ...mapGetters({
      studentInfo: "getStudentProfile",
      token: "getToken",
    }),
  },
  props: {
    pen: String
  },
  data() {
      return {
        studentNotes: [],
        studentNotesError: []
      };
  },
  created() {

  },
  methods: {
    getAllNotes: function () {
      GraduationCommonService.getStudentNotes(this.pen, this.token).then((response) => {
        this.studentNotes =  response.data;
      }).catch((error) => {
        this.studentNotesError = error;
      });
    }
  }
};
</script>

<style scoped>

</style>
