import axios from 'axios'
import qs from 'query-string'

const apiClient = axios.create({
    // baseURL: process.env.KEY_CLOAK_AUTH_HOST,
    // withCredentials: false,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',   
    }
})

export default {
    // getCourses() {
    //     return apiClient.get('/api/v1/courses')
    // },
    login() {
        let requestBody={
              "client_id":process.env.VUE_APP_CLIENT_ID,
              "client_secret":process.env.VUE_APP_CLIENT_SECRET,
              "grant_type":process.env.VUE_APP_GRANT_TYPE,
              "username": process.env.VUE_APP_USER,
              "password": process.env.VUE_APP_PW   
              };

        let url = process.env.VUE_APP_AUTH_HOST;
        // try {
        apiClient.post(url, qs.stringify(requestBody))
            .then(res => {
                console.log(res.data.access_token);
                return res.data.access_token;
                //router.push("/")
            })
            .catch(error => console.log(error))
        }
        // catch (error){
        //    console.error(error);
        //    console.log("Token request failed!");
        //    return false ;
        // }
    //  }
    // login () {
    //     apiClient.post(process.env.KEY_CLOAK_AUTH_HOST, 
    //     {
    //       client_id:process.env.KEY_CLOAK_CLIENT_ID,
    //       client_secret:process.env.KEY_CLOAK_CLIENT_SECRET,
    //       grant_type:process.env.KEY_CLOAK_GRANT_TYPE,
    //       username: process.env.KEY_CLOAK_USER,
    //       password: process.env.KEY_CLOAK_PW,
    //       returnSecureToken: true
    //     })
    //     .then(res => {
    //       console.log(res)
    //       return res;
    //       //router.push("/")
          
    //     })
    //     .catch(error => console.log(error))
    // }
}