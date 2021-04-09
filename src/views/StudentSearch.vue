<template>
  <div class="studentlist">
    <h1>Student search</h1>
    
    <p>Search by Personal Education Number(PEN) or use the advanced search tab to search by other search criteria.</p>
    <div>
      
      <div>
        <b-card no-body class="p-0">
          <b-tabs card>
            <b-tab title="PEN Search" active>
              <b-card-text>
                
                <form v-on:submit.prevent>
                  <div class="form-group">
                    <!-- Pen Input -->
                    <div class="search">
                        <label for="search-by-pen">Search by PEN:</label>
                        
                        <b-form-input id="search-by-pen" size="lg" type="search" v-model="penInput" placeholder=""
                          class="text_input" ref="penSearch" v-on:keyup="keyHandler" tabindex="1">
                        </b-form-input>
                        <button v-if="!searchLoading" v-on:click="findStudentByPen" class="">
                          <i class="fas fa-search"></i> Search
                        </button>
                        <button v-if="searchLoading" class="btn btn-success">
                          <i class="fas fa-search"></i> Search <b-spinner v-for="variant in variants" :variant="variant" :key="variant" v-show="searchLoading"
                      class="loading-spinner float-right"></b-spinner>
                        </button>
                    </div>
                  </div>
                </form>
                <p class="sample-pens">
                  Samples:
                  <ul>
                    <li><a href="#" v-on:click="findStudentByPenSample(126966100)">126966100</a> (All)</li>
                    <li><a href="#" v-on:click="findStudentByPenSample(140341157)">126966100</a> (Exams and Assessment
                      No grad
                      status)</li>
                  </ul>
                </p>
              </b-card-text>
            </b-tab>
            <b-tab title="Advanced Search">
              <b-card-text>
                <form v-on:submit.prevent>
                  <!-- advanced Search -->
                  <div class="advanced-search-form">
                    <div class="row my-3">
                      <div class="advanced-search-field col-12 col-md-3">
                        <label>First Name </label>
                        <div href="#"
                          v-on:click="advancedSearchInput.legalFirstName.contains = !advancedSearchInput.legalFirstName.contains"
                          v-bind:class="{active: advancedSearchInput.legalFirstName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="First Name Contains">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.legalFirstName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="2" />
                      </div>
                      <div class="advanced-search-field col-12 col-md-3">
                        <label>Last Name</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.legalLastName.contains = !advancedSearchInput.legalLastName.contains"
                          v-bind:class="{active: advancedSearchInput.legalLastName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="Last Name Contains">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.legalLastName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="3" />
                      </div>
                      <div class="advanced-search-field col-12 col-md-3">
                        <label>Middle Name</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.legalMiddleNames.contains = !advancedSearchInput.legalMiddleNames.contains"
                          v-bind:class="{active: advancedSearchInput.legalMiddleNames.contains}"
                          class="wild-card-button" v-b-tooltip.hover title="Middle Name Contains">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.legalMiddleNames.value" placeholder=""
                          v-on:keyup=" keyHandler" tabindex="4" />
                      </div>
                      <div class="advanced-search-field  col-12 col-md-3">
                        <label>Gender</label>
                        <b-input v-model="advancedSearchInput.gender.value" placeholder="" v-on:keyup="keyHandler"
                          tabindex="5" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="advanced-search-field col-12 col-md-3">
                        <label>Grade</label>
                        <b-input v-model="advancedSearchInput.grade.value" placeholder="" v-on:keyup=" keyHandler"
                          tabindex="6" />
                      </div>
                      <div class="advanced-search-field  col-12 col-md-3">
                        <label>Mincode</label>
                        <b-input v-model="advancedSearchInput.mincode.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="7" />
                      </div>
                      <div class="advanced-search-field col-12 col-md-3">
                        <label>Local ID</label>
                        <b-input v-model="advancedSearchInput.localId.value" placeholder="" v-on:keyup=" keyHandler"
                          tabindex="8" />
                      </div>
                      <div class="advanced-search-field  col-12 col-md-3">
                        <label>Birthdate</label>
                        <b-input v-model="advancedSearchInput.birthDate.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="9" />
                      </div>
                      <div class="advanced-search-button">
                        <button @click="findStudentsByAdvancedSearch" v-if="!advancedSearchLoading"
                          class="btn btn-primary" tabindex="10">Search</button>
                        <button v-if="advancedSearchLoading" class="btn btn-success">Search</button>
                        <button @click="clearInput" class=" btn btn-primary mx-2">Reset</button>

                      </div>
                      <b-spinner v-for="variant in variants" :variant="variant" :key="variant"
                        v-show="advancedSearchLoading" class="advanced-loading-spinner"></b-spinner>
                    </div>
                  </div>
                  <div class="search-results-message"><strong><span v-if="message">{{ message }}</span></strong></div>
                </form>
                <transition name="fade">
                  <DisplayTable v-if="studentSearchResults.length" v-bind:items="studentSearchResults" title="Student search results" v-bind:fields="studentSearchResultsFields" id="id"
                    v-bind:pen="pen">
                      <template #cell(pen)="data">
                        <router-link :to="'/student-profile/' + data.item.pen ">{{ data.item.pen }}</router-link>
                    </template>
                  </DisplayTable>
                  <!-- <v-table :data="studentSearchResults" class="table table-sm table-hover table-striped align-middle"
                    v-show="studentSearchResults.length">
                    <thead slot="head" class="">
                      <v-th sortKey="pen">PEN</v-th>
                      <v-th sortKey="legalLastName">Last name</v-th>
                      <v-th sortKey="legalFirstName">First name</v-th>
                      <v-th sortKey="legalMiddleNames">Middle</v-th>
                      <v-th sortKey="dob">Birthdate</v-th>
                      <v-th sortKey="genderCode">Gender</v-th>
                      <v-th sortKey="gradeCode">Grade</v-th>
                      <v-th sortKey="mincode">School code</v-th>
                      <v-th sortKey="sc">School</v-th>
                      <v-th sortKey="gradeYear">Program</v-th>
                    </thead>
                    <tbody slot="body" slot-scope="{ displayData }">
                      <template v-for="row in displayData">
                        <tr :key="row.pen">
                          <td>
                            <a href="#" v-on:click="selectStudent(row)">{{ row.pen }}</a>
                          </td>
                          <td>{{ row.legalLastName }}</td>
                          <td>{{ row.legalFirstName }}</td>
                          <td>{{ row.legalMiddleNames }}</td>
                          <td>{{ row.dob }}</td>
                          <td>{{ row.genderCode }}</td>
                          <td>{{ row.gradeCode }}</td>
                          <td>{{ row.mincode }}</td>
                          <td>{{ row.schoolName }}</td>
                          <td>{{ row.gradeYear }}</td>
                        </tr>
                      </template>
                    </tbody>
                  </v-table> -->
                </transition>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li v-for="index in totalPages" :key="index" v-bind:class="{'page-item':true, active:index == selectedPage}"><a class="page-link" href="#" v-on:click="AdvancedSearchPagination(index, 10)">{{ index  }}</a></li>
                    </ul>
                  </nav>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
  // @ is an alias to /src
  import {
    mapGetters
  } from "vuex";
  import StudentService from "@/services/StudentService.js";
  import DisplayTable from "@/components/DisplayTable";
  export default {
    name: "studentSearch",
    data() {
      return {
        studentSearchResults: [],
        studentSearchResultsFields: [
          {
            key: 'pen',
            label: 'PEN',
            sortable: false,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'legalLastName',
            label: 'Legal Surname',
            sortable: false,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'usualLastName',
            label: 'Usual Surname',
            sortable: false,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'legalFirstName',
            label: 'Legal Given/Usual',
            sortable: false,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'usualFirstName',
            label: 'Usual Given',
            sortable: false,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'legalMiddleNames',
            label: 'Legal Middle/Usual',
            sortable: false,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'usualMiddleNames',
            label: 'Usual Middle',
            sortable: false,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'dob',
            label: 'Birthdate',
            sortable: true,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'schoolName',
            label: 'School (SLD)',
            sortable: true,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'program',
            label: 'Program (GRAD)',
            sortable: true,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'gradeCode',
            label: 'Student Grade (GRAD)',
            sortable: true,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'schoolOfRecord',
            label: 'School of Record (GRAD)',
            sortable: true,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'schoolName',
            label: 'School of Record Name (GRAD)',
            sortable: true,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'statusCode',
            label: 'Student Status (GRAD)',
            sortable: true,
            editable: false,
            class: 'w-1',
          },
          {
            key: 'statusCode',
            label: 'School Independent Affiliation (GRAD)',
            sortable: true,
            editable: false,
            class: 'w-1',
          },
        ],
        totalElements:"",
        numberOfElements:"",
        totalPages:"",
        selectedPage:"",
        searchResultMessage: "",
        message: "",
        errorMessage: "",
        penInput: "",
        selectedPen: "",
        variants: ["success"],
        searchLoading: false,
        advancedSearchLoading: false,
        showAdvancedSearchForm: false,
        advancedSearchInput: {
          legalFirstName: {
            value: "",
            contains: false,
          },
          legalLastName: {
            value: "",
            contains: false,
          },
          legalMiddleNames: {
            value: "",
            contains: false,
          },
          gender: {
            value: "",
            contains: false,
          },
          grade: {
            value: "",
            contains: false,
          },
          mincode: {
            value: "",
            contains: false,
          },
          localId: {
            value: "",
            contains: false,
          },
          birthDate: {
            value: "",
            contains: false,
          }
        }
      };
    },
    created() {},
    // beforeRouteLeave(to, from, next) {
    //   next(this.loadStudent(this.selectedPen));
    // },
    components: {
      DisplayTable: DisplayTable,
    },
    computed: {
      ...mapGetters({
        profile: "getStudentProfile",
        courses: "getStudentCourses",
        exams: "getStudentExams",
        gradStatus: "getStudentGradStatus",
        token: "getToken"
      })
    },

    methods: {
      keyHandler: function (e) {
        if (e.keyCode === 13) {
          //enter key pressed
          this.studentSearchResults = [];
          if (this.penInput) {
            this.findStudentByPen();
          } else if (this.surnameInput) {
            this.findStudentBySurname();
          }
        }
      },
      findStudentByPenSample: function (pen) {
        this.penInput = pen;
        this.findStudentByPen();
      },
      findStudentByPen: function () {

        //console.log("FIND STUDENT BY PEN");
        if (this.penInput) {
          this.message = "";
          this.searchLoading = true;
          this.studentSearchResults = [];
          StudentService.getStudentByPen(this.penInput, this.token)
            .then((response) => {
              if (response.data) {
                this.selectStudent(response.data);
                /*
                //select student in list
                this.searchLoading = false;
                this.studentSearchResults.push(response.data);
                this.message = "1 Student found";
                */
              }
            })
            .catch(() => {
              this.searchLoading = false;
              this.message = "Student not found";
            });
          //pen input check
        }
      },
      findStudentsByAdvancedSearch: function () {
        this.message = "";
        this.errorMessage = "";
        if (!this.isEmpty(this.advancedSearchInput)) {
          this.advancedSearchLoading = true;
          this.studentSearchResults = [];
          try {
            StudentService.getStudentsByAdvancedSearch(this.advancedSearchInput, this.token)
              .then((response) => {
                console.log(response.data);
                this.advancedSearchLoading = false;
                this.searchResults = response.data;
                this.studentSearchResults = response.data.gradSearchStudents;
                this.totalElements = this.searchResults.totalElements;
                this.numberOfElements = this.searchResults.numberOfElements;
                this.totalPages = this.searchResults.totalPages;
                this.message = this.searchResults.totalElements + " student(s) found. Showing " + this.searchResults.numberOfElements + " results. Number of Pages: " + this.searchResults.totalPages;
              })
              .catch((err) => {
                this.advancedSearchLoading = false;
                this.message = "Student not found";
                this.errorMessage = err;
                // console.log(err);
              });
          } catch (error) {
            //console.log("Error with webservice");
          }
        } else {
          this.message = "Enter at least one field to search."
        }
      },
      AdvancedSearchPagination: function (pageNumber, pageSize) {
        this.message = "";
        this.errorMessage = "";
        this.selectedPage = pageNumber;
        if (!this.isEmpty(this.advancedSearchInput)) {
          this.advancedSearchLoading = true;
          this.studentSearchResults = [];
          try {
            StudentService.getStudentsByAdvancedSearch(this.advancedSearchInput, this.token, pageNumber - 1, pageSize)
              .then((response) => {
                console.log(response.data);
                this.advancedSearchLoading = false;
                this.searchResults = response.data;
                this.studentSearchResults = response.data.gradSearchStudents;
                this.totalElements = this.searchResults.totalElements;
                this.numberOfElements = this.searchResults.numberOfElements;
                this.totalPages = this.searchResults.totalPages;
                this.message = this.searchResults.totalElements + " student(s) found. Showing " + this.searchResults.numberOfElements + " results. Number of Pages: " + this.searchResults.totalPages;
              })
              .catch((err) => {
                this.advancedSearchLoading = false;
                this.message = "Student not found";
                this.errorMessage = err;
                // console.log(err);
              });
          } catch (error) {
            //console.log("Error with webservice");
          }
        } else {
          this.message = "Enter at least one field to search."
        }
      },
      showAdvancedSearch: function () {
        this.showAdvancedSearchForm = true;
      },
      selectStudent: function (student) {
        this.selectedPen = student[0].pen;
        this.$router.push({
          path: `/student-profile/${this.selectedPen}`
        });
        //this.$router.push({ name: "student-profile", params: {pen: this.selectedPen}});
      },
      clearStudent: function () {},
      clearInput: function () {
        this.penInput = "";
        this.advancedSearchInput = {
          legallegalFirstName: {
            value: "",
            contains: false,
          },
          legalLastName: {
            value: "",
            contains: false,
          },
          legalMiddleNames: {
            value: "",
            contains: false,
          },
          gender: {
            value: "",
            contains: false,
          },
          grade: {
            value: "",
            contains: false,
          },
          mincode: {
            value: "",
            contains: false,
          },
          localId: {
            value: "",
            contains: false,
          },
          birthDate: {
            value: "",
            contains: false,
          },
          usualFirstName: {
            value: "",
            contains: false,
          },
          usualLastName: {
            value: "",
            contains: false,
          },


        }
      },
      isEmpty(obj) {
        let isEmpty = true;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] != "") {
              isEmpty = false;
            }
          }
        }
        return isEmpty;
      },

    },
  };
</script>
<style scoped>
  .alert,
  .card,

  .pen-search {
    width: 100%;
    margin-right: 9px;
    float: left;
    /*padding-left: 25px;*/
  }

  h6 {
    font-size: 1.5rem;
  }

  .loading-spinner {
    float: left;
    margin-left: 10px;
  }

  .advanced-loading-spinner {
    margin-top: 32px;
  }

  .table-hover tbody tr:hover {
    background: #96c0e6;
  }

  .search {
    float: left;
  }

  .sample-pens {
    float: left;
    clear: both;
    margin-top: 15px;
  }


  .search-results-message {
    float: left;
    clear: both;
    margin-top: 5px;
  }

  .fade-enter-active {
    transition: opacity .8s;
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
  }

  .table th {
    border-bottom: 2px solid #5475a7;
  }

  .advanced-search {
    float: left;
    clear: both;
  }

  .advanced-search-form {
    background-color: #fff;
  }

  .advanced-search-field {
    padding-right: 10px;
  }

  .advanced-search-field label {
    float: left;
    clear: both;

  }

  .advanced-search-field input {
    float: left;
    clear: both;
    padding-left: 10px;
    width: 100%;
  }

  .advanced-search-button {
    margin-top: 32px;
    padding-left: 15px;
  }

  .wild-card-button {
    color: #DEE2EB;
    position: absolute;
    right: 21px;
    top: 40px;
    z-index: 10;
    text-decoration: none;
    cursor: pointer;
  }

  .wild-card-button:visited {
    color: #DEE2EB;
    text-decoration: none;
  }

  .wild-card-button.active {
    color: green
  }

  svg {
    display: none !important;
  }
</style>