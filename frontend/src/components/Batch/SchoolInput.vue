<template>
  <div>
      <!-- <b-card class="mt-3 px-0" :header="'Include ' + label "> -->
        <!-- <b-alert dismissible v-if="validationMessage" :show="validationMessage" variant="danger">{{validationMessage}}</b-alert>
        <div class="row col-12 border-bottom mb-3">
          <div v-for="(field) in fields" :key="field.key" class="col-2">
              <strong> {{field.label}}</strong>
          </div>
        </div>
        
        <div v-for="(school, index) in batch[group]" :key="index" class="">
          <div v-if="!school[fields[1].key]" class="mb-3">


            <ValidationObserver v-slot="{passes, invalid}">
            <form @submit.prevent="passes(addValueToTypeInBatchId(jobId,group,school.value,index))" class="row col-12">
              <div v-for="(field) in fields" :key="field + index">
                <ValidationProvider :name="label" :rules="'mincodelength|validateschool:' + jobId + ',' + index + ',' + batch.details['credential']" v-slot="{ errors }">                
                    <span class="position-absolute w-100 form-validation-message text-danger">{{ errors[0] }}</span>
                    <b-form-input v-if="field.isInput" type="number" v-model="school.value"/>    
                    <b-form-input v-else show="false" :disabled=true v-model="school[field.key]" :ref="field.key + jobId + index" class="col-12"/>
                </ValidationProvider>
                
                            
                
              </div>
                <div v-if="index == batch[group].length-1" class="col-2">
                  <button :disabled="invalid" class="btn btn-primary w-100">
                  
                  <b-spinner small v-if="validating"></b-spinner> Add
                  </button>   
                </div>
              </form>
            </ValidationObserver>
          </div>
          <div class="row col-12 mb-2" >

              <div v-for="(field) in fields" :key="field" class="col-2">
                <span v-if="field.isInput">{{batch[group][index]['value']}}</span>
                <span v-else>{{batch[group][index][field.key]}}</span>
              </div>

              <div v-if="index != batch.schools.length-1" class="col-2" >
                <b-button  class="btn btn-primary w-100" @click="deleteValueFromTypeInBatchId(jobId, 'schools',school.value)">
                  Remove
                </b-button>
              </div>
          </div>
        </div> -->
        
      <b-input type="number" v-model="mincode"/><b-button @click="addSchool()">Add</b-button>
      <b-table :items="schools"></b-table>
      {{mincode}}

      <pre class="mt-5">TEST Schools: 04343000 04399143 02222022 06161064 06161049 03596573</pre>

      <!-- </b-card>             -->
      
  </div>
</template>
<script>
import TRAXService from "@/services/TRAXService.js";
import SchoolService from "@/services/SchoolService.js";
import StudentService from "@/services/StudentService.js";
import GraduationReportService from "@/services/GraduationReportService.js";

export default {
  components: {
  },  
  data() {
    return {
      mincode: "",
      schools:[
        {'mincode': '04343000'},
        {'mincode': '04399143'}]
    }
  },
  mounted(){

  },
  created() {

  },
  methods: {
    addSchool(){
      console.log("adding " + this.mincode) 
      this.schools.splice(0, 0,  {"mincode": this.mincode})
      console.log(this.schools)
    }
  },
  props: {

  },  
  computed: {
    isEmpty(){
      return this.schools.length > 0;
    }
  }
};
</script>
<style scoped>
  input{
    border-radius: 0px;
  }
</style>
