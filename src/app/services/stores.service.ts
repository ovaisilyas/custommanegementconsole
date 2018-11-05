import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
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

  getStoreDetails() {
    console.log('Get Store setting details');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstore/storeDetails`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstore/storeDetails`,
      this.httpOptions);
  }

  saveStoreSettings(storeSettings) {
    console.log('Save Store settings');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstore/updateStoreDetails`);
    console.log(storeSettings);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstore/updateStoreDetails`, storeSettings,
      this.httpOptions);
  }

  getFinancialDetails() {
    console.log('Get Financial details');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcgetupdatepaymethods/getPayMethods`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcgetupdatepaymethods/getPayMethods`,
      this.httpOptions);
  }

  saveFinancialDetails(paymentDetails) {
    console.log('Save Financial settings');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcgetupdatepaymethods/updatePayMethods`);
    console.log(paymentDetails);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcgetupdatepaymethods/updatePayMethods`, paymentDetails,
      this.httpOptions);
  }

  getLoyaltyDetail() {
    console.log('Get Loyalty details');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcloyality/getloyality`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcloyality/getloyality`,
      this.httpOptions);
  }

  getGuestShopping() {
    console.log('Get Guest Shopping details');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstoresetting/guestshopping`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstoresetting/guestshopping`,
      this.httpOptions);
  }

  saveGuestShopping(guest: any) {
    console.log('Save Guest shopping settings');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstoresetting/OnOfguestshopping`);
    console.log(guest);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstoresetting/OnOfguestshopping`, guest,
      this.httpOptions);
  }

  saveLoyaltySettings(loyaltyDetail: any) {
    console.log('Save Loyalty settings');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcloyality/updateLoyality`);
    console.log(loyaltyDetail);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcloyality/updateLoyality`, loyaltyDetail,
      this.httpOptions);
  }

  openUserAccounts() {
    console.log('Open User Accounts popup');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstore/storeUserAccounts`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcstore/storeUserAccounts`,
      this.httpOptions);
  }


}
