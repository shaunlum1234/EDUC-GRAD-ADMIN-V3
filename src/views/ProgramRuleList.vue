<template>
  <div class="container">
    <SiteMessage
      style="z-index:1"
      v-bind:message="this.displayMessage"
      v-if="displayMessage"
    ></SiteMessage>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addProgramRuleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addProgramRuleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="addProgramRuleModalLabel">
              Add Program Rule
            </h2>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit="formSubmit">
            <div class="modal-body">
              <div class="add-rule">
                <form @submit="formSubmit">
                  <strong>Requirement Code:</strong>
                  <input
                    type="text"
                    class="form-control"
                    v-model="requirementCode"
                  />
                  <strong>Requirement Name:</strong>
                  <input
                    type="text"
                    class="form-control"
                    v-model="requirementName"
                  />
                  <strong>Requirement Credits:</strong>
                  <input
                    type="text"
                    class="form-control"
                    v-model="requiredCredits"
                  />
                  <strong>Not Met Description:</strong>
                  <input
                    type="text"
                    class="form-control"
                    v-model="notMetDescription"
                  />
                  <strong>Program Code:</strong>
                  <input
                    type="text"
                    class="form-control"
                    v-model="programCode"
                  />
                  <strong>Requirement Type:</strong>
                  <input
                    type="text"
                    class="form-control"
                    v-model="requirementType"
                  />
                  <strong>Active Flag (Y or N):</strong>
                  <input
                    type="text"
                    class="form-control"
                    v-model="activeFlag"
                  />
                </form>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button class="btn btn-success btn-primary">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <h1>Graduation Program Rules</h1>
    <div class="search-input">
      <input
        class="form-control"
        v-model="filters.name.value"
        placeholder="Enter a Rule"
      />
    </div>
    <v-table
      :data="rules"
      :filters="filters"
      :currentPage.sync="currentPage"
      :pageSize="10"
      @totalPagesChanged="totalPages = $event"
      class="table table-responsive table-striped table-hover table-md text-center align-middle"
    >
      <thead slot="head">
        <v-th sortKey="requirementCode">Requirement Code</v-th>
        <v-th sortKey="requirementName">Requirement<br />Name</v-th>
        <v-th sortKey="requiredCredits">Requirement Credits</v-th>
        <v-th sortKey="notMetDescription"
          >Not Met<br />
          Description</v-th
        >
        <v-th sortKey="programCode">Program Code</v-th>
        <v-th sortKey="active">Requirement Type</v-th>
        <v-th sortKey="active">Active</v-th>
        <th>
          <button
            type="button"
            class="add-program-rule-button btn btn-primary"
            data-toggle="modal"
            data-target="#addProgramRuleModal"
          >
            Add Rule
          </button>
        </th>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <tr v-for="row in displayData" :key="row.requirementCode">
          <td>{{ row.requirementCode }}</td>
          <td>{{ row.requirementName }}</td>
          <td>{{ row.requiredCredits }}</td>
          <td>{{ row.notMetDescription }}</td>
          <td>{{ row.programCode }}</td>
          <td>{{ row.requirementType }}</td>
          <td>{{ row.activeFlag }}</td>

          <td>
            <router-link
              class="program-rules-link"
              :to="{
                name: 'program-rule-show',
                params: { id: row.requirementCode },
              }"
              ><button class="btn btn-primary active">EDIT</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
    <smart-pagination
      :currentPage.sync="currentPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<script>
import ProgramRuleService from "@/services/ProgramRuleService.js";
import SiteMessage from "@/components/SiteMessage";
export default {
  components: {
    SiteMessage: SiteMessage,
  },
  name: "BasicFiltering",
  data() {
    return {
      rules: [],
      requirementCode: "",
      requirementName: "",
      requiredCredits: "",
      notMetDescription: "",
      programCode: "",
      requirementType: "",
      activeFlag: "",
      filters: {
        name: { value: "", keys: ["requirementCode"] },
      },
      currentPage: 1,
      totalPages: 0,
      displayMessage: null,
    };
  },
  created() {
    //Check for any messages from routes
    this.displayMessage = this.$route.params.message;

    ProgramRuleService.getProgramRules()
      .then((response) => {
        this.rules = response.data;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // console.log('There was an error:' + error.response);
      });
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;

      ProgramRuleService.addProgramRule({
        requirementCode: parseInt(this.requirementCode),
        requirementName: this.requirementName,
        requiredCredits: parseInt(this.requiredCredits),
        notMetDescription: this.notMetDescription,
        programCode: this.programCode,
        requirementType: this.requirementType,
        activeFlag: this.activeFlag,
      })
        .then(function(response) {
          ProgramRuleService.getProgramRules()
            .then((response) => {
              currentObj.rules = response.data;
              currentObj.displayMessage =
                "You have successfully added a Program Rule";
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
              //console.log('There was an error:' + error.response);
            });
          currentObj.output = response.data;
        })
        .catch(function(error) {
          currentObj.output = error;
        });
    },
  },
};
</script>

<style scoped>
#search {
  display: none; /* will unhide when endpoint filter by pen is implemented */
}
.add-course-button {
  float: right;
}
.search-input {
  float: right;
  width: 300px;
}
.container h1 {
  width: 500px;
  float: left;
}
</style>
