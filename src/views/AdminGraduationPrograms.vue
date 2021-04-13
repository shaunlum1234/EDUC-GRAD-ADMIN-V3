<template>
  <div>
  <h1>Program management</h1>
  <p> Manage graduation settings (Admin Access Required)</p>


<div>
<b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item to="/admin-graduation-programs/programs" :active="tab === 1" @click="tab = 1"> Programs</b-nav-item>
        <b-nav-item to="/admin-graduation-programs/special-programs" :active="tab === 2" @click="tab = 2"> Special programs</b-nav-item>
        <b-nav-item :active="tab === 3" @click="tab = 3">Letter grades</b-nav-item>
        <b-nav-item :active="tab === 4" @click="tab = 4">Special cases</b-nav-item>
      </b-nav>
    </b-card-header>
     <b-card-body >
      <b-card-text>
        <router-view v-bind:key="$route.fullPath"></router-view>
      </b-card-text>
    </b-card-body>
    </b-card>
</div>
<!-- <router-view v-bind:key="$route.fullPath" name="specialProgram"></router-view> -->

    <!-- <b-card no-body>
      <b-tabs card>
        <b-tab title="Programs" active>
          <b-card-text>
             <router-view v-bind:key="$route.fullPath" name="program"></router-view>
          </b-card-text>
        </b-tab>
        <b-tab title="Special Programs">
          <b-card-text>
            <router-view v-bind:key="$route.fullPath" name="specialProgram"></router-view>
          </b-card-text>
        </b-tab>
        <b-tab title="Letter Grades"><b-card-text>
          <LetterGrades></LetterGrades>
        </b-card-text></b-tab>
        <b-tab title="Special Cases"><b-card-text><SpecialCases></SpecialCases></b-card-text></b-tab>
      </b-tabs>
    </b-card> -->
  </div>

</template>

<script>
//import GraduationSpecialProgram from '@/components/GraduationSpecialProgram';
//import LetterGrades from '@/components/Admin/LetterGrades';
//import SpecialCases from '@/components/Admin/SpecialCases';
export default {
  name: "graduationPrograms",
  components: {
  // 'GraduationSpecialProgram':GraduationSpecialProgram,
   //'LetterGrades': LetterGrades,
   //'SpecialCases': SpecialCases

  },
  data() {
    return {
      tab: 1,
      show: false,
      opened: [],
      displayMessage: null,
    };
  },
  computed: {

  },
  created() {
    //Load student Data into studentInfo:
  },
  methods: {
  
  },
};
</script>

<style scoped>
.close-record {
  float: right;
}
.tab-loading {
  color: green !important;
}
.profile-name{
  padding-bottom: 10px;
}
</style>
