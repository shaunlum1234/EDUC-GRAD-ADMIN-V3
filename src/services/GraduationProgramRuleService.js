import axios from 'axios'
var token = localStorage.getItem('jwt');
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_PROGRAM_RULES_API_HOST,
  //withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Authorization': 'Bearer '+ token
  }
}
)

export default {
  // getProgramRules() {
  //   return apiClient.get('/api/v1/program-rules')
  // },
  getProgramRule(programCode, programSet) {
    return apiClient.get('/api/v1/programmanagement/programrules?programCode=' + programCode + '&programSet=' + programSet)
  },
  // editProgramRule(data){
  //   return apiClient.put("/api/v1/program-rules/",data,{ useCredentials: false })
  // },
  // addProgramRule(data){
  //   return apiClient.post("/api/v1/program-rules/",data,{ useCredentials: false })
  // }  
}