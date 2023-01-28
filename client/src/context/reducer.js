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
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  CLEAR_VALUES,
  HANDLE_CHANGE,
  CREATE_SUBSCRIPTION_BEGIN,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_ERROR,
  SET_EDIT_SUBSCRIPTION,
  DELETE_SUBSCRIPTION_BEGIN,
  EDIT_SUBSCRIPTION_SUCCESS,
  EDIT_SUBSCRIPTION_ERROR,
  EDIT_SUBSCRIPTION_BEGIN,
} from './actions';

import { initialState } from './appContext';

// TODO: Refactor this to use a switch statement

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alert: {
        type: 'danger',
        message: action.payload.message || 'Unexpected Error',
      },
    };
  }

  if (action.type === REMOVE_ALERT) {
    return {
      ...state,
      showAlert: false,
      alert: { type: '', message: '' },
    };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      showAlert: true,
      alert: { type: 'success', message: 'User registered successfully!' },
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alert: {
        type: 'danger',
        message:
          action.payload.message ||
          'Unexpected Error. User could not be registered.',
      },
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      showAlert: true,
      alert: { type: 'success', message: 'Login Successful! Redirecting...' },
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alert: {
        type: 'danger',
        message:
          action.payload.message ||
          'Unexpected Error. User could not be logged in.',
      },
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      showAlert: true,
      alert: { type: 'success', message: 'User updated successfully!' },
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alert: {
        type: 'danger',
        message:
          action.payload.message ||
          'Unexpected Error. User could not be updated.',
      },
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userLoading: false,
      user: action.payload.user,
    };
  }

  if (action.type === GET_SUBSCRIPTIONS_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_SUBSCRIPTIONS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      subscriptions: { [action.payload.type]: action.payload.subscriptions },
    };
  }

  if (action.type === GET_SUBSCRIPTIONS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alert: {
        type: 'danger',
        message:
          action.payload.message ||
          'Unexpected Error. Subscriptions could not be retrieved.',
      },
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const subscriptionState = {
      isEditing: false,
      editSubscriptionId: '',
      subscriptionName: '',
      subscriptionPrice: '',
      subscriptionType: 'monthly',
      subscriptionStatus: 'active',
    };
    return {
      ...state,
      ...subscriptionState,
    };
  }

  if (action.type === CREATE_SUBSCRIPTION_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_SUBSCRIPTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alert: { type: 'success', message: 'Subscription created successfully!' },
    };
  }

  if (action.type === CREATE_SUBSCRIPTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alert: {
        type: 'danger',
        message:
          action.payload.message ||
          'Unexpected Error. Subscription could not be created.',
      },
    };
  }

  if (action.type === SET_EDIT_SUBSCRIPTION) {
    const subscription = state.subscriptions[action.payload.type].find(
      (subscription) => subscription._id === action.payload.id
    );
    if (!subscription) {
      throw new Error('Could not find subscription to edit.');
    }

    const { name, price, _id, status, startDate, frequency } = subscription;
    return {
      ...state,
      isEditing: true,
      editSubscriptionId: _id,
      subscriptionName: name,
      subscriptionPrice: price,
      subscriptionType: frequency,
      subscriptionStatus: status,
      subscriptionStartDate: startDate,
    };
  }

  if (action.type === DELETE_SUBSCRIPTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === EDIT_SUBSCRIPTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_SUBSCRIPTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alert: { type: 'success', message: 'Subscription updated successfully!' },
    };
  }
  if (action.type === EDIT_SUBSCRIPTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alert: {
        type: 'danger',
        message:
          action.payload.message ||
          'Unexpected Error. Subscription could not be updated.',
      },
    };
  }

  throw new Error(`Unhandled action type: ${action.type}`);
};

export default reducer;
