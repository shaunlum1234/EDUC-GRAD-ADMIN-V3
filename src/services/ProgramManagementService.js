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
        return apiClient.get('/api/v1/programmanagement/specialcase',{ headers });
    },
    getGraduationPrograms(token) { 
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getGraduationPrograms: " + token);
        return apiClient.get('/api/v1/programmanagement/programs',{ headers });
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
    getSpecialProgramRule(programId, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    //    console.log("programId IN SERVICE getSpecialProgramRule: " + programId);
        return apiClient.get('/api/v1/programmanagement/specialprogramrules?specialProgramID=' + programId,{ headers })
    },
    createProgram(program, token){
    //program parameter must br in format (POST)
    //     {
    //         "programCode": "1998-EN",
    //         "programName": "1998 Graduation Program"
    //     }
        console.log("CREATE " + program + token);
        return "I CONNECTED TO THE WEBSERVICE and added a program. then i returned this string to the vuex store";
    },
    // deleteProgram(program, token){
    //     program.id
    
    // }
};