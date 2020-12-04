import axios from 'axios'


export default {
    login () {
        axios.post(process.env.KEY_CLOAK_AUTH_HOST, 
        {
          user: process.env.KEY_CLOAK_USER,
          password: process.env.KEY_CLOAK_PW,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res)
          return res;
          //router.push("/")
          
        })
        .catch(error => console.log(error))
    }
}