import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ticketFeatureKey, TicketState } from "./ticket.reducer";

export const selectTicketState = createFeatureSelector<TicketState>(ticketFeatureKey);

export const selectTicketsList = createSelector(
  selectTicketState,
  ticket => ticket.tickets
);





