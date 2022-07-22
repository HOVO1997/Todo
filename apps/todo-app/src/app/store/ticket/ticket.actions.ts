import { createAction, props } from "@ngrx/store";
import {
  CreateTicketModelInterface,
  TicketModelInterface, UpdateTicketModelInterface
} from "../../../../../todo-api/src/app/tickets/models/ticket-model.interface";
import { TicketStatus } from "../../../../../todo-api/src/app/tickets/enum/ticketStatus";
import { TicketSearchInterface } from "../../core/models/ticket/ticket-search.interface";

export const createTicketStart = createAction("[Create Ticket] Create Ticket Start",
  props<{ ticket: CreateTicketModelInterface }>());

export const createTicketSuccess = createAction("[Create Ticket] Create Ticket Success",
  props<{ ticket: TicketModelInterface }>());

export const createTicketFailure = createAction("[Create Ticket] Create Ticket Failed",
  props<{ errorMsg: string }>());



export const getTicketsStart = createAction("[Get Tickets] Get Tickets Start");

export const getTicketsSuccess = createAction("[Get Tickets] Get Tickets Success",
  props<{ tickets: TicketModelInterface[] }>());

export const getTicketsFailure = createAction("[Get Tickets] Get Tickets Failed",
  props<{ errorMsg: string }>());


export const updateTicketStart = createAction("[Update Tickets] Update Ticket Start",
  props<{ tickets: UpdateTicketModelInterface[], to: TicketStatus }>());

export const updateTicketSuccess = createAction("[Update Tickets] Update Ticket Success",
  props<{ response: TicketModelInterface }>());

export const updateTicketFailure = createAction("[Update Tickets] Update Ticket Failed",
  props<{ errorMsg: string }>());


export const deleteTicketStart = createAction("[Delete Tickets] Delete Ticket Start",
  props<{ id: number }>());

export const deleteTicketSuccess = createAction("[Delete Tickets] Delete Ticket Success",
  props<{ response: string }>());

export const deleteTicketFailure = createAction("[Delete Tickets] Delete Ticket Failed",
  props<{ errorMsg: string }>());

export const searchTicketStart = createAction("[Search Tickets] Search Ticket Start",
  props<{ payload: TicketSearchInterface }>());

export const searchTicketSuccess = createAction("[Search Tickets] Search Ticket Success",
  props<{ response: TicketModelInterface[] }>());

export const searchTicketFailure = createAction("[Search Tickets] Search Ticket Failed",
  props<{ errorMsg: string }>());

export const sortTicketStart = createAction("[Sort Tickets] Sort Ticket Start",
  props<{ forType: TicketStatus, by: string }>());

export const sortTicketSuccess = createAction("[Sort Tickets] Sort Ticket Success",
  props<{ response: TicketModelInterface[] }>());

export const sortTicketFailure = createAction("[Sort Tickets] Sort Ticket Failed",
  props<{ errorMsg: string }>());


export const logout = createAction("[Logout Tickets] Logout Ticket");
