import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {HomeService} from '../../services/home.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentPurchaseList = [];
  salesSummary = [];
  purchaseHistory = [];
  orderDetail = [];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getHeaderOptions();
    if (sessionStorage.getItem('WCToken') === null) {
      this.router.navigate(['/login']);
    }
    this.getRecentPurchaseList();
    this.getSaleSummary();
  }

  getHeaderOptions() {
    this.homeService.getHeaderOptions();
  }

  getRecentPurchaseList() {
    this.spinner.show();
    this.homeService.getRecentPurchaseList()
    .subscribe(
      data => {
        this.recentPurchaseList = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getSaleSummary() {
    this.spinner.show();
    this.homeService.getSaleSummary()
    .subscribe(
      data => {
        this.salesSummary = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getPurchaseHistory() {
    this.spinner.show();
    this.homeService.getPurchaseHistory()
    .subscribe(
      data => {
        this.purchaseHistory = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getOrderDetails(orderId: any) {
    this.spinner.show();
    this.homeService.getOrderDetails(orderId)
    .subscribe(
      data => {
        this.orderDetail = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }


}
