<template>
    <div>
  <!-- <div class="requirements-met-and-not-met"> -->
         {{test}}
          <!-- <div class="requirements-met">
             
            <b-card
              header="Requirements met"
              v-if="studentGradStatus.studentGradData"
              no-body
              class="w-100"
            >
              <b-card-text class=" m-3">
               <b-table :items="requirementsMet"  small
                  striped></b-table> 
              </b-card-text>
            </b-card>
           
          </div>

          
          <div class="requirements-not-met">
            <b-card
              header="Nongrad Reasons"
              class="w-100"
            >
              <b-card-text v-if="studentGradStatus.studentGradData">

                <div v-if="!nongradReasons">
                  <ul>
                    <li>All graduation requirements have been met</li>
                  </ul>
                </div>
                <div v-else>
                   
                  <b-table :items="nongradReasons"  small
                  striped></b-table> 
       
                </div>
              </b-card-text>
            </b-card>
          </div>
        </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StudentGradStatusProjected",
  data() {
    return {
      test: "hello",
   }
  },
  method:{
    update(value){
      // console.log("Child");
      this.test = value;
    }
  },
  computed: {
    ...mapGetters({
    }),
  },
  created() {},
};
</script>

<style scoped>
</style>
