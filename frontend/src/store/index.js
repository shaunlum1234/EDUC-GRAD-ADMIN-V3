  import Vue from "vue";
  import Vuex from "vuex";
  import app from '@/store/modules/app.js';
  import auth from '@/store/modules/auth.js';
  import batchprocessing from '@/store/modules/batchprocessing.js';

  Vue.use(Vuex);
  
  export default new Vuex.Store({
    
    modules: {
      app,
      auth,
      batchprocessing
    }
  })
