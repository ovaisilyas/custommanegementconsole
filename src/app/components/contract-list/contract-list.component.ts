import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import {map} from 'rxjs/operators';
import {UserlistModel} from '../../model/userlist.model';
import {UsersService} from '../../services/users.service';
import {ProductService} from '../../services/product.service';
import {ContractService} from '../../services/contract.service';
import {CustomerlistModel} from '../../model/customerlist.model';
import {ContractListModel} from '../../model/contractlist.model';
import {ContractDetailModel} from '../../model/contractdetail.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
  contractList: ContractListModel[];
  contractDetail: ContractDetailModel[];
  submitted = false;

  searchTerm = '';
  selectedContractID = '';
  selectedContractName = '';
  showContractDetailTable = false;
  IdKey = 0;
  loading = true;

  constructor(
    private searchService: SearchService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private contractService: ContractService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) { }

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
          this.showContractDetailTable = true;
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

}
