import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
  createParamDecorator, Req
} from "@nestjs/common";
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Observable } from 'rxjs';
import { UserModelInterface } from './models/user-model.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('User API')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @HttpCode(201)
  public userRegistration(
    @Body() user: CreateUserDto,
  ): Observable<UserModelInterface> {
    return this.usersService.createUser(user);
  }

  @Post('login')
  @HttpCode(200)
  public login(@Body() user: LoginUserDto): Observable<string> {
    return this.usersService.login(user);
  }

  @Get('token')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  public getProfile(@Request() request) {
    return request.user;
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  public getAll(): Observable<UserModelInterface[]> {
    return this.usersService.getAllUsers();
  }
}
