import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://grad-admin-77c02f-tools.apps.silver.devops.gov.bc.ca",
});

export default {
    getSchoolInfo(mincode, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getStudentExams: " + token);
        return apiClient.get('/api/v1/school/' + mincode,{ headers });
    },
    getAllSchools(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getStudentExams: " + token);
        return apiClient.get('/api/v1/school/',{ headers });
    },
    searchSchools(searchInput, token) {
        
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        let queryString = ""
        for (var key in searchInput ) {
  
             
                if(searchInput[key]){
                //     let contains = (searchInput[key].contains) ? "*":"";
                     queryString 
                         += key 
                         + "=" 
                         + searchInput[key]
                //         + contains
                         + "&";
                 }
            
        }
        queryString = queryString.slice(0, -1); //remove trailing ampersand
    //    console.log('/api/v1/school/?' + queryString);
        return apiClient.get('/api/v1/school/search?' + queryString,{ headers });
    }
};