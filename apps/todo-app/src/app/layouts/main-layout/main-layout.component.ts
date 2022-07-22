import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import AuthSelectors from '../../store/auth/auth.selector-types';
import { Observable } from "rxjs";
import { UserInterface } from "../../core/models/user/user.interface";

@Component({
  selector: 'mfe-app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{
  public user$?: Observable<UserInterface | null>;

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.store.select(AuthSelectors.selectLoggedInUser);
  }

}
