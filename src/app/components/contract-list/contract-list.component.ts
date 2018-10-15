import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import {map} from 'rxjs/operators';
import {UserlistModel} from '../../model/userlist.model';
import { ProductListModel } from '../../model/productlist.model';
import {UserDetailModel} from '../../model/userdetail.model';
import {ContractService} from '../../services/contract.service';
import {UsersService} from '../../services/users.service';
import {CustomerlistModel} from '../../model/customerlist.model';
import {ContractListModel} from '../../model/contractlist.model';
import {ContractDetailModel} from '../../model/contractdetail.model';
import {ContractModel} from '../../model/contract.model';
import {ContractItemModel} from '../../model/contractitem.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PagerService} from '../../services/pager.service';
import {AlertService} from '../../services/alert.service';
import {ViewChild, ElementRef} from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  customerList: CustomerlistModel[];
  itemList: UserlistModel[];
  productList: ProductListModel[];
  contractList: ContractListModel[];
  contractDetail: ContractDetailModel[];
  contractItem = new ContractItemModel('', '', '', '', 0);
  contract = new ContractModel('', '', '', '', '', '', '', '', '', false, '', '', '', '');
  submitted = false;
  userDetail = new UserDetailModel('', '', '', '', '', '', '', '', '', '', '', 'AU'
    , true, false, false, false, '');

  searchTerm = '';
  selectedContractID = '';
  selectedId = '';
  selectedContractName = '';
  showContractDetailTable = false;
  IdKey = 0;
  loading = true;
  showEdit = Number;
  newItemPrice = 0;
  deletePartnumber = '';
  selectedCustomer = [];

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private pagerService: PagerService,
    private contractService: ContractService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) {}

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    this.getContractList();
  }

  onEnter(value: string) {
    /* this.spinner.show();
    this.searchTerm = value;
    this.searchService.searchProductOnContract(value, this.selectedContractID)
      .pipe(map(
        (product) => {
          const searchDetails = product['SearchDetails'];
          const searchList = searchDetails['SearchList'];
          return searchList;
        }
      ))
      .subscribe(
        data => {
          this.contractDetail = data;
          this.alertService.clear();
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          if (this.contractDetail !== undefined) {
            this.contractDetail.length = 0;
          }
          this.spinner.hide();
        }); */
  }

  getCustomers() {
    this.usersService.getCustomers()
      .pipe(map(
        (customers) => {
          const organizationList = customers['organizationList'];
          console.log(organizationList);
          return organizationList;
        }
      ))
      .subscribe(
        data => {
          this.customerList = data;
          this.loading = false;
        },
        error => {
          console.log('Unable to Fetch Customers');
        });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.contractDetail.length, page);

    // get current page of items
    this.pagedItems = this.contractDetail.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  showEditPrice(index, price) {
    this.showEdit = index;
    this.newItemPrice = Number(parseFloat(price).toFixed(2));
  }

  getContractList() {
    this.contractService.getContractList()
      .pipe(map(
        (contract) => {
          const contractDetail = contract['Contract Details'];
          const contractList = contractDetail['contractValues'];
          console.log(contractList);
          return contractList;
        }
      ))
      .subscribe(
        data => {
          this.contractList = data;
          this.loading = false;
        },
        error => {
          console.log('Unable to Fetch Contract');
        });
  }

  addNewContract() {
    this.contractService.addNewContract(this.contract)
    .subscribe(
      data => {
        this.alertService.success('New Contract Created');
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  openContractDetail() {
    this.spinner.show();
    this.searchService.searchContractDetail(this.selectedContractID)
      .pipe(map(
        (product) => {
          const searchDetails = product['contractDetails'];
          const searchList = searchDetails['productList'];
          return searchList;
        }
      ))
      .subscribe(
        data => {
          this.contractDetail = data;
          this.alertService.clear();
          this.spinner.hide();
          // initialize to page 1
          this.setPage(1);
          this.showContractDetailTable = true;
          this.getCustomers();
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          if (this.contractDetail !== undefined) {
            this.contractDetail.length = 0;
          }
          this.spinner.hide();
        });
  }

  updateContractPrice(value: any) {
    this.contractItem.flag = 'editItemPrice';
    this.contractItem.contractId = this.selectedContractID;
    this.contractItem.contractName = this.selectedContractName;
    this.contractItem.partNumber = value;
    this.contractItem.itemFixedPrice = this.newItemPrice;
    this.contractService.updateItemPrice(this.contractItem)
    .subscribe(
      data => {
        this.alertService.success('Price updated successfully');
        this.showEdit = null;
        this.openContractDetail();
      },
      error => {
        this.alertService.error(error);
      }

    );
  }

  cancelContractPriceEdit() {
    this.showEdit = null;
  }

  getCustomerforItem(partNumber: string, contractId: string) {
    this.contractService.getCustomersforItem(partNumber, contractId)
    .subscribe(
      data => {
        this.selectedCustomer = data;
      },
      error => {
        this.alertService.error(error);
      }

    );
  }


  deleteContractItem() {
    this.contractItem.flag = 'deleteItem';
    this.contractItem.contractId = this.selectedContractID;
    this.contractItem.contractName = this.selectedContractName;
    this.contractItem.partNumber = this.deletePartnumber;
    this.contractItem.itemFixedPrice = this.newItemPrice;
    this.contractService.deleteContractItem(this.contractItem)
    .subscribe(
      data => {
        this.alertService.success('Item Deleted successfully');
        this.openContractDetail();
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  saveAddItem() {
    this.contractItem.flag = 'addItem';
    this.contractItem.contractId = this.selectedContractID;
    this.contractItem.contractName = this.selectedContractName;
    this.contractService.saveContractItem(this.contractItem)
    .subscribe(
      data => {
        this.alertService.success('Item Added');
        document.getElementById('addContractItemClose').click();
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  getContractId(value: any) {
    this.IdKey = this.contractList.findIndex(function(item, i) {
      return item.contractName === value;
    });
    if (this.IdKey !== -1) {
      this.selectedContractID = this.contractList[this.IdKey].contractId;
    } else if (this.IdKey === -1) {
      this.selectedContractID = '';
    }
  }

  getProductList(value: string) {
      this.loading = true;
      this.searchTerm = value;
      this.searchService.searchProduct(value)
        .pipe(map(
          (product) => {
            const searchDetails = product['SearchDetails'];
            const searchList = searchDetails['SearchList'];
            return searchList;
          }
        ))
        .subscribe(
          data => {
            this.productList = data;
            this.loading = false;
            document.getElementById('openProductListButton').click();
          },
          error => {
            console.log(error);
            this.alertService.error(error);
            if (this.productList !== undefined) {
              this.productList.length = 0;
            }
            this.spinner.hide();
          });
    }

    selectFromProductList(value: string) {
      this.contractItem.partNumber = value;
      document.getElementById('prodListClose').click();
    }

    getOrgEntryId(value: any) {
      this.IdKey = this.customerList.findIndex(function(item, i) {
        return item.orgEntityName === value;
      });

      if (this.IdKey !== -1) {
        this.userDetail.parentMemberId = this.customerList[this.IdKey].orgEntityId;
        const parentMemberId = this.userDetail.parentMemberId;
        const isDupicate = this.selectedCustomer.findIndex(function(item, i) {
          return item.orgEntityId === parentMemberId;
        });
        if (isDupicate === -1) {
          const list = {
            'orgEntityName' : this.selectedId,
            'orgEntityId' : this.userDetail.parentMemberId,
          };
          this.selectedCustomer.push(list);
        }
        this.selectedId = '';
      }
    }

    sendSeletedCustomers() {
      document.getElementById('selectCustomerPopupClose').click();
      this.contractService.saveSelectedCustomers(this.selectedCustomer)
      .subscribe(
        data => {
          this.alertService.success('Customers added to Contract');
        },
        error => {
          this.alertService.error(error);
        }

      );
    }

    removeSelectedCustomers(value: any) {
      this.selectedCustomer = this.selectedCustomer.filter(function( obj ) {
        return obj.orgEntityId !== value;
      });
    }

    resetForm() {
      this.contract = new ContractModel('', '', '', '', '', '', '', '', '', false, '', '', '', '');
    }

}
