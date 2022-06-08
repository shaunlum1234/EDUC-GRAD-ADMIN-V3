import ApiService from '../common/apiService';
import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});
export default {
  getAllAssesments(){
    return ApiService.apiAxios.get('/api/v1/assessment')
  },
  // getAllAssesments(token) {
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + token,
  //   };
  //   return apiClient.get("/api/v1/assessment", { headers });
  // },
  getAssesmentByCode(assmtCode, token) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return apiClient.get("/api/v1/assessment/" + assmtCode, { headers });
  },
  // getAllAssesmentRequirements(token) {
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + token,
  //   };
  //   return apiClient.get("/api/v1/assessment/requirement", { headers });
  // },
  getAllAssesmentRequirements() {
    return ApiService.apiAxios.get('/api/v1/assessment/requirement')
  },
  getRuleCourseRequirements(rule, token) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    return apiClient.get("/api/v1/assessment/requirement/rule?rule=" + rule, {
      headers,
    });
  },
  getStudentAssessment(pen, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/assessment/pen/'+ pen + '?sortForUI=true',{ headers });
  }
};
