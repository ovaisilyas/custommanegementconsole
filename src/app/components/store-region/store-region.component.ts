import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {StoreDetailsModel} from '../../model/storedetail.model';
import {AlertService} from '../../services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {StoresService} from '../../services/stores.service';

@Component({
  selector: 'app-store-region',
  templateUrl: './store-region.component.html',
  styleUrls: ['./store-region.component.css']
})
export class StoreRegionComponent implements OnInit {
  storeDetails = new StoreDetailsModel('', '', '', '', '', '', '');
  financialDetails = [];
  loyaltyDetail = [];
  guestShopping = [];
  itemList = [];

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
    this.getGuestShopping();
    this.getLoyaltyDetail();
  }

  getHeaderOptions() {
    this.storesService.getHeaderOptions();
  }

  getStoreDetails() {
    this.spinner.show();
    this.storesService.getStoreDetails()
    .pipe(map(
      (store) => {
        const storeDetail = store['storeDetails'];
        return storeDetail;
      }
    ))
    .subscribe(
      data => {
        this.storeDetails = data[0];
        this.spinner.hide();
      },
      error => {
        this.alertService.error(error);
        this.spinner.hide();
      });
  }

  saveStoreDetails() {
    const storeObj = {
      'storeDetails' : [this.storeDetails]
    };
    this.storesService.saveStoreSettings(storeObj)
    .subscribe(
      data => {
        this.alertService.success(data.message);
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

  getLoyaltyDetail() {
    this.storesService.getLoyaltyDetail()
    .pipe(map(
      (list) => {
        const loyaltylist = list['Loyality Details'];
        const loyalty = loyaltylist['loyality'];
        return loyalty;
      }
    ))
    .subscribe(
      data => {
        this.loyaltyDetail = data[0];
      },
      error => {
        this.alertService.error(error);
      });
  }

  getGuestShopping() {
    this.storesService.getGuestShopping()
    .subscribe(
      data => {
        this.guestShopping = data;
      },
      error => {
        this.alertService.error(error);
      });
  }

  saveSettingDetails() {
    const loyaltyData = {
      'Loyality Details': {
      'loyality': [ this.loyaltyDetail]
      }
    };
    this.storesService.saveGuestShopping(this.guestShopping).subscribe();
    this.storesService.saveLoyaltySettings(loyaltyData).subscribe();
  }

  openUserAccounts() {
    this.spinner.show();
    this.storesService.openUserAccounts()
    .subscribe(
      data => {
        this.spinner.hide();
        this.itemList = data;
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });
  }


}
