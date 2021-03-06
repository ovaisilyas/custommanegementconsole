import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerModule } from 'ngx-spinner';
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
import { ContractListComponent } from './components/contract-list/contract-list.component';
import { CataloguesComponent } from './components/catalogues/catalogues.component';
import { FiltersComponent } from './components/filters/filters.component';
import { StoreRegionComponent } from './components/store-region/store-region.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogService} from './confirmation-dialog/confirmation-dialog/confirmation-dialog.service';

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
    AutofocusDirective,
    ContractListComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    routing,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    ConfirmationDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
