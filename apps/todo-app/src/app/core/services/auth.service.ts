import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserCreateInterface, UserLoginInterface } from "../models/user/user-login.interface";
import {UserInterface} from "../models/user/user.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:3333';
  constructor(private readonly _httpClient: HttpClient) { }

  public login(userOptions: UserLoginInterface): Observable<string> {
    return this._httpClient.post(`${this.BASE_URL}/user/login`, userOptions, {responseType: 'text'})
  }

  public autoLogin(): Observable<UserInterface> {
    return this._httpClient.get<UserInterface>(`${this.BASE_URL}/user/token`);
  }

  public createUser(userOptions: UserCreateInterface): Observable<UserInterface> {
    return this._httpClient.post<UserInterface>(`${this.BASE_URL}/user/create`, userOptions)
  }
}
