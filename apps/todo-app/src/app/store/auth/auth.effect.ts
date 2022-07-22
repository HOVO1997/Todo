import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../core/services/auth.service";
import { catchError, map, switchMap, tap } from "rxjs";
import * as AuthActions from "./auth.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { SessionService } from "../../core/services/session.service";
import {of as observableOf} from 'rxjs';
import { UserInterface } from "../../core/models/user/user.interface";
import { Store } from "@ngrx/store";
import TicketActionTypes from "../ticket/ticket.action-types";
import { A } from "@angular/cdk/keycodes";
import AuthActionTypes from "./auth.action-types";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private store: Store
  ) {
  }

  // Login

  loginStart$ = createEffect(() => { return this.actions$.pipe(
    ofType(AuthActions.loginStart),
    switchMap((action) =>
      this.authService.login(action.credentials).pipe(
        map((response: string) => AuthActions.loginSuccess({
            token: response
          })
        ),
        catchError((response: HttpErrorResponse) =>
          observableOf(AuthActions.loginFailure({ errorMsg: response.error }))
        )
      )
    )
  ) });

  loginSuccess$ = createEffect(() => { return this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(action => {
      this.sessionService.token = action.token;
      this.router.navigateByUrl('/dashboard');
    })
  ) }, {dispatch: false});

  // Auto Login

  autoLoginStart$ = createEffect(() => { return this.actions$.pipe(
    ofType(AuthActions.autoLoginStart),
    switchMap(() =>
      this.authService.autoLogin().pipe(
        map((response: UserInterface) => AuthActions.autoLoginSuccess({
            user: response,
          })
        ),
        catchError((response: HttpErrorResponse) =>
          observableOf(AuthActions.autoLoginFailure({ errorMsg: response.error }))
        )
      )
    )
  ) });

  autologinFailed$ = createEffect(() => { return this.actions$.pipe(
    ofType(AuthActions.autoLoginFailure),
    tap(() => {
      this.router.navigateByUrl('/login');
    })
  ) }, {dispatch: false});

  // Create User

  createUserStart$ = createEffect(() => { return this.actions$.pipe(
    ofType(AuthActions.createUserStart),
    switchMap((action) =>
      this.authService.createUser(action.credentials).pipe(
        map((response: UserInterface) => AuthActions.createUserStartSuccess({
            user: response
          })
        ),
        catchError((response: HttpErrorResponse) =>
          observableOf(AuthActions.createUserStartFailure({ errorMsg: response.error }))
        )
      )
    )
  ) });

  createUserSuccess$ = createEffect(() => { return this.actions$.pipe(
    ofType(AuthActions.createUserStartSuccess),
    tap(() => {
      this.router.navigateByUrl('/login');
    })
  ) }, {dispatch: false});

  // Log Out

  logout = createEffect(() => { return this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      this.sessionService.removeToken();
      this.store.dispatch(TicketActionTypes.logout());
      this.router.navigateByUrl('/login');
    })
  ) }, {dispatch: false});

}
