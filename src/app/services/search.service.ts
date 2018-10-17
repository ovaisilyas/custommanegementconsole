import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
    storeId = sessionStorage.getItem('storeId');
    userId = sessionStorage.getItem('userId');
    WCToken = sessionStorage.getItem('WCToken');
    WCTrustedToken = sessionStorage.getItem('WCTrustedToken');
    personalizationID = sessionStorage.getItem('personalizationID');

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

  searchData(searchTerm: string) {
    console.log('in search function');
    const storeId = sessionStorage.getItem('storeId');
    console.log(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcusersearch/findUser/${searchTerm}`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcusersearch/findUser/${searchTerm}`,
      this.httpOptions);
  }

  searchProduct(searchTerm: string) {
    console.log('in search product function');
    const storeId = sessionStorage.getItem('storeId');
    console.log(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcproductsearch/findProduct/${searchTerm}`);

    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcproductsearch/findProduct/${searchTerm}`,
      this.httpOptions);
  }

  searchProductOnContract(searchTerm: string, contractId: string) {
    console.log('in search product function');
    const storeId = sessionStorage.getItem('storeId');
    console.log(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcproductsearch/findContractProduct/${contractId}/${searchTerm}`);

    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcproductsearch/findContractProduct/${contractId}/${searchTerm}`,
      this.httpOptions);
  }

  searchContractDetail(searchTerm: string) {
    console.log('Show contract details table');
    const storeId = sessionStorage.getItem('storeId');
    console.log(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmccontractdetails/${searchTerm}`);

    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmccontractdetails/${searchTerm}`,
      this.httpOptions);
  }
}
