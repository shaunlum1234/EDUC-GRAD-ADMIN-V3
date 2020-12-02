import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_GRADUATION_PROGRAMS_API_HOST,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
});

export default {
    getGraduationPrograms() {
        return apiClient.get('/api/v1/programmanagement/programs');
    }
};

