<template>
  <b-container fluid>
    <!-- User Interface controls -->   
    <b-btn v-if="isAdmin && updateAllowed" v-bind:class="this.quickEdit?'btn-success':'btn-primary'" class="float-right" @click="toggleQuickEdit"><i class="far fa-edit"></i> Quick Edit</b-btn>
    <b-row>
      <b-col lg="7" class="px-0 float-left">
        <b-button v-if="role=='administrator' && createAllowed" variant="success" @click="addMode = !addMode" class="float-left">{{ addMode ? "Cancel":"Add " + title}}
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
      <b-button variant="outline-primary" @click="cancelAddItem" class="float-left btn-outline-primary">Cancel</b-button>
      <b-button variant="success" @click="addItem" class="float-left"><i class="fas fa-plus"></i> Add</b-button>
      
    </b-row>

    <!-- Main table element -->
     
    
    <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter"
      :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection" stacked="sm" show-empty striped hover small @filtered="onFiltered">
    
        
      <template v-for="field in editableFields" v-slot:[`cell(${field.key})`]="{ value, item, field }">
       
        <b-input v-if="itemRow && itemRow[id] === item[id] && !deleteMode" v-on:keyup="validateInput" v-model="itemRow[field.key]" :type="field.type  || 'text'"
          :key="field.key" :number="field.isNumber" style="height:auto; padding: 0px;" class="pl-2">
        </b-input>
        
        <template v-else-if="itemRow && itemRow[id] === item[id] && deleteMode"><div :key="field.key"><del class="text-danger">{{ value }}</del></div></template>
        <template v-else> <div class="px-2" @click='edit(item)' v-bind:key="field.key"> {{ value }} </div></template>
      </template>
   
      <template v-slot:cell(actions)="{ item }">
        <b-button-group v-if="itemRow && itemRow[id] === item[id] && editMode">
          <b-btn style="width: 60px;" variant="success" size="sm" @click="saveEdit">
            Save
          </b-btn>
          <b-btn variant="outline-primary" size="sm" @click="resetEdit">
            Cancel
          </b-btn>
        </b-button-group>
        <b-btn v-else-if="role=='administrator'" variant="primary" size="sm" @click="edit(item)" class="square">
          <i class="fas fa-edit"></i>
        </b-btn>
      </template>

  
      <template v-slot:cell(delete)="{ item }">
        <b-button-group v-if="itemRow && itemRow[id] === item[id] && deleteMode">
          <b-btn variant="danger" size="sm" @click="deleteItem(item)">
            Delete
          </b-btn>
          <b-btn variant="outline-primary" size="sm" 
          @click="cancelDelete()">
            Cancel
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
        quickEdit: false,
        isAdmin: false,
        updateAllowed: false,
        deleteAllowed: false,
        createAllowed: false,
        editMode: false,
        deleteMode: false,
        addMode: false,
        itemToAdd: [],
        showConfirm: false,
        checked: "false",
        itemRow: null,
        tableFields: "notloaded",
        editItem: "notloaded",
        totalRows: 1,
        currentPage: 1,
        perPage: 100,
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

      //Set up permissions from role
      this.setAdmin(this.role);
      
      //add Default Columns for table
      this.fields.unshift({
        key: 'more', 
        label: 'More'
      });
      //remove Columns based on permssions, create, update and delete props
      if(this.create && this.isAdmin){
        this.createAllowed = true;
      }
      if(this.update && this.isAdmin){
          this.updateAllowed = true;
           this.fields.push({
            key: 'actions',
            class: 'text-right',
            label: 'Edit'
          });
      }
      if(this.delete && this.isAdmin){
        this.deleteAllowed = true;
          this.fields.push({
            key: 'delete',
            class: 'text-left',
            label: 'Delete'
          });
      } 

      //this.itemToAdd = JSON.parse(JSON.stringify(this.items[0]));
      this.itemToAdd = {... this.items[0]} ;
      
      for(var i = 0; i < this.fields.length; i++){
        console.log(this.itemToAdd[this.fields[i].key]);
        this.itemToAdd[this.fields[i].key] = "";
      }
    
      // for (var i = 0; i < this.fields.length; i++) {
      //   this.itemToAdd[this.fields[i].key] = "N/A";
      // }

      console.log("FIELDS" + this.fields);
      console.log("CREATED" + this.itemsToAdd);
     
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length;
    },
    methods: {
      toggleQuickEdit(){
        this.quickEdit = !this.quickEdit;
      },
      validateInput: function(e){
        if (e.keyCode === 27){
          this.resetEdit()
        
        }else if (e.keyCode === 13) {
          if(this.quickEdit){
            this.saveEdit();
          }
        }
        
        
      },
      setAdmin(role){
        console.log("ROLE : " + role);
        if(role == "administrator"){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
      },
      addItem() {
        var newItem = this.itemToAdd;
        this.items.push(newItem);
      
        this.addMode = false;
        
        this.$bvToast.toast("Record was Added", {
          title: "Success",
          variant: 'success',
        });
        console.log(this.itemToAdd);
        this.$store.dispatch(this.create, this.itemToAdd);
    
      },
      cancelAddItem() {
        this.addMode = false;
      },
      deleteItem(item) {
        console.log("DELETING: " + item[this.id]);
        this.$store.dispatch(this.delete, item[this.id]);
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
        this.editMode = true;
        this.deleteMode = false;
        let doEdit = true;
        if(!this.quickEdit){
          if ((this.itemRow && 
              !confirm(
                "You have unsaved changes, are you sure you want to continue?"
              ) )
          ) {
            doEdit = false;
          }
        }
        if (doEdit) {
          this.itemRow = {
            ...item
          };
          console.log("EDITED ROW")
        }
      },
      saveEdit() {
        let item = this.items.find((u) => u[this.id] === this.itemRow[this.id]);
        Object.assign(item, this.itemRow);
        this.$store.dispatch(this.update, item);
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