import axios from 'axios'
var token = localStorage.getItem('jwt');
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_STUDENT_EXAMS_API_HOST,
    //withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+ token
    }
})

export default {
    getStudentExams(pen) {
        return apiClient.get('/api/v1/studentexam/pen/' + pen);
    }
}