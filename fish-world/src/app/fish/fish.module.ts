import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AddFishComponent } from './add-fish/add-fish.component';
import { DetailsComponent } from './details/details.component';
import { FishRoutingModule } from './fish-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditPageComponent } from './edit-page/edit-page.component';



@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent,
    AddFishComponent,
    DetailsComponent,
    EditPageComponent,
  
  ],
  imports: [
    CommonModule, 
    FishRoutingModule,
     RouterModule,  
     FormsModule,
    ReactiveFormsModule, 
    SharedModule
  ], 
  exports: []
})
export class FishModule { }
