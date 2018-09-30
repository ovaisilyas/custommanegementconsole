import {UserRole} from './roles.model';

export class UserDetailEditModel {
  public firstName: string;
  public lastName: string;
  public email1: string;
  public phone1: string;
  public parentMemberId: string;
  public roles: UserRole[];
  public userId: string;

  constructor(userId: string, firstName: string, lastName: string, email1: string, phone1: string, parentMemberId: string,
              roles: UserRole[]) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email1 = email1;
    this.phone1 = phone1;
    this.parentMemberId = parentMemberId;
    this.roles = roles;
  }
}
