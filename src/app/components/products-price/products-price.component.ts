import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../services/search.service';
import {map} from 'rxjs/operators';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
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

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-products-price',
  templateUrl: './products-price.component.html',
  styleUrls: ['./products-price.component.css']
})
export class ProductsPriceComponent implements OnInit {
  categoryList: CategoryListModel[];
  productList: ProductListModel[];
  productDetail = new ProductModel('', '', '', '', '', '', '', '', '', '', '', '', '');
  loading = true;
  selectedId = '';
  IdKey = 0;
  searchTerm = '';


  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});


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
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
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
    this.contractService.getContractDetail(value);
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
