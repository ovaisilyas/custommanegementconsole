import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserDetailModel} from '../model/userdetail.model';
import {ResetPasswordModel} from '../model/resetpassword.model';
import {UserStatusModel} from '../model/userstatus.model';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
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

  getCustomers() {
    console.log(this.storeId);
    console.log('in getCustomers function');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcorganization/customerlist`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcorganization/customerlist`,
      this.httpOptions);
  }

  saveUser(userdetail: UserDetailModel) {
    console.log(this.storeId);
    console.log('in save function');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuser/adduser`);
    console.log(userdetail);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuser/adduser`, userdetail,
      this.httpOptions);
  }

  getUser(userId: string) {
    console.log(this.storeId);
    console.log('in getUser function');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuser/${userId}`);
    return this.httpClient.get<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuser/${userId}`,
      this.httpOptions);
  }

  editUser(userdetail: UserDetailModel) {
    console.log(this.storeId);
    console.log('in edit function');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuser/updateuser`);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuser/updateuser`, userdetail,
      this.httpOptions);
  }

  resetPassword(resetPassModel: ResetPasswordModel) {
    console.log(this.storeId);
    console.log('in reset pass function');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuserpasswordreset/passwordreset`);
    console.log(resetPassModel);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuserpasswordreset/passwordreset`, resetPassModel,
      this.httpOptions);
  }

  updateUserStatus(userStatusModel: UserStatusModel) {
    console.log(this.storeId);
    console.log('in userStatus function');
    console.log(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuserstatus/update`);
    console.log(userStatusModel);
    return this.httpClient.post<any>(`${environment.apiUrl}/wcs/resources/store/${this.storeId}/cmcuserstatus/update`, userStatusModel,
      this.httpOptions);
  }
}
