import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {saveAs} from 'file-saver';
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
import {Router} from '@angular/router';
import { $ } from 'protractor';

declare var require: any;
declare var jQuery: any;

@Component({
  selector: 'app-products-price',
  templateUrl: './products-price.component.html',
  styleUrls: ['./products-price.component.css']
})
export class ProductsPriceComponent implements OnInit {
  categoryList: CategoryListModel[];
  productList: ProductListModel[];
  itemContractList: ItemContractListModel[];
  productDetail = new ProductModel('', '', '', '', '', '', '', true, '', true, true, '', '', '', '', '');
  loading = true;
  showPagination = false;
  itemPriceList = [];
  selectedId = '';
  IdKey = 0;
  searchTerm = '';
  showProductListTable = false;

  constructor(
    private productService: ProductService,
    private contractService: ContractService,
    private searchService: SearchService,
    private usersService: UsersService,
    private pagerService: PagerService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

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
  }

  getHeaderOptions() {
    this.productService.getHeaderOptions();
    this.contractService.getHeaderOptions();
  }

  onEnter(value: string) {
    if (value.length < 5) {
      this.alertService.error('Search term must be 5 characters or more');
    } else {
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
          this.showProductListTable = true;
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          if (this.productList !== undefined) {
            this.productList.length = 0;
          }
          this.spinner.hide();
          this.showProductListTable = false;
        });
      }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.productList.length, page);

    // get current page of items
    this.pagedItems = this.productList.slice(this.pager.startIndex, this.pager.endIndex + 1);

    if (this.productList.length > 50) {
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
    this.spinner.show();
    this.productService.getContractDetail(value)
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
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.alertService.error(error);
        jQuery('#openContract').modal('hide');
        this.spinner.hide();
      }
    );
  }

  getPriceList(catEntryId: any) {
    this.spinner.show();
    this.itemPriceList = [];
    this.productService.getPriceList(catEntryId)
    .pipe(map(
      (list) => {
        const priceList = list['priceList'];
        console.log(priceList);
        return priceList;
      }
    ))
    .subscribe(
      data => {
        this.itemPriceList = data;
        this.spinner.hide();
      },
      error => {
        this.alertService.error(error);
        this.spinner.hide();
      });
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
          this.alertService.success('Product Added Successfully. (Changes will apply on next business day)');
          console.log('Product Saved');
        },
        error => {
          this.spinner.hide();
          console.log(error);
          this.alertService.error(error);
    });
    document.getElementById('addStoreProductClose').click();
  }

  resetForm() {
    this.productDetail = new ProductModel('', '', '', '', '', '', '', true, '', true, true, '', '', '', '', '');
    this.selectedId = '';
  }

  getCategoryId(value: any) {
    this.IdKey = this.categoryList.findIndex(function(item, i) {
      return item.identifier === value;
    });
    if (this.IdKey !== -1) {
      this.productDetail.catgroupId = this.categoryList[this.IdKey].uniqueID;
    }
  }

  downloadProductCSV(searchTerm: any) {
    this.spinner.show();
    this.contractService.getDownloadProductCSV(searchTerm)
    .subscribe(
      data => {
        const FileSaver = require('file-saver');
       // window.location.href = `${environment.apiUrl}` + data.filePath;
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
