import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export default {
    getDashboardInfo(token) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*.gov.bc.ca",
        Authorization: "Bearer " + token,
      }
      return apiClient.get("/api/v1/batch/dashboard", { headers });
    },
    //Run Regualar Algorithm for users
    runREGALG(token,users) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*.gov.bc.ca",
        Authorization: "Bearer " + token,
      };
      return apiClient.post("/api/v1/batch/specialrun", users, { headers });
    },
    runTVRRUN(token,users) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*.gov.bc.ca",
        Authorization: "Bearer " + token,
      };
      return apiClient.post("/api/v1/batch/tvrspecialrun", users, { headers });
    },    
    getBatchErrors(id, page, token) {
      const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
      return apiClient.get('/api/v1/batch/dashboard/errors/' + id + '?pageNumber=' + page,{ headers });
    },
}