import axios from 'axios';
import qs from 'query-string';

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
                return response.data.access_token;
                //router.push("/")
            })
            .catch(
                // error => console.log(error)
            );
        // .then(response => {
        //     let is_admin = response.data.user.is_admin
        //     localStorage.setItem('user',JSON.stringify(response.data.user))
        //     localStorage.setItem('jwt',response.data.token)

        //     if (localStorage.getItem('jwt') != null){
        //         this.$emit('loggedIn')
        //         if(this.$route.params.nextUrl != null){
        //             this.$router.push(this.$route.params.nextUrl)
        //         }
        //         else {
        //             if(is_admin== 1){
        //                 this.$router.push('admin')
        //             }
        //             else {
        //                 this.$router.push('dashboard')
        //             }
        //         }
        //     }        
        // })
        // .catch(function (error) {
        //     console.error(error.response);
        // });
    }
};