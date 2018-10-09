import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserDetailModel} from '../model/userdetail.model';


@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
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
    getCategory() {
      console.log(this.storeId);
      console.log('in getCategory function');
      console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccategory/categorylist`);
      
      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccategory/categorylist`,
        this.httpOptions);
    }

    getContract() {
      console.log('To get list of Contracts to show in Contract list');
    }

    getContractDetail(value: string) {
      console.log('Get Contract detail'+value);
    }
    
  }