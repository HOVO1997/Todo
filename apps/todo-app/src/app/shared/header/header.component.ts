import { Component, Input } from "@angular/core";
import { UserInterface } from "../../core/models/user/user.interface";
import { Store } from "@ngrx/store";
import AuthActions from '../../store/auth/auth.action-types';

@Component({
  selector: 'mfe-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() user: UserInterface | null = null;

  constructor(private readonly store: Store) {
  }

  public logOut(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
