import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { GitSearchComponent } from './git-search/git-search.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: SearchComponent
  },
  // {
  //   path: '', component: HomeComponent, canActivate: [AuthGuard]
  // },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'git-search', component: GitSearchComponent , canActivate: [AuthGuard]
  },
  {
    path: 'search', component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
