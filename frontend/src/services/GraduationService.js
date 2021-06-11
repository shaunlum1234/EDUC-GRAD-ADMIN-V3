import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
})
export default {
  graduateStudent(pen, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/graduate/pen/' + pen,{ headers });
  },
  projectedGradFinalMarks(id, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/graduate/studentid/' + id + '/run/FM',{ headers });
  },
  projectedGradFinalMarksandRegistrations(id, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/graduate/studentid/' + id + '/run/REGFM',{ headers });
  },
  updateStudentReports(id, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/graduate/studentid/' + id + '/run/FMR',{ headers });
  }   
}