import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { DragDropModule } from "@angular/cdk/drag-drop";
import * as fromTicketReducer from '../store/ticket/ticket.reducer';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { TicketEffect } from "../store/ticket/ticket.effect";
import { MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
  {path: '', component: DashboardComponent}
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      fromTicketReducer.ticketFeatureKey,
      fromTicketReducer.ticketReducer
    ),
    EffectsModule.forFeature([TicketEffect]),
    MatButtonModule,
    DragDropModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule {}
