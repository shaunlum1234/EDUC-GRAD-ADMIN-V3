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
                    <div class="search w-100">
                        <label for="search-by-pen" class="float-left w-100">Search by PEN:</label>
                        
                        <b-form-input id="search-by-pen" size="lg" type="search" v-model="penInput" placeholder=""
                         ref="penSearch" v-on:keyup="keyHandler" tabindex="1" class="w-50 float-left">
                        </b-form-input>
                        <button v-if="!searchLoading" v-on:click="findStudentByPen" class="btn btn-primary mt-2 float-left">
                          <i class="fas fa-search"></i> Search
                        </button>
                        <button v-if="searchLoading" class=" btn btn-primary mt-2 float-left">
                          <i class="fas fa-search"></i> Search 
                        </button>
                        <b-spinner v-for="variant in variants" :variant="variant" :key="variant" v-show="searchLoading"
                      class="loading-spinner float-left"></b-spinner>
                        
                  
                    </div>
                    <div class="search-results-message"><strong><span v-if="searchByPenMessage">{{ searchByPenMessage }}</span></strong></div>
                    

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
                {{advancedSearchInput.birthdateTo.value}}
                <form v-on:submit.prevent>
                  <!-- advanced Search -->


                  <div class="advanced-search-form">
                    <div class="row my-3">
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Legal Surname</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.legalLastName.contains = !advancedSearchInput.legalLastName.contains"
                          v-bind:class="{active: advancedSearchInput.legalLastName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="Legal Surname starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.legalLastName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="1" />
                      </div>
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Legal Given</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.legalFirstName.contains = !advancedSearchInput.legalFirstName.contains"
                          v-bind:class="{active: advancedSearchInput.legalFirstName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="Legal Given starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.legalFirstName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="2" />
                      </div>
                      
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Legal Middle</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.legalMiddleNames.contains = !advancedSearchInput.legalMiddleNames.contains"
                          v-bind:class="{active: advancedSearchInput.legalMiddleNames.contains}"
                          class="wild-card-button" v-b-tooltip.hover title="Legal Middle starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.legalMiddleNames.value" placeholder=""
                          v-on:keyup=" keyHandler" tabindex="3" />
                      </div>
                      <div class="advanced-search-field  col-12 col-md-2">
                        <label>Gender</label>
                        <!-- <b-input v-model="advancedSearchInput.gender.value" placeholder="" v-on:keyup="keyHandler"
                          tabindex="4" /> -->
                         <b-form-select v-model="advancedSearchInput.gender.value" :options="genderOptions" tabindex="4"></b-form-select>  
                      </div>
                      <div class="advanced-search-field  col-12 col-md-2">
                        <label for="datepicker-birthdate-from">Birthdate FROM</label>
                        <!-- <b-input v-model="advancedSearchInput.birthdateFrom.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="5" /> -->
                        <b-input-group class="mb-3">
                          <b-form-input
                            id="datepicker-birthdate-from"
                            v-model="advancedSearchInput.birthdateFrom.value"
                            type="text"
                            placeholder="YYYY-MM-DD"
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
                              @context="onContext"
                            ></b-form-datepicker>
                          </b-input-group-append>
                        </b-input-group>    
                      </div>
                      <div class="advanced-search-field  col-12 col-md-2">
                        <label for="datepicker-birthdate-to">Birthdate TO</label>
                        <!-- <b-input v-model="advancedSearchInput.birthdateTo.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="6" /> -->
                        <b-input-group class="mb-3">
                          <b-form-input
                            id="datepicker-birthdate-to"
                            v-model="advancedSearchInput.birthdateTo.value"
                            type="text"
                            placeholder="YYYY-MM-DD"
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
                              @context="onContext"
                            ></b-form-datepicker>
                          </b-input-group-append>
                        </b-input-group>     
                      </div>
                    </div>

                    <div class="row">
                       <div class="advanced-search-field col-12 col-md-2">
                        <label>Usual Surname</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.usualLastName.contains = !advancedSearchInput.usualLastName.contains"
                          v-bind:class="{active: advancedSearchInput.usualLastName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="Usual Surname starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.usualLastName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="7" />
                      </div>
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Usual Given</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.usualFirstName.contains = !advancedSearchInput.usualFirstName.contains"
                          v-bind:class="{active: advancedSearchInput.usualFirstName.contains}" class="wild-card-button"
                          v-b-tooltip.hover title="Usual Given starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.usualFirstName.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="8" />
                      </div>
                      
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Usual Middle</label>
                        <div href="#"
                          v-on:click="advancedSearchInput.usualMiddleNames.contains = !advancedSearchInput.usualMiddleNames.contains"
                          v-bind:class="{active: advancedSearchInput.usualMiddleNames.contains}"
                          class="wild-card-button" v-b-tooltip.hover title="Usual Middle starts with">
                          [.*]
                        </div>
                        <b-input v-model="advancedSearchInput.usualMiddleNames.value" placeholder=""
                          v-on:keyup=" keyHandler" tabindex="9" />
                      </div>  
                      <div class="advanced-search-field col-12 col-md-2">
                        <label>Local ID</label>
                        <b-input v-model="advancedSearchInput.localId.value" placeholder="" v-on:keyup=" keyHandler"
                          tabindex="10" />
                      </div>
                      <div class="advanced-search-field  col-12 col-md-2">
                        <label>Mincode</label>
                        <b-input v-model="advancedSearchInput.mincode.value" placeholder=""
                          v-on:keyup="keyHandler" tabindex="11" />
                      </div>     
                    </div>

                    <div class="row">                              
                      <div class="advanced-search-button">
                        <button @click="findStudentsByAdvancedSearch" v-if="!advancedSearchLoading"
                          class="btn btn-primary" tabindex="12">Search</button>
                        <button v-if="advancedSearchLoading" class="btn btn-success">Search</button>
                        <button @click="clearInput" class=" btn btn-primary mx-2">Clear</button>
                      </div>
                      <b-spinner v-for="variant in variants" :variant="variant" :key="variant"
                        v-show="advancedSearchLoading" class="advanced-loading-spinner"></b-spinner>
                    </div>
                  </div>
                  <div class="search-results-message"><strong><span v-if="advancedSearchMessage">{{ advancedSearchMessage }}</span></strong></div>
                </form>
                <transition name="fade">
                  <DisplayTable v-if="studentSearchResults.length" v-bind:items="studentSearchResults" title="Student search results" v-bind:fields="studentSearchResultsFields" id="id"
                    v-bind:pen="pen">
                  </DisplayTable>
                </transition>
                  <nav aria-label="Page Navigation">
                    <ul class="pagination">
                      <li v-for="index in totalPages" :key="index" v-bind:class="{'page-item':true, active:index == selectedPage}"><a class="page-link" href="#" v-on:click="advancedSearchPagination(index, 10)">{{ index  }}</a></li>
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
        genderOptions: [
          { value: null, text: 'Please select an option' },
          { value: 'M', text: 'Male' },
          { value: 'F', text: 'Female' },
          { value: 'X', text: 'Gender Diverse' },
          { value: 'U', text: 'Unknown' }
        ],
        studentSearchResults: {
    "gradSearchStudents": [
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a018d881f17",
            "pen": "102653094",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "ABIGAIL",
            "legalLastName": "SMITH",
            "dob": "1983-07-27",
            "sexCode": "F",
            "genderCode": "F",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "ABIGAIL",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "V4P1W6",
            "mincode": "10200001",
            "localID": null,
            "gradeCode": "11",
            "gradeYear": "0",
            "demogCode": "F",
            "statusCode": "A",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        },
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a2956f15c90",
            "pen": "121939185",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "AILEEN",
            "legalLastName": "SMITH",
            "dob": "1998-12-23",
            "sexCode": "M",
            "genderCode": "M",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "AILEEN",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "Y1A3W1",
            "mincode": "04499176",
            "localID": null,
            "gradeCode": "10",
            "gradeYear": "0",
            "demogCode": "A",
            "statusCode": "A",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        },
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a0641737be3",
            "pen": "105120950",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "ALEXANDER",
            "legalLastName": "SMITH",
            "dob": "1983-02-05",
            "sexCode": "M",
            "genderCode": "M",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "ALEXANDER",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "V2T4N2",
            "mincode": "10200001",
            "localID": null,
            "gradeCode": null,
            "gradeYear": null,
            "demogCode": "F",
            "statusCode": "A",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        },
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a293729513b",
            "pen": "121568513",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "ALEXANDER",
            "legalLastName": "SMITH",
            "dob": "1988-06-26",
            "sexCode": "F",
            "genderCode": "F",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "ALEXANDER",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "V9B0K6",
            "mincode": "10396734",
            "localID": null,
            "gradeCode": "12",
            "gradeYear": "2005",
            "demogCode": "A",
            "statusCode": "A",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        },
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a4795af48a8",
            "pen": "137852885",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "ALEXIS",
            "legalLastName": "SMITH",
            "dob": "1994-11-21",
            "sexCode": "F",
            "genderCode": "F",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "ALEXIS",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "V5X2L7",
            "mincode": "10200022",
            "localID": null,
            "gradeCode": null,
            "gradeYear": "0",
            "demogCode": "A",
            "statusCode": "A",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        },
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a1c2a590102",
            "pen": "115774374",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "ANTHONY",
            "legalLastName": "SMITH",
            "dob": "1991-12-20",
            "sexCode": "M",
            "genderCode": "M",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "ANTHONY",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "V6N2G6",
            "mincode": "06262019",
            "localID": null,
            "gradeCode": "05",
            "gradeYear": null,
            "demogCode": "F",
            "statusCode": "A",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        },
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a2e388d7c8d",
            "pen": "124910175",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "ASHLEY",
            "legalLastName": "SMITH",
            "dob": "2001-06-13",
            "sexCode": "M",
            "genderCode": "M",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "ASHLEY",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "V0B1M0",
            "mincode": "04141002",
            "localID": null,
            "gradeCode": "08",
            "gradeYear": "0",
            "demogCode": "A",
            "statusCode": "A",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        },
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a00e38070b1",
            "pen": "101661981",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "BENITO ROGER GRUBEN",
            "legalLastName": "SMITH",
            "dob": "1972-12-14",
            "sexCode": "F",
            "genderCode": "F",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "BENITO ROGER GRUBEN",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "V9R1P4",
            "mincode": "10200027",
            "localID": null,
            "gradeCode": null,
            "gradeYear": "0",
            "demogCode": "F",
            "statusCode": "A",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        },
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a425578720d",
            "pen": "134209386",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "CAROLE",
            "legalLastName": "SMITH",
            "dob": "1965-04-04",
            "sexCode": "M",
            "genderCode": "M",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "CAROLE",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "V3W1M1",
            "mincode": "10200029",
            "localID": null,
            "gradeCode": null,
            "gradeYear": "0",
            "demogCode": "A",
            "statusCode": "A",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        },
        {
            "studentID": "ac339d70-7649-1a2e-8176-4a47c6bd30cb",
            "pen": "139178891",
            "legalFirstName": "JOHN",
            "legalMiddleNames": "CAROLYN",
            "legalLastName": "SMITH",
            "dob": "2003-07-27",
            "sexCode": "M",
            "genderCode": "M",
            "usualFirstName": "JOHN",
            "usualMiddleNames": "CAROLYN",
            "usualLastName": "SMITH",
            "email": null,
            "emailVerified": "Y",
            "deceasedDate": null,
            "postalCode": "V4M2C6",
            "mincode": "08181011",
            "localID": null,
            "gradeCode": "06",
            "gradeYear": "2014",
            "demogCode": "A",
            "statusCode": "M",
            "memo": null,
            "trueStudentID": null,
            "program": null,
            "schoolOfRecord": null,
            "schoolOfRecordName": null,
            "schoolOfRecordindependentAffiliation": null,
            "studentGrade": null,
            "studentStatus": null
        }
    ],
    "pageable": {
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 10,
        "paged": true,
        "unpaged": false
    },
    "totalPages": 11,
    "totalElements": 106,
    "size": 10,
    "number": 0,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "numberOfElements": 10
},
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
            key: 'genderCode',
            label: 'Gender',
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
          mincode: {
            value: "",
            contains: false,
          },
          localId: {
            value: "",
            contains: false,
          },
          birthdateFrom: {
            value: "",
            contains: false,
            error:false
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
        }
      };
    },
    created() {},
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
              this.searchByPenMessage = "Student not found";
            });
          //pen input check
        }
      },
      findStudentsByAdvancedSearch: function () {
        this.message = "";
        this.errorMessage = "";
        // console.log(this.advancedSearchValidate(this.advancedSearchInput));
        if (this.advancedSearchValidate(this.advancedSearchInput)) {
          this.advancedSearchLoading = true;
          this.studentSearchResults = [];
          if(!this.advancedSearchInput.birthdateTo.value){
            this.advancedSearchInput.birthdateTo.value = this.advancedSearchInput.birthdateFrom.value
          }
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
                if(this.searchResults.totalElements > 0){
                  this.advancedSearchMessage = this.searchResults.totalElements + " student(s) found. Showing " + this.searchResults.numberOfElements + " results. Number of Pages: " + this.searchResults.totalPages;
                }else{
                  this.advancedSearchMessage = this.searchResults.totalElements + " student(s) found. Showing " + this.searchResults.numberOfElements + " results. Number of Pages: " + this.searchResults.totalPages;
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
      advancedSearchPagination: function (pageNumber, pageSize) {
        this.advancedSearchMessage = "";
        this.errorMessage = "";
        this.selectedPage = pageNumber;
        if (!this.isEmpty(this.advancedSearchInput)) {
          this.advancedSearchLoading = true;
          this.studentSearchResults = [];
          if(!this.advancedSearchInput.birthdateTo.value){
            this.advancedSearchInput.birthdateTo.value = this.advancedSearchInput.birthdateFrom.value
          }
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

    

          for (var key in this.advancedSearchInput) {
            if (this.advancedSearchInput.hasOwnProperty(key)) {
              this.advancedSearchInput[key].value = "";
              this.advancedSearchInput[key].contains = false;
            }
          }
  

        // this.advancedSearchInput = {
        //   legalFirstName: {
        //     value: "",
        //     contains: false,
        //   },
        //   legalLastName: {
        //     value: "",
        //     contains: false,
        //   },
        //   legalMiddleNames: {
        //     value: "",
        //     contains: false,
        //   },
        //   gender: {
        //     value: "",
        //     contains: false,
        //   },
        //   mincode: {
        //     value: "",
        //     contains: false,
        //   },
        //   localId: {
        //     value: "",
        //     contains: false,
        //   },
        //   birthdateFrom: {
        //     value: "",
        //     contains: false,
        //   },
        //   birthdateTo: {
        //     value: "",
        //     contains: false,
        //   },
        //   usualFirstName: {
        //     value: "",
        //     contains: false,
        //   },
        //   usualLastName: {
        //     value: "",
        //     contains: false,
        //   },
        //   usualMiddleNames: {
        //     value: "",
        //     contains: false,
        //   },
        //}
      },
      advancedSearchValidate(obj){
        //check if all inputs are empty
        let isValid = true;
        let isEmpty = true;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            //console.log(obj[key])
            if (obj[key].value != "") {
              console.log("not empty")
              isEmpty = false;
                if(key == "mincode"){
                  //contains all digits
                  if(!isNaN(obj[key].value) === false){
                    this.advancedSearchMessage = "Mincode must contain digits only"
                    isValid = false;
                  }else {
                    if(obj[key].value.length >= 1 && obj[key].value.length <= 7){
                      this.advancedSearchMessage += "Add wild card"
                      obj[key].contains = true;
                    }else if(obj[key].value.length != 8){
                      this.advancedSearchMessage += "mincode must be between 1-8 digits. "
                      isValid = false;
                    }
                  }
                  //add wildcard to mincode if at least 3 digits are included      
                }//mincode
                if(key == "birthdateFrom") {
                  let dateToCheck = Date.parse(obj[key].value);
                  let today = new Date();
                  if(dateToCheck > today){
                    this.advancedSearchMessage += "The Birthdate From must be greater than today. "
                    isValid = false;
                  }
                }
            }
            
          }
        }
        if(isEmpty){
          isValid = false;
          this.message += "Enter at least one field to search."
        }
        //this.message += "VALID:" + isValid;
      
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