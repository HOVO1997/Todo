import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { SessionService } from "../services/session.service";
import { AuthState } from "../../store/auth/auth.reducer";
import AuthSelectors from "../../store/auth/auth.selector-types";
import AuthActions from "../../store/auth/auth.action-types";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private store: Store<AuthState>,
              private sessionService: SessionService) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(AuthSelectors.selectIsLoggedIn).pipe(
      switchMap(isAuthorized => {
        if (isAuthorized) {
          return of(true);
        } else {
          if (this.sessionService.token) {
            this.store.dispatch(AuthActions.autoLoginStart());
            return of(true);
          } else {
            this.router.navigateByUrl("/login");
            return of(false);
          }
        }
      }));
  }
}
