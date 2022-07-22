import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  CreateTicketModelInterface,
  TicketModelInterface, UpdateTicketModelInterface
} from "../../../../../todo-api/src/app/tickets/models/ticket-model.interface";
import { TicketStatus } from "../enum/ticket-status.enum";
import { TicketSearchInterface } from "../models/ticket/ticket-search.interface";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private BASE_URL = 'http://localhost:3333';

  constructor(private readonly _httpClient: HttpClient) { }

  public createTicket(ticketOptions: CreateTicketModelInterface): Observable<TicketModelInterface> {
    return this._httpClient.post<TicketModelInterface>(`${this.BASE_URL}/tickets/create`, ticketOptions)
  }

  public getTicketsList(): Observable<TicketModelInterface[]> {
    return this._httpClient.get<TicketModelInterface[]>(`${this.BASE_URL}/tickets/all`)
  }

  public deleteTicket(id: number): Observable<string> {
    return this._httpClient.delete<string>(`${this.BASE_URL}/tickets/delete/${id}`)
  }

  public updateTicket(tickets: UpdateTicketModelInterface[], to: TicketStatus): Observable<TicketModelInterface> {
    return this._httpClient.put<TicketModelInterface>(`${this.BASE_URL}/tickets/update`, {tickets, to})
  }

  public searchTicketsList(payload: TicketSearchInterface): Observable<TicketModelInterface[]> {
    return this._httpClient.get<TicketModelInterface[]>(`${this.BASE_URL}/tickets/search?todo=${payload.todo ? payload?.todo : ''}&in_progress=${payload.in_progress ? payload.in_progress : ''}&done=${payload.done ? payload.done : ''}`)
  }

  public sortTicketsList(forType: TicketStatus, by: string): Observable<TicketModelInterface[]> {
    return this._httpClient.get<TicketModelInterface[]>(`${this.BASE_URL}/tickets/sort?for=${forType ? forType : ''}&to=${by ? by : ''}`)
  }
}
