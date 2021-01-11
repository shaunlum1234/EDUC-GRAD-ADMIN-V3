import axios from 'axios'
// import Router from '../router/index.js'

// if (localStorage.getItem('jwt') != null){
var token = localStorage.getItem('jwt');
// }  else {
//     Router.push('/login');
// }
 
var apiClient = axios.create({
    baseURL: process.env.VUE_APP_STUDENTS_API_HOST,
    //withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+ token
    }
})

export default {
    getStudentByPen(pen) {
        return apiClient.get('/api/v1/' + pen);
    },
    getStudentBySurname(surname) {
        return apiClient.get('/api/v1/gradstudent?lastName=' + surname);
    },
    getStudentsByAdvancedSearch(advancedSearchInput){
        let queryString = ""
        for (var key in advancedSearchInput) {
            // console.log(key);
            if (advancedSearchInput.hasOwnProperty(key)) {
                if(advancedSearchInput[key].value){
                    let contains = (advancedSearchInput[key].contains) ? "*":"";
                    queryString 
                        += key 
                        + "=" 
                        + advancedSearchInput[key].value
                        + contains
                        + "&";

                        // console.log(queryString);
                }
            }
        }
        queryString = queryString.slice(0, -1); //remove trailing ampersand
        //console.log('/api/v1/studentsearch?' + queryString);
        return apiClient.get('/api/v1/studentsearch?' + queryString); 
    }  
}
