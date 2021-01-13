import axios from 'axios'
var token = localStorage.getItem('jwt');
const apiClient = axios.create({
  
  baseURL: process.env.VUE_APP_GRADUATION_STATUS_API_HOST,
  //withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Authorization': 'Bearer '+ token
  }
})
export default {
  getGraduationStatus(pen) {
    return apiClient.get('/api/v1/gradstatus/pen/' + pen);
  },
  getAchievementReport(pen) {

    return apiClient.get('/api/v1/graduation-status/' + pen + "/achievement-report", {responseType: 'arraybuffer'});
  },
  refreshGraduationStatus(pen){
   return apiClient.post('/api/v1/graduation-status/' + pen);
  }
}