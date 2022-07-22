import {createReducer, on} from '@ngrx/store';
import AuthActions from './auth.action-types';
import { UserInterface } from "../../core/models/user/user.interface";

export interface AuthState {
  user: UserInterface | null;
  authErrMessage: string;
  authSuccessMessage: string;
}

export const initialAuthState: AuthState = {
  user: null,
  authErrMessage: '',
  authSuccessMessage: ''
};

export const authFeatureKey = 'user';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginStart, (state, action) => {
    return {...state, user: null, authErrMessage: ''};
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {...state, authErrMessage: ''};
  }),
  on(AuthActions.loginFailure, (state, action) => {
    return {...state, user: null, authErrMessage: action.errorMsg};
  }),

  on(AuthActions.autoLoginSuccess, (state, action) => {
    return {...state, user:action.user, authErrMessage: ''};
  }),

  on(AuthActions.logout, () => {
    return {
      user: null,
      authErrMessage: '',
      authSuccessMessage: ''
    };
  }),

)
