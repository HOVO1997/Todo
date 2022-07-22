import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import AuthActionTypes from "../../store/auth/auth.action-types";
import { Router } from "@angular/router";

@Component({
  selector: 'mfe-app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  public createUserForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private store$: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm(): void {
    this.createUserForm = this._formBuilder.group({
      email: [],
      password: [],
      name: []
    });
  }

  public submit() {
    if (this.createUserForm.valid) {
      this.store$.dispatch(AuthActionTypes.createUserStart({credentials: this.createUserForm.getRawValue()}))
    }
  }

  public login(): void {
    this.router.navigate(['login']);
  }
}
