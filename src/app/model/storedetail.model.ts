export class StoreDetailsModel {
    public address1: string;
    public city: string;
    public email: string;
    public phone: string;
    public state: string;
    public storeName: string;
    public zipCode: string;

    constructor(address1: string, city: string, email: string, phone: string, state: string, storeName: string, zipCode: string) {
      this.address1 = address1;
      this.city = city;
      this.email = email;
      this.phone = phone;
      this.state = state;
      this.storeName = storeName;
      this.zipCode = zipCode;
    }
  }
