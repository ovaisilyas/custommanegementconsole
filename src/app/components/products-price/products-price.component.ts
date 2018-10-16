import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../services/search.service';
import {map} from 'rxjs/operators';
import {UsersService} from '../../services/users.service';
import { ProductService } from '../../services/product.service';
import { ContractService } from '../../services/contract.service';
import {PagerService} from '../../services/pager.service';
import {CategoryListModel} from '../../model/categorylist.model';
import {AlertService} from '../../services/alert.service';
import {ViewChild, ElementRef} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductListModel } from '../../model/productlist.model';
import { ProductModel } from '../../model/product.model';
import { ItemContractListModel } from '../../model/itemcontractlist.model';


@Component({
  selector: 'app-products-price',
  templateUrl: './products-price.component.html',
  styleUrls: ['./products-price.component.css']
})
export class ProductsPriceComponent implements OnInit {
  categoryList: CategoryListModel[];
  productList: ProductListModel[];
  itemContractList: ItemContractListModel[];
  productDetail = new ProductModel('', '', '', '', '', '', '', false, '', false, false, '', '', '');
  loading = true;
  showPagination = false;
  selectedId = '';
  IdKey = 0;
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private contractService: ContractService,
    private searchService: SearchService,
    private usersService: UsersService,
    private pagerService: PagerService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) { }

   // array of all items to be paged
   private allItems: any[];

   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];

  ngOnInit() {
  }

  onEnter(value: string) {
    this.spinner.show();
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
          this.alertService.clear();
          this.spinner.hide();
          // this.allItems = data;
          // initialize to page 1
          this.setPage(1);
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

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.productList.length, page);

    // get current page of items
    this.pagedItems = this.productList.slice(this.pager.startIndex, this.pager.endIndex + 1);

    if (this.productList.length > 20) {
      this.showPagination = true;
    } else {
      this.showPagination = false;
    }
}

  getCategory() {
    this.productService.getCategory()
      .pipe(map(
        (category) => {
          const categoryList = category['categoryList'];
          console.log(categoryList);
          return categoryList;
        }
      ))
      .subscribe(
        data => {
          this.categoryList = data;
          this.loading = false;
        },
        error => {
          console.log('Unable to Fetch Category');
        });
  }

  openContract(value: any) {
    this.contractService.getContractDetail(value)
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
        this.itemContractList = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveStoreProduct() {
    this.spinner.show();
    this.productService.addStoreProduct(this.productDetail)
    .pipe(map(
      (res) => {
        return res;
      }
    ))
    .subscribe(
        data => {
          this.spinner.hide();
          console.log(data);
          this.alertService.success('Product Added Successfully');
          console.log('Product Saved');
        },
        error => {
          this.spinner.hide();
          console.log(error);
          this.alertService.error(error);
    });

  }

  resetForm() {
    this.productDetail = new ProductModel('', '', '', '', '', '', '', false, '', false, false, '', '', '');
  }

  getCategoryId(value: any) {
    this.IdKey = this.categoryList.findIndex(function(item, i) {
      return item.identifier === value;
    });
    if (this.IdKey !== -1) {
      this.productDetail.catgroupId = this.categoryList[this.IdKey].uniqueID;
    }
  }

  /* getOrgEntryName(value: any) {
    this.IdKey = this.categoryList.findIndex(function(item, i) {
      return item.uniqueID === value;
    });
    if (this.IdKey !== -1) {
      return this.selectedId = this.categoryList[this.IdKey].identifier;
    }
  } */

}
