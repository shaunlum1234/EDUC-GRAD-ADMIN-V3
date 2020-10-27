import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_STUDENTS_API_HOST,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getStudentByPen(pen) {
        return apiClient.get('/api/v1/' + pen);
    }
}