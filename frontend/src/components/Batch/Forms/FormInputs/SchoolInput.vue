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
        <b-label>Mincode</b-label>
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
        <div v-if="mincodeSchoolInfo">
          <b-card>
            <b-card-text>
              <b-spinner v-if="mincodeValidating"></b-spinner>
              <b-overlay :show="mincodeValidating">
                <div v-if="!mincodeSchoolInfo">NOT VALID</div>
                <div v-else>
                  <strong>School Name:</strong> {{ mincodeSchoolInfo.schoolName
                  }}<br />
                  <strong>District Name:</strong>
                  {{ mincodeSchoolInfo.districtName }}<br />
                  <strong>Address</strong> {{ mincodeSchoolInfo.address }}<br />
                </div>
              </b-overlay>
            </b-card-text>
            <b-button
              :disabled="!this.mincodeSchoolInfo"
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
        minLength: minLength(8),
        async isValid(value) {
          if (value === "") return true;
          if (value.length == 8) {
            return SchoolService.getSchoolInfo(value)
              .then((response) => {
                if (response.data) {
                  this.mincodeSchoolInfo = {
                    schoolName: response.data.schoolName,
                    districtName: response.data.districtName,
                    address: response.data.address,
                  };
                  return true;
                } else {
                  return false;
                }
              })
              .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                return false;
              });
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
      this.clearmincodeSchoolInfo();
      const result = await this.v$.$validate();
      if (!result) {
        return;
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
