import {TicketInterface} from "../ticket/ticket.interface";

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  name: string;
  tickets: TicketInterface[]
}
