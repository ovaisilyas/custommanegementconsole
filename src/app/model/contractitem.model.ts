export class ContractItemModel {
    public contractName: string;
    public contractId: string;
    public partNumber: string;
    public flag: string;
    public itemFixedPrice: number;

    constructor(contractName: string, contractId: string, partNumber: string, flag: string, itemFixedPrice: number) {
      this.contractName = contractName;
      this.contractId = contractId;
      this.partNumber = partNumber;
      this.flag = flag;
      this.itemFixedPrice = itemFixedPrice;
    }
  }
