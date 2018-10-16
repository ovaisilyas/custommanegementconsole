export class ContractModel {
    public accountName: string;
    public contractName: string;
    public chargeBy: string;
    public endDate: string;
    public startDate: string;
    public longDescription: string;
    public minOrdAmnt: string;
    public priceLevel: string;
    public shipBy: string;
    public includeWholeCatalog: string;
    public includeWholeCatalogAdjustment: string;
    public includeWholeCatalogAdjType: string;
    public shortDescription: string;
    public contractRefrence: string;

    constructor(accountName: string, contractName: string, chargeBy: string, endDate: string, startDate: string, longDescription: string,
        minOrdAmnt: string, priceLevel: string, shipBy: string, includeWholeCatalog: string, includeWholeCatalogAdjustment: string,
        includeWholeCatalogAdjType: string, shortDescription: string, contractRefrence: string) {
      this.accountName = accountName;
      this.contractName = contractName;
      this.chargeBy = chargeBy;
      this.endDate = endDate;
      this.startDate = startDate;
      this.longDescription = longDescription;
      this.minOrdAmnt = minOrdAmnt;
      this.priceLevel = priceLevel;
      this.shipBy = shipBy;
      this.includeWholeCatalog = includeWholeCatalog;
      this.includeWholeCatalogAdjustment = includeWholeCatalogAdjustment;
      this.includeWholeCatalogAdjType = includeWholeCatalogAdjType;
      this.shortDescription = shortDescription;
      this.contractRefrence = contractRefrence;
    }
  }
