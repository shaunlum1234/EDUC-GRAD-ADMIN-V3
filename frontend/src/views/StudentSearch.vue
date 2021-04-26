<template>
  <div class="studentlist">
    <h1>Student search</h1>
    <p>Search by Personal Education Number(PEN) or use the advanced search to look up students by other criteria.</p>
    <div>  
      <div>
        <b-card no-body class="p-0">
          <b-tabs card>
            <b-tab title="PEN search" active>
              <b-card-text>        
                <form v-on:submit.prevent>
                  <div class="form-group">
                    <!-- Pen Input -->
                    <div class="search w-100">
                        <label for="search-by-pen" class="float-left w-100">Search by PEN:</label>                   
                        <b-form-input id="search-by-pen" type="search" v-model="penInput" placeholder=""
                         ref="penSearch" v-on:keyup="keyHandler" tabindex="1" class="w-50 float-left">
                        </b-form-input>
                        <button v-if="!searchLoading" v-on:click="findStudentByPen" class="btn btn-primary ml-2 float-left">
                          <i class="fas fa-search"></i> Search
                        </button>
                        <button v-if="searchLoading" class=" btn btn-primary ml-2 float-left">
                          <i class="fas fa-search"></i> Search 
                        </button>      
                    </div>
                    <div class="search-results-message my-4"><strong><span v-if="searchByPenMessage">{{ searchByPenMessage }}</span></strong></div>
                  </div>
                </form>
                <!-- <p class="sample-pens">
                  Samples:
                  <ul>
                    <li><a href="#" v-on:click="findStudentByPenSample(126966100)">126966100</a> (All)</li>
                    <li><a href="#" v-on:click="findStudentByPenSample(140341157)">126966100</a> (Exams and Assessment
                      No grad
                      status)</li>
                  </ul>
                </p> -->
              </b-card-text>
            </b-tab>

            <b-tab title="Advanced search">
              <b-card-text>
                <form v-on:submit.prevent>
                  <!-- advanced Search -->
                  <div class="advanced-search-form">
                    <div class="row my-3">
                      <div class="advanced-search-field col-12 col-md-2">
                        <label >Legal surname</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.legalLastName.contains = !advancedSearchInput.legalLastName.contains"
                          v-bind:class="{active: advancedSearchInput.legalLastName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="Legal surname starts with">
                          [.*]
                        </div>
                        <b-input class="form__input" v-model="advancedSearchInput.legalLastName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="1" />
                      </div>
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Legal given</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.legalFirstName.contains = !advancedSearchInput.legalFirstName.contains"
                          v-bind:class="{active: advancedSearchInput.legalFirstName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="Legal given starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.legalFirstName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="2" />
                      </div>
                      
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Legal middle</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.legalMiddleNames.contains = !advancedSearchInput.legalMiddleNames.contains"
                          v-bind:class="{active: advancedSearchInput.legalMiddleNames.contains}"
                          class="wild-card-button" v-b-tooltip.hover title="Legal middle starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.legalMiddleNames.value" placeholder=""
                          v-on:keyup=" keyHandler" tabindex="3" />
                      </div>
                      <div class="advanced-search-field  col-12 col-md-2">
                        <label>Gender</label>
                         <b-form-select v-model="advancedSearchInput.gender.value" :options="genderOptions" tabindex="4"></b-form-select>  
                      </div>
                      <div
                        class="form-group advanced-search-field col-12 col-md-2"
                      >
                        <label for="datepicker-birthdate-from form__label"
                          >Birthdate from</label
                        >
                        <b-input-group class="mb-3">
                          <b-form-input
                            class="form__input"
                            id="datepicker-birthdate-from"
                            @input="$v.dateObject.$touch"
                            v-model="advancedSearchInput.birthdateFrom.value"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            max="9999-12-30"
                            autocomplete="off"
                            tabindex="6"
                            v-on:keyup="keyHandler"
                          ></b-form-input>
                          <b-input-group-append>
                            <b-form-datepicker
                              v-model="advancedSearchInput.birthdateFrom.value"
                              button-only
                              right
                              locale="en-US"
                              aria-controls="datepicker-birthdate-to"
                            ></b-form-datepicker>
                          </b-input-group-append>
                        </b-input-group>
                         <div
                        class="error"
                        v-if="
                          !$v.dateObject.maxValue
                        "
                      >
                        Birthdate from must not be greater than today.
                      </div>
                      </div>
                     
                      <div class="advanced-search-field col-12 col-md-2">
                        <label for="datepicker-birthdate-to"
                          >Birthdate to</label
                        >
                        <b-input-group class="mb-3">
                          <b-form-input
                            id="datepicker-birthdate-to"
                            v-model="advancedSearchInput.birthdateTo.value"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            max="9999-12-30"
                            :date-format-options="{ year: '4-digit'}"
                            autocomplete="off"
                            tabindex="6"
                            v-on:keyup="keyHandler"
                          ></b-form-input>
                          <b-input-group-append>
                            <b-form-datepicker
                              v-model="advancedSearchInput.birthdateTo.value"
                              button-only     
                              right
                              locale="en-US"
                              aria-controls="datepicker-birthdate-to"

                            ></b-form-datepicker>
                          </b-input-group-append>
                        </b-input-group>     
                      </div>
                    </div>

                    <div class="row">
                       <div class="advanced-search-field col-12 col-md-2">
                        <label>Usual surname</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.usualLastName.contains = !advancedSearchInput.usualLastName.contains"
                          v-bind:class="{active: advancedSearchInput.usualLastName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="Usual surname starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.usualLastName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="7" />
                      </div>
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Usual given</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.usualFirstName.contains = !advancedSearchInput.usualFirstName.contains"
                          v-bind:class="{active: advancedSearchInput.usualFirstName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="Usual given starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.usualFirstName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="8" />
                      </div>

                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Usual middle</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.usualMiddleNames.contains = !advancedSearchInput.usualMiddleNames.contains"
                          v-bind:class="{active: advancedSearchInput.usualMiddleNames.contains}"
                          class="wild-card-button" v-b-tooltip.hover title="Usual middle starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.usualMiddleNames.value" placeholder=""
                          v-on:keyup=" keyHandler" tabindex="9" />
                      </div> 
                      <!-- <div class="advanced-search-field form-group col-12 col-md-2" :class="{ 'form-group--error': $v.advancedSearchInput.mincode.value.$error }">
                          <label class="form__label">Mincode</label>
                          <b-input class="form__input" v-model="advancedSearchInput.mincode.value" placeholder=""
                            v-on:keyup="keyHandler" tabindex="11" />
                          <div class="error" v-if="!$v.advancedSearchInput.mincode.value.numeric">Field is not numeric.</div>  
                      </div>    -->
                          
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Local ID</label>
                        <b-input v-model="advancedSearchInput.localId.value" placeholder="" v-on:keyup=" keyHandler"
                          tabindex="10" />
                      </div>
                    </div>
                    <div class="row">                              
                      <div class="advanced-search-button">
                        <button @click="findStudentsByAdvancedSearch(1,resultsPerPage)" v-if="!advancedSearchLoading" :class="!this.$v.$invalid?'btn btn-primary':'btn btn-secondary'" tabindex="12">Search</button>
                        <button @click="findStudentsByAdvancedSearch(1,resultsPerPage)" v-if="advancedSearchLoading" class="btn btn-success" tabindex="12">Search</button>
                        <button @click="clearInput" class="btn btn-outline-primary mx-2">Reset</button>                
                      </div>
                    </div>

                  </div>
                  <div class="row">
                    <div class="search-results-message my-4 col-12 col-md-8"><strong><span v-if="advancedSearchMessage">{{ advancedSearchMessage }}</span></strong></div>
                    <div class="results-option-group col-12 col-md-4">
                      <label v-if="totalPages > 1">Results per page</label>
                      <b-form-select class="results-option" v-if="totalPages > 1" @change="findStudentsByAdvancedSearch(1,resultsPerPage)" v-model="resultsPerPage" :options="resultsPerPageOptions" :value="resultsPerPage"></b-form-select>
                    </div>
                  </div>
                  
                </form>

                <transition name="fade">
                <div v-if="studentSearchResults" class="table-responsive">  
                  <DisplayTable  v-bind:items="studentSearchResults" title="Student search results" v-bind:fields="studentSearchResultsFields" id="pen"
                    v-bind:showFilter=false>
                      <template  #cell(pen)="data">
                        <router-link :to="'/student-profile/' + data.item.pen ">{{ data.item.pen }}</router-link>
                      </template>
                  </DisplayTable>
                  <nav  aria-label="Pagination">          
                    <ul class="pagination" v-if="selectedPage<10" >
                      <li v-if="selectedPage != 1 && selectedPage >= 5 "><a class="page-link" href="#" v-on:click="findStudentsByAdvancedSearch(1, resultsPerPage)">First</a></li>
                      <li v-for="index in 10" :key="index" v-bind:class="{'page-item':true, active:index == selectedPage}"><a v-if="paginationRange(index)" class="page-link" href="#" v-on:click="findStudentsByAdvancedSearch(index, resultsPerPage)">{{ index  }}</a></li>
                      <li v-if="selectedPage != totalPages && totalPages != 10 && selectedPage+5 <= totalPages"><a class="page-link disabled">...</a></li>
                      <li v-if="selectedPage != totalPages && totalPages != 10 && selectedPage+5 <= totalPages"><a class="page-link" href="#" v-bind:class="{'page-item':true, active:index == selectedPage}"  v-on:click="findStudentsByAdvancedSearch(totalPages, resultsPerPage)">{{totalPages}}</a></li>
                    </ul>
                    <ul class="pagination"  v-if="selectedPage>=10" >
                      <li><a class="page-link" href="#" v-on:click="findStudentsByAdvancedSearch(1, resultsPerPage)">First</a></li>
                      <li><a class="page-link disabled">...</a></li>
                       <li v-for="index in 10" :key="index" v-bind:class="{'page-item':true, active:selectedPage-5+index == selectedPage}"><a v-if="paginationRange(selectedPage-5+index)" class="page-link" href="#" v-on:click="findStudentsByAdvancedSearch(selectedPage-5+index, resultsPerPage)">{{ selectedPage-5+index  }}</a></li>
                      <li v-if="selectedPage != totalPages && selectedPage+6 < totalPages"><a class="page-link disabled">...</a></li>
                      <li v-if="selectedPage != totalPages && totalPages != 6 && selectedPage+6 <= totalPages"><a class="page-link" href="#" v-bind:class="{'page-item':true, active:index == selectedPage}"  v-on:click="findStudentsByAdvancedSearch(totalPages, resultsPerPage)">{{totalPages}}</a></li>
                    </ul>
                  </nav>
                </div>  
                </transition>
               
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
import { mapGetters } from "vuex";
import StudentService from "@/services/StudentService.js";
import DisplayTable from "@/components/DisplayTable";
import { maxValue } from "vuelidate/lib/validators";

export default {
  name: "studentSearch",
  data() {
    return {
      resultsPerPageOptions: [
        { value: 10, text: "10" },
        { value: 25, text: "25" },
        { value: 50, text: "50" },
        { value: 100, text: "100" },
      ],
      genderOptions: [
        { value: "M", text: "Male (M)" },
        { value: "F", text: "Female (F)" },
        { value: "X", text: "Gender diverse (X)" },
        { value: "U", text: "Unknown (U)" },
      ],

      studentSearchResults: [],
      studentSearchResultsFields: [
        {
          key: "pen",
          label: "PEN",
          sortable: false,
          editable: false,
          class: "w-1",
        },
        {
          key: "legalLastName",
          label: "Legal surname",
          sortable: false,
          editable: false,
          class: "w-1",
        },
        {
          key: "legalFirstName",
          label: "Legal given",
          sortable: false,
          editable: false,
          class: "w-1",
        },
        {
          key: "usualLastName",
          label: "Usual surname",
          sortable: false,
          editable: false,
          class: "w-1",
        },
        {
          key: "legalMiddleNames",
          label: "Legal middle",
          sortable: false,
          editable: false,
          class: "w-1",
        },
        {
          key: "usualFirstName",
          label: "Usual given",
          sortable: false,
          editable: false,
          class: "w-1",
        },
        {
          key: "usualMiddleNames",
          label: "Usual middle",
          sortable: false,
          editable: false,
          class: "w-1",
        },
        {
          key: "dob",
          label: "Birthdate",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "genderCode",
          label: "Gender",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "schoolName",
          label: "School (SLD)",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "program",
          label: "Program (GRAD)",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "studentGrade",
          label: "Student Grade (GRAD)",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "schoolOfRecord",
          label: "School of Record (GRAD)",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "schoolOfRecordName",
          label: "School of Record name (GRAD)",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "studentStatus",
          label: "Student Status (GRAD)",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "schoolOfRecordindependentAffiliation",
          label: "School independent affiliation (GRAD)",
          sortable: true,
          editable: false,
          class: "w-1",
        },
      ],
      totalElements: "",
      resultsPerPage: 25,
      totalPages: "",
      selectedPage: 1,
      searchByPenMessage: "",
      advancedSearchMessage: "",
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
        // mincode: {
        //   value: "",
        //   contains: false,
        // },
        localId: {
          value: "",
          contains: false,
        },
        birthdateFrom: {
          value: "",
          contains: false,
          error: false,
        },
        birthdateTo: {
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
        usualMiddleNames: {
          value: "",
          contains: false,
        },
      },
    };
  },
  validations: {
    dateObject: {
      maxValue: maxValue(new Date()),
    },
    // advancedSearchInput: {
    //   mincode: {
    //     value: {
    //       numeric: numeric,
    //     },
    //   },
    // },
  },
  created() {},
  components: {
    DisplayTable: DisplayTable,
  },
  computed: {
    dateObject() {
      let d = new Date(this.advancedSearchInput.birthdateFrom.value);
      return this.advancedSearchInput.birthdateFrom.value ? d : null;
    },
    ...mapGetters({
      profile: "getStudentProfile",
      courses: "getStudentCourses",
      exams: "getStudentExams",
      gradStatus: "getStudentGradStatus",
      token: "getToken",
    }),
  },
  methods: {
    paginationRange(index) {
      // if (this.selectedPage == 1 && index <= 5) {
      //   return true;
      // } else if (this.selectedPage <= 5 && index <= this.selectedPage + 5) {
      //   return true;
      // } else if (
      //   index > this.selectedPage - 5 &&
      //   index < this.selectedPage + 5
      // ) {
      //   return true;
      // } else return false;
      if(index > this.totalPages){
        return false;
      }
      return true;
    },
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
      if (this.penInput) {
        this.searchByPenMessage = "";
        this.searchLoading = true;
        this.studentSearchResults = [];
        StudentService.getStudentByPen(this.penInput, this.token)
          .then((response) => {
            if (response.data) {
              this.selectStudent(response.data);
            }
          })
          .catch(() => {
            this.searchLoading = false;
            this.searchByPenMessage =
              "Student cannot be found on the PEN database";
          });
        //pen input check
      }
    },

    findStudentsByAdvancedSearch: function (pageNumber=1 ,pageSize=25) {
      this.selectedPage = pageNumber;
      if(pageNumber != 0){
        pageNumber = pageNumber - 1;
      }
      
      this.advancedSearchMessage = "";
      this.message = "";
      this.errorMessage = "";
      this.$v.$touch();
      // console.log(this.advancedSearchValidate(this.advancedSearchInput));

      if(this.$v.$invalid){
        this.advancedSearchMessage += "Form Validation Error: please correct the form input";
      }
      else if (!this.$v.$invalid && this.advancedSearchValidate(this.advancedSearchInput)) {
        this.advancedSearchLoading = true;
        this.studentSearchResults = [];
        if (!this.advancedSearchInput.birthdateTo.value) {
          this.advancedSearchInput.birthdateTo.value = this.advancedSearchInput.birthdateFrom.value;
        }
        try {
          StudentService.getStudentsByAdvancedSearch(this.advancedSearchInput,this.token,pageNumber,pageSize)
            .then((response) => {
              this.advancedSearchLoading = false;
              this.searchResults = response.data;
              this.studentSearchResults = response.data.gradSearchStudents;
              this.totalElements = this.searchResults.totalElements;
              this.totalPages = this.searchResults.totalPages;
              if (this.searchResults.totalElements > 0) {
                if (this.searchResults.totalElements == 1) {
                  this.advancedSearchMessage = "1 student record found. ";
                } else {
                  this.advancedSearchMessage =
                    this.searchResults.totalElements +
                    " student records found. ";
                }
              } else {
                this.advancedSearchMessage = "No student record found.";
              }
            })
            .catch((err) => {
              this.advancedSearchLoading = false;
              this.advancedSearchMessage = "Student not found";
              this.errorMessage = err;
              // console.log(err);
            });
        } catch (error) {
          this.advancedSearchLoading = false;
          this.advancedSearchMessage = "Advanced Search Error";
          //console.log("Error with webservice");
        }
      }
    },
      showAdvancedSearch: function () {
        this.showAdvancedSearchForm = true;
      },
      setStudentId(id) {
        this.$store.dispatch('setStudentId', id);
      },
      selectStudent: function (student) {
        if(student[0].studentID){
          this.setStudentId(student[0].studentID);
        }
        this.selectedPen = student[0].pen;
        this.$router.push({
          path: `/student-profile/${this.selectedPen}`
        });
        //this.$router.push({ name: "student-profile", params: {pen: this.selectedPen}});
      },

      clearStudent: function () {},

      clearInput: function () {
        this.penInput = "";
        for (var key in this.advancedSearchInput) {
          if (this.advancedSearchInput.hasOwnProperty(key)) {
            this.advancedSearchInput[key].value = "";
            this.advancedSearchInput[key].contains = false;
          }
        }

      },
      advancedSearchValidate(obj){
        //check if all inputs are empty
        let isValid = true;
        let isEmpty = true;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            //console.log(obj[key])
            if (obj[key].value != "") {
              isEmpty = false;
                // if(key == "mincode"){
                //   contains all digits
                //     if(obj[key].value.length >= 1 && obj[key].value.length <= 7){
                //       obj[key].contains = true;
                      
                //     }
                //   add wildcard to mincode if at least 3 digits are included      
                // }//mincode
                if(key == "birthdateFrom") {
                  let dateToCheck = Date.parse(obj[key].value);
                  let today = new Date();
                  if(dateToCheck > today){
                    this.advancedSearchMessage += "The Birthdate From must be greater than today. "
                    isValid = false;
                  }
                }
              }
              //add wildcard to mincode if at least 3 digits are included
            } //mincode
        }
      
      if(isEmpty){
        isValid = false;
        this.advancedSearchMessage += "Enter at least one field to search."
      }

        return isValid;
      },
      isEmpty(obj) {
        let isEmpty = true;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] != "" ) {
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
.results-option-group{
  text-align:right;
  margin-top: 10px;
}
.results-option{
    width: 100px;
    margin-left: 10px;
}
.input-group-append {
    margin-left: -1px;
    position: absolute;
    right: 0;
    z-index: 99;
}
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
  div.error{
    position: absolute;
    top: 77px;
    font-size: 11px;
    color:red;
  }
  .sample-pens {
    float: left;
    clear: both;
    margin-top: 15px;
  }

.fade-enter-active {
  transition: opacity 0.8s;
}

  .search-results-message {
    float: left;
    clear: both;
    
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
  .wild-card-button:hover{
    cursor: pointer;

  }
  .wild-card-button {
    color: #DEE2EB;
    position: absolute;
    right: 21px;
    top: 40px;
    z-index: 10;
    text-decoration: none;
  
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
