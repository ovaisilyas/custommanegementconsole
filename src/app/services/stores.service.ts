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
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/getTopCategories`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/getTopCategories`,
      this.httpOptions);
  }

  saveFinancialDetails(financialSettings) {
    console.log('Save Financial settings');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/OnOfCategory`);
    console.log(financialSettings);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/OnOfCategory`, financialSettings,
      this.httpOptions);
  }

  getLoyaltyDetail() {
    console.log('Get Loyalty details');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcloyality/getloyality`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcloyality/getloyality`,
      this.httpOptions);
  }


}
