import axios from 'axios'

const apiClient = axios.create({
  
  baseURL: process.env.VUE_APP_GRADUATION_STATUS_API_HOST,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})
export default {
  getGraduationStatus(pen) {
    return apiClient.get('/api/v1/graduation-status/' + pen);
  },
  getAchievementReport(pen) {

    return apiClient.get('/api/v1/graduation-status/' + pen + "/achievement-report", {responseType: 'arraybuffer'});
  },
  refreshGraduationStatus(pen){
   return apiClient.post('/api/v1/graduation-status/' + pen);
  }
}