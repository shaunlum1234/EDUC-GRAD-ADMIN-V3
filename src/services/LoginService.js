import axios from 'axios'

// const apiClient = axios.create({
//     baseURL: process.env.KEY_CLOAK_AUTH_HOST,
//     withCredentials: false,
//     headers: {
//       Accept: '*/*',
//       'Content-Type': 'application/x-www-form-urlencoded',
      
//     }
// })

export default {
    // getCourses() {
    //     return apiClient.get('/api/v1/courses')
    // },
    login() {
        let data={
              "client_id":process.env.KEY_CLOAK_CLIENT_ID,
              "client_secret":process.env.KEY_CLOAK_CLIENT_SECRET,
              "username": process.env.KEY_CLOAK_USER,
              "password": process.env.KEY_CLOAK_PW,
              "grant_type":process.env.KEY_CLOAK_GRANT_TYPE
              };
     
        // let headers={
        //      "content-type": "application/json"
        //      };
        let url = process.env.KEY_CLOAK_AUTH_HOST;
        try {
             const token = axios.post(url, data);
             console.log(token);
            //  let tokenParsed=  token;
            //  return `${tokenParsed.data.token_type} ${tokenParsed.data.access_token}`; 
             }
        catch (error){
           console.error(error);
           console.log("Token request failed!");
           return false ;
        }
     }
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