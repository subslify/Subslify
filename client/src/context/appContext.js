import { useReducer, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import reducer from './reducer';
import {
  DISPLAY_ALERT,
  REMOVE_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  GET_SUBSCRIPTIONS_BEGIN,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
} from './actions';

const initialState = {
  isLoading: false,
  userLoading: true,
  showAlert: false,
  alert: { type: '', message: '' },
  user: null,
  showSidebar: true,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Axios config
  // TODO move to separate file
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // alternative way to add token to header
  // authFetch.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

  /* Adding the token to the header of the request. */
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers['Authorization'] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  /* Adding the token to the header of the response. */
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response?.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = (message) => {
    dispatch({
      type: DISPLAY_ALERT,
      payload: { message: message || 'Unexpected Error' },
    });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 1500);
  };

  const registerUser = async (newUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', newUser);
      const { user } = response.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user } });

      if (!user) {
        throw new Error('User not found');
      }
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          message:
            error.message ||
            error.response?.data?.message ||
            'Registration error',
        },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/login', currentUser);
      const { user } = response.data;

      if (!user) {
        throw new Error('User not found');
      }

      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user } });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { message: error.response?.data?.message || 'Login failed' },
      });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    try {
      await authFetch.get('/auth/logout');
    } catch (error) {
      displayAlert(
        error.response?.data?.message || error.message || 'Logout failed'
      );
    }

    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user } = data;

      if (!user) {
        throw new Error('User not found');
      }

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user } });
    } catch (error) {
      if (error.response?.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: {
            message:
              error.response?.data?.message || 'Updating user data failed',
          },
        });
      }
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch.get('/auth/getCurrentUser');

      if (!data) {
        throw new Error('User not found');
      }

      const { user } = data;

      if (!user) {
        throw new Error('User not found');
      }

      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user } });
    } catch (error) {
      if (error.response?.status === 401) return;

      displayAlert(
        error.response?.data?.message || 'Getting current user failed'
      );
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  //do we want to consider optional parameters at all?
  const getSubscriptions = async ({ type, sort, search }) => {
    const url = `/subscriptions?status=${type}&sort=${sort}&search=${search}`;

    try{
      dispatch({ type: GET_SUBSCRIPTIONS_BEGIN });
      
      const { data } = await authFetch.get(url);
      if (!data) {
        throw new Error('Subscriptions not found');
      }
      const { subscriptions } = data;
      if (!subscriptions) {
        throw new Error('Subscriptions not found');
      }
      
      dispatch({
        type: GET_SUBSCRIPTIONS_SUCCESS,
        payload: { subscriptions }
      });
    }
    catch(error){
      dispatch( {
        type: GET_SUBSCRIPTIONS_ERROR,
        payload: {
          message:
            error.response?.data?.message ||  error.message || 'Getting subscriptions failed'
        }
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        getSubscriptions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook to use app context
const useAppContext = () => useContext(AppContext);

export { initialState, AppProvider, useAppContext };
