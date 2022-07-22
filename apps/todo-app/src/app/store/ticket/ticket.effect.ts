import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs";
import * as TicketActions from "./ticket.actions";
import { HttpErrorResponse } from "@angular/common/http";
import {of as observableOf} from 'rxjs';
import { TicketService } from "../../core/services/ticket.service";
import { TicketModelInterface } from "../../../../../todo-api/src/app/tickets/models/ticket-model.interface";
import * as AuthActions from "../auth/auth.actions";

@Injectable()
export class TicketEffect {

  constructor(
    private actions$: Actions,
    private ticketService: TicketService,
  ) {
  }

  // Create Ticket

  createTicketStart$ = createEffect(() => { return this.actions$.pipe(
    ofType(TicketActions.createTicketStart),
    switchMap((action) =>
      this.ticketService.createTicket(action.ticket).pipe(
        map((response: TicketModelInterface) => TicketActions.createTicketSuccess({
            ticket: response
          })
        ),
        catchError((response: HttpErrorResponse) =>
          observableOf(TicketActions.createTicketFailure({ errorMsg: response.error }))
        )
      )
    )
  ) });

  // Get Tickets

  getTicketsStart$ = createEffect(() => { return this.actions$.pipe(
    ofType(TicketActions.getTicketsStart),
    switchMap(() =>
      this.ticketService.getTicketsList().pipe(
        map((response: TicketModelInterface[]) => TicketActions.getTicketsSuccess({
            tickets: response
          })
        ),
        catchError((response: HttpErrorResponse) =>
          observableOf(TicketActions.getTicketsFailure({ errorMsg: response.error }))
        )
      )
    )
  ) });

  // Delete Ticket

  deleteTicketStart$ = createEffect(() => { return this.actions$.pipe(
    ofType(TicketActions.deleteTicketStart),
    switchMap((action) =>
      this.ticketService.deleteTicket(action.id).pipe(
        map((response: string) => TicketActions.deleteTicketSuccess({
            response: response
          })
        ),
        catchError((response: HttpErrorResponse) =>
          observableOf(TicketActions.deleteTicketFailure({ errorMsg: response.error }))
        )
      )
    )
  ) });

  // Update Ticket

  updateTicketStart$ = createEffect(() => { return this.actions$.pipe(
    ofType(TicketActions.updateTicketStart),
    switchMap((action) =>
      this.ticketService.updateTicket(action.tickets, action.to).pipe(
        map((response: TicketModelInterface) => TicketActions.updateTicketSuccess({
            response: response
          })
        ),
        catchError((response: HttpErrorResponse) =>
          observableOf(TicketActions.updateTicketFailure({ errorMsg: response.error }))
        )
      )
    )
  ) });

  // Update Ticket

  searchTicketStart$ = createEffect(() => { return this.actions$.pipe(
    ofType(TicketActions.searchTicketStart),
    switchMap((action) =>
      this.ticketService.searchTicketsList(action.payload).pipe(
        map((response: TicketModelInterface[]) => TicketActions.searchTicketSuccess({
            response: response
          })
        ),
        catchError((response: HttpErrorResponse) =>
          observableOf(TicketActions.searchTicketFailure({ errorMsg: response.error }))
        )
      )
    )
  ) });

  // Sort Ticket

  sortTicketStart$ = createEffect(() => { return this.actions$.pipe(
    ofType(TicketActions.sortTicketStart),
    switchMap((action) =>
      this.ticketService.sortTicketsList(action.forType, action.by).pipe(
        map((response: TicketModelInterface[]) => TicketActions.sortTicketSuccess({
            response: response
          })
        ),
        catchError((response: HttpErrorResponse) =>
          observableOf(TicketActions.sortTicketFailure({ errorMsg: response.error }))
        )
      )
    )
  ) });
}
