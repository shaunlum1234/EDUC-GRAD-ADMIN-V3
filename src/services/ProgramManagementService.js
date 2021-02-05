import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_PROGRAM_MANAGEMENT_API_HOST,
});

export default {
    getLetterGrades(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/programmanagement/lettergrade',{ headers });
    },
    getSpecialCases(token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('api/v1/programmanagement/specialcase',{ headers });
    }
};