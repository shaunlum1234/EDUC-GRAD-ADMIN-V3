import axios from 'axios';
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_ASSESSMENT_API_HOST,
})

export default {

    getRuleCourseRequirements(rule, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getStudentAssessment: " + token);
        return apiClient.get('/api/v1/assessment/requirement/rule?rule=' + rule,{ headers });
    }

}