import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'true', 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  searchData(searchTerm: string) {
    console.log('in search function');
    const storeId = sessionStorage.getItem('storeId');
    console.log(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcusersearch/findUser/${searchTerm}`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcusersearch/findUser/${searchTerm}`,
      httpOptions);
  }

  searchProduct(searchTerm: string) {
    console.log('in search product function');
    const storeId = sessionStorage.getItem('storeId');
    console.log(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcproductsearch/findProduct/${searchTerm}`);
    
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${storeId}/cmcproductsearch/findProduct/${searchTerm}`,
      httpOptions);
  }

  searchProductOnContract(searchTerm: string, contractId: string) {
    console.log('Search through the products with in the selected contract');
  }

  searchContractDetail(searchTerm: string) {
    console.log('Show contract details table');
  }
}
