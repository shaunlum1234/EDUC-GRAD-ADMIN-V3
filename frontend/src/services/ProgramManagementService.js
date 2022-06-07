import ApiService from '../common/apiService';


export default {
    getAlgorithmRules() {
        return ApiService.apiAxios.get('/api/v1/algo/algorithm-rules')
    },
    getLetterGrades() {
        return ApiService.apiAxios.get('/api/v1/lgSc/lettergrade');
    },
    getSpecialCases(){
        return ApiService.apiAxios.get('/api/v1/lgSc/specialcase');
    },
    getGraduationPrograms() { 
        return ApiService.apiAxios.get('/api/v1/program/programs');
    },
    getProgramRules() {
        return ApiService.apiAxios.get('/api/v1/program/allprogramrules')
    },
    getProgramRule(programCode) {
        return ApiService.apiAxios.get('/api/v1/program/programrules?programCode=' + programCode)
    },
    getAllOptionalProgramRules() {
        return ApiService.apiAxios.get('/api/v1/program/alloptionalprogramrules')
    },
    getOptionalPrograms() {
        return ApiService.apiAxios.get('/api/v1/program/optionalprograms')
    },
    
    // //Program CRUD
    // createProgram(program, token){
    //     const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //     return apiClient.post('/api/v1/program/programs',program,{ headers })
    // },
    // deleteProgram(id, token){
    //     const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //     return apiClient.delete('/api/v1/program/programs/' + id, { headers })
    // },
    // updateProgram(program, token){
    //     const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //     return apiClient.put('/api/v1/program/programs',program,{ headers })
    // },   
    // //Optional Programs CRUD
    // createOptionalProgram(optionalProgram, token){
    //     const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //     return apiClient.post('/api/v1/program/optionalprograms',optionalProgram,{ headers })
    // },
    // deleteOptionalProgram(id, token){
    //     const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //     return apiClient.delete('/api/v1/program/optionalprograms/' + id, { headers })
    // },
    // updateSpecialProgram(optionalProgram, token){
    //     const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //     return apiClient.put('/api/v1/program/optionalprograms',optionalProgram,{ headers })
    // },    
    // getCareerPrograms(token) {
    //     const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //     return ApiService.apiAxios.get('/api/v1/program/careerprogram',{ headers });
    // },
    // getRequirementTypes(token) {
    //     const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
    //     return ApiService.apiAxios.get('/api/v1/program/gradrequirementtype',{ headers });
    // },      
};