import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_GRADES_API_HOST,
});

export default {
    getGrades(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getStudentExams: " + token);
        return apiClient.get('/api/v1/programmanagement/lettergrade',{ headers });
    },
    // getLettersGrades(program, token) {
    //     //program input ex 2018, 2004
    //     const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    //     //console.log("TOKEN IN SERVICE getStudentExams: " + token);
    //     return apiClient.get('/api/v1/grades/' + program,{ headers });
    // }
};