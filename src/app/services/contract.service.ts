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

    getContractList() {
      console.log('To get list of Contracts to show in Contract list');
      console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontract/activeContractList`);

      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontract/activeContractList`,
        this.httpOptions);
    }

    getContractDetail(catEntryId: string) {
      console.log('Get Contract detail' + catEntryId);
      return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcitemcontract/itemContractList/${catEntryId}`,
      this.httpOptions);
    }

    addNewContract(contractDetail: ContractModel) {
      console.log(contractDetail);
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/addContract`, contractDetail,
      this.httpOptions);
    }

    getCustomersforItem(partnumber: any, contractid: any) {
      console.log(partnumber + '----' + contractid);
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/getCustomerforItem/?part=${partnumber}&contractid=${contractid}`,
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
      return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmccontracts/saveCustomers`, selectCustomer,
      this.httpOptions);
    }


  }
