import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
});

export default {
    getLetterGrades(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/programmanagement/lettergrade',{ headers });
    },
    getSpecialCases(token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/programmanagement/specialcase',{ headers });
    },
    getGraduationPrograms(token) { 
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getGraduationPrograms: " + token);
        return apiClient.get('/api/v1/programmanagement/programs',{ headers });
    },

    getProgramRules(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getProgramRule: " + token);
        return apiClient.get('/api/v1/programmanagement/allprogramrules',{ headers })
    },
    getProgramRule(programCode, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getProgramRule: " + token);
        return apiClient.get('/api/v1/programmanagement/programrules?programCode=' + programCode,{ headers })
    },
    getGraduationProgramSets(gradProgram, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getGraduationProgramSets: " + token);
        return apiClient.get('/api/v1/programmanagement/specialprograms/' + gradProgram,{ headers });
    }, 
    getSpecialProgram(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getProgramRule: " + token);
        return apiClient.get('/api/v1/programmanagement/specialprograms',{ headers })
    },
    getSpecialProgramRules(programCode, specialProgramCode, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    //    console.log("programId IN SERVICE getSpecialProgramRule: " + programId);
        return apiClient.get('/api/v1/programmanagement/specialprograms/' + programCode + "/" + specialProgramCode,{ headers })
    },
    //Program CRUD
    createProgram(program, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.post('/api/v1/programmanagement/programs',program,{ headers })
    },
    deleteProgram(id, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.delete('/api/v1/programmanagement/programs/' + id, { headers })
    },
    updateProgram(program, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.put('/api/v1/programmanagement/programs',program,{ headers })
    },   
    //Special Programs CRUD
    createSpecialProgram(specialProgram, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.post('/api/v1/programmanagement/specialprograms',specialProgram,{ headers })
    },
    deleteSpecialProgram(id, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.delete('/api/v1/programmanagement/specialprograms/' + id, { headers })
    },
    updateSpecialProgram(specialProgram, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.put('/api/v1/programmanagement/specialprograms',specialProgram,{ headers })
    },   
};