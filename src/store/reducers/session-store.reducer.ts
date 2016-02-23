import {USER_IS_AUTHENTICATED} from '../actions/session.actions';
import {USER_WANTS_TO_LOGIN} from '../actions/session.actions';
import {ACTIVE_TENANTS_OF_USER_LOADED} from '../actions/session.actions';
import {ISessionStore} from '../stores/session.store';
import {initialSessionStore} from '../stores/session.store';
import {IBaseAction} from '../actions/base.action';
import {IActiveTenantsOfUserLoadedAction} from '../actions/session.actions';
import {IUserWantsToLoginAction} from '../actions/session.actions';
import {IUsernameProvidedAction} from '../actions/session.actions';
import {LOGOUT_USER} from '../actions/session.actions';
import {IUserIsAuthenticatedAction} from '../actions/session.actions';
import {USER_PROVIDED_USERNAME} from '../actions/session.actions';
import {BACKEND_PROVIDED_USERNAME} from '../actions/session.actions';
import {SESSION_USER_EXISTS} from '../actions/session.actions';
import {BACKEND_AUTHENTICATION_INITIALIZED} from '../actions/session.actions';
import {LOGGEDIN_USER_REQUIRED} from '../actions/session.actions';
import {BACKEND_USER_INQUIRY_INITIALIZED} from '../actions/session.actions';


/**
 * Reducer for sessionState data-node
 *
 * @param {ISessionStore} state
 * @param {Object} action
 * @returns {ISessionStore}
 */
export function sessionStateReducer(state:ISessionStore = initialSessionStore, action:IBaseAction):ISessionStore {

  let newState:ISessionStore;


  switch (action.type) {
    case LOGGEDIN_USER_REQUIRED:
      newState = loggedInUserRequiredReducer(state);
      break;

    case BACKEND_USER_INQUIRY_INITIALIZED:
      newState = backendUserInquiryInitializedReducer(state);
      break;

    case SESSION_USER_EXISTS:
      newState = sessionUserExistsReducer(state, action as IUsernameProvidedAction);
      break;

    case BACKEND_PROVIDED_USERNAME:
      newState = backendProvidedUsernameReducer(state, action as IUsernameProvidedAction);
      break;

    case USER_PROVIDED_USERNAME:
      newState = userProvidedUsernameReducer(state, action as IUsernameProvidedAction);
      break;

    case ACTIVE_TENANTS_OF_USER_LOADED:
      newState = activeTenantsOfUserLoadedReducer(state, action as IActiveTenantsOfUserLoadedAction);
      break;

    case USER_WANTS_TO_LOGIN:
      newState = userWantsToLoginReducer(state, action as IUserWantsToLoginAction);
      break;

    case BACKEND_AUTHENTICATION_INITIALIZED:
      newState = backendAuthenticationInitialized(state);
      break;

    case LOGOUT_USER:
      newState = logoutUserReducer(state, action as IBaseAction);
      break;

    case USER_IS_AUTHENTICATED:
      newState = userIsAuthenticatedReducer(state, action as IUserIsAuthenticatedAction);
      break;

    default:
      newState = state;
      break;
  }

  return newState;
}

function loggedInUserRequiredReducer(state:ISessionStore):ISessionStore {
  return {
    loggedInUserRequired: true,
    backendUserInquiryInitialized: state.backendUserInquiryInitialized,
    sessionUserExists:false,
    providedUsername: state.providedUsername,
    backendAuthenticationInitialized: state.backendAuthenticationInitialized,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    tenants: state.tenants
  };
}

function sessionUserExistsReducer(state:ISessionStore, action:IUsernameProvidedAction):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists:true,
    providedUsername: action.username,
    backendAuthenticationInitialized: false,
    userAuthenticated: false,
    loginAttempt: null,
    tenants: state.tenants
  };
}

function backendProvidedUsernameReducer(state:ISessionStore, action:IUsernameProvidedAction):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists:false,
    providedUsername: action.username,
    backendAuthenticationInitialized: false,
    userAuthenticated: false,
    loginAttempt: null,
    tenants: state.tenants
  };
}

function userProvidedUsernameReducer(state:ISessionStore, action:IUsernameProvidedAction):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists:false,
    providedUsername: action.username,
    backendAuthenticationInitialized: false,
    userAuthenticated: false,
    loginAttempt: null,
    tenants: state.tenants
  };
}

function activeTenantsOfUserLoadedReducer(state:ISessionStore, action:IActiveTenantsOfUserLoadedAction):ISessionStore {

  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists:false,
    providedUsername: state.providedUsername,
    backendAuthenticationInitialized: false,
    userAuthenticated: false,
    loginAttempt: null,
    tenants: action.tenants
  };
}

function backendUserInquiryInitializedReducer(state:ISessionStore):ISessionStore {
  return {
    backendUserInquiryInitialized: true,
    loggedInUserRequired: false,
    sessionUserExists:false,
    providedUsername: state.providedUsername,
    backendAuthenticationInitialized: true,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    tenants: state.tenants
  };
}

function backendAuthenticationInitialized(state:ISessionStore):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists:false,
    providedUsername: state.providedUsername,
    backendAuthenticationInitialized: true,
    userAuthenticated: state.userAuthenticated,
    loginAttempt: state.loginAttempt,
    tenants: state.tenants
  };
}

function userWantsToLoginReducer(state:ISessionStore, action:IUserWantsToLoginAction):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists:false,
    providedUsername: state.providedUsername,
    backendAuthenticationInitialized: false,
    userAuthenticated: false,
    loginAttempt: {
      username: action.username,
      password: action.password,
      tenant: action.tenant
    },
    tenants: state.tenants
  };
}


function logoutUserReducer(state:ISessionStore, action:IBaseAction):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists:false,
    providedUsername: state.providedUsername,
    backendAuthenticationInitialized: false,
    userAuthenticated: false,
    loginAttempt: {},
    tenants: []
  };
}

function userIsAuthenticatedReducer(state:ISessionStore, action:IUserIsAuthenticatedAction):ISessionStore {
  return {
    backendUserInquiryInitialized: false,
    loggedInUserRequired: false,
    sessionUserExists:false,
    providedUsername: state.providedUsername,
    backendAuthenticationInitialized: false,
    userAuthenticated: true,
    loginAttempt: null,
    tenants: null
  };
}
