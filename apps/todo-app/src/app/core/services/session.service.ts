import {Injectable} from '@angular/core';

@Injectable()
export class SessionService {

  get token(): string {
    return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : '';
  }

  set token(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

}
