export class ItemContractListModel {
    public contractName: string;
    public contractId: string;
    public contractPrice: string;

    constructor(contractName: string, contractId: string, contractPrice: string) {
      this.contractName = contractName;
      this.contractId = contractId;
      this.contractPrice = contractPrice;
    }
  }
