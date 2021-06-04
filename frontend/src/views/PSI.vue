<template>
  <div>
    <h1>Post Secondary Institutions</h1>
    <b-card no-body>
        <b-tabs card>
          <b-tab title="Post Secondary Institutions" active>
            <b-card-text>
              <DisplayTable :items="psi" :fields="psiFields" :showFilter=true :pagination=true title="PSI">
                <template #cell(more)="row">
                    <b-btn
                      variant="outline primary"
                      style="color: #666"
                      size="sm"
                      @click="row.toggleDetails"
                      class="more-button"
                    >
                      <i class="fas fa-sm fa-caret-down"></i>
                    </b-btn>
                  </template>
                  <template #row-details="row">
                    <b-card class="px-0">

                      <ul>        
                          <li v-if="row.item.address1">
                            <strong>Address:</strong> {{ row.item.address1 }}
                          </li>
                          <li v-if="row.item.city">
                            <strong>City:</strong> {{ row.item.city }}
                          </li>                
                          <li v-if="row.item.provinceCode">
                            <strong>Province Code:</strong> {{ row.item.provinceCode }}
                          </li>                      
                          <li v-if="row.item.provinceName">
                            <strong>Province Name:</strong> {{ row.item.provinceName}}
                          </li>
                          <li v-if="row.item.countryCode">
                            <strong>Country Code:</strong> {{ row.item.countryCode }}
                          </li>
                          <li v-if="row.item.postal">
                            <strong>Postal Code:</strong> {{ row.item.postal }}
                          </li>
                          <li v-if="row.item.phone1">
                            <strong>Phone:</strong> {{ row.item.phone }}
                          </li>
                          <li v-if="row.item.fax">
                            <strong>Fax:</strong> {{ row.item.fax }}
                          </li>
                          
                      </ul>
                    </b-card>
                  </template>
              </DisplayTable>
            </b-card-text>
          </b-tab>
        </b-tabs>
    </b-card>
  </div>
</template>

<script>
  import PSIService from '@/services/PSIService.js';
  import DisplayTable from '@/components/DisplayTable.vue';
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "psi",
    components: {
      DisplayTable: DisplayTable,
    },
    data() {
      return {
        psi: {},
        psiFields: [{key:"more", label:""},"psiCode", "psiName", "cslCode", "psisCode", "openFlag", "transmissionMode", "psiGrouping"]
      }
    },

    computed: {
      ...mapGetters({
        token: "getToken"
      }),
    },
    created() {
      PSIService.getPSI(this.token).then((res) => {
        this.psi = res.data;
      }).catch((error) => {
        // eslint-disable-next-line
        console.log('There was an error adding psi information:' + error.response);
      });
    },
    methods: {

    }
  };
</script>

<style scoped>
  .close-record {
    float: right;
  }

  .tab-loading {
    color: green !important;
  }

  .profile-name {
    padding-bottom: 10px;
  }
</style>