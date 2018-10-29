import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
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

  searchData(searchTerm: string) {
    console.log('in search function');
    this.getHeaderOptions();
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcusersearch/findUser/${searchTerm}`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcusersearch/findUser/${searchTerm}`,
      this.httpOptions);
  }

  searchProduct(searchTerm: string) {
    console.log('in search product function');
    this.getHeaderOptions();
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcproductsearch/findProduct/${searchTerm}`);

    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcproductsearch/findProduct/${searchTerm}`,
      this.httpOptions);
  }

  searchProductOnContract(searchTerm: string, contractId: string) {
    console.log('in search product function');
    this.getHeaderOptions();
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcproductsearch/findContractProduct/${contractId}/${searchTerm}`);

    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcproductsearch/findContractProduct/${contractId}/${searchTerm}`,
      this.httpOptions);
  }

  searchContractDetail(searchTerm: string) {
    console.log('Show contract details table');
    this.getHeaderOptions();
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontractdetails/${searchTerm}`);

    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontractdetails/${searchTerm}`,
      this.httpOptions);
  }
}
