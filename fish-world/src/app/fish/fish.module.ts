import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AddFishComponent } from './add-fish/add-fish.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent,
    AddFishComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FishModule { }
