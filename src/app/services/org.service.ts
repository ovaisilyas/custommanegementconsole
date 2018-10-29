import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OrgDetailModel} from '../model/orgdetail.model';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
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

  saveOrg(orgDetail: OrgDetailModel) {
    console.log('in saveOrg function');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`);
    console.log(orgDetail);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/addOrganization`, orgDetail,
      this.httpOptions);
  }

  getOrg(orgId: string) {
    console.log('in getOrg function');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/getOrganization?orgId=${orgId}`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/getOrganization?orgId=${orgId}`,
      this.httpOptions);
  }

  editOrg(orgDetail: OrgDetailModel) {
    console.log('in editOrg function');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/updateOrganization`);
    return this.httpClient.put<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/updateOrganization`, orgDetail,
      this.httpOptions);
  }
}
