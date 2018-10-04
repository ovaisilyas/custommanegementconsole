export class UserDetailModel {
  public logonId: string;
  public firstName: string;
  public lastName: string;
  public email1: string;
  public phone1: string;
  public address1: string;
  public address2: string;
  public city: string;
  public state: string;
  public zipCode: string;
  public country: string;
  public status: string;
  public parentMemberId: string;
  public buyer: boolean;
  public approver: boolean;
  public admin: boolean;

  constructor(logonId: string, firstName: string, lastName: string, email1: string, phone1: string, parentMemberId: string, 
    address1: string, address2: string, city: string, state: string, zipCode: string, country: string, status: string,
              buyer: boolean, approver: boolean, admin: boolean) {
    this.logonId = logonId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email1 = email1;
    this.phone1 = phone1;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
    this.status = status;
    this.parentMemberId = parentMemberId;
    this.buyer = buyer;
    this.approver = approver;
    this.admin = admin;
  }

}
