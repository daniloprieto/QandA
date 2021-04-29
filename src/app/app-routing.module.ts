import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { StartComponent } from './components/start/start.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: StartComponent },
  {
    path:'user', loadChildren: () => import('./components/user/user.module')
      .then(m => m.UserModule)
  },
  {
    path:'play', loadChildren: () => import('./components/play/play.module')
      .then(m => m.PlayModule)
  },
  {
    path:'dashboard', component: DashboardComponent ,loadChildren: () => import('./components/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
      canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
