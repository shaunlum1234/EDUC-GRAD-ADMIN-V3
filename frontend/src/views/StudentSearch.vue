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
                        <b-form-input id="search-by-pen" type="search" maxlength=9 minlength=9 v-model="penInput" placeholder=""
                         ref="penSearch" v-on:keyup="keyHandler" tabindex="1" class="w-50 float-left">
                        </b-form-input>
                        <button v-if="!searchLoading" v-on:click="findStudentByPen" class="btn btn-primary ml-2 float-left">
                          <i class="fas fa-search"></i> Search
                        </button>
                        <button v-if="searchLoading" class=" btn btn-success ml-2 float-left">
                          <i class="fas fa-search"></i> Search  
                        </button>  
                        &nbsp;&nbsp;<b-spinner v-if="searchLoading" label="Loading">Loading</b-spinner>    
                    </div>
                    <div class="search-results-message my-4 float-left"><strong><span v-if="searchByPenMessage">{{ searchByPenMessage }}</span></strong></div>
                    <div class="my-4 pl-2 float-left"><a v-if="studentHasProgram == false" href="#" > PEN Student Inquiry.</a></div> 
                  </div>
                </form>
                <div v-if="roles == 'debug'" class="sample-pens m-3">
                  Samples: V0.1.6
                  <div class="row col-12">
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(130829708)">130829708</a> SAMPLE 1</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(131263535)">131263535</a> SAMPLE 2</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(138142492)">138142492</a> SAMPLE 3</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(128320223)">128320223</a> SAMPLE 4</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(129049565)">129049565</a> SAMPLE 5</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(129434437)">129434437</a> SAMPLE 6</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(127951309)">127951309</a> SAMPLE 7</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126966324)">126966324</a> SAMPLE 8</div>
              
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(124816158)">124816158</a> CHEONG, ALISON</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(125355511)">125355511</a> SEOL, CARYS</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(125943563)">125943563</a> KEMP, LEVKO</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126018258)">126018258</a> JOHANNSON, BETTY</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126057041)">126057041</a> PENN, BALASARAVANAN</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126187343)">126187343</a> LUSH, ROBERT</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126230010)">126230010</a> MAK, GRAYSEN</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126242304)">126242304</a> LEES, MYA</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126259126)">126259126</a> BYRNE, MARY</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126364835)">126364835</a> CALVERT, EMILISE</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126562321)">126562321</a> ZHANG, PAIGE</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126764307)">126764307</a> RABY, ALDEN</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126832971)">126832971</a> KLEIN, MATTHEW</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126885227)">126885227</a> STORY, REGAN</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126885276)">126885276</a> BURKE, AGATHA</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126889930)">126889930</a> KHAN, TAMARA</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126902329)">126902329</a> LIU, ZOE</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126905694)">126905694</a> WEBBER, RENE</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126966100)">126966100</a> JACK, NAVJEEVAN</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126966324)">126966324</a> STABLER, ZHENGDA</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(126978485)">126978485</a> LAVICTOIRE, CONNIE</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(127126548)">127126548</a> NGUYEN, CHARLES</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(127370773)">127370773</a> SCOVILLE, ROSS</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(127863157)">127863157</a> CROSBY, MINGWEI</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(127912947)">127912947</a> WARLOW, CHAD</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(127951309)">127951309</a> MORRIS, JAKE</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(127958254)">127958254</a> STIMSON, LORRIE</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(127968980)">127968980</a> COURVILLE, AUBREY</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(127972768)">127972768</a> CRAMPTON, SAMANTHA</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(128036977)">128036977</a> POUND, DANIEL</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(128089950)">128089950</a> VARDY, WESLEY</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(128320223)">128320223</a> SMITH, MARVIN</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(128453248)">128453248</a> REDOTA, JOYCELYN</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(128707734)">128707734</a> HOUGEN, JULIEN</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(129049565)">129049565</a> KIM, DEANNA</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(129434437)">129434437</a> MARTINSON, REBECCA</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(129785051)">129785051</a> ROSS, CARLEE</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(130619877)">130619877</a> MCBRIDE, SEPIDEH</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(130725583)">130725583</a> COTTIN, RANDEEP</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(130829708)">130829708</a> TISCH, ESTHER</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(131263535)">131263535</a> DIEP, HAILEY</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(132341660)">132341660</a> HONG, YU LING</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(136557584)">136557584</a> ISHIKAWA, TIMOTHY</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(138142492)">138142492</a> LITCHFIELD, SHIH CHUAN</div>
                    <div class="px-3 col-4"><a href="#" v-on:click="findStudentByPenSample(138142492)">128008364</a> LITCHFIELD , M</div>
                  </div>
                  </div>
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
                          <!-- <b-input-group-append>
                            <b-form-datepicker
                              v-model="advancedSearchInput.birthdateFrom.value"
                              button-only
                              right
                              locale="en-US"
                              aria-controls="datepicker-birthdate-to"
                            ></b-form-datepicker>
                          </b-input-group-append> -->
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
                          <!-- <b-input-group-append>
                            <b-form-datepicker
                              v-model="advancedSearchInput.birthdateTo.value"
                              button-only     
                              right
                              locale="en-US"
                              aria-controls="datepicker-birthdate-to"

                            ></b-form-datepicker>
                          </b-input-group-append> -->
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
                        <button @click="findStudentsByAdvancedSearch()" v-if="!advancedSearchLoading" :class="!this.$v.$invalid?'btn btn-primary':'btn btn-secondary'" tabindex="12">Search</button>
                        <button @click="findStudentsByAdvancedSearch()" v-if="advancedSearchLoading" class="btn btn-success" tabindex="12">Search</button>
                        <button @click="clearInput" class="btn btn-outline-primary mx-2">Reset</button>   
                        &nbsp;&nbsp;<b-spinner v-if="advancedSearchLoading" label="Loading">Loading</b-spinner>             
                      </div>
                    </div>
                  </div>
                  <div v-if="studentSearchResults" class="row">
                    <div class="search-results-message my-4 col-12 col-md-8"><strong><span v-if="advancedSearchMessage">{{ advancedSearchMessage }} {{advancedSearchAPIMessage}}</span></strong></div>
                    <div class="results-option-group col-12 col-md-4">
                      <label v-if="totalPages > 1">Results per page</label>
                      <b-form-select class="results-option" v-if="totalPages > 1" @change="findStudentsByAdvancedSearch()" v-model="resultsPerPage" :options="resultsPerPageOptions" :value="resultsPerPage"></b-form-select>
                    </div>
                  </div>              
                </form>
                <transition name="fade">
                <div v-if="studentSearchResults" class="table-responsive">  
                  <DisplayTable v-if="studentSearchResults.length"  v-bind:items="studentSearchResults" title="Student search results" v-bind:fields="studentSearchResultsFields" id="pen"
                    v-bind:showFilter=false  v-bind:pagination=true>
                      <template  #cell(pen)="data">
                        <router-link :to="'/student-profile/' + data.item.pen + '/' + data.item.studentID">{{ data.item.pen }}</router-link>
                      </template>
                      <template #cell(more)="row">
                        <b-btn
                          variant="outline primary"
                          style="color: #666"
                          size="sm"
                          @click="row.toggleDetails"
                          class="more-button w-100"
                        >
                          <i class="fas fa-sm fa-caret-down"></i>
                        </b-btn>            
                      </template>                  
                      <template #row-details="row">
                        <b-card>
                          <ul>                         
                            <li><strong>Usual given:</strong> {{row.item.usualFirstName}}</li>
                            <li><strong>Usual middle:</strong> {{row.item.usualMiddleNames}}</li>
                            <li><strong>Usual surname:</strong> {{row.item.usualLastName}}</li>
                            <li><strong>Mincode (PEN):</strong> {{row.item.mincode}}</li>
                          </ul>
                        </b-card>
                      </template>                               
                  </DisplayTable>
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
import sharedMethods from '../sharedMethods'

export default {
  name: "studentSearch",
  data() {
    return {
      penSystemMessage:"",
      advancedSearchAPIMessage:"",
      studentHasProgram:true,
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
          key: "more",
          label: "",
          sortable: false,
          editable: false,
          class: "w-1",
        },
        {
          key: "pen",
          label: "PEN",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "legalLastName",
          label: "Legal surname",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "legalFirstName",
          label: "Legal given",
          sortable: true,
          editable: false,
          class: "w-1",
        },
        {
          key: "legalMiddleNames",
          label: "Legal middle",
          sortable: true,
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
        // {
        //   key: "schoolName",
        //   label: "School (SLD)",
        //   sortable: true,
        //   editable: false,
        //   class: "w-1",
        // },
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
      selectedId:"",
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
  },
  created() {
    this.showNotification = sharedMethods.showNotification;
    if(this.savedAdvSearchInput != ""){
      this.advancedSearchInput = this.savedAdvSearchInput;
      this.findStudentsByAdvancedSearch();
    }
  },
  components: {
    DisplayTable: DisplayTable,
  },
  computed: {
    dateObject() {
      let d = new Date(this.advancedSearchInput.birthdateFrom.value);
      return this.advancedSearchInput.birthdateFrom.value ? d : null;
    },
    ...mapGetters({
      savedAdvSearchInput: "getAdvancedSearchProps",
      profile: "getStudentProfile",
      courses: "getStudentCourses",
      exams: "getStudentExams",
      gradStatus: "getStudentGradStatus",
      hasGradStatus: "studentHasGradStatus",
      token: "getToken",
      roles: "getRoles",
    }),
  },
  methods: {
    closeRecord: function () {
        this.$store.commit("unsetStudent");
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
            if (response.data.length != 0) {
              var studentLastName = response.data[0].legalLastName;
              if(response.data[0].program == null || ""){
                this.studentHasProgram = false;
                this.searchByPenMessage = "Student " + studentLastName + " has a PEN but does not have a GRAD system record."
                this.searchLoading = false
              } else {
                this.studentHasProgram = true;
                this.selectStudent(response.data);
              }        
            } else {
              this.searchByPenMessage = "Student cannot be found on the GRAD or PEN database"
              this.searchLoading = false;
              //hides the Pen inqury message
              this.studentHasProgram = true;
            }
          })
          .catch((err) => {
            this.searchLoading = false;
            this.searchByPenMessage = "";
            this.showNotification("danger", err);
          });
        //pen input check
      }
    },
    findStudentsByAdvancedSearch: function () {
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
          StudentService.getStudentsByAdvancedSearch(this.advancedSearchInput,this.token)
            .then((response) => {
              this.advancedSearchLoading = false;
              this.searchResults = response.data;
              this.advancedSearchAPIMessage = response.data.searchMessage;
              this.studentSearchResults = this.searchResults.gradSearchStudents;
              this.totalElements = this.studentSearchResults.length;
              this.totalPages = this.searchResults.totalPages;
              this.$store.dispatch("setAdvancedSearchProps", this.advancedSearchInput);
              if (this.totalElements > 0) {
                if (this.searchResults.totalElements == 1) {
                  this.advancedSearchMessage = "1 student record found. ";
                } else {
                  this.advancedSearchMessage =
                    this.totalElements +
                    " student records found. ";
                }
              } else {
                this.advancedSearchMessage = "No student record found in GRAD.";
              }
            })
            .catch((err) => {
              this.advancedSearchLoading = false;
              this.advancedSearchMessage = "Student not found";
              this.errorMessage = err;
              this.showNotification("danger", "There was an error with the web service.");
              // console.log(err);
            });
        } catch (error) {
          this.advancedSearchLoading = false;
          this.advancedSearchMessage = "Advanced Search Error";
          this.showNotification("danger", "There was an error with the web service.");
          //console.log("Error with webservice");
        }
      }
    },
      showAdvancedSearch: function () {
        this.showAdvancedSearchForm = true;
      },
      selectStudent: function (student) {
        this.selectedPen = student[0].pen;
        this.selectedId = student[0].studentID;
        this.$router.push({
          path: `/student-profile/${this.selectedPen}/${this.selectedId}`
        });
        //this.$router.push({ name: "student-profile", params: {pen: this.selectedPen}});
      },

      clearStudent: function () {},

      clearInput: function () {
        this.penInput = "";
        this.studentSearchResults = "";
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
    color: #d93e45
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


</style>