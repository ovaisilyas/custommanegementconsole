export class UserStatusModel {
  public userId: string;
  public userStatus: string;

  constructor(userId: string, userStatus: string) {
    this.userId = userId;
    this.userStatus = userStatus;
  }
}
