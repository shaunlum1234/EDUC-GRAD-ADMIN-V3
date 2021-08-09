import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
});

export default {
    getLetterGrades(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/lgSc/lettergrade',{ headers });
    },
    getSpecialCases(token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/lgSc/specialcase',{ headers });
    },
    getGraduationPrograms(token) { 
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getGraduationPrograms: " + token);
        return apiClient.get('/api/v1/program/programs',{ headers });
    },

    getProgramRules(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getProgramRule: " + token);
        return apiClient.get('/api/v1/program/allprogramrules',{ headers })
    },
    getProgramRule(programCode, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getProgramRule: " + token);
        return apiClient.get('/api/v1/program/programrules?programCode=' + programCode,{ headers })
    },
    getGraduationProgramSets(gradProgram, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getGraduationProgramSets: " + token);
        return apiClient.get('/api/v1/program/specialprograms/' + gradProgram,{ headers });
    }, 
    getAllSpecialProgramRules(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/program/alloptionalprogramrules',{ headers })
    },
    getSpecialPrograms(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getProgramRule: " + token);
        return apiClient.get('/api/v1/program/optionalprograms',{ headers })
    },
    //Program CRUD
    createProgram(program, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.post('/api/v1/program/programs',program,{ headers })
    },
    deleteProgram(id, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.delete('/api/v1/program/programs/' + id, { headers })
    },
    updateProgram(program, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.put('/api/v1/program/programs',program,{ headers })
    },   
    //Special Programs CRUD
    createSpecialProgram(specialProgram, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.post('/api/v1/program/specialprograms',specialProgram,{ headers })
    },
    deleteSpecialProgram(id, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.delete('/api/v1/program/specialprograms/' + id, { headers })
    },
    updateSpecialProgram(specialProgram, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.put('/api/v1/program/specialprograms',specialProgram,{ headers })
    },    
    //Algorithm Rules CRUD

};