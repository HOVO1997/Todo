import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { CreteTicketModalComponent } from "../../shared/modals/crete-ticket-modal/crete-ticket-modal.component";
import { Actions, ofType } from "@ngrx/effects";
import TicketActions from "../../store/ticket/ticket.action-types";
import TicketActionTypes from "../../store/ticket/ticket.action-types";
import TicketSelectors from "../../store/ticket/ticket.selector-types";
import { Store } from "@ngrx/store";
import {
  TicketModelInterface,
  UpdateTicketModelInterface
} from "../../../../../todo-api/src/app/tickets/models/ticket-model.interface";
import { TicketStatus } from "../../core/enum/ticket-status.enum";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs";

@Component({
  selector: "mfe-app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public todo: TicketModelInterface[] = [];
  public in_progress: TicketModelInterface[] = [];
  public done: TicketModelInterface[] = [];
  public ticketFormGroup!: FormGroup;
  public todoType: "top" | "bottom" = "top";
  public progressType: "top" | "bottom" = "top";
  public doneType: "top" | "bottom" = "top";

  public get connectionResult(): typeof TicketStatus {
    return TicketStatus;
  }

  constructor(
    public dialog: MatDialog,
    private actions: Actions,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(TicketActions.getTicketsStart());
    this.setTickets();
    this.afterTicketCreated();
    this.afterTicketDeleted();
    this.generateForm();
    this.subscribeFormChange();
    this.onTicketSearch();
    this.afterTicketSort();
  }

  private setTickets(): void {
    this.store.select(TicketSelectors.selectTicketsList).pipe()
      .subscribe((ticketsList: TicketModelInterface[]) => {
        ticketsList.forEach((ticket: TicketModelInterface) => {
          switch (ticket.status) {
            case TicketStatus.TODO:
              this.todo.push(ticket);
              break;
            case TicketStatus.IN_PROGRESS:
              this.in_progress.push(ticket);
              break;
            case TicketStatus.DONE:
              this.done.push(ticket);
              break;
          }
        });
      });
  }

  private onTicketSearch(): void {
    this.actions.pipe(
      ofType(TicketActions.searchTicketStart)
    ).subscribe(() => {
      this.resetList();
    });
  }

  private afterTicketCreated(): void {
    this.actions.pipe(
      ofType(TicketActions.createTicketSuccess)
    ).subscribe(() => {
      this.resetList();
      this.dialog.closeAll();
      this.store.dispatch(TicketActions.getTicketsStart());
    });
  }

  private afterTicketDeleted(): void {
    this.actions.pipe(
      ofType(TicketActions.deleteTicketSuccess)
    ).subscribe(() => {
      this.resetList();
      this.store.dispatch(TicketActions.getTicketsStart());
    });
  }

  private afterTicketSort(): void {
    this.actions.pipe(
      ofType(TicketActions.sortTicketSuccess)
    ).subscribe((result) => {
        if (result.response.find(res => res.status === TicketStatus.TODO)) {
          this.todo = result.response;
        } else if (result.response.find(res => res.status === TicketStatus.IN_PROGRESS)) {
          this.in_progress = result.response;
        } else if (result.response.find(res => res.status === TicketStatus.DONE)) {
          this.done = result.response;
        }
      }
    );
  }

  private resetList(): void {
    this.todo = [];
    this.in_progress = [];
    this.done = [];
  }

  public openDialog(): void {
    this.dialog.open(CreteTicketModalComponent, {
      width: "300px"
    });
  }

  public drop(event: CdkDragDrop<TicketModelInterface[]>, to: TicketStatus) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateTicket(event.container.data, to);
  }

  public delete(id: number): void {
    this.store.dispatch(TicketActions.deleteTicketStart({ id }));
  }

  private updateTicket(tickets: UpdateTicketModelInterface[], to: TicketStatus): void {
    const updated = [...tickets];
    this.store.dispatch(TicketActions.updateTicketStart({ tickets: updated, to }));
  }

  private generateForm(): void {
    this.ticketFormGroup = this.formBuilder.group({
      todo: [],
      in_progress: [],
      done: []
    });
  }

  private subscribeFormChange(): void {
    this.ticketFormGroup.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(columns => {
      this.todoType = this.doneType = this.progressType = "top";
      this.store.dispatch(TicketActionTypes.searchTicketStart({ payload: columns }));
    });
  }

  public sortTodo(): void {
    if (this.todoType === "top") {
      this.todoType = "bottom";
    } else {
      this.todoType = "top";
    }
    this.store.dispatch(TicketActionTypes.sortTicketStart({ forType: TicketStatus.TODO, by: this.todoType }));
  }

  public sortInProgress(): void {
    if (this.progressType === "top") {
      this.progressType = "bottom";
    } else {
      this.progressType = "top";
    }
    this.store.dispatch(TicketActionTypes.sortTicketStart({
      forType: TicketStatus.IN_PROGRESS,
      by: this.progressType
    }));
  }

  public sortDone(): void {
    if (this.doneType === "top") {
      this.doneType = "bottom";
    } else {
      this.doneType = "top";
    }
    this.store.dispatch(TicketActionTypes.sortTicketStart({ forType: TicketStatus.DONE, by: this.doneType }));
  }
}
