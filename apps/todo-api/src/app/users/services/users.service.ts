import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { UserModelInterface } from '../models/user-model.interface';
import { AuthService } from '../../auth/services/auth.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  public createUser(user: CreateUserDto): Observable<UserModelInterface> {
    return this.mailExist(user.email).pipe(
      switchMap((exist: boolean) => {
        if (!exist) {
          return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
              user.password = passwordHash;
              return from(this.userRepository.save(user)).pipe(
                map((savedUser: UserModelInterface) => {
                  const { password, ...user } = savedUser;
                  return savedUser;
                }),
              );
            }),
          );
        } else {
          throw new HttpException('Email already Exist', HttpStatus.CONFLICT);
        }
      }),
    );
  }

  public login(loginUser: LoginUserDto): Observable<string> {
    return this.findUserByEmail(loginUser.email).pipe(
      switchMap((user: UserModelInterface) => {
        if (user) {
          return this.validatePassword(loginUser.password, user.password).pipe(
            switchMap((passwordMatches: boolean) => {
              if (passwordMatches) {
                return this.findOne(user.id).pipe(
                  switchMap((user: UserModelInterface) =>
                    this.authService.generateJWT(user),
                  ),
                );
              } else {
                throw new HttpException(
                  'Invalid credentials',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }

  public getAllUsers(): Observable<UserModelInterface[]> {
    return from(this.userRepository.find());
  }

  public findOne(id: number): Observable<UserModelInterface> {
    return from(this.userRepository.findOne({
      where: {
        id
      }
    }));
  }

  private findUserByEmail(email: string): Observable<UserModelInterface> {
    return from(
      this.userRepository.findOne(
        {
          where: {
            email
          },
          select: ['id', 'email', 'name', 'password']
        },
      ),
    );
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<boolean> {
    return from(this.authService.comparePassword(password, storedPasswordHash));
  }

  private mailExist(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ where: {email} })).pipe(
      map((user: UserModelInterface) => !!user),
    );
  }
}
