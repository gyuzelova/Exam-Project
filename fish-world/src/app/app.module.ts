import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FishModule } from './fish/fish.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FishModule,
    UserModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [{ useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS,}],
  bootstrap: [AppComponent]
})
export class AppModule { }
