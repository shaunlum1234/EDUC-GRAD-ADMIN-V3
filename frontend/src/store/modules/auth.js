import ApiService from '@/common/apiService';
import AuthService from '@/common/authService';

// function isFollowUpVisit({jwtToken}) {
//   return !!jwtToken;
// }

function isExpiredToken(jwtToken) {
  const now = Date.now().valueOf() / 1000;
  const jwtPayload = jwtToken.split('.')[1];
  const payload = JSON.parse(window.atob(jwtPayload));
  return payload.exp <= now;
}

async function refreshToken({getters, commit, dispatch}) {
  if (isExpiredToken(getters.jwtToken)) {
    dispatch('logout');
    return;
  }

  const response = await AuthService.refreshAuthToken(getters.jwtToken);
  if (response.jwtFrontend) {
    commit('setJwtToken', response.jwtFrontend);
    ApiService.setAuthHeader(response.jwtFrontend);
  } else {
    throw 'No jwtFrontend';
  }
}

async function getInitialToken({commit}) {
  const response = await AuthService.getAuthToken();

  if (response.jwtFrontend) {
    commit('setJwtToken', response.jwtFrontend);
    commit('setAuthorizedUser', response.isAuthorizedUser);
    ApiService.setAuthHeader(response.jwtFrontend);
  } else {
    throw 'No jwtFrontend';
  }
}

export default {
  namespaced: true,
  state: {
    acronyms: [],
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    isAuthorizedUser: localStorage.getItem('isAuthorizedUser') !== null,
    userInfo: null,
    error: false,
    isLoading: true,
    loginError: false,
    jwtToken: localStorage.getItem('jwtToken'),
  },
  getters: {
    acronyms: state => state.acronyms,
    isAuthenticated: state => state.isAuthenticated,
    getToken: state => state.jwtToken,
    jwtToken: () => localStorage.getItem('jwtToken'),
    userInfo: state => state.userInfo,
    loginError: state => state.loginError,
    error: state => state.error,
    isLoading: state => state.isLoading
  },
  mutations: {
    //sets Json web token and determines whether user is authenticated
    setJwtToken: (state, token = null) => {
      if (token) {
        state.isAuthenticated = true;
        localStorage.setItem('jwtToken', token);
      } else {
        state.isAuthenticated = false;
        localStorage.removeItem('jwtToken');
      }
    },
    setAuthorizedUser: (state, isAdminUser) => {
      if (isAdminUser) {
        state.isAuthorizedUser = true;
        localStorage.setItem('isAuthorizedUser', 'true');
      } else {
        state.isAuthorizedUser = false;
        localStorage.removeItem(('isAuthorizedUser'));
      }
    },
    setUserInfo: (state, userInfo) => {
      if(userInfo){
        state.userInfo = userInfo;
      } else {
        state.userInfo = null;
      }
    },

    setLoginError: (state) => {
      state.loginError = true;
    },

    setError: (state, error) => {
      state.error = error;
    },

    setLoading: (state, isLoading) => {
      state.isLoading = isLoading;
    },

    //sets the token required for refreshing expired json web tokens
    logoutState: (state) => {
      localStorage.removeItem('jwtToken');
      state.userInfo = null;
      state.isAuthenticated = false;
    }
  },
  actions: {
    loginErrorRedirect(context){
      context.commit('setLoginError');
    },
    logout(context) {
      context.commit('setJwtToken');
      context.commit('setUserInfo');
      // router.push(AuthRoutes.LOGOUT);
    },
    async getUserInfo({commit}){
      const userInfoRes = await ApiService.getUserInfo();
      commit('setUserInfo', userInfoRes.data);
    },
    //retrieves the json web token from local storage. If not in local storage, retrieves it from API
    async getJwtToken(context) {
      context.commit('setError', false);
      if (context.getters.isAuthenticated && !!context.getters.jwtToken) {
        await refreshToken(context);
      } else {  //initial login and redirect
        await getInitialToken(context);
      }
    },
  }
};
