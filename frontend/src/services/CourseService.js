import ApiService from '../common/apiService';

export default {
  getCoursesByAdvanceSearch(params) {
    return ApiService.apiAxios.get('/api/v1/course/coursesearch/?' + params);
  },
  getCourses(courseCode){
    return ApiService.apiAxios.get('/api/v1/course/' + courseCode);
  },
  getAllCourses(){
    return ApiService.apiAxios.get('/api/v1/course/');
  },
  getAllCourseRequirements(){
    return ApiService.apiAxios.get('/api/v1/course/requirement');
  },
  getCourseRestrictions(){
    return ApiService.apiAxios.get('/api/v1/course/restriction');
  },
  getCourseRestriction(mainCourseLevel,mainCourseCode){
    return ApiService.apiAxios.get('/api/v1/course/courserestrictionsearch?mainCourseLevel=' + mainCourseLevel + '&mainCourseCode=' + mainCourseCode);
  },
  getRuleCourseRequirements(rule){
    return ApiService.apiAxios.get('/api/v1/course/requirement/rule?rule=' + rule);
  },
  getCourseRequirements(params){
    return ApiService.apiAxios.get('/api/v1/course/courserequirementsearch?' + params);
  },
  getStudentCourseAchievements(pen) {
    return ApiService.apiAxios.get('/api/v1/studentcourse/pen/' + pen + '?sortForUI=true');
  },
  getStudentExamDetails(pen) {
    return ApiService.apiAxios.get('/api/v1/studentexam/pen/' + pen + '?sortForUI=true');
  }
  // getCoursesByAdvanceSearch(params, token) {
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/course/coursesearch/?'  + params,{ headers });
  // },  
  // getCourses(courseCode, token) {
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/course/' + courseCode,{ headers });
  // },  
  // getAllCourses(token) {
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/course/',{ headers });
  // },
  // getAllCourseRequirements(token) {
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/course/requirement',{ headers });
  // },
  // getCourseRestrictions(token){
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/course/restriction',{ headers });
  // },
  // getCourseRestriction(mainCourseLevel,mainCourseCode,token){
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/course/courserestrictionsearch?mainCourseLevel=' + mainCourseLevel + '&mainCourseCode=' + mainCourseCode,{ headers });
  // },
  // getRuleCourseRequirements(rule,token){
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/course/requirement/rule?rule=' + rule,{ headers });
  // },
  // getCourseRequirements(params, token){
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/course/courserequirementsearch?' + params,{ headers });
  // },
  // getStudentCourseAchievements(pen, token) {
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/studentcourse/pen/' + pen + '?sortForUI=true',{ headers })
  // },
  // getStudentExamDetails(pen, token) {
  //   const headers = { Accept: 'application/json','Content-Type': 'application/json','Authorization': 'Bearer '+ token }
  //   return apiClient.get('/api/v1/studentexam/pen/' + pen + '?sortForUI=true',{ headers })
  // }
}

