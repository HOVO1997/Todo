import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { from, Observable, of, switchMap } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In, ILike } from "typeorm";
import { Ticket } from "../entities/ticket.entity";
import { CreateTicketDto, UpdateTicketDto } from "../dto/create-ticket.dto";
import { UserModelInterface } from "../../users/models/user-model.interface";
import { UsersService } from "../../users/services/users.service";
import { TicketModelInterface } from "../models/ticket-model.interface";
import { TicketStatus } from "../enum/ticketStatus";
import { TicketSearchInterface } from "../models/ticket-search.interface";
import { TicketSortInterface } from "../models/ticket-sort.interface";

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    private readonly usersService: UsersService
  ) {
  }


  public createTicket(
    ticket: CreateTicketDto,
    user: UserModelInterface
  ): Observable<Ticket> {
    return this.usersService.findOne(user.id).pipe(
      switchMap((userExist: UserModelInterface) => {
        if (userExist) {
          return this.ticketRepository.save({ ...ticket, users: [{ id: userExist.id }] });
        } else {
          throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
      })
    );
  }

  public updateTicket(
    payload: { tickets: UpdateTicketDto[], to: TicketStatus }
  ): Observable<unknown> {
    return from(
      this.ticketRepository.update({ id: In([...payload.tickets.map((el) => el.id)]) },
        { status: payload.to })
    ).pipe(
      switchMap(updated => {
        return of(updated);
      })
    );
  }

  public searchTicket(
    query: TicketSearchInterface
  ): Observable<TicketModelInterface[]> {
    return from(
      this.ticketRepository.find({
        where: [
          { title: ILike(`%${query.todo}%`),status: TicketStatus.TODO },
          { title: ILike(`%${query.in_progress}%`), status: TicketStatus.IN_PROGRESS },
          { title: ILike(`%${query.done}%`), status: TicketStatus.DONE }
        ],
        relations: ["users"]
      })
    ).pipe(
      switchMap(updated => {
        return of(updated);
      })
    );
  }

  public sortTicket(
    query: TicketSortInterface
  ): Observable<TicketModelInterface[]> {
    return from(
      this.ticketRepository.find({
        where: [
          {  status: query.for },
        ],
        order: {
          title: query.to === "top" ? "ASC" : "DESC",
        },
        relations: ["users"]
      })
    ).pipe(
      switchMap(updated => {
        return of(updated);
      })
    );
  }

  public getTicketUser(id: number): Observable<Ticket[]> {
    return from(
      this.ticketRepository.find({
        where: {
          id
        },
        relations: ["users"]
      })
    );
  }

  public getAllTickets(): Observable<TicketModelInterface[]> {
    return from(this.ticketRepository.find({ relations: ["users"] }));
  }

  public deleteTicket(ticketId: number): Observable<{ deleted: boolean }> {
    return from(this.ticketRepository.delete({ id: ticketId })).pipe(
      switchMap((value, index) => {
        if (value) {
          return of({ deleted: true });
        } else {
          throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      })
    );
  }
}
