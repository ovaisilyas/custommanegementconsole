import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {StoresService} from '../../services/stores.service';

@Component({
  selector: 'app-store-region',
  templateUrl: './store-region.component.html',
  styleUrls: ['./store-region.component.css']
})
export class StoreRegionComponent implements OnInit {
  storeDetails = [];
  financialDetails = [];

  constructor(
    private router: Router,
    private storesService: StoresService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getHeaderOptions();
    if (sessionStorage.getItem('WCToken') === null) {
      this.router.navigate(['/login']);
    }
    this.getStoreDetails();
  }

  getHeaderOptions() {
    this.storesService.getHeaderOptions();
  }

  getStoreDetails() {
    this.storesService.getStoreDetails()
    .subscribe(
      data => {
        this.storeDetails = data;
      },
      error => {
        this.alertService.error(error);
      });
  }

  saveStoreDetails() {
    this.storesService.saveStoreSettings(this.storeDetails)
    .subscribe(
      data => {

      },
      error => {
      this.alertService.error(error);
      });
  }

  getFinancialDetails() {
    this.storesService.getFinancialDetails()
    .subscribe(
      data => {
        this.financialDetails = data;
      },
      error => {
        this.alertService.error(error);
      });
  }

  saveFinancialDetails() {
    this.storesService.saveFinancialDetails(this.financialDetails)
    .subscribe(
      data => {
        this.alertService.success(data.message);
      },
      error => {
        this.alertService.error(error);
      });
  }


}
