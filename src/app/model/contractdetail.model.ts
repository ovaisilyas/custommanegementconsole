export class ContractDetailModel {
    public catEntryId: string;
    public description: string;
    public partnumber: string;
    public price: string;

    constructor(catEntryId: string, partnumber: string, description: string, price: string) {
      this.catEntryId = catEntryId;
      this.description = description;
      this.partnumber = partnumber;
      this.price = price;
    }
  }
