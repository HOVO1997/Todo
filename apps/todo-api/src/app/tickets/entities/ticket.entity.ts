import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TicketStatus } from "../enum/ticketStatus";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: TicketStatus,
    default: TicketStatus.TODO,
  })
  status: TicketStatus;

  @ManyToMany(() => User, user => user.tickets, { onDelete: 'CASCADE' })
  users: User[];
}
