 
<template>    
 
<div>
{{searchAPI}}
{{searchAPIFields}}
                          <b-container class="p-3">
                              <b-row align-v="stretch" class="row-eq-height">
                                <b-col>
                                  <label class="col-6 p-0">Mincode</label>
                                </b-col>
                                <b-col>
                                    <label class="col-6 p-0">School name</label>
                                </b-col>
                                
                              </b-row>
                              <b-row align-v="stretch" class="row-eq-height">
                                <b-col>
                                  <div href="#"
                                    v-on:click="search.mincode.contains = !search.mincode.contains"
                                    v-bind:class="{active: search.mincode.contains}"
                                    class="wild-card-button"
                                    v-b-tooltip.hover title="Mincode contains"
                                  >
                                    [.*]
                                    </div>
                                  <b-input v-model="search.mincode.value" placeholder="" id="mincode"/>
                                  
                                </b-col>
                                <b-col>
                                  <div href="#"
                                    v-on:click="search.schoolName.contains = !search.schoolName.contains"
                                    v-bind:class="{active: search.schoolName.contains}"
                                    class="wild-card-button"
                                    v-b-tooltip.hover title="School name contains"
                                  >
                                    [.*]
                                  </div>
                                  <b-input v-model="search.schoolName.value" placeholder="" id="schoolName"/>
                     
                                </b-col>
                              </b-row>
                              <b-row class="p-3">
                                <b-col align-self="baseline">
                                  <div class="row">                                
                                    <div class="advanced-search-button">
                                      <button v-on:click="submit" v-if="!searchLoading" class="btn btn-primary" tabindex="6">Search</button>
                                      <button  class="btn btn-success" v-if="searchLoading">Search</button>
                                      <button  @click="clearInput" class="btn btn-outline-primary mx-2">Reset</button>                
                                    </div>   
                                  </div>
                                </b-col>
                              </b-row>
                              <div v-if="totalResults > 0" class="row">
                                <div class="search-results-message my-3 col-12 col-md-8"><strong>{{ totalResults }}</strong> schools records found.</div>
                              </div>   
                              <div v-if="searchMessage" class="row">
                                    <div class="search-results-message my-2 col-12 col-md-8"><strong>{{ searchMessage }}</strong></div>
                                  </div>  
                            </b-container> 

</div>
   
</template>
  
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    message: String,
    searchAPI: String,
    searchAPIFields:{}
    
  },
  created() {
    //Check for any messages from routes
  },
   data() {
      return {
        totalResults: "",
        searchMessage: "",
        searchLoading: false,
        search: {
          schoolName:{
            value:"",
            contains:false
          },
          mincode:{
            value:"",
            contains:false
          }
        },
        //language: [{ text: 'Select Language', value: null }, { text: 'EN', value: 'E' },{ text: 'FR', value: 'F' }],
      }
  },
  methods: {
    ...mapActions({
      searchAction: "searchSchools"
    }),
    clearInput(){
        console.log("clear");
    },
    // Triggered when `childToParent` event is emitted by the child.
    submit() {
      //go to webservices
      //then
      let searchResults = this.searchAction(this.search);
      console.log("search results")
      console.log(searchResults)
      this.$emit('searchResults', searchResults)
    }
  }


};

</script>
<style scoped>
.message{
  text-align:center;
  z-index:1;
}

</style>
