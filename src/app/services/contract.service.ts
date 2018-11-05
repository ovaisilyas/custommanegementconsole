import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserDetailModel} from '../model/userdetail.model';
import { ContractItemModel } from '../model/contractItem.model';
import { ContractModel } from '../model/contract.model';


@Injectable({
    providedIn: 'root'
  })
  export class ContractService {
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

    getContractList() {
      console.log('To get list of Contracts to show in Contract list');
      console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontract/activeContractList`);

      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontract/activeContractList`,
        this.httpOptions);
    }

    getBaseContract() {
      console.log('To get Base contract list');
      console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/getBaseContract`);

      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/getBaseContract`,
        this.httpOptions);
    }

    openContractDetail(catEntryId: string) {
      console.log('Open edit Contract' + catEntryId);
      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/getContract?contractId=${catEntryId}`,
      this.httpOptions);
    }

    getShippingModes() {
      console.log('Get shipping Modes');
      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/getStoreShipModes`,
      this.httpOptions);
    }

    addNewContract(contractDetail: ContractModel) {
      console.log(contractDetail);
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/addContract`, contractDetail,
      this.httpOptions);
    }

    getCustomersforItem(partNumber: any) {
      console.log('Get customer list for item');
      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcaccount/customerlist/${partNumber}`,
      this.httpOptions);
    }

    getCustomersforContract() {
      console.log('Get customer list for Contract');
      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcaccount/customerlist`,
      this.httpOptions);
    }

    updateItemPrice(contractItemDetail: ContractItemModel) {
      console.log(contractItemDetail);
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/addEditContractItem`, contractItemDetail,
      this.httpOptions);
    }

    deleteContractItem(contractItemDetail: ContractItemModel) {
      console.log(contractItemDetail);
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/addEditContractItem`, contractItemDetail,
      this.httpOptions);
    }

    saveContractItem(contractItemDetail: ContractItemModel) {
      console.log(contractItemDetail);
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/addEditContractItem`, contractItemDetail,
      this.httpOptions);
    }

    saveSelectedCustomers(selectCustomer: any) {
      console.log(selectCustomer);
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcaccount/addcontractitem`, selectCustomer,
      this.httpOptions);
    }

    getDownloadProductCSV(searchTerm: any) {
      console.log(searchTerm);
      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcexport/byProductSearchTerm/${searchTerm}`,
      this.httpOptions);
    }

    getDownloadContractCSV(searchTerm: any) {
      console.log(searchTerm);
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcexport/byContractProduct`, searchTerm,
      this.httpOptions);
    }

  }
