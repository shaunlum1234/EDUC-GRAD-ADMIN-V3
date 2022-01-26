import axios from 'axios';
import qs from 'query-string';

const apiClient = axios.create({
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',   
    }
});

export default {
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
        return apiClient.post(url, qs.stringify(requestBody));
   
    }
};