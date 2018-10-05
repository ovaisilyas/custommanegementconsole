import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import {UsersOrgComponent} from './components/users-org/users-org.component';
import {ProductsPriceComponent} from './components/products-price/products-price.component';
import { ContractListComponent } from './components/contract-list/contract-list.component';
import {CataloguesComponent} from './components/catalogues/catalogues.component';
import {FiltersComponent} from './components/filters/filters.component';
import {StoreRegionComponent} from './components/store-region/store-region.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users-org', component: UsersOrgComponent },
  { path: 'product-prices', component: ProductsPriceComponent },
  { path: 'product-prices/contract-list', component: ContractListComponent },
  { path: 'catalogue', component: CataloguesComponent },
  { path: 'filters', component: FiltersComponent },
  { path: 'store-region', component: StoreRegionComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
