import { Injectable } from '@nestjs/common';
import { from, Observable, of } from "rxjs";
import { JwtService } from '@nestjs/jwt';
import { UserModelInterface } from '../../users/models/user-model.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  async comparePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, storedPasswordHash);
  }

  generateJWT(user: UserModelInterface): Observable<string> {
    return from(this.jwtService.signAsync({ ...user }));
  }
}
