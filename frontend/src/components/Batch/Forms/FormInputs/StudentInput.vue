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
    <b-card title="Include Student(s)">
      <b-card-text>
        <label>Mincode</label>
        <b-input
          type="number"
          v-model="mincode"
          @change="validateSchool"
          class="w-25"
        />
        <div
          class="input-errors"
          v-for="error of v$.mincode.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <div v-if="mincodeStudentInfo">
          <b-card>
            <b-card-text>
              {{ mincodeValidating }}
              <b-overlay :show="mincodeValidating">
                <div v-if="!mincodeStudentInfo">NOT VALID</div>
                <div v-else>
                  <strong>First Name:</strong> {{ mincodeStudentInfo.firstName
                  }}<br />
                  <strong>Last Name:</strong> {{ mincodeStudentInfo.lastName
                  }}<br />
                  <strong>Status:</strong> {{ mincodeStudentInfo.status }}<br />
                  <strong>DOB:</strong> {{ mincodeStudentInfo.dob }}<br />
                  <strong>School of Record</strong>
                  {{ mincodeStudentInfo.schoolOfRecord }}
                </div>
              </b-overlay>
            </b-card-text>
            <b-button
              :disabled="!this.mincodeStudentInfo"
              @click="addSchool()"
              class="float-right"
              >Add</b-button
            >
          </b-card>
        </div>

        <b-table :items="schools" :fields="schoolInputFields">
          <template #cell(remove)="row">
            <b-button
              class="btn btn-primary w-100"
              @click="removeSchool(row.item.mincode)"
            >
              Remove
            </b-button>
          </template>
          <template #cell(info)="row">
            <div>
              <strong>Name:</strong> {{ row.item.info.firstName }}
              {{ row.item.info.lastName }}
            </div>
            <div><strong>DOB:</strong> {{ row.item.info.dob }}</div>
            <div><strong>Status:</strong> {{ row.item.info.status }}</div>
          </template>
        </b-table>

        <pre class="mt-5">
      TEST Schools: 04343000 04399143 02222022 06161064 06161049 03596573</pre
        >
      </b-card-text>
    </b-card>

    <!-- </b-card>             -->
  </div>
</template>
<script>
import TRAXService from "@/services/TRAXService.js";
import SchoolService from "@/services/SchoolService.js";
import StudentService from "@/services/StudentService.js";
import GraduationReportService from "@/services/GraduationReportService.js";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";

export default {
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      mincode: {
        minLength: minLength(9),
        async isValid(value) {
          if (value === "") return true;
          if (value.length == 9) {
            StudentService.getStudentByPen(value).then((response) => {
              StudentService.getGraduationStatus(
                response.data[0].studentID
              ).then((res) => {
                console.log(res);
                this.mincodeStudentInfo = {
                  firstName: response.data[0].legalFirstName,
                  lastName: response.data[0].legalLastName,
                  dob: response.data[0].dob,
                  status: res.data.studentStatusName,
                  schoolOfRecord: response.data[0].schoolOfRecordName,
                };
                return;
              });
            });
          }
        },
      }, // Matches this.firstName
    };
  },
  data() {
    return {
      mincode: "",
      mincodeStudentInfo: "",
      mincodeValidating: false,
      schools: [],
      schoolInputFields: [
        {
          key: "mincode",
          label: "mincode",
          sortable: true,
          class: "text-left",
        },
        {
          key: "info",
          label: "info",
          sortable: true,
          class: "text-left",
        },
        {
          key: "remove",
          label: "remove",
          sortable: true,
          class: "text-left",
        },
      ],
    };
  },
  mounted() {
    this.$emit("update:schools", this.schools);
  },
  created() {},
  methods: {
    async validateSchool() {
      this.mincodeValidating = true;
      this.clearMincodeStudentInfo();
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      this.mincodeValidating = false;
    },
    clearMincodeStudentInfo() {
      this.mincodeStudentInfo = "";
    },
    clearMincode() {
      this.mincode = "";
      this.clearMincodeStudentInfo();
    },
    addSchool() {
      this.schools.splice(0, 0, {
        mincode: this.mincode,
        info: this.mincodeStudentInfo,
      });
      console.log(this.schools);
      this.clearMincode();
      this.$emit("update:schools", this.schools);
    },
    removeSchool(mincode) {
      for (const school of this.schools) {
        console.log(mincode + "-" + school.mincode);
        if (school.mincode == mincode) {
          console.log("delete " + mincode + " - " + index);

          //   console.log(this.schools);
          //   this.schools.splice(index, 1);
          //   console.log(this.schools);
        }
      }
    },
  },
  props: {},

  computed: {
    isEmpty() {
      return this.schools.length > 0;
    },
  },
};
</script>
<style scoped>
input {
  border-radius: 0px;
}
</style>
