import axios from 'axios';

var apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
})

export default {
    getStudentHistory(id, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/studentHistory/' + id,{ headers });
    },
    getStudentOptionalProgramHistory(id, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/studentOptionalProgramHistory/' + id,{ headers });
    }      
}