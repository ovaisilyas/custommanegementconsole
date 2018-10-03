export class UserlistModel {
  public orgName: string;
  public firstName: string;
  public lastName: string;
  public logonId: string;
  public userId: string;
  public userStatus: string;
  public orgId: string;
  public buyer: string;
  public approver: string;
  public admin: string;

  constructor(orgName: string, firstName: string, lastName: string, logonId: string, userId: string, status: string, orgId: string,
              buyer: string, approver: string, admin: string) {
    this.orgName = orgName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.logonId = logonId;
    this.userId = userId;
    this.userStatus = status;
    this.orgId = orgId;
    this.buyer = buyer;
    this.approver = approver;
    this.admin = admin;

  }
}
