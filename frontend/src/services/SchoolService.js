import ApiService from '../common/apiService';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
});

export default {
    getSchoolInfo(mincode) {
        return ApiService.apiAxios.get('/api/v1/school/' + mincode)
    },
    searchSchools(searchInput, token) {
        
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
        let queryString = ""
        for (var key in searchInput) {
            if (searchInput.hasOwnProperty(key)) {
                if(searchInput[key].value){
                    let contains = (searchInput[key].contains) ? "*":"";
                    queryString 
                        += key 
                        + "=" 
                        + searchInput[key].value
                        + contains
                        + "&";
                }
            }
        }
        queryString = queryString.slice(0, -1); //remove trailing ampersand
        return apiClient.get('/api/v1/school/search?' + queryString,{ headers });
    }
};
