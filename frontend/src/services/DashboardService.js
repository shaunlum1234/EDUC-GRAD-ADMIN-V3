import axios from "axios";
const apiClient = axios.create({
  baseURL: 'https://educ-grad-batch-graduation-api-77c02f-dev.apps.silver.devops.gov.bc.ca',
});

export default {
    getDashboardInfo(token) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      };
      return apiClient.get("/api/v1/batch/dashboard", { headers });
    }
  };
  