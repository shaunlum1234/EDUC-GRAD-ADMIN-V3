import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
});

export default {
    getPSI(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/psi',{ headers });
    },
    getPSIByAdvanceSearch(params, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/psi/search/?'  + params,{ headers });
    },
    getDistrict(district, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/district/'  + district ,{ headers });
    }
};

