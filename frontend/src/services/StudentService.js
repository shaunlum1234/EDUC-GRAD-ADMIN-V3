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
    getGraduationStatus(id, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/studentid/' + id,{ headers });
    },
    getGraduationStatusOptionalPrograms(id, token){
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/optionalprogram/studentid/' + id,{ headers });
    },
    editGraduationStatus(id, token, json) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.post('/api/v1/student/gradstudent/studentid/' + id, json, { headers });
    },
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
    getStudentNotes(id, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token, "responseType": "arraybuffer" }
        return apiClient.get('/api/v1/student/studentnotes/studentid/' + id,{ headers });
    },
    addStudentNotes(json, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.post('/api/v1/student/studentnotes/', json, { headers});
    },
    deleteStudentNotes(noteID, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.delete('/api/v1/student/studentnotes/' + noteID, { headers});
    },
    getStudentUngradReasons(id, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/ungrad/studentungradreason/studentid/' + id,{ headers});
    },  
    getUngradReasons(token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/ungrad/ungradreason',{ headers });
    },
    getStudentHistory(id, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/studentHistory/' + id,{ headers });
    },
    getStudentOptionalProgramHistory(id, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Authorization': 'Bearer '+ token }
        return apiClient.get('/api/v1/student/studentOptionalProgramHistory/' + id,{ headers });
    }  
}
