<template>
  <div>
    <h1>Assessments</h1>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Assessment search" active>
            <b-card-text>
              <div class="row col-12">
                <label class="float-left w-100">Search by assessments code:</label>
                <b-input class="col-10 my-2" v-model="assmtCode" placeholder="" />
                <b-button variant="primary" class="m-2" @click="getAllAssessment">Search</b-button>
              </div>
              <DisplayTable title="Courses" v-bind:items="courses" v-bind:fields="courseFields" id="courseCode"
                v-bind:role="role"></DisplayTable>
            </b-card-text>
          </b-tab>
          <b-tab title="Course restrictons">
            <b-card-text>
              <DisplayTable title="Course restriction" v-bind:items="courseRestrictions"
                v-bind:fields="courseRestrictionFields" id="courseRestrictionId"
                create="createCourseRestriction" delete="deleteCourseRestriction" update="updateCourseRestriction">
              </DisplayTable>

            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>

import {
    mapGetters
} from "vuex";

import AssessmentService from '@/services/AssessmentService.js';

  export default {
    name: "assessments",
    components: {
      
    },
    data() {
      return {
          assessments:{},
          assmtCode:"",
      }
    },
    computed: {
        ...mapGetters({
            token: "getToken"
        }),
    },
    created() {
      this.getAllAssessment();
    },
    methods: {
        getAllAssessment(){
            AssessmentService.getAllAssesments(this.token)
            .then((response) => {
                this.assessments = response.data;
            })
            // eslint-disable-next-line
            .catch((error) => {
                this.$bvToast.toast("ERROR " + error.response.statusText, {
                title: "ERROR" + error.response.status,
                variant: 'danger',
                noAutoHide: true,
                });
            });
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

  .profile-name {
    padding-bottom: 10px;
  }
</style>
