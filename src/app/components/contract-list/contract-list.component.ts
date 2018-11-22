import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import { SearchService } from '../../services/search.service';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {saveAs} from 'file-saver';
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
import {Router} from '@angular/router';


import { NgxSpinnerService } from 'ngx-spinner';

declare var require: any;

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
  today = new Date();
  todayDate = (this.today.getMonth() + 1) + '-' + this.today.getDate() + '-' + this.today.getFullYear() ;
  contractItem = new ContractItemModel('', '', '', '', 0);
  contract = new ContractModel('', '', 'Seller', '', this.todayDate, '', '', '', '', 'yes', '', '', '', '');
  editContractDetail = new ContractModel('', '', '', '', '', '', '', '', '', '', '', '', '', '');
  submitted = false;
  userDetail = new UserDetailModel('', '', '', '', '', '', '', '', '', '', '', 'AU'
    , true, false, false, false, '');

  searchTerm = '';
  searchProductTerm = '';
  selectedContractID = '';
  selectedId = '';
  shippingModes = ['Courier'];
  selectedContractName = '';
  selectedItemNumber = '';
  selectedItemPrice = '';
  showContractDetailTable = false;
  showPagination = false;
  editContract = false;
  IdKey = 0;
  loading = true;
  showEdit = Number;
  showWholeCatalog = true;
  newItemPrice = 0;
  deletePartnumber = '';
  ItemCustomerList = [];
  baseContractList = [];
  selectedCustomer = [];
  downloadLink = '';

  catalogFilter = '';
  priceList = '';

  constructor(
    private searchService: SearchService,
    private form: FormBuilder,
    private usersService: UsersService,
    private pagerService: PagerService,
    private contractService: ContractService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    this.getHeaderOptions();
    if (sessionStorage.getItem('WCToken') === null) {
      this.router.navigate(['/login']);
    }
    this.getContractList();
    this.getCustomerListforContract();
    this.getBaseContracts();
    this.getStoreShippingModes();
  }

  getHeaderOptions() {
    this.contractService.getHeaderOptions();
  }

  searchOnEnter(value: string) {
    if (value.length < 5) {
      this.alertService.error('Search term must be 5 characters or more');
    } else {
    this.spinner.show();
    this.searchTerm = value;
    if (value !== '') {
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
            // initialize to page 1
            this.setPage(1);
            this.showContractDetailTable = true;
          },
          error => {
            console.log(error);
            this.alertService.error(error);
            if (this.contractDetail !== undefined) {
              this.contractDetail.length = 0;
            }
            this.spinner.hide();
            this.showContractDetailTable = false;
          });
        } else {
          this.openContractDetail();
        }
      }
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

    if (this.contractDetail.length > 50) {
      this.showPagination = true;
    } else {
      this.showPagination = false;
    }
  }

  showEditPrice(index, price) {
    this.showEdit = index;
    this.newItemPrice = Number(parseFloat(price).toFixed(2));
  }

  getContractList() {
    this.loading = true;
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

  getStoreShippingModes() {
    this.contractService.getShippingModes()
    .pipe(map(
      (shipModes) => {
        const shippingModes = shipModes['Ship Modes'];
        return shippingModes;
      }
    ))
    .subscribe (
      data => {
        if (data.length === 0) {
          this.shippingModes = ['Courier'];
        } else {
          this.shippingModes = data;
        }
      },
      error => {
        console.log(error);
      });
  }

  getBaseContracts() {
    this.contractService.getBaseContract()
    .pipe(map(
      (baseContract) => {
        const baseContractList = baseContract['BaseContracts'];
        return baseContractList;
      }
    ))
    .subscribe (
      data => {
        this.baseContractList = data;
      },
      error => {
        console.log(error);
      });
  }


  switchWholeCatalog(event) {
    if ( event.target.checked ) {
      this.showWholeCatalog = true;
      this.contract.includeWholeCatalog = 'yes';
    } else {
      this.showWholeCatalog = false;
      this.contract.includeWholeCatalog = 'no';
      this.contract.includeWholeCatalogAdjType = '';
      this.contract.includeWholeCatalogAdjustment = '';
    }
  }

  addNewContract() {
    this.spinner.show();
    const currentTime = new Date();
    if (this.contract.startDate !== '') { this.contract.startDate = this.contract.startDate + 'T' + '00:00:00.0'; } else { this.contract.startDate = this.contract.startDate; }
    if (this.contract.endDate !== '') { this.contract.endDate = this.contract.endDate + 'T' + '00:00:00.0'; } else { this.contract.endDate = this.contract.endDate; }
    if (this.contract.contractRefrence === 'Does not refer to a contract') { this.contract.contractRefrence = ''; }
    this.contractService.addNewContract(this.contract)
    .subscribe(
      data => {
        this.alertService.success(data.message + ' (Changes will apply on next business day)');
        this.contract.startDate = '';
        this.contract.endDate = '';
        this.getContractList();
        this.spinner.hide();
      },
      error => {
        this.alertService.error(error);
        this.contract.startDate = '';
        this.contract.endDate = '';
        this.spinner.hide();
      }
    );
    document.getElementById('addNewContractModalClose').click();
  }

  getContractDetail() {
    this.spinner.show();
    this.searchService.searchContractDetail(this.selectedContractID)
      .pipe(map(
        (product) => {
          const searchDetails = product['contractDetails'];
          console.log(searchDetails);
          this.catalogFilter = searchDetails['catalogFitler'];
          console.log(this.catalogFilter);
          this.priceList = searchDetails['priceList'];
          console.log(this.priceList);
          const searchList = searchDetails['productList'];
          return searchList;
        }
      ))
      .subscribe(
        data => {
          this.contractDetail = data;
          this.alertService.clear();
          this.searchTerm = '';
          this.spinner.hide();
          // initialize to page 1
          this.setPage(1);
          this.openContractDetail();
          this.showContractDetailTable = true;
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          if (this.contractDetail !== undefined) {
            this.contractDetail.length = 0;
          }
          this.spinner.hide();
          this.showContractDetailTable = false;
        });
  }

  openContractDetail() {
    this.contractService.openContractDetail(this.selectedContractID)
      .pipe(map(
        (contract) => {
          const contractDetails = contract['ContractDetails'];
          console.log(contractDetails);
          return contractDetails;
        }
      ))
      .subscribe(
        data => {
          this.editContractDetail = data;
          this.contract = data;
          this.editContract = true;
          this.editContractDetail.startDate = this.editContractDetail.startDate.split('T')[0];
          this.editContractDetail.endDate = this.editContractDetail.endDate.split('T')[0];
          this.contract.startDate = this.contract.startDate.split('T')[0];
          this.contract.endDate = this.contract.endDate.split('T')[0];
          this.alertService.clear();
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.alertService.error(error);
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
        this.alertService.success('Price updated successfully. (Changes will apply on next business day)');
        this.showEdit = null;
        if (this.searchTerm === '') {
          this.getContractDetail();
        } else {
          this.searchOnEnter(this.searchTerm);
        }
      },
      error => {
        this.alertService.error(error);
      }

    );
  }

  cancelContractPriceEdit() {
    this.showEdit = null;
  }

  getCustomerforItem(code: any) {
    this.selectedItemNumber = code;
    this.spinner.show();
    this.contractService.getCustomersforItem(code)
    .pipe(map(
      (list) => {
        const customerList = list['accountCustomerList'];
        return customerList;
      }
    ))
    .subscribe(
      data => {
        this.selectedCustomer = data;
        this.spinner.hide();
      },
      error => {
        this.alertService.error(error);
        this.spinner.hide();
      }

    );
  }

  getCustomerListforContract() {
    this.contractService.getCustomersforContract()
    .pipe(map(
      (list) => {
        const customerList = list['accountCustomerList'];
        return customerList;
      }
    ))
    .subscribe(
      data => {
        this.ItemCustomerList = data;
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
        this.alertService.success('Item Deleted successfully. (Changes will apply on next business day)');
        if (this.searchTerm === '') {
          this.openContractDetail();
        } else {
          this.searchOnEnter(this.searchTerm);
        }
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  saveAddItem() {
    this.spinner.show();
    this.contractItem.flag = 'addItem';
    this.contractItem.contractId = this.selectedContractID;
    this.contractItem.contractName = this.selectedContractName;
    this.contractService.saveContractItem(this.contractItem)
    .subscribe(
      data => {
        this.alertService.success('Item Added. (Changes will apply on next business day)');
        this.getContractDetail();
        this.spinner.hide();
      },
      error => {
        this.alertService.error(error);
        this.spinner.hide();
      }
    );
    document.getElementById('addContractItemClose').click();
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
      this.searchProductTerm = value;
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

    getItemCustomerAccountId(value: any) {
      this.IdKey = this.ItemCustomerList.findIndex(function(item, i) {
        return item.customerName === value;
      });

      if (this.IdKey !== -1) {
        this.userDetail.parentMemberId = this.ItemCustomerList[this.IdKey].accountId;
        const parentMemberId = this.userDetail.parentMemberId;
        const isDupicate = this.selectedCustomer.findIndex(function(item, i) {
          return item.accountId === parentMemberId;
        });
        if (isDupicate === -1) {
          const list = {
            'customerName' : this.selectedId,
            'accountId' : this.userDetail.parentMemberId
          };
          this.selectedCustomer.push(list);
        }
        this.selectedId = '';
      }
    }

    sendSeletedCustomers() {
      this.spinner.show();
      document.getElementById('selectCustomerPopupClose').click();
      const list = {
        'partNumber' : this.selectedItemNumber,
        'flag' : 'additem',
        'itemFixedPrice' : this.selectedItemPrice,
        'accountCustomerList' : this.selectedCustomer
      };
      this.contractService.saveSelectedCustomers(list)
      .subscribe(
        data => {
          this.alertService.success(data.message + ' (Changes will apply on next business day)');
          this.spinner.hide();
        },
        error => {
          this.alertService.error(error);
          this.spinner.hide();
        }

      );
    }

    removeSelectedCustomers(value: any) {
      this.selectedCustomer = this.selectedCustomer.filter(function( obj ) {
        return obj.accountId !== value;
      });
    }

    resetForm() {
      this.contract = new ContractModel('', '', 'Seller', '', this.todayDate, '', '', '', '', 'yes', '', '', '', '');
      this.contractItem = new ContractItemModel('', '', '', '', 0);
      this.editContract = false;
    }

    downloadContractCSV(searchTerm: any, contractId: any) {
      this.spinner.show();
      let exportType = '';
      if (searchTerm === '') {
        exportType = 'contract';
      } else {
        exportType = 'catalog';
      }
      const contractDownloadObj = {
        'searchKeyWord' : searchTerm,
        'contractId' : contractId,
        'exportType' : exportType
      };
      this.contractService.getDownloadContractCSV(contractDownloadObj)
      .subscribe(
        data => {
          const FileSaver = require('file-saver');
          console.log(data.filePath.substr(data.filePath.lastIndexOf('/') + 1));
          FileSaver.saveAs(`${environment.apiUrl}` + data.filePath, data.filePath.substr(data.filePath.lastIndexOf('/') + 1));
          this.spinner.hide();
          this.alertService.clear();
        },
        error => {
          this.alertService.error(error);
          this.spinner.hide();
        }

      );
    }

}
