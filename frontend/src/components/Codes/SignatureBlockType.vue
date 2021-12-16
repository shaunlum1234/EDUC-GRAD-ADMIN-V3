<template>
  <div>
  <DisplayTable
    title="Signature Block"
    v-bind:items="signatureBlock"
    v-bind:fields="signatureBlockFields"
    id=""
    showFilter="true"
  >
    <!-- <template #cell(effectiveDate)="row">
      {{ row.item.effectiveDate | formatSimpleDate }}
    </template>
    <template #cell(expiryDate)="row">
      {{ row.item.expiryDate | formatSimpleDate }}
    </template>               -->
  </DisplayTable>
  </div>
</template>

<script>
import {
  mapGetters
} from "vuex";
import DisplayTable from "@/components/DisplayTable";
import GraduationCommonService from "@/services/GraduationCommonService.js";


export default {
  name: 'SignatureBlockType',
  components: {
    DisplayTable: DisplayTable,
  },
  created() {
      GraduationCommonService.getDigitalSignaturesBlockTypes(this.token)
      .then((response) => {
      
        this.signatureBlock = response.data;
      })
      // eslint-disable-next-line
      .catch((error) => {
        this.$bvToast.toast("ERROR " + error.response.statusText, {
          title: "ERROR" + error.response.status,
          variant: "danger",
          noAutoHide: true,
        });
      });
  },
  data: function() {
    return {
      signatureBlock: [],
      signatureBlockFields: [
        {
          key: "code",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "label",
          label: "Label",
          sortable: true,
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
        },
        // {
        //   key: "effectiveDate",
        //   label: "Effective date",
        //   sortable: true,
        // },
        // {
        //   key: "expiryDate",
        //   label: "Expiry date",
        //   sortable: true,
        // },
      ],
    };
  },
  computed: {
    ...mapGetters({  
      token: "getToken",
      role: "getRoles"
    }),
  },
  methods: {
  },
};
</script>

<style>
.table th, .table td{
  border-top: none !important;

}</style>
