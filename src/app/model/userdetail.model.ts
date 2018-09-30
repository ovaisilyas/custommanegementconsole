import {UserRole} from './roles.model';

export class UserDetailModel {
  public logonId: string;
  public firstName: string;
  public lastName: string;
  public email1: string;
  public phone1: string;
  public parentMemberId: string;
  public roles: UserRole[];

  constructor(logonId: string, firstName: string, lastName: string, email1: string, phone1: string, parentMemberId: string,
              roles: UserRole[]) {
    this.logonId = logonId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email1 = email1;
    this.phone1 = phone1;
    this.parentMemberId = parentMemberId;
    this.roles = roles;
  }

}
