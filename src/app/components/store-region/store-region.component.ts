import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {StoreDetailsModel} from '../../model/storedetail.model';
import {UserStatusModel} from '../../model/userstatus.model';
import {AlertService} from '../../services/alert.service';
import {UsersService} from '../../services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {StoresService} from '../../services/stores.service';

@Component({
  selector: 'app-store-region',
  templateUrl: './store-region.component.html',
  styleUrls: ['./store-region.component.css']
})
export class StoreRegionComponent implements OnInit {
  storeDetails = new StoreDetailsModel('', '', '', '', '', '', '');
  userStatusModel: UserStatusModel;
  paymethods = [];
  eWayDetails = [];
  eWayChecked = false;
  loyaltyDetail = {'loyalityEnable': false};
  guestShopping = {'enable': false};
  itemList = [];

  constructor(
    private router: Router,
    private storesService: StoresService,
    private usersService: UsersService,
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
    this.getFinancialDetails();
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
    .pipe(map(
      (list) => {
        const payDetail = list['Payment Methods Details'];
        return payDetail;
      }
    ))
    .subscribe(
      data => {
        this.paymethods = data['paymentMethodsValue'];
        this.eWayDetails = data['ewayDetail'];
        if (this.eWayDetails[0].paymentMethodValue === true || this.eWayDetails[1].paymentMethodValue === true || this.eWayDetails[2].paymentMethodValue === true) {
          this.eWayChecked = true;
        }
      },
      error => {
        this.alertService.error(error);
      });
  }

  saveFinancialDetails() {
    this.spinner.show();
    const finalData = {
      'Payment Methods Details': {
          'paymentMethodsValue': this.paymethods,
          'ewayDetail': this.eWayDetails
      }
  };
    this.storesService.saveFinancialDetails(finalData)
    .subscribe(
      data => {
        this.spinner.hide();
        this.alertService.success(data.message);
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });
  }

  getLoyaltyDetail() {
    this.storesService.getLoyaltyDetail()
    .pipe(map(
      (list) => {
        const loyaltylist = list['Loyality Details'];
        return loyaltylist;
      }
    ))
    .subscribe(
      data => {
        this.loyaltyDetail = data;
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
      'Loyality Details':  this.loyaltyDetail
    };
    this.storesService.saveGuestShopping(this.guestShopping).subscribe();
    this.storesService.saveLoyaltySettings(loyaltyData).subscribe();
  }

  openUserAccounts() {
    this.spinner.show();
    this.storesService.openUserAccounts()
    .pipe(map(
      (users) => {
        const searchDetails = users['userAccountDetails'];
        return searchDetails;
      }
    ))
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

  updateUserStatus(userId: string, event: any) {
    this.spinner.show();
    if (event.currentTarget.checked) {
      status = '1';
    } else {
      status = '0';
    }
    this.userStatusModel = new UserStatusModel(userId, status);
    this.usersService.updateUserStatus(this.userStatusModel)
      .pipe(map(
        (res) => {
          return res;
        }
      ))
      .subscribe(
        data => {
          console.log(data['message']);
          this.alertService.success(data['message']);
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.spinner.hide();
        });
  }

}
