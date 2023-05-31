<template>
  <div>
    <b-card title="Include Program(s)">
      <b-card-text>
        <div v-if="schoolCategory != '04' && schoolCategory != '09'">
          <label>Program</label>

          <b-form-select
            id="inline-form-select-type"
            class="col-2 mx-2"
            :options="programOptions"
            value-field="programCode"
            text-field="programCode"
            v-model="program"
          ></b-form-select>
          <div
            class="input-errors"
            v-for="error of v$.program.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>

          <div class="float-right mb-3">
            <b-button @click="addProgram()">Add</b-button>
          </div>
        </div>
        <b-table
          v-if="programs.length > 0"
          :items="programs"
          :fields="programInputFields"
          striped="true"
        >
          <template #cell(remove)="row">
            <b-button
              class="btn btn-primary w-100"
              @click="removeProgram(row.item.program)"
            >
              Remove
            </b-button>
          </template>
          <template #cell(info)="row">
            <div>
              {{ row.item.info }}
            </div>
          </template>
        </b-table>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import TRAXService from "@/services/TRAXService.js";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { isProxy, toRaw } from "vue";
import { mapGetters } from "vuex";

export default {
  components: {},
  setup(props) {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      program: {
        minLength: minLength(3),
      },
    };
  },
  data() {
    return {
      program: "",
      programInfo: {},
      programValidating: false,
      validationMessage: "",
      schoolCategory: "",
      programs: [],
      programInputFields: [
        {
          key: "program",
          label: "Program",
          sortable: true,
          class: "text-left",
        },
        {
          key: "info",
          label: "Post Secondary Institute Name",
          sortable: true,
          class: "text-left",
        },
        {
          key: "remove",
          label: "Remove",
          sortable: true,
          class: "text-left",
        },
      ],
    };
  },
  mounted() {
    this.$emit("update:programs", this.programs);
  },
  created() {},
  methods: {
    async validateProgram() {
      this.programValidating = true;
      this.clearProgramInfo();
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      this.programValidating = false;
    },
    clearProgramInfo() {
      this.programInfo = "";
    },
    clearProgram() {
      this.program = "";
      this.clearProgramInfo();
    },
    findProgramByCode(programs, programCode) {
      return programs.find((program) => program.programCode === programCode);
    },
    addProgram() {
      const prog = toRaw(
        this.findProgramByCode(this.programOptions, this.program)
      );

      this.programs.splice(0, 0, {
        program: this.program,
        info: prog.programName,
      });
      this.$emit("update:programs", this.programs);
      this.clearProgram();
    },
    removeProgram(program) {
      let programList = toRaw(this.programs);
      for (const [index] in programList)
        if (programList[index].program == program) {
          console.log(program);
          this.programs.splice(index, 1);
          this.$emit("update:programs", this.programs);
        }
    },
  },
  props: {
    credentialType: String,
    runType: String,
  },

  computed: {
    ...mapGetters({
      programOptions: "app/getProgramOptions",
    }),
    isEmpty() {
      return this.programs.length > 0;
    },
  },
};
</script>
<style scoped>
input {
  border-radius: 0px;
}
</style>
