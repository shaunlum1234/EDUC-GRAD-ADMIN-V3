<template>
  <div>
    <label class="font-weight-bold">Copies</label>
    <b-form-input
      type="number"
      id="inline-form-select-audience"
      class="mb-2 mr-sm-2 mb-sm-0"
      :value="1"
      v-model="copies"
      @change="validateForm"
    ></b-form-input>
    <div
      class="input-errors"
      v-for="error of v$.copies.$errors"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <DistrictInput
      v-model:districts="groupData"
      runType="DISTRUN_YE"
    ></DistrictInput>
    <label class="font-weight-bold">Where</label>
    <b-form-select
      id="inline-form-select-type"
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="where"
      :value="where"
      @change="validateForm"
      :options="[
        { text: 'Download', value: 'localDownload' },
        'BC Mail',
        { text: 'User', value: 'User' },
      ]"
    ></b-form-select>
    <div
      class="input-errors"
      v-for="error of v$.where.$errors"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>
<script>
import GraduationReportService from "@/services/GraduationReportService.js";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import DistrictInput from "@/components/Batch/Forms/FormInputs/DistrictInput.vue";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      copies: {
        required: helpers.withMessage("Copies field cannot be empty", required),
      }, // Matches this.firstName
      where: {
        required: helpers.withMessage("where field cannot be empty", required), // Matches this.firstName
      },
    };
  },
  components: { DistrictInput: DistrictInput },
  data: function () {
    return {
      schedule: "",
      districts: [],
      where: "BC Mail",
      copies: "1",
      group: "district",
      groupData: [],
    };
  },
  mounted() {},
  created() {},

  methods: {
    async validateForm(event) {
      const result = await this.v$.$validate();
      if (!result) {
        console.log("INVALID");
        return;
      }
      console.log("VALID");
    },
    runbatch() {
      console.log("run batch");
      console.log(payload);
      console.log(groupData);
    },
    clearGroupData() {
      this.districts = [];
    },
  },
  computed: {
    isValid() {
      if (this.where && this.group && this.districts && this.districts.length) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
input {
  border-radius: 0px;
}
.input-errors {
  color: red;
}
</style>
