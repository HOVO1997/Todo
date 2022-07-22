import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "../layouts/auth-layout/auth-layout.component";
import {EffectsModule} from '@ngrx/effects';
import { AuthEffects } from '../store/auth/auth.effect';
import { StoreModule } from '@ngrx/store';
import * as fromAuthReducer from '../store/auth/auth.reducer';
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignUpComponent},
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAuthReducer.authFeatureKey,
      fromAuthReducer.authReducer
    ),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class AuthModule {}
