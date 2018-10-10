export class ContractDetailModel {
    public contractName: string;
    public partnumber: string;
    public description: string;
    public price: string;

    constructor(contractName: string, partnumber: string, description: string, price: string) {
      this.contractName = contractName;
      this.partnumber = partnumber;
      this.description = description;
      this.price = price;
    }
  }
