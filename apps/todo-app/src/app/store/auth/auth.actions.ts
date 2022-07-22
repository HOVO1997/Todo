import { createAction, props } from "@ngrx/store";
import { UserCreateInterface, UserLoginInterface } from "../../core/models/user/user-login.interface";
import { UserInterface } from "../../core/models/user/user.interface";

export const loginStart = createAction("[Login Page] User Login Start",
  props<{ credentials: UserLoginInterface }>());

export const loginSuccess = createAction("[Login Page] User Login Success",
  props<{  token: string }>());

export const loginFailure = createAction("[Login Page] User Login Failed",
  props<{ errorMsg: string }>());

export const autoLoginStart = createAction(`[Root] User Autologin Start`);

export const autoLoginSuccess = createAction(`[Root] User Autologin Success`,
  props<{ user: UserInterface }>());

export const autoLoginFailure = createAction(`[Root] User Autologin Failed`,
  props<{ errorMsg: string }>());

export const createUserStart = createAction("[Login Page] User Register Start",
  props<{ credentials: UserCreateInterface }>());

export const createUserStartSuccess = createAction("[Login Page] User Register Success",
  props<{  user: UserInterface }>());

export const createUserStartFailure = createAction("[Login Page] User Register Failed",
  props<{ errorMsg: string }>());

export const logout = createAction(`[Root] User Log Out`);
