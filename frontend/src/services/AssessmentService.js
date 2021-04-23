import axios from 'axios';
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    
})

export default {

    getAllAssesments(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/assessment',{ headers });
    },
    getAssesmentByCode(assmtCode, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/assessment/' + assmtCode,{ headers });
    },
    getAllAssesmentRequirements(token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/assessment/requirement',{ headers });
    },
    // getAllAssesmentRequirementByRule
    getRuleCourseRequirements(rule, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/assessment/requirement/rule?rule=' + rule,{ headers });
    } 
}