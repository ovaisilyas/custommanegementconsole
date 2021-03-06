export class ProductListModel {
    public identifier: string;
    public partnumber: string;
    public description: string;
    public catentryId: string;
    public listprice: string;
    public govtprice: string;

    constructor(identifier: string, partnumber: string, shortdescription: string, catentryId: string, listprice: string, govtprice: string) {
      this.identifier = identifier;
      this.partnumber = partnumber;
      this.description = shortdescription;
      this.catentryId = catentryId;
      this.listprice = listprice;
      this.govtprice = govtprice;
    }
  }
