import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_PROGRAM_RULES_API_HOST,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}
)

export default {
  getProgramRules() {
    return apiClient.get('/api/v1/program-rules')
  },
  getProgramRule(id) {
    return apiClient.get('/api/v1/program-rules/' + id)
  },
  editProgramRule(data){
    return apiClient.put("/api/v1/program-rules/",data,{ useCredentials: false })
  },
  addProgramRule(data){
    return apiClient.post("/api/v1/program-rules/",data,{ useCredentials: false })
  }  
}
