import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
})
export default {
  getAchievementReport(id, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token, "responseType": "arraybuffer" }
    return apiClient.get('/api/v1/graduationreports/studentreport/?studentID=' + id + '&reportType=ACHV',{ headers, responseType: 'arraybuffer'});
  },
  getStudentTranscript(id, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token, "responseType": "arraybuffer" }
    return apiClient.get('/api/v1/graduationreports/studentreport/?studentID=' + id + '&reportType=TRAN',{ headers, responseType: 'arraybuffer'});
  },
  getStudentReports(id,token){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token, "responseType": "arraybuffer" }
    return apiClient.get('/api/v1/graduationreports/studentreport/' + id,{ headers });
  },
  getStudentCertificates(id, token){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/graduationreports/studentcertificate/' + id,{ headers});
  },

  
  getAlgorithmRules(token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token };
    return apiClient.get('/api/v1/algo/algorithm-rules',{ headers});
  },
  getStudentNotes(id, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token, "responseType": "arraybuffer" }
    return apiClient.get('/api/v1/student/studentnotes/studentid/' + id,{ headers });
  },
  addStudentNotes(json, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.post('/api/v1/student/studentnotes/', json, { headers});
  },
  deleteStudentNotes(noteID, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.delete('/api/v1/student/studentnotes/' + noteID, { headers});
  },
  getStudentUngradReasons(id, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/ungrad/studentungradreason/studentid/' + id,{ headers});
  }  
}
