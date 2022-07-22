import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import TicketActionTypes from "../../../store/ticket/ticket.action-types";
import { Store } from "@ngrx/store";
import { DialogRef } from "@angular/cdk/dialog";

@Component({
  selector: 'mfe-app-crete-ticket-modal',
  templateUrl: './crete-ticket-modal.component.html',
  styleUrls: ['./crete-ticket-modal.component.scss'],
})
export class CreteTicketModalComponent implements OnInit {
  public createTicketFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store,
    private dialogRef: DialogRef
  ) {}

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm(): void {
    this.createTicketFormGroup = this._formBuilder.group({
      title: [],
      description: [],
    });
  }

  public submit() {
    if (this.createTicketFormGroup.valid) {
      this.store.dispatch(TicketActionTypes.createTicketStart({ticket: this.createTicketFormGroup.getRawValue()}))
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

}
