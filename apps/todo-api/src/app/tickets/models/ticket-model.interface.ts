import { UserModelInterface } from "../../users/models/user-model.interface";

export interface TicketModelInterface {
  id: number;
  title: string;
  description: string;
  status: string;
  users: UserModelInterface[];
}
export interface CreateTicketModelInterface {
  title: string;
  description: string;
}
export interface UpdateTicketModelInterface {
  id: number;
  title: string;
  description: string;
  status: string;
}
