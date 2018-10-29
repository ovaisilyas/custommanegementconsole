import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
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
