<template>
    <div>
      <div class="student-note">
<!-- Button which shows the add new Note form -->
        <b-button
          v-if="showAddButton"
          variant="primary"
          size="sm"
          @click="showSubmitForm"
          class="float-left add-button"
          >Add
        </b-button>
<!-- Add new Note form -->
        <b-card
            title=""
            tag="article"
            class="col-12"
            v-if="showForm"
        >
          <b-form @submit="onSubmit" @reset="onReset" >
            <b-form-group id="input-group-1" label="Note:" label-for="comment">
              <b-form-textarea
                id="comment"
                v-model="newNote.note"
                placeholder=""
                required
              ></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="secondary">Cancel</b-button>
          </b-form>
        </b-card>
<!-- Notes from the store pull from the database -->
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
//import GraduationCommonService from "@/services/GraduationCommonService.js";
export default {
  name: "StudentNotes",
  computed: {
    ...mapGetters({
      studentNotes: "getStudentNotes",
    }),
  },
   created() {

    },
  data() {
      return {
        showForm: false,
        showAddButton: true,
        newNote: {
          note:'',
          studentID:'',
          pen:'',
        }
      };
  },
  methods: {
      showSubmitForm() {
        this.showForm = !this.showForm; 
        this.showAddButton = !this.showAddButton;
      },
      onSubmit(event) {
        event.preventDefault()
        this.showAddButton = true;
        this.newNote.studentID = this.$route.params.studentId;
        this.newNote.pen = this.$route.params.pen;
        alert(JSON.stringify(this.newNote))
        //GraduationCommonService.addStudentNotes()
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.showAddButton = true;
        this.newNote.note = '';
        this.showForm = false;
        // this.$nextTick(() => {
        //   this.showForm = true;
        // })
      }
    }
}

</script>

<style scoped>

</style>