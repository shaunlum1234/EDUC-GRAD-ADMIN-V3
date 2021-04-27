<template>
  <div>
  <h1>Program management</h1>
  <p> Manage graduation settings (Admin Access Required)</p>


<div>
<b-card title="Program Management" no-body>
    <b-card-header header-tag="nav" class="p-3">

      
      <b-nav card-header tabs >
        
         <b-nav-item-dropdown
            id="programs-dropdown"
            text="Programs"
            toggle-class="nav-link-programs"
            left
            ref="programs-dropdown"
          >
            <b-nav-item to="/admin-graduation-programs/programs" :active="tab === 1" @click="tab = 1; closeDropdown('programs-dropdown')">All Programs</b-nav-item>
            <b-nav-item to="/admin-graduation-programs/program-rules" :active="tab === 1" @click="tab = 1; closeDropdown('programs-dropdown')">Program rules</b-nav-item>
          </b-nav-item-dropdown>

            <b-nav-item-dropdown
              id="special-programs-dropdown"
              text="Special programs"
              toggle-class="nav-link-special-programs"
              left
              ref="special-programs-dropdown"
              active
            >
            <b-nav-item to="/admin-graduation-programs/special-programs" :active="tab === 2" @click="tab = 2; closeDropdown('special-programs-dropdown')">All special programs</b-nav-item>
            <b-nav-item to="/admin-graduation-programs/special-program-rules" :active="tab === 2" @click="tab = 2; closeDropdown('special-programs-dropdown')">Special program rules</b-nav-item>
          </b-nav-item-dropdown>
        
        <b-nav-item to="/admin-graduation-programs/letter-grades" :active="tab === 5" @click="tab = 5">Letter grades</b-nav-item>
        <b-nav-item to="/admin-graduation-programs/special-cases" :active="tab === 6" @click="tab = 6">Special cases</b-nav-item>
        <b-nav-item to="/admin-graduation-programs/algorithm-rules" :active="tab === 7" @click="tab = 7">Algorithm rules</b-nav-item>
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
    closeDropdown(dropdown){
      this.$refs[dropdown].visible=false
    }
  
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
