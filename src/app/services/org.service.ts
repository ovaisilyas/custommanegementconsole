import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OrgDetailModel} from '../model/orgdetail.model';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  userId = localStorage.getItem('userId');
  WCToken = localStorage.getItem('WCToken');
  WCTrustedToken = localStorage.getItem('WCTrustedToken');
  personalizationID = localStorage.getItem('personalizationID');
  storeId = localStorage.getItem('storeId');

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
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/orgAddUpdate/updateOrganization`, orgDetail,
      this.httpOptions);
  }
}
