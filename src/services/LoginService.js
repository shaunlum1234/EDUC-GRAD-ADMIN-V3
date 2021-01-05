import axios from 'axios';
import qs from 'query-string';
import Router from '../router/index.js'

const apiClient = axios.create({
    // baseURL: process.env.KEY_CLOAK_AUTH_HOST,
    // withCredentials: false,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',   
    }
});

export default {
    login() {
        let requestBody={
              "client_id":process.env.VUE_APP_CLIENT_ID,
              "client_secret":process.env.VUE_APP_CLIENT_SECRET,
              "grant_type":process.env.VUE_APP_GRANT_TYPE,
              "username": process.env.VUE_APP_USER,
              "password": process.env.VUE_APP_PW   
              };

        let url = process.env.VUE_APP_AUTH_HOST;
        apiClient.post(url, qs.stringify(requestBody))
            .then(res => {
                console.log(res.data.access_token);
                return res.data.access_token;
                //router.push("/")
            })
            .catch(
                // error => console.log(error)
            );
    },
    logout() {
        if (localStorage.getItem('jwt') != null){
            localStorage.removeItem('jwt');
            localStorage.removeItem('refresh');
        }         
    },
    handleSubmit(id, password){   
        let requestBody= {
            "client_id":process.env.VUE_APP_CLIENT_ID,
            "client_secret":process.env.VUE_APP_CLIENT_SECRET,
            "grant_type":process.env.VUE_APP_GRANT_TYPE,
            "username": id,
            "password": password   
        };
        let url = process.env.VUE_APP_AUTH_HOST;
        apiClient.post(url, qs.stringify(requestBody))
            .then(response => {
                console.log(response);
                console.log(response.data.access_token);
                localStorage.setItem('jwt',response.data.access_token)
                localStorage.setItem('refresh',response.data.refresh_token)
                if (localStorage.getItem('jwt') != null){
                    console.log('loggedIn')
                }
                Router.push('/')   
            })
            .catch(
                // error => console.log(error)
            );
    }
};