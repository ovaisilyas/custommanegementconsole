import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
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

  getMoqlist() {
    console.log('Get MOQ list');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcmoq/getmoq`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcmoq/getmoq`,
      this.httpOptions);
  }

  getCostGreaterlist() {
    console.log('Get Cost Greater list');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccost/getcost`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccost/getcost`,
      this.httpOptions);
  }

  getCoreCatalog() {
    console.log('Get Core Catalog');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccorefilter/coureGroup`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccorefilter/coureGroup`,
      this.httpOptions);
  }

  getExtendedCatalog() {
    console.log('Get Extended Catalog');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcfilter/extaisles`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcfilter/extaisles`,
      this.httpOptions);
  }

  saveCoreCatalog(coreCatalogOptions) {
    console.log('Save Core Catalog');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccorefilter/updateCoureGroup`);
    console.log(coreCatalogOptions);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccorefilter/updateCoureGroup`, coreCatalogOptions,
      this.httpOptions);
  }

  saveExtendedCatalog(extendedCatalogOptions) {
    console.log('Save Extended Catalog');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcfilter/updateExtAisles`);
    console.log(extendedCatalogOptions);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcfilter/updateExtAisles`, extendedCatalogOptions,
      this.httpOptions);
  }

  getStoreRange() {
    console.log('Get Store Range');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/storefilter/getStore`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/storefilter/getStore`,
      this.httpOptions);
  }

  saveStoreRange(storeRangeOptions) {
    console.log('Save Store Range');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/storefilter/updateStoreList`);
    console.log(storeRangeOptions);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/storefilter/updateStoreList`, storeRangeOptions,
      this.httpOptions);
  }

}
