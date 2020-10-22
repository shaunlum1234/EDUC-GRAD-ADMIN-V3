<template>
  <div class="container">
    <h2>Edit Rule {{rule.requirementCode}}</h2>
    <form @submit="formSubmit">
      <div class="form-group">
        <label for="requirementCode">Requirement Code:</label>
        <input type="text" class="form-control" v-model="rule.requirementCode" :placeholder="rule.requirementCode" id="requirementCode">
      </div>
      <div class="form-group">
        <label for="requirementName">Requirement Name:</label>
        <input type="text" class="form-control" v-model="rule.requirementName" :placeholder="rule.requirementName" id="requirementName">
      </div>
      <div class="form-group">
        <label for="requiredCredits">Required Credits:</label>
        <input type="text" class="form-control" v-model="rule.requiredCredits"  :placeholder="rule.requiredCredits" id="requiredCredits">
      </div>
      <div class="form-group">
        <label for="notMetDescription">Not Met Description:</label>
        <input type="text" class="form-control" v-model="rule.notMetDescription"  :placeholder="rule.notMetDescription" id="notMetDescription">
      </div>
      <div class="form-group">
        <label for="programCode">Program Code:</label>
        <input type="text" class="form-control" v-model="rule.programCode"  :placeholder="rule.programCode" id="programCode">
      </div>
      <div class="form-group">
        <label for="requirementType">Requirement Type:</label>
        <input type="text" class="form-control" v-model="rule.requirementType"  :placeholder="rule.requirementType" id="requirementType">
      </div>
      <div class="form-group">
        <label for="activeFlag">Active Flag:</label>
        <input type="text" class="form-control" v-model="rule.activeFlag"  :placeholder="rule.activeFlag" id="activeFlag">
      </div>
      <div class="form-group">
        <label for="requiredLevel">Required Level:</label>
        <input type="text" class="form-control" v-model="rule.requiredLevel"  :placeholder="rule.requiredLevel" id="requiredLevel">
      </div>      
      <div class="btn-group">
        <router-link class="nav-item nav-link" to="/program-rules">Cancel</router-link>
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
    </form>  
  </div>

</template>

<script>
import ProgramRuleService from '@/services/ProgramRuleService.js';
export default {
  props: ["id"],
  data() {
    return {
      rule: {}
    }
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;
      
      ProgramRuleService.editProgramRule({
        "requirementCode": parseInt(currentObj.rule.requirementCode),
        "requirementName": currentObj.rule.requirementName,
        "requiredCredits": parseInt(currentObj.rule.requiredCredits),
        "notMetDescription": currentObj.rule.notMetDescription,
        "programCode": currentObj.rule.programCode,
        "requirementType": currentObj.rule.requirementType,
        "activeFlag": currentObj.rule.activeFlag,
        "requiredLevel": currentObj.rule.requiredLevel
      }).then(function (response) {
            if (response.status === 200 ){
              currentObj.$router.push({name: 'program-rule-list', params:{ message: 'Successfully updated Program Rule:' + currentObj.rule.requirementCode}});  
            }
      })
      .catch(function (error) {
          currentObj.output = error;
      });
    }
  },
  created() {
    
    ProgramRuleService.getProgramRule(this.id)
      .then((response) => {
        this.rule = response.data
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        //console.log('There was an error:', error.response)
      })
  }
  
};
</script>

<style scoped>
.location {
      margin-bottom: 0;
    }
    .location > .icon {
      margin-left: 10px;
    }
    .graduation-rule-header > .title {
      margin: 0;
    }
    .list-group {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .list-group > .list-item {
      padding: 1em 0;
      border-bottom: solid 1px #e5e5e5;
    }
</style>
