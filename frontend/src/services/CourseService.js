import axios from 'axios'
  const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  //withCredentials: false,

})
export default {
  getCoursesByAdvanceSearch(params, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/course/coursesearch/?'  + params,{ headers });
  },  
  getCourses(courseCode, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/course/' + courseCode,{ headers });
  },  
  getAllCourses(token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/course/',{ headers });
  },
  getAllCourseRequirements(token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/course/requirement',{ headers });
  },
  getCourseRestrictions(token){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/course/restriction',{ headers });
  },
  getCourseRestriction(mainCourseLevel,mainCourseCode,token){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/course/courserestrictionsearch?mainCourseLevel=' + mainCourseLevel + '&mainCourseCode=' + mainCourseCode,{ headers });
  },
  getRuleCourseRequirements(rule,token){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/course/requirement/rule?rule=' + rule,{ headers });
  },
  getCourseRequirements(params, token){
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/course/courserequirementsearch?' + params,{ headers });
  },


}

