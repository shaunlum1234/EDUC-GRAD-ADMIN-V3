import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_COURSE_API_HOST,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}
)

export default {
  getCourses() {
    return apiClient.get('/api/v1/courses')
  },
  getCourse(id) {
    return apiClient.get('/api/v1/courses/' + id)
  },
  editCourse(id, data){
    return apiClient.put("/api/v1/courses/" + id ,data,{ useCredentials: false })
  },
  addCourse(data){
    return apiClient.post("/api/v1/courses",data,{ useCredentials: false })
  }
}