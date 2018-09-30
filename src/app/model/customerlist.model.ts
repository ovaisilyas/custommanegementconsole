export class CustomerlistModel {
  public orgEntityName: string;
  public orgEntityId: string;
  constructor(orgName: string, orgId: string) {
    this.orgEntityName = orgName;
    this.orgEntityId = orgId;
  }
}
