import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OrgDetailModel} from '../model/orgdetail.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  userId = sessionStorage.getItem('userId');
  WCToken = sessionStorage.getItem('WCToken');
  WCTrustedToken = sessionStorage.getItem('WCTrustedToken');
  personalizationID = sessionStorage.getItem('personalizationID');
  storeId = sessionStorage.getItem('storeId');

  constructor(
    private httpClient: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'true', 'Content-Type': 'application/json',
      'userId': this.userId,
      'WCToken': this.WCToken,
      'WCTrustedToken': this.WCTrustedToken,
      'personalizationID': this.personalizationID
    })
  };

  getMoqlist() {
    console.log('Get MOQ list');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcmoq/getmoq`);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcmoq/getmoq`,
      this.httpOptions);
  }

  getCostGreaterlist() {
    console.log('Get Cost Greater list');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccost/getcost`);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccost/getcost`,
      this.httpOptions);
  }

  saveCoreCatalog(coreCatalogOptions) {
    console.log('Save Core Catalog');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`);
    console.log(coreCatalogOptions);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`, coreCatalogOptions,
      this.httpOptions);
  }

  saveExtendedCatalog(extendedCatalogOptions) {
    console.log('Save Extended Catalog');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`);
    console.log(extendedCatalogOptions);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`, extendedCatalogOptions,
      this.httpOptions);
  }

  getCoreCatalog() {
    console.log('Save Core Catalog');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`,
      this.httpOptions);
  }

  getExtendedCatalog() {
    console.log('Save Extended Catalog');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`,
      this.httpOptions);
  }

}
