import axios from 'axios'
var token = localStorage.getItem('jwt');
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_GRADUATION_PROGRAMS_API_HOST,
    //withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+ token
    }
});

export default {
    getGraduationPrograms() {
        return apiClient.get('/api/v1/programmanagement/programs');
    },
    getGraduationProgramSets(gradProgram) {
        return apiClient.get('api/v1/programmanagement/programsets/' + gradProgram);
    }
};

