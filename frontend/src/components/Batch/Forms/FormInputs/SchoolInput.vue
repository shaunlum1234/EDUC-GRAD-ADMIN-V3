<template>
  <div>
    <label class="font-weight-bold p-0 m-0 row">Select Schools</label>

    <b-form-select
      id="inline-form-select-audience"
      class="mb-2 mr-sm-2 mb-sm-0 col-3"
      :options="[
        { text: 'Current Students', value: 'Current Students' },
        { text: 'Date Range', value: 'Date Range' },
      ]"
      value="Current Students"
      v-model="includeStudents"
    ></b-form-select>

    <div class="date-ranges col-12 row" v-if="includeStudents == 'Date Range'">
      <div class="float-left col-3 m-0 p-0">
        <strong><label class="pt-1">Grad Start Date</label></strong>
        <b-input-group class="mb-3">
          <b-form-input
            id="gradDateFromInput"
            v-model="gradDateFrom"
            type="text"
            placeholder="YYYY-MM-DD"
            autocomplete="off"
          ></b-form-input>
          <ul class="position-absolute form-validation-message text-danger">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
          <b-input-group-append>
            <b-form-datepicker
              v-model="gradDateFrom"
              button-only
              right
              locale="en-US"
            ></b-form-datepicker>
          </b-input-group-append>
        </b-input-group>
      </div>

      <div class="float-left col-4">
        <strong><label class="pt-1">Grad End Date</label></strong>
        <b-input-group class="mb-3">
          <b-form-input
            id="gradDateToInput"
            v-model="gradDateTo"
            type="text"
            placeholder="YYYY-MM-DD"
            autocomplete="off"
          ></b-form-input>

          <b-input-group-append>
            <b-form-datepicker
              v-model="gradDateTo"
              button-only
              right
              locale="en-US"
              aria-controls="example-input"
            ></b-form-datepicker>
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>
    <b-card title="Include School(s)">
      <b-card-text>
        <div class="row">
          <div class="col-md-2 py-2">
            <label>Mincode</label>
            <b-input type="number" v-model="mincode" @input="validateSchool" />
            <div
              class="input-errors"
              v-for="error of v$.mincode.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="col-md-10" v-if="mincodeSchoolInfo">
            <b-card>
              <b-card-text>
                <b-spinner v-if="mincodeValidating"></b-spinner>
                <b-overlay :show="mincodeValidating">
                  <Transition :duration="{ enter: 500, leave: 800 }">
                    <div v-if="!mincodeSchoolInfo">NOT VALID</div>
                    <div v-else>
                      <strong>School Name:</strong>
                      {{ mincodeSchoolInfo.schoolName }}<br />
                      <strong>District Name:</strong>
                      {{ mincodeSchoolInfo.districtName }}<br />
                      <strong>Address</strong> {{ mincodeSchoolInfo.address
                      }}<br />
                    </div>
                  </Transition>
                </b-overlay>
              </b-card-text>
              <b-button @click="addSchool()" class="float-right"
                >Add School</b-button
              >
            </b-card>
          </div>
        </div>

        <b-table
          v-if="schools.length"
          :items="schools"
          :fields="schoolInputFields"
        >
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
              <strong>School Name:</strong> {{ row.item.info.schoolName }}
            </div>
            <div>
              <strong>District Name:</strong> {{ row.item.info.districtName }}
            </div>
            <div><strong>Address:</strong> {{ row.item.info.address }}</div>
          </template>
        </b-table>

        <pre class="mt-5">
      TEST Schools: 04343000 04399143 02222022 06161064 06161049 03596573</pre
        >
        {{ schools }}
      </b-card-text>
    </b-card>

    <!-- </b-card>             -->
  </div>
</template>
<script>
import { isProxy, toRaw } from "vue";
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
        minLength: minLength(8),
        async isValid(value) {
          if (value === "") return true;
          if (value.length == 8) {
            let schoolInfo = await SchoolService.getSchoolInfo(value);
            console.log(schoolInfo);
            if (schoolInfo.data) {
              this.mincodeSchoolInfo = {
                schoolName: schoolInfo.data.schoolName,
                districtName: schoolInfo.data.districtName,
                address: schoolInfo.data.address,
              };
              return true;
            } else {
              return false;
            }
          }
        },
      }, // Matches this.firstName
    };
  },
  data() {
    return {
      includeStudents: "Current Students",
      gradDateFrom: "",
      gradDateTo: "",

      mincode: "",
      mincodeSchoolInfo: "",
      mincodeValidating: false,
      schools: [],
      schoolInputFields: [
        {
          key: "mincode",
          label: "Mincode",
          sortable: true,
          class: "text-left",
        },
        {
          key: "info",
          label: "School",
          sortable: true,
          class: "text-left",
        },
        {
          key: "remove",
          label: "",
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
      console.log(this.mincode.length);
      if (this.mincode.length < 8) {
        this.clearmincodeSchoolInfo();
      } else {
        const result = await this.v$.$validate();
        if (!result) {
          return;
        }
      }

      this.mincodeValidating = false;
    },
    clearmincodeSchoolInfo() {
      this.mincodeSchoolInfo = "";
    },
    clearMincode() {
      this.mincode = "";
      this.clearmincodeSchoolInfo();
    },
    addSchool() {
      this.schools.splice(0, 0, {
        mincode: this.mincode,
        info: this.mincodeSchoolInfo,
      });
      console.log(this.schools);
      this.clearMincode();
      this.$emit("update:schools", this.schools);
    },
    removeSchool(mincode) {
      const schoolList = toRaw(this.schools);
      console.log(schoolList);
      for (const [index, school] in schoolList) {
        //   console.log(school);
        if (schoolList[index].mincode == mincode) {
          console.log(mincode);
          //     //   console.log(this.schools);
          this.schools.splice(index, 1);
          //     //   console.log(this.schools);
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
