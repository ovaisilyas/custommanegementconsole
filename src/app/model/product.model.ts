export class ProductModel {
    public name: string;
    public partnumber: string;
    public sDesc: string;
    public lDesc: string;
    public keyword: string;
    public mfPartnumber: string;
    public buyable: string;
    public catgroupId: string;
    public available: string;
    public published: string;
    public price: string;
    public tImage: string;
    public fImage: string;

    constructor(name: string, partnumber: string, sDesc: string, lDesc: string, keyword: string, mfPartnumber: string,
        buyable: string, catgroupId: string, available: string, published: string, price: string, tImage: string, fImage: string) {
      this.name = name;
      this.partnumber = partnumber;
      this.sDesc = sDesc;
      this.lDesc = lDesc;
      this.keyword = keyword;
      this.mfPartnumber = mfPartnumber;
      this.buyable = buyable;
      this.catgroupId = catgroupId;
      this.available = available;
      this.published = published;
      this.price = price;
      this.tImage = tImage;
      this.fImage = fImage;
    }
  }
