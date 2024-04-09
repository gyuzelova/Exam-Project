import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { AddFishComponent } from "./add-fish/add-fish.component";
import { DetailsComponent } from "./details/details.component";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { AuthActivate } from "../guards/auth.activate";

const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path: 'catalog', component:CatalogComponent},
    {path: 'create', component: AddFishComponent, canActivate: [AuthActivate]},
    {path: 'details/:fishId', component: DetailsComponent, canActivate: [AuthActivate]},
    {path: 'edit/:fishId', component: EditPageComponent, canActivate: [AuthActivate]},
    
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FishRoutingModule {}