<template>
  <div>
    <label class="font-weight-bold pt-1">Group</label>
    <b-form-select
      id="inline-form-select-audience"
      class="mb-2 mr-sm-2 mb-sm-0"
      :options="groupOptions"
      v-model="group"
      @change="
        validateForm;
        clearGroupData();
      "
      value="group"
    ></b-form-select>
    <div
      class="input-errors"
      v-for="error of v$.group.$errors"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <div v-if="group == 'School'">
      <SchoolInput v-model:schools="groupData"></SchoolInput>
    </div>
    <div v-if="group == 'Student'">
      <StudentInput
        v-model:students="groupData"
        :credentialType="credentialType"
        runType="DISTRUNUSER"
      ></StudentInput>
    </div>
    <div v-if="group == 'District'">
      <DistrictInput
        v-model:districts="groupData"
        :credentialType="credentialType"
        runType="DISTRUNUSER"
      ></DistrictInput>
    </div>
  </div>
</template>
<script>
import DistrictInput from "@/components/Batch/Forms/FormInputs/DistrictInput.vue";
import SchoolInput from "@/components/Batch/Forms/FormInputs/SchoolInput.vue";
import StudentInput from "@/components/Batch/Forms/FormInputs/StudentInput.vue";
import GraduationReportService from "@/services/GraduationReportService.js";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },

  getSchools(value) {
    console.log("VALUE ADDED" + value);
  },
  validations() {
    return {
      groupData: {
        required: helpers.withMessage("Group field cannot be empty", required),
      }, // Matches this.firstName
      group: {
        required: helpers.withMessage("Group field cannot be empty", required),
      }, // Matches this.firstName
    };
  },
  components: {
    SchoolInput: SchoolInput,
    StudentInput: StudentInput,
    DistrictInput: DistrictInput,
  },
  data: function () {
    return {
      credentialDetails: [],
      credentialType: "",
      schedule: "",
      group: "",
      groupData: [],
      schools: [],
      students: [],
      districts: [],
      programs: [],
      transcriptTypes: [],
      certificateTypes: [],

      groupOptions: [
        "Student",
        "School",
        { text: "School Category", value: "District" },
        "Program",
      ],
    };
  },
  mounted() {
    this.$emit("update:schools", this.schools);
  },
  created() {
    this.transcriptTypes = this.getTranscriptTypes();
    this.certificateTypes = this.getCertificateTypes();
  },

  methods: {
    getTranscriptTypes() {
      GraduationReportService.getTranscriptTypes()
        .then((response) => {
          this.transcriptTypes = response.data;
        })
        // eslint-disable-next-line
        .catch((error) => {
          if (error.response.statusText) {
            this.makeToast("ERROR " + error.response.statusText, "danger");
          } else {
            this.makeToast("ERROR " + "error with webservervice", "danger");
          }
        });
    },
    getCertificateTypes() {
      GraduationReportService.getCertificateTypes()
        .then((response) => {
          this.certificateTypes = response.data;
        })
        // eslint-disable-next-line
        .catch((error) => {
          if (error.response.statusText) {
            this.makeToast("ERROR " + error.response.statusText, "danger");
          } else {
            this.makeToast("ERROR " + "error with webservervice", "danger");
          }
        });
    },
    runbatch() {
      console.log("run batch");
      console.log(payload);
      console.log(groupData);
    },
    async validateForm(event) {
      const result = await this.v$.$validate();
      if (!result) {
        console.log("INVALID");
        return;
      }
      console.log("VALID");
    },
    clearGroupData() {
      this.schools = [];
      this.students = [];
      this.districts = [];
      this.programs = [];
      this.groupData = [];
    },
  },
  computed: {
    isValid() {
      if (this.where && this.group) {
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
