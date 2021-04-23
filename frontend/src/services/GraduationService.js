import axios from 'axios'

const apiClient = axios.create({
  baseURL: "https://grad-admin-77c02f-tools.apps.silver.devops.gov.bc.ca",
})
export default {
  graduateStudent(pen, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    return apiClient.get('/api/v1/graduate/pen/' + pen,{ headers });
  }
  
}