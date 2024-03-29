import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { AddFishComponent } from "./add-fish/add-fish.component";
import { DetailsComponent } from "./details/details.component";

const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path: 'catalog', component:CatalogComponent},
    {path: 'create', component: AddFishComponent},
    {path: 'details', component: DetailsComponent},
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FishRoutingModule {}