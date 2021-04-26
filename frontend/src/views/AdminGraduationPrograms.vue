<template>
  <div>
  <h1>Program management</h1>
  <p> Manage graduation settings (Admin Access Required)</p>


<div>
<b-card title="Program Management" no-body>
    <b-card-header header-tag="nav" class="p-3">
      <b-nav card-header tabs >
        <b-nav-item to="/admin-graduation-programs/programs" :active="tab === 1" @click="tab = 1"> Programs</b-nav-item>
        <b-nav-item to="/admin-graduation-programs/special-programs" :active="tab === 3" @click="tab = 3"> Special program</b-nav-item>
        <b-nav-item to="/admin-graduation-programs/special-programs-rule" :active="tab === 2" @click="tab = 2"> Special program rules</b-nav-item>
        <b-nav-item to="/admin-graduation-programs/letter-grades" :active="tab === 4" @click="tab = 4">Letter grades</b-nav-item>
        <b-nav-item to="/admin-graduation-programs/special-cases" :active="tab === 5" @click="tab = 5">Special cases</b-nav-item>
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


export default {
  name: "graduationPrograms",
  components: {

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
