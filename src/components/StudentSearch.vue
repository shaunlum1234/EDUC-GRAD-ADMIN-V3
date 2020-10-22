<template>
    <div class="container col-12">
      <div v-if="showSearch" class="searchPenForm">
        <div class="alert alert-danger" role="alert" v-if="noPen">
          Please enter a valid Student’s Personal Educations Number (PEN)!
        </div>
        <p>Enter a Student’s Personal Educations Number (PEN).</p>
        <div class="form-group">
          <strong
            ><label for="StudentPen">Personal Education Number:</label></strong
          >
          <input v-model="inputPen" class="form-control" id="StudentPen" />
        </div>
        <div class="btn-group">
          <button v-on:click="search" class="btn btn-primary" id="find">
            Find Student
          </button>
        </div>
      </div>
      <div v-if="student" class="card">
        <div class="card-body">
          <h2 class="card-title">Student: {{ selectedPen }}  <button v-on:click="resetSearch" class="btn btn-primary" id="resetSearchform">
            Change Student</button></h2>
        </div>
       

      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { store } from "@/store.js";
export default {
  data() {
    return {
      student: false,
      noPen: false,
      inputPen: "",
      selectedPen: "",
      showSearch: true,
    };
  },
  created() {
    if(store.currentPen){
      this.student = true;
      this.showSearch = false;
      this.inputPen = store.currentPen;
      this.selectedPen = store.currentPen;
    }

  },
  methods: {
    search: function() {
      store.currentPen = this.inputPen;
      this.selectedPen = this.inputPen;
      //notify parent
      this.$emit("penSearch", this.inputPen);
      this.student = true;
      this.showSearch = false;
    },
    resetSearch: function() {
      store.currentPen = "";
      this.student = false;
      this.showSearch = true;
      this.inputPen = '';
      this.$emit("penSearch", "");
    }
  },
  components: {}
};
</script>
<style scoped>
.alert,
.card,
.btn.btn-primary {
  position: inherit;
}
h6 {
  font-size: 1.5rem;
}
.card-title button{
    float:right;
}
</style>

