<template>
  <div>
    {{ group }}
    {{ where }}
    {{ isValid }}

    <label class="font-weight-bold pt-1">Group</label>
    <b-form-select
      id="inline-form-select-audience"
      class="mb-2 mr-sm-2 mb-sm-0"
      :options="groupOptions"
      v-model="group"
      value="group"
    ></b-form-select>
    <SchoolInput></SchoolInput>

    <label class="font-weight-bold">Copies</label>
    <b-form-input
      type="number"
      id="inline-form-select-audience"
      class="mb-2 mr-sm-2 mb-sm-0"
      :value="1"
      @change="editBatchJob('copies', $event)"
    ></b-form-input>

    <label class="font-weight-bold">Where</label>
    <b-form-select
      id="inline-form-select-type"
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="where"
      :value="where"
      :options="[
        { text: 'Download', value: 'localDownload' },
        'BC Mail',
        { text: 'User', value: 'User' },
      ]"
    ></b-form-select>
  </div>
</template>
<script>
import SchoolInput from "@/components/Batch/SchoolInput.vue";

export default {
  components: {
    SchoolInput: SchoolInput,
  },
  data: function () {
    return {
      schedule: "",
      where: "",
      group: "",
      groupData: [],
      groupOptions: [
        "Student",
        "School",
        { text: "Geographic District", value: "District" },
        "Program",
      ],
    };
  },
  mounted() {},
  created() {},

  methods: {
    runbatch(payload) {
      console.log("run batch");
      console.log(payload);
    },
    submit() {
      let payload = {
        where: this.where,
        group: this.group,
      };
      if (this.schedule) {
        let crontime = "123456";
        this.runbatch(payload, this.schedule);
      } else {
        this.runbatch(payload);
      }
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
</style>
