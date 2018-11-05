import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserDetailModel} from '../model/userdetail.model';
import { ProductModel } from '../model/product.model';


@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
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
    getCategory() {
      console.log(this.storeId);
      console.log('in getCategory function');
      console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccategory/categorylist`);

      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccategory/categorylist`,
        this.httpOptions);
    }

    getPriceList(catEntryId: any) {
      console.log('Get price level');
      console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcshowprices/priceList/${catEntryId}`);

      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcshowprices/priceList/${catEntryId}`,
        this.httpOptions);
    }

    getContractDetail(catEntryId: string) {
      console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcitemcontract/itemContractList/${catEntryId}`);
      console.log('Get Contract detail ' + catEntryId);
      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcitemcontract/itemContractList/${catEntryId}`,
      this.httpOptions);
    }

    addStoreProduct(productDetail: ProductModel) {
      console.log(productDetail);
      console.log('Add product call');
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccategory/addproduct`, productDetail,
        this.httpOptions);
    }

  }
