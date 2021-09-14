import axios from 'axios';

var apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
})

export default {
    getStudentByPen(pen, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getStudentByPen " + token);
        return apiClient.get('/api/v1/student/pen/' + pen,{ headers });
    },
    getStudentsByAdvancedSearch(advancedSearchInput, token){
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
        return apiClient.get('/api/v1/student/gradstudentsearch?' + queryString,{ headers }); 
    },  
    // Move to student service 
    getGraduationStatus(id, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/studentid/' + id,{ headers });
    },
    // Move to student service
    getGraduationStatusSpecialPrograms(id, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/specialprogram/studentid/' + id,{ headers });
    },
    // Move to student service 
    editGraduationStatus(id, token, json) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.post('/api/v1/student/gradstudent/studentid/' + id, json, { headers });
    },
    // Move to student service 
    ungradStudent(id,reasonCode, reasonDesc, token, json){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.post('/api/v1/student/ungradstudent/studentid/' + id + '?ungradReasonCode=' + reasonCode + '&ungradReasonDesc=' + reasonDesc,json, { headers });
    },
    getStudentCareerPrograms(id, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/studentcareerprogram/studentid/' + id,{ headers });
    },  
    getStudentStatusCodes(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/studentstatus',{ headers });
    },
}
