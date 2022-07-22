import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @ManyToMany(() => Ticket, ticket => ticket.users, { onDelete: 'CASCADE' })
  @JoinTable({
    name: "users_tickets",
    joinColumns: [
      {
        name: 'ticket_id',
        referencedColumnName: 'id'
      }
    ],
    inverseJoinColumns: [
      {
        name: 'user_id',
        referencedColumnName: 'id'
      }
    ]
  })
  tickets: Ticket[];

}
