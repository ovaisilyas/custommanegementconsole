import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userId = '';
  WCToken = '';
  WCTrustedToken = '';
  personalizationID = '';
  storeId = '';
  httpOptions = {};

  constructor(
    private httpClient: HttpClient,
  ) { }

  getHeaderOptions() {
    this.userId = sessionStorage.getItem('userId');
    this.WCToken = sessionStorage.getItem('WCToken');
    this.WCTrustedToken = sessionStorage.getItem('WCTrustedToken');
    this.personalizationID = sessionStorage.getItem('personalizationID');
    this.storeId = sessionStorage.getItem('storeId');
    this.httpOptions = {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'true', 'Content-Type': 'application/json',
        'userId': this.userId,
        'storeId': this.storeId,
        'WCToken': this.WCToken,
        'WCTrustedToken': this.WCTrustedToken,
        'personalizationID': this.personalizationID
      })
    };
  }

  getRecentPurchaseList() {
    console.log('Get Recent Purchase list');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcorderdetails/getOrdersPurchase?days=10`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcorderdetails/getOrdersPurchase?days=10`,
      this.httpOptions);
  }

  getSaleSummary() {
    console.log('Get Sales Summary');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcorderdetails/getOrdersSummary`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcorderdetails/getOrdersSummary`,
      this.httpOptions);
  }

  getPurchaseHistory() {
    console.log('Get Purchase history for 60 days');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcorderdetails/getOrdersPurchase?days=60`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcorderdetails/getOrdersPurchase?days=60`,
      this.httpOptions);
  }

  getOrderDetails(orderId) {
    console.log('Get Order details');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/getTopCategories`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/getTopCategories`,
      this.httpOptions);
  }


}
