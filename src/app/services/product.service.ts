import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserDetailModel} from '../model/userdetail.model';
import { ProductModel } from '../model/product.model';


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

    addStoreProduct(productDetail: ProductModel) {
      console.log(productDetail);
      console.log('Add product call');
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccategory/addproduct`, productDetail,
        this.httpOptions);
    }

  }
