import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
})
export default {
  getGraduationStatus(id, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/gradstatus/studentid/' + id,{ headers });
    
  },
  getGraduationStatusSpecialPrograms(id, token){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/gradstatus/specialprogram/studentid/' + id,{ headers });
  },
  editGraduationStatus(id, token, json) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.post('/api/v1/gradstatus/gradstudent/studentid/' + id, json, { headers });
  },
  ungradStudent(id,reason, token, json){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.post('/api/v1/gradstatus/ungradstudent/studentid/' + id + '?ungradReasonCode=' + reason,json, { headers });
  }
}