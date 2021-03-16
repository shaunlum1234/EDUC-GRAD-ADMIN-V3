<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="sm"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}

      </template>
      

      <template #cell(actions)="row">
        <!-- <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          More
        </b-button> -->
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'More' }} Details
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Close' : 'Edit' }}
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
         
        <ul>
<!--          
           <p><strong>row ITEMS: {{row['item']}}:{{value}}</strong></p>
           <p><strong>row FIELDS: {{row['fields']}}:{{value}}</strong></p> -->
           <ul>
              <li v-for="(v,k) in row['item']" :key="k">
                  {{k}}<input :value="v">
                </li>
            </ul>
        
        </ul>
            
          <!--ul>
            <li v-for="(value, key, index) in row.item" :key="key">{{ key }}: {{ value }} {{label}} {{index}} </li> 
          </ul-->
        <b-button size="sm" @click="row.toggleDetails">Save</b-button>
        <b-button size="sm" @click="row.toggleDetails">Cancel</b-button>
        </b-card>

      </template>
    </b-table>
    <!-- <b-table-simple hover small caption-top stacked
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
    </b-table-simple> -->




    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>

  export default {
    props: ['items', 'fields'],
    data() {
      return {
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 20, 50, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    created() {
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>