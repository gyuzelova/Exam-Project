import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { ProfilComponent } from "./profile/profil.component";

const routes: Routes  = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfilComponent},
    
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class UserRouterModule {}