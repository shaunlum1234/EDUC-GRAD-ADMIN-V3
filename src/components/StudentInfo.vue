<template>
  <div class="container">
    <div>
            <h2>Student information</h2>
            <div class="card" style="width: 100%">
              <div class="card-body">
                <h2 class="card-title">{{ studentInfo.pen }}</h2>
                <h3 class="card-subtitle mb-2 text-muted">
                  {{ studentInfo.studSurname }}, {{ studentInfo.studGiven }}
                  {{ studentInfo.studMiddle }}
                </h3>
                <ul>
                  <li>
                    <strong>Graduation Program: </strong>{{ studentInfo.gradRequirementYear }}
                  </li>
                  <li>
                    <strong>Grade: </strong>{{ studentInfo.studentGrade }}
                  </li>
                  <li>
                    <strong>Date of Birth:</strong> {{ studentInfo.studBirth }}
                  </li>
                  <li><strong>Sex:</strong> {{ studentInfo.studSex }}</li>
                  <li>
                    <strong>Status: </strong>{{ studentInfo.studentStatus }}
                  </li>
                  <li>
                    <strong>Archived:</strong> {{ studentInfo.archiveFlag }}
                  </li>
                  <li><strong>School: </strong>{{ studentInfo.schoolName }}</li>
                  <li>
                    <strong>Student Address:</strong><br />
                    {{ studentInfo.address1 }} {{ studentInfo.address2 }}<br />
                    {{ studentInfo.city }}, {{ studentInfo.provinceCode }}
                    {{ studentInfo.provinceName }}<br />
                    {{ studentInfo.postalCode }}, {{ studentInfo.countryCode }}
                    {{ studentInfo.countryName }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StudentInfo",
  computed: {
    ...mapGetters({
      studentInfo: "getStudentProfile"
    }),
  },
  created() {

  }

};
</script>

<style></style>
