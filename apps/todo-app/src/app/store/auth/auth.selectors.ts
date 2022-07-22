import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  auth => !!auth.user
);

export const selectLoggedInUser = createSelector(
  selectAuthState,
  auth => auth.user
);

export const selectAuthErrMessage = createSelector(
  selectAuthState,
  auth => auth.authErrMessage
);

export const selectSuccessMessage = createSelector(
  selectAuthState,
  auth => auth.authSuccessMessage
);




