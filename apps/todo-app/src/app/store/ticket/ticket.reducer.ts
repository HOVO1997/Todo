import {createReducer, on} from '@ngrx/store';
import TicketActions from './ticket.action-types';
import { TicketModelInterface } from "../../../../../todo-api/src/app/tickets/models/ticket-model.interface";

export interface TicketState {
  tickets: TicketModelInterface[];
  ticketErrMessage: string;
  ticketSuccessMessage: string;
}

export const initialTicketState: TicketState = {
  tickets: [],
  ticketErrMessage: '',
  ticketSuccessMessage: ''
};

export const ticketFeatureKey = 'ticket';

export const ticketReducer = createReducer(
  initialTicketState,
  on(TicketActions.getTicketsSuccess, (state, action) => {
    return {tickets: action.tickets, ticketErrMessage: '', ticketSuccessMessage: ''};
  }),
  on(TicketActions.getTicketsFailure, (state, action) => {
    return {...state, ticketErrMessage: action.errorMsg};
  }),
  on(TicketActions.searchTicketSuccess, (state, action) => {
    return {tickets: action.response, ticketErrMessage: '', ticketSuccessMessage: ''};
  }),

  on(TicketActions.logout, () => {
    return {
      tickets: [],
      ticketErrMessage: '',
      ticketSuccessMessage: ''
    };
  }),
)
