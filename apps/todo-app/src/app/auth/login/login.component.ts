import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import AuthActionTypes from "../../store/auth/auth.action-types";
import { Router } from "@angular/router";

@Component({
  selector: "mfe-app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private store$: Store,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm(): void {
    this.loginForm = this._formBuilder.group({
      email: [],
      password: []
    });
  }

  public submit() {
    if (this.loginForm?.valid) {
      this.store$.dispatch(AuthActionTypes.loginStart({credentials: this.loginForm.getRawValue()}))
    }
  }

  public createUser(): void {
    this.router.navigate(['signup']);
  }
}
