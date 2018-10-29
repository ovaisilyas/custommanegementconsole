import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
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

  getLevelTwoCategories() {
    console.log('Get Level 2 Categories');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/getTopCategories`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/getTopCategories`,
      this.httpOptions);
  }

  getBrandList() {
    console.log('Get Brands list');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcfilter/brandList`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcfilter/brandList`,
      this.httpOptions);
  }

  saveLevelTwoCategories(levelCategories) {
    console.log('Save Level 2 Categories');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/OnOfCategory`);
    console.log(levelCategories);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccatalogcategories/OnOfCategory`, levelCategories,
      this.httpOptions);
  }

  saveBrandList(brandList) {
    console.log('Save Brands list');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcfilter/OnOfBrand`);
    console.log(brandList);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcfilter/OnOfBrand`, brandList,
      this.httpOptions);
  }

}
