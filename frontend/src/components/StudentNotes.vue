<template>
    <div>
      <div class="student-note">
          <div v-for="studentNote in studentNotes" :key="studentNote.id">
            <b-card
              title=""
              tag="article"
              class="col-12"
            >
              <b-card-text>
                <p><strong>{{studentNote.createdBy}}</strong> added a note - {{studentNote.createdTimestamp}}</p>
                <p>{{studentNote.note}}</p>
              </b-card-text>
            </b-card>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StudentNotes",
  computed: {
    ...mapGetters({
      studentNotes: "getStudentNotes",
    }),
  },
  data() {
      return {
        
      };
  },
}

</script>

<style scoped>

</style>