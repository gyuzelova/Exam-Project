import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';




@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
   
  ],
  imports: [
    CommonModule, RouterModule, UserModule
  ], exports: [FooterComponent, HeaderComponent, ErrorComponent]
})
export class CoreModule { }
