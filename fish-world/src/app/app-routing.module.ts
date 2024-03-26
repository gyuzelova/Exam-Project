import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './fish/home/home.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { CatalogComponent } from './fish/catalog/catalog.component';
import { AddFishComponent } from './fish/add-fish/add-fish.component';
import { DetailsComponent } from './fish/details/details.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
{ path: '', children: [
    {path: 'home',component: HomeComponent}, 
    {path: 'catalog', component: CatalogComponent},
    {path: 'create', component: AddFishComponent},
    {path: 'details', component: DetailsComponent},
  ]},
  {
    path: '', children: [
   {path: 'login', component: LoginComponent},
   {path: 'register', component: RegisterComponent},
    ]

  },
  {path: '404', component: ErrorPageComponent},
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
