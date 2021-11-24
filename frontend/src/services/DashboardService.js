import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
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
  