export class OrgDetailModel {
  public orgEntityName: string;
  public address1: string;
  public address2: string;
  public city: string;
  public state: string;
  public country: string;
  public parentMemberId: string;
  public zipCode: string;
  public orgEntityType: string;


  constructor(orgEntityName: string, address1: string, address2: string, city: string, state: string, country: string, parentMemberId: string, zipCode: string, orgEntityType: string) {
    this.orgEntityName = orgEntityName;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.country = country;
    this.parentMemberId = parentMemberId;
    this.zipCode = zipCode;
    this.orgEntityType = orgEntityType;
  }
}
