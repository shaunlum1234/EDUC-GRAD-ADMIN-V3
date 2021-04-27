import axios from 'axios';
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
})

export default {
    getStudentAssessment(pen, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getStudentAssessment: " + token);
        return apiClient.get('/api/v1/studentassessment/pen/'+ pen + '?sortForUI=true',{ headers });
    }
}