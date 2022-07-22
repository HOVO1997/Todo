import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post, Put, Query, Request,
  UseGuards
} from "@nestjs/common";
import { TicketsService } from './services/tickets.service';
import { CreateTicketDto, UpdateTicketDto } from "./dto/create-ticket.dto";
import { Observable } from 'rxjs';
import { TicketModelInterface } from './models/ticket-model.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Ticket } from "./entities/ticket.entity";
import { UserModelInterface } from "../users/models/user-model.interface";
import { TicketStatus } from "./enum/ticketStatus";
import { TicketSearchInterface } from "./models/ticket-search.interface";
import { TicketSortInterface } from "./models/ticket-sort.interface";

@ApiTags('Ticket API')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('create')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public createTicket(
    @Body() ticket: CreateTicketDto,
    @Request() request
  ): Observable<Ticket> {
    return this.ticketsService.createTicket(ticket, request.user);
  }

  @Put('update')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public updateTicket(
    @Body() payload: {tickets: UpdateTicketDto[], to: TicketStatus}
  ): Observable<unknown> {
    return this.ticketsService.updateTicket(payload);
  }

  @Get('search')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public searchTicket(
    @Query() query: TicketSearchInterface
  ): Observable<TicketModelInterface[]> {
    return this.ticketsService.searchTicket(query);
  }

  @Get('sort')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public sortTicket(
    @Query() query: TicketSortInterface
  ): Observable<TicketModelInterface[]> {
    return this.ticketsService.sortTicket(query);
  }

  @Get('get/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public getTicketUser(
    @Param('id') id: number,
  ): Observable<Ticket[]> {
    return this.ticketsService.getTicketUser(id);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  public getAll(): Observable<TicketModelInterface[]> {
    return this.ticketsService.getAllTickets();
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public deleteUserProduct(@Param('id') id: number): Observable<{ deleted: boolean }> {
    return this.ticketsService.deleteTicket(id);
  }
}
