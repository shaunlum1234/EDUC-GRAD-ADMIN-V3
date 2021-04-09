import axios from 'axios';

var apiClient = axios.create({
    baseURL: process.env.VUE_APP_STUDENTS_API_HOST,
})

export default {
    getStudentByPen(pen, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getStudentByPen " + token);
        return apiClient.get('/api/v1/pen/' + pen,{ headers });
    },

    getStudentsByAdvancedSearch(advancedSearchInput, token, pageNumber=0, pageSize=10){
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
        let queryString = ""
        for (var key in advancedSearchInput) {
            if (advancedSearchInput.hasOwnProperty(key)) {
                if(advancedSearchInput[key].value){
                    let contains = (advancedSearchInput[key].contains) ? "*":"";
                    queryString 
                        += key 
                        + "=" 
                        + advancedSearchInput[key].value
                        + contains
                        + "&";
                }
            }
        }
        console.log(apiClient.get('/api/v1/studentsearch?' + queryString,{ headers }));
        return apiClient.get('/api/v1/studentsearch?' + queryString  + "pageSize=" + pageSize + "&pageNumber=" + pageNumber,{ headers }); 
    }  
}
