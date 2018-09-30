import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AlertComponent } from './directives/alert/alert.component';
import { routing } from './app.routing';
import { HeaderComponent } from './components/header/header.component';
import { UsersOrgComponent } from './components/users-org/users-org.component';
import { ProductsPriceComponent } from './components/products-price/products-price.component';
import { CataloguesComponent } from './components/catalogues/catalogues.component';
import { FiltersComponent } from './components/filters/filters.component';
import { StoreRegionComponent } from './components/store-region/store-region.component';
import { OrgDetailComponent } from './components/users-org/org-detail/org-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    HeaderComponent,
    UsersOrgComponent,
    ProductsPriceComponent,
    CataloguesComponent,
    FiltersComponent,
    StoreRegionComponent,
    OrgDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
