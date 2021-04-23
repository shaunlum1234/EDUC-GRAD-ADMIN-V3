import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://grad-admin-77c02f-tools.apps.silver.devops.gov.bc.ca",
});

export default {
    getGraduationPrograms(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getGraduationPrograms: " + token);
        return apiClient.get('/api/v1/programmanagement/programs',{ headers });
    },
    getGraduationProgramSets(gradProgram, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getGraduationProgramSets: " + token);
        return apiClient.get('api/v1/programmanagement/programsets/' + gradProgram,{ headers });
    }
};

