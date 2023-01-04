  import Vue from "vue";
  import Vuex from "vuex";
  import app from '@/store/modules/app.js';
  import auth from '@/store/modules/auth.js';
  import student from '@/store/modules/student.js';

  Vue.use(Vuex);
  
  export default new Vuex.Store({
    
    modules: {
      app,
      auth,
      student
    }
  })
