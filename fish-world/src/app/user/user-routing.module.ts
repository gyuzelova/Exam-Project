import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { ProfilComponent } from "./profile/profil.component";
import { guestActive } from "../guards/guest.activate";
import { AuthActivate } from "../guards/auth.activate";


const routes: Routes  = [
    {path: 'login', component: LoginComponent, canActivate: [guestActive()]},
    {path: 'register', component: RegisterComponent, canActivate: [guestActive()]},
    {path: 'logout', component: RegisterComponent, canActivate: [AuthActivate]},
    {path: 'profile/:userId',  component: ProfilComponent, canActivate: [AuthActivate]}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class UserRouterModule {}