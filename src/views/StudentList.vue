<template>
  <div class="studentlist">
    <div class="container">     
      <div class="card" style="width: 100%;">
        <div class="card-body">
          <h2 class="card-title">Student 126214493</h2>
          <h3 class="card-subtitle mb-2 text-muted">Cotnam, Betty</h3>
          <ul>
            <li>Date of Birth: 2002-12-16</li>
            <li>School: King George Secondary</li>
            <li>Grade: 11</li>
            <li>Graduation Program: 2018</li>
          </ul>
          
          <button class="btn btn-primary active" v-on:click="storePen(126214493)">View Graduation Status</button>
          <router-link class="course-achievement-list" :to="{ name: 'course-achievement-list', params: { personalEducationNumber: '' + 126214493} }"><button class="btn btn-primary active">View Course Achievements</button></router-link>
          
        </div>
      </div>
      <div class="card" style="width: 100%;">
        <div class="card-body">
          <h2 class="card-title">Student 128201845</h2>
          <h3 class="card-subtitle mb-2 text-muted">Fuller, Emily</h3>
          <ul>
            <li>Date of Birth: 2003-05-30</li>
            <li>School: Stelly's Secondary</li>
            <li>Grade: 12</li>
            <li>Graduation Program: 2018</li>
          </ul>
          <button class="btn btn-primary active" v-on:click="storePen(128201845)">View Graduation Status</button>
          <router-link class="course-achievement-list" :to="{ name: 'course-achievement-list', params: { personalEducationNumber: '' + 128201845} }"><button class="btn btn-primary active">View Course Achivements</button></router-link>
          
        </div>
      </div>
      <div class="card" style="width: 100%;">
        <div class="card-body">
          <h2 class="card-title">Student 123456789</h2>
          <h3 class="card-subtitle mb-2 text-muted">Timothy, Matthew Robert</h3>
          <ul>
            <li>Date of Birth: 2004-09-09</li>
            <li>School: Oak Bay High School</li>
            <li>Grade: 10</li>
            <li>Graduation Program: 2018</li>
          </ul>
        <button class="btn btn-primary active" v-on:click="storePen(123456789)">View Graduation Status</button>
        <router-link class="course-achievement-list" :to="{ name: 'course-achievement-list', params: { personalEducationNumber: '' + 123456789} }"><button class="btn btn-primary active">View Course Achivements</button></router-link>
        
        </div>
        
      </div>
    </div>
    </div>
</template>
<script>
// @ is an alias to /src
import { store } from "@/store.js";
export default {
  name: "studentlist",
  components: {},
  methods: {
    storePen: function(pen){
        //store the pen and reroute to home
        store.currentPen = pen;
        this.$router.push({name: 'home'});        
        
    }
  }
};
</script>
<style scoped>
.alert,
.card,
.btn.btn-primary
{
  position: inherit;
  margin-right: 10px;
}
h6 {
  font-size: 1.5rem;
}
</style>