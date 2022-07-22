import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TicketStatus } from "../enum/ticketStatus";

export class CreateTicketDto {
  @ApiProperty({ type: String, description: 'title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TicketStatus })
  @IsEnum(TicketStatus)
  @IsOptional()
  status: TicketStatus;
}

export class UpdateTicketDto {
  @ApiProperty({ type: Number, description: 'id' })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: String, description: 'title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TicketStatus })
  @IsEnum(TicketStatus)
  @IsOptional()
  status: TicketStatus;
}
