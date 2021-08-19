import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
})
export default {
   // Move to student service 
  getGraduationStatus(id, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/student/studentid/' + id,{ headers });
  },
  // Move to student service
  getGraduationStatusSpecialPrograms(id, token){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/student/specialprogram/studentid/' + id,{ headers });
  },
  // Move to student service 
  editGraduationStatus(id, token, json) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.post('/api/v1/student/gradstudent/studentid/' + id, json, { headers });
  },
  // Move to student service 
  ungradStudent(id,reasonCode, reasonDesc, token, json){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.post('/api/v1/student/ungradstudent/studentid/' + id + '?ungradReasonCode=' + reasonCode + '&ungradReasonDesc=' + reasonDesc,json, { headers });
  },
  getStudentCareerPrograms(id, token){
    const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/student/studentcareerprogram/studentid/' + id,{ headers });
  }  
}
