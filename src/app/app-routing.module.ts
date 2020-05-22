import { HomeComponent } from './admin/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-pass', component: ForgotPasswordComponent },
  { path: 'verify-mail', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
