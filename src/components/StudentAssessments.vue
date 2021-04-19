<template>
  <div >
    <DisplayTable :items="assessments" :fields="fields" showFilter=true>
        <template #cell(assessmentName)="row">
          <div class="d-flex flex-column text-md-left">
              <div class="">
                <b-button
                  :id="
                    'popover-button-event' +
                    row.item.assessmentCode +
                    row.item.sessionDate
                  "
                  variant="link"
                  class="m-0 p-0 text-left"
                  >
                    {{row.item.assessmentName}}
                  </b-button
                >
              </div>
              <b-popover
                :ref="'popover'+row.item.assessmentCode +
                  row.item.sessionDate"
                triggers="hover focus"
                :target="
                  'popover-button-event' +
                  row.item.assessmentCode +
                  row.item.sessionDate
                "
                :title="row.item.assessmentName"
              >
                <table>
                  <tr>
                    <td>Assessment Code: {{row.item.assessmentDetails.assessmentCode}}</td>
                  </tr>
                  <tr>
                    <td> Asessment Name: {{row.item.assessmentDetails.assessmentName}} </td>
                  </tr>
                  <tr>
                    <td>Language: {{row.item.assessmentDetails.language}}</td>
                  </tr>
                  <tr>
                    <td>Start Date: {{row.item.assessmentDetails.startDate}}</td>
                  </tr>
                  <tr>
                    <td>End Date: {{row.item.assessmentDetails.endDate}}</td>
                  </tr>
                </table>
                 
              </b-popover>
            </div>
        </template>
        <template #cell(more)="row">
          <b-btn
            v-if="row.item.hasRelatedCourse == 'Y'"
            variant="outline primary"
            style="color: #666"
            size="xs"
            @click="row.toggleDetails"
          >
            <i class="fas fa-sm fa-caret-down"></i>
          </b-btn>
        </template>
        <template #row-details="row">
          <b-card class="px-0">
            <table>
              <tbody>
                <tr>
                  <td>Related Course {{ row.item.relatedCourse }}</td>
                </tr>
                <tr>
                  <td>Related Levelt {{ row.item.relatedLevel }}</td>
                </tr>
                <tr>
                  <td>Alternate Course Name {{ row.item.relatedCourse }}</td>
                </tr>
                <tr>
                  <td>Best School Percent {{ row.item.bestSchoolPercent }}</td>
                </tr>
                <tr>
                  <td>Best Exam Percentt {{ row.item.bestExamPercent }}</td>
                </tr>
                <tr>
                  <td>Assessment Equivt {{ row.item.genericCourseType }} </td>
                </tr>
              </tbody>
            </table>
          </b-card>
        </template>
      </DisplayTable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DisplayTable from "@/components/DisplayTable.vue";
export default {
  name: "StudentAssessments",
  components: {
    DisplayTable: DisplayTable
  },
  props: {},
  computed: {
    ...mapGetters({
      assessments: "getStudentAssessments",
    }),
  },
  data: function() {
    return {
      fields: [
        { key: "more", label: "" },
        {
          key: "assessmentCode",
          label: "Code",
          sortable: true,
          sortDirection: "desc",
          class: "text-md-left",
        },
        {
          key: "sessionDate",
          label: "Session",
          sortable: true,
          class: "text-md-center",
        },
        {
          key: "specialCase",
          label: "Special Case",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "exceededWriteFlag",
          label: "Exceeded Writes",
          sortable: true,
          sortDirection: "desc",
          class: "text-md-center"
        },
        {
          key: "proficiencyScore",
          label: "Proficiency Score",
          sortable: true,
          sortDirection: "desc",
          class: "text-md-center"
        },        
        {
          key: "assessmentName",
          label: "Name",
          sortable: true,
          sortDirection: "desc",
          class: "text-left w-50"
        },
      ]
    }
  },
  methods: {

  },
};
</script>

<style>
.table th, .table td{
  border-top: none !important;
}
</style>
