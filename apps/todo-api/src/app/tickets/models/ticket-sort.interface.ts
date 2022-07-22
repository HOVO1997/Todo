import { TicketStatus } from "../enum/ticketStatus";

export interface TicketSortInterface {
  for: TicketStatus,
  to: string,
}
