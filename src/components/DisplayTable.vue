<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col  lg="7" class="pr-5 float-left">
        <b-button v-if="role=='administrator' && !disableCreate" variant="success" @click="addMode = !addMode" class="float-left">{{ addMode ? "Cancel":"Add " + title}}
        </b-button>
      </b-col>
      <b-col v-if="role=='authenticated'" lg="7" class="pr-5 float-left">
      </b-col>
      <b-col lg="5" class="my-1">
        <b-form-group label="Filter" label-for="filter-input" label-cols-sm="3" label-align-sm="right" label-size="sm"
          class="mb-0">
          <b-input-group size="sm">
            <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button class="mr-10" :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      
    </b-row>
    <b-row lg="12" v-if="addMode">
      <div v-for="field in this.fields" v-bind:key="field.key" class="col-6">
        <div v-if="field.key != 'delete' && field.key != 'actions' && field.key != 'more' && field['editable']">
          {{ field.label }} <b-input v-model="itemToAdd[field.key]"></b-input>
        </div>
      </div>
      <b-button variant="outline-primary" @click="addItem" class="float-left btn-outline-primary">Cancel</b-button>
      <b-button variant="success" @click="addItem" class="float-left"><i class="fas fa-plus"></i> Add</b-button>
      
    </b-row>
    <!-- Main table element -->
    SLOTS {{slots}}
    <hr>
    ITEMS {{items}}
    <hr>
     
  <b-table striped hover :items="items">

  </b-table>
    

    <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter"
      :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection" stacked="sm" show-empty striped hover small @filtered="onFiltered">
    
    

      <template v-for="field in editableFields" v-slot:[`cell(${field.key})`]="{ value, item, field }">
        <b-input v-if="itemRow && itemRow[id] === item[id] && !deleteMode" v-model="itemRow[field.key]" :type="field.type  || 'text'"
          :key="field.key" :number="field.isNumber" style="height:auto; padding: 0px;" class="pl-2">
        </b-input>
        <template v-else-if="itemRow && itemRow[id] === item[id] && deleteMode"><div :key="field.key"><del class="text-danger">{{ value }}</del></div></template>
        <template v-else>{{ value }}</template>
      </template>
        
        <template v-slot:cell(this.test)="{ item }">
             <a v-bind:href="item.programCode">{{item.programCode}}</a>
        </template>
   
      <template v-slot:cell(actions)="{ item }">
        <b-button-group v-if="itemRow && itemRow[id] === item[id] && editMode">
          <b-btn variant="outline-primary" size="sm" @click="resetEdit">
            Cancel
          </b-btn>
          <b-btn style="width: 60px;" variant="success" size="sm" @click="saveEdit">
            Save
          </b-btn>

        </b-button-group>
        <b-btn v-else-if="role=='administrator'" variant="primary" size="sm" @click="edit(item)" class="square">
          <i class="fas fa-edit"></i>
        </b-btn>

      </template>


  
      <template v-slot:cell(delete)="{ item }">
        <b-button-group v-if="itemRow && itemRow[id] === item[id] && deleteMode">
          <b-btn variant="outline-primary" size="sm" @click="cancelDelete()">
            Cancel
          </b-btn>
          <b-btn variant="danger" size="sm" @click="deleteItem(item)">
            Delete
          </b-btn>

        </b-button-group>
        <b-btn v-else-if="role=='administrator'" variant="danger" size="sm" @click="confirmDelete(item)"  class="square">
          <i class="fas fa-lg fa-times"></i>
        </b-btn>
      </template>

      <template #cell(more)="row">
        <b-btn variant='info' style="color:white" size="sm" @click="row.toggleDetails">
          <i class="fas fa-lg fa-caret-down"></i>
        </b-btn>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>

    </b-table>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
  import {mapGetters} from "vuex";
  export default {
    props: ['items', 'title', 'fields', 'id', 'create','update','delete', 'slots'],
    data() {
      return {
        test: "programCode",
        disableUpdate: false,
        disableDelete: false,
        disableCreate: false,
        editMode: false,
        deleteMode: false,
        addMode: false,
        itemToAdd: "",
        showConfirm: false,
        checked: "false",
        itemRow: null,
        tableFields: "notloaded",
        editItem: "notloaded",
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 20, 50, {
          value: 100,
          text: "Show a lot"
        }],
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
      ...mapGetters({
        role: "getRoles",
      }),
      editableFields() {
        return this.fields.filter((field) => field.editable);
      },
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return {
              text: f.label,
              value: f.key
            }
          })
      }
    },
    created() {
      //console.log(this.items)
      if(!this.create){
        this.disableCreate = true;
      }
      if(!this.delete){
        this.disableDelete = true;
      } 
      if(!this.update){
          this.disableUpdate = true;
      }
      this.itemToAdd = {
        ...this.items[0]
      };
      for (var i = 0; i < this.fields.length; i++) {
        this.itemToAdd[this.fields[i].key] = "N/A";
      }
     
      console.log("FIELDS" + this.fields);
     
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
    },
    methods: {
      addItem() {
        this.items.push({... this.itemToAdd});
        //this.items.push(this.items[0]);
        this.addItem = false;
        this.addMode = false;
        this.clearAddForm();
        this.$bvToast.toast("Record was Added", {
          title: "Success",
          variant: 'success',
        });
        console.log("Display Table is creating using to vuex: " + this.create);
        console.log(this.$store.dispatch(this.create, this.itemtoAdd));
      },
      clearAddForm() {
        for (var i = 0; i < this.fields.length; i++) {
          this.itemToAdd[this.fields[i].key] = "N/A";
        }
      },
      deleteItem(item) {
        console.log("DELETING: " + item.courseRestrictionId);
        this.items.splice(this.items.indexOf(item), 1)
        this.$bvToast.toast("Record was deleted", {
          title: "Success",
          variant: 'success',
        });
        this.cancelDelete();
        this.deleteMode = false;
      },
      confirmDelete(item) {
        this.deleteMode = true;
        this.editMode = false;
        let doDelete = true;
        if (
          this.itemRow &&
          !confirm(
            "You have unsaved changes, are you sure you want to continue?"
          )
        ) {
          doDelete = false;
        }

        if (doDelete) {
          this.itemRow = {
            ...item
          };
        }
      },
      edit(item) {
        console.log(this.itemRow);
        console.log("UPDATE/EDIT: " + item[this.id]);
        this.editMode = true;
        this.deleteMode = false;
        let doEdit = true;
        if (
          this.itemRow &&
          !confirm(
            "You have unsaved changes, are you sure you want to continue?"
          )
        ) {
          doEdit = false;
        }
        if (doEdit) {
          this.itemRow = {
            ...item
          };
        }
      },
      saveEdit() {
        let item = this.items.find((u) => u[this.id] === this.itemRow[this.id]);
        Object.assign(item, this.itemRow);

        this.resetEdit();
        this.$bvToast.toast("Record was saved/updated", {
          title: "Success",
          variant: 'success',
        });
      },
      cancelDelete() {
        this.itemRow = null;
        this.deleteMode = false;
      },
      resetEdit() {
        this.itemRow = null;
        this.editMode = false;
      },
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
<style scoped>

</style>