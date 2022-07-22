import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { AuthGuard } from "./core/guards/auth.guard";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
