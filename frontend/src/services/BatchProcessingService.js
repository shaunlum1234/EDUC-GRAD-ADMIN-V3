import ApiService from '../common/apiService';

export default {
  getDashboardInfo() {
    return ApiService.apiAxios.get('/api/v1/batch/dashboard');
  },
  runREGALG(users) {
    return ApiService.apiAxios.get('/api/v1/batch/specialrun' + users);
  },
  runTVRRUN(users) {
    return ApiService.apiAxios.get('/api/v1/batch/tvrspecialrun' + users);
  },
  runDISTRUN(users,credentialType) {
    if(credentialType == "OT"){
      return ApiService.apiAxios.get('/api/v1/batch/userrequestdisrun/OT' + users);
    }else if(credentialType == "OC"){
      return ApiService.apiAxios.get('/api/v1/batch/userrequestdisrun/OC' + users);
    }else if(credentialType == "RC"){
      return ApiService.apiAxios.get('/api/v1/batch/userrequestdisrun/RC' + users);
    }
  },     
  runOriginalCertificateDISTRUN(users) {
    return ApiService.apiAxios.get('/api/v1/batch/userrequestdisrun/OC' + users);
  },   
  getBatchErrors(id, page) {
    return ApiService.apiAxios.get('/api/v1/batch/dashboard/errors/'  + id + '?pageNumber=' + page);
  },
  getBatchSummary() {
    return ApiService.apiAxios.get('/api/v1/batch/dashboard/summary');
  },    
    // getDashboardInfo(token) {
    //   const headers = {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   }
    //   return apiClient.get("/api/v1/batch/dashboard", { headers });
    // },
    //Run Regualar Algorithm for users
    // runREGALG(token,users) {
    //   const headers = {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   };
    //   return apiClient.post("/api/v1/batch/specialrun", users, { headers });
    // },
    // runTVRRUN(token,users) {
    //   const headers = {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   };
    //   return apiClient.post("/api/v1/batch/tvrspecialrun", users, { headers });
    // },
    // runDISTRUN(token,users,credentialType) {
    //   const headers = {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   };
    //   if(credentialType == "OT"){
    //     return apiClient.post("/api/v1/batch/userrequestdisrun/OT", users, { headers });
    //   }else if(credentialType == "OC"){
    //     return apiClient.post("/api/v1/batch/userrequestdisrun/OC", users, { headers });
    //   }else if(credentialType == "RC"){
    //     return apiClient.post("/api/v1/batch/userrequestdisrun/RC", users, { headers });
    //   }
    // },        
    // runOriginalCertificateDISTRUN(token,users) {
    //   const headers = {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   };
    //   return apiClient.post("/api/v1/batch/userrequestdisrun/OC", users, { headers });
    // },            
    // getBatchErrors(id, page, token) {
    //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //   return apiClient.get('/api/v1/batch/dashboard/errors/' + id + '?pageNumber=' + page,{ headers });
    // },
    // getBatchSummary(token) {
    //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //   return apiClient.get('/api/v1/batch/dashboard/summary',{ headers });
    // },
    
}