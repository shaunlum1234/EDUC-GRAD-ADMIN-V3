import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_SCHOOL_API_HOST,
});

export default {
    getSchoolInfo(mincode, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getStudentExams: " + token);
        return apiClient.get('/api/v1/school/' + mincode,{ headers });
    }
};