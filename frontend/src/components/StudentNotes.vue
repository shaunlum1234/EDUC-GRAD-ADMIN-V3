<template>
    <div>
      <div class="student-note">
      <!-- Add new Note form -->
        <b-card
            title=""
            tag="article"
            class="col-12 note-card mb-3"
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
        <div v-for="(studentNote, studentNoteIndex)  in studentNotes" :key="studentNote.id">
          <b-card
            title=""
            no-body
            tag="article"
            class="col-12 mb-2"
            :header="'Created by ' + studentNote.createdBy + ' on ' + studentNote.createdTimestamp"
          >
            <b-card-text>
              <p v-if="showEditForm != studentNote.id">{{studentNote.note}}</p>
               <b-form-textarea
                  id="textarea"
                  v-if="showEditForm == studentNote.id"
                  v-model="editedNote.note"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
                 <b-button
                variant="primary"
                size="sm"
                v-if="showSave && showEditForm == studentNote.id"
                @click="onSaveEditedNote(studentNoteIndex, editedNote)"
                class=""
                >Save
              </b-button>
               <b-button
                variant="link"
                v-if="showEditForm == studentNote.id"
                size="sm"
                @click="cancelEdit()"
                class=""
                >Cancel
              </b-button>  
             
              <b-button
                variant="link"
                size="sm"
                @click="onEditNote(studentNote)"
                class="float-right edit-button"
                >Edit
              </b-button>
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
    this.studentProfile = this.profile
  },
  data() {
      return {
        showForm: true,
        showAddButton: true,
        showSave: false,
        showEditForm: '',
        newNote: {
          note:'',
          studentID:'',
          pen:'',
        },
        editedNote:{
          id:'',
          note:'',
          studentID:'',
          pen:'',
        },
        studentProfile: {},
      };
  },
  methods: {
    showNotification(variant = null, bodyContent) {
      let title = variant;
      let delay = 30000;
      if(title == "success"){
        title ="success";
        delay = 5000;
      }else if(title == "danger"){
        title ="Error";
      }else if(title == "warning"){
        title ="Warning";
      }
      this.$bvToast.toast(bodyContent, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: delay,
      });
    },
    onSaveEditedNote(studentNoteIndex, editedNote){
      GraduationCommonService.addStudentNotes(editedNote, this.token)
        .then((response) => {
          this.showNotification('success','Student note saved')
          if(response.data && response.data.value){
            this.studentNotes.splice(studentNoteIndex, 1, response.data.value)
          }    
          this.showEditForm = false;        
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
      onEditNote(note){
        this.showSave = true;
        this.showEditForm = note.id;
        this.editedNote.note = note.note;
        this.editedNote.id = note.id;
        this.editedNote.studentID = note.studentID;
        this.editedNote.pen = note.pen;
      },
      cancelEdit(){
        this.showSave = false;
        this.showEditForm = "";
        this.editedNote = {};
      },
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
              this.studentNotes.unshift(response.data.value)
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
          var removeIndex = this.studentNotes.map(function(item) { return item.id; }).indexOf(noteID); 
          this.studentNotes.splice(removeIndex, 1);
      },
      getNotes(){
        GraduationCommonService.getStudentNotes(this.$route.params.pen, this.token).then(
          (response) => {           
            this.studentNotes = response.data
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
.edit-button{
    position: absolute;
    right: 80px;
    top: 10px
}
</style>