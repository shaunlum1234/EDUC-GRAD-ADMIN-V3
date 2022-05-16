import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
});

export default {
    getTranscriptMessage(token) {
        //https://educ-grad-student-graduation-api-77c02f-dev.apps.silver.devops.gov.bc.ca/api/v1/transcript/gradmessages
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/transcript/gradmessages',{ headers })

    },
};