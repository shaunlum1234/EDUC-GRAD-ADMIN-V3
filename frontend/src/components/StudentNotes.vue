<template>
    <div>
      <div class="student-note">
      
      <!-- Add new Note form -->
        <b-card
            title=""
            tag="article"
            class="col-12 note-card"
            v-if="showForm"
        >
          <b-form @submit="onSubmit" @reset="onReset" >
            <b-form-group id="note-form" label="Add note:" label-for="comment">
              <b-form-textarea
                id="comment"
                v-model="newNote.note"
                placeholder=""
                required
              ></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary" size="sm" class="mr-1">Add</b-button>
            <b-button type="reset" variant="outline-secondary" size="sm" class="">Reset</b-button>
          </b-form>
        </b-card>
        <!-- Notes from the store pull from the database -->
        <div v-for="studentNote in notes" :key="studentNote.id">
          <b-card
            title=""
            no-body
            tag="article"
            class="col-12 mb-2"
            :header="'Created by ' + studentNote.createdBy + ' at ' + studentNote.createdTimestamp"
          >
            <b-card-text>
              <p>{{studentNote.note}}</p>
              <b-button
                v-if="showAddButton"
                variant="danger"
                size="sm"
                @click="onDelete(studentNote.id)"
                class="float-right delete-button"
                >Delete
              </b-button>
            </b-card-text>
          </b-card>
        </div>   
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GraduationCommonService from "@/services/GraduationCommonService.js";
export default {
  name: "StudentNotes",
  computed: {
    ...mapGetters({
      studentNotes: "getStudentNotes",
      token: "getToken",
      profile: "getStudentProfile",
      username: "getUsername"
    }),
  },
  created() {
    this.notes = this.studentNotes;
    this.studentProfile = this.profile
  },
  data() {
      return {
        showForm: true,
        showAddButton: true,
        notes:[],
        newNote: {
          note:'',
          studentID:'',
          pen:'',
        },
        studentProfile: {},
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
        this.showForm = true;
        var current = new Date().toISOString().slice(0, 10)
        this.newNote.studentID = this.$route.params.studentId;
        this.newNote.pen = this.$route.params.pen;
        this.newNote.createdBy = this.username;
        this.newNote.createdTimestamp = current;
        GraduationCommonService.addStudentNotes(this.newNote, this.token)
          .then((response) => {
            if(response.data && response.data.value){
              this.notes.unshift(response.data.value)
              this.newNote.note = '';
            }            
          })             
          .catch((error) => {
            if(error.response.status){
              this.$bvToast.toast("ERROR " + error.response.statusText, {
                title: "ERROR" + error.response.status,
                variant: 'danger',
                noAutoHide: true,
              });
            }
          }); 
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.newNote.note = '';
        // this.$nextTick(() => {
        //   this.showForm = true;
        // })
      },
      onDelete(noteID) {
        GraduationCommonService.deleteStudentNotes(noteID, this.token)  
          var removeIndex = this.notes.map(function(item) { return item.id; }).indexOf(noteID); 
          this.notes.splice(removeIndex, 1);

      },
      getNotes(){
        GraduationCommonService.getStudentNotes(this.$route.params.pen, this.token).then(
          (response) => {           
            this.notes = response.data
          }
        ).catch((error) => {
          if(error.response.status){
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          }
        });
      }
    }
}

</script>

<style scoped>
.card{
  padding: 0px;
}
.card-text{
  padding: 19px;
}
.delete-button{
      position: absolute;
    right: 10px;
    top: 10px
}
</style>