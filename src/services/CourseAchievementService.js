import axios from 'axios'
// import Router from '../router/index.js'
// if (localStorage.getItem('jwt') != null){
  var token = localStorage.getItem('jwt');
// } else {
//   Router.push('/');
// }


const apiClient = axios.create({

  baseURL: process.env.VUE_APP_COURSE_ACHIEVEMENT_API_HOST,
  //withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Authorization': 'Bearer '+ token
  }
}
)

export default {
  getStudentCourseAchievements(pen) {
    return apiClient.get('/api/v1/studentcourse/pen/' + pen)
  },
  editStudentCourseAchievement(id, data){
    return apiClient.put("/api/v1/course-achievements/" + id ,data,{ useCredentials: false })
  },
  addStudentCourseAchievement(data){
    return apiClient.post("/api/v1/course-achievements/",data,{ useCredentials: false })
  }
}
